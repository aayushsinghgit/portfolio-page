import json
import math
import os
from pathlib import Path
from typing import Any, Dict, List

from pypdf import PdfReader

EMBEDDING_MODEL = "models/gemini-embedding-001"
CHAT_MODEL = "gemini-2.0-flash"
CACHE_FILE = Path(__file__).resolve().parent / "embeddings-cache.json"

try:
    import google.generativeai as genai  # type: ignore
except Exception:  # pragma: no cover
    genai = None

PORTFOLIO_CONTEXT_EN = """You are an AI assistant for Ayush Singh's portfolio website.
Ayush is a Full Stack Developer & AI Specialist at Infosys with 3+ years of experience.
Answer ONLY questions about Ayush - his skills, projects, education, and work experience.
Be concise, friendly, and professional. Use the retrieved context below as your primary source.
If something is not mentioned in the context, say you do not have that information."""

PORTFOLIO_CONTEXT_HI = """आप आयुष सिंह की पोर्टफोलियो वेबसाइट के लिए एक AI सहायक हैं।
आयुष एक फुल स्टैक डेवलपर और AI विशेषज्ञ हैं जिनके पास Infosys में 3+ वर्षों का अनुभव है।
केवल आयुष के बारे में प्रश्नों का उत्तर दें - उनके कौशल, परियोजनाएं, शिक्षा, और कार्य अनुभव।
संक्षिप्त, मित्रवत और पेशेवर रहें। नीचे दिए गए संदर्भ को अपना प्राथमिक स्रोत बनाएं।
यदि संदर्भ में कुछ नहीं है, विनम्रता से कहें कि आपके पास वह जानकारी नहीं है।"""


def _chunk_text(text: str, chunk_size: int = 600, overlap: int = 80) -> List[str]:
    text = " ".join(text.split())
    if not text:
        return []
    chunks: List[str] = []
    start = 0
    while start < len(text):
        end = min(len(text), start + chunk_size)
        chunks.append(text[start:end])
        if end >= len(text):
            break
        start = end - overlap
    return chunks


def _cosine_similarity(a: List[float], b: List[float]) -> float:
    if not a or not b:
        return 0.0
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))
    if norm_a == 0.0 or norm_b == 0.0:
        return 0.0
    return dot / (norm_a * norm_b)


def _with_retry(fn, max_retries: int = 3):
    last_error = None
    for attempt in range(max_retries + 1):
        try:
            return fn()
        except Exception as exc:  # pragma: no cover - network exceptions vary
            last_error = exc
            msg = str(exc)
            is_rate_limited = "429" in msg or "quota" in msg.lower()
            if not is_rate_limited or attempt == max_retries:
                raise
            wait_seconds = min(20, 2 ** (attempt + 1))
            import time

            time.sleep(wait_seconds)
    raise last_error


def fallback_response(user_message: str, language: str = "en") -> str:
    q = (user_message or "").lower()
    hi = language == "hi"

    if any(k in q for k in ["skill", "tech stack", "technology", "कौशल"]):
        return (
            "Ayush works with React, Node.js, Python, Generative AI, RAG pipelines, cloud platforms (AWS/Azure/GCP), and REST APIs."
            if not hi
            else "आयुष React, Node.js, Python, Generative AI, RAG पाइपलाइन, क्लाउड (AWS/Azure/GCP) और REST APIs पर काम करते हैं।"
        )
    if any(k in q for k in ["project", "portfolio", "काम", "प्रोजेक्ट"]):
        return (
            "Key projects include an AI agent marketplace, an Ethereum crypto wallet, and this AI-enabled 3D portfolio."
            if not hi
            else "मुख्य प्रोजेक्ट्स में AI एजेंट मार्केटप्लेस, Ethereum क्रिप्टो वॉलेट, और यह AI-सक्षम 3D पोर्टफोलियो शामिल हैं।"
        )
    if any(k in q for k in ["experience", "infosys", "अनुभव"]):
        return (
            "Ayush has 3+ years of experience at Infosys, focused on full-stack development and AI solutions."
            if not hi
            else "आयुष के पास Infosys में 3+ वर्षों का अनुभव है, जहां उन्होंने फुल-स्टैक और AI समाधानों पर काम किया है।"
        )
    if any(k in q for k in ["contact", "email", "reach", "संपर्क", "ईमेल"]):
        return (
            "You can reach Ayush at singhaayu311@gmail.com."
            if not hi
            else "आप आयुष से singhaayu311@gmail.com पर संपर्क कर सकते हैं।"
        )
    return (
        "I can still help while AI service is unavailable. Ask about Ayush's skills, projects, experience, or contact details."
        if not hi
        else "AI सेवा उपलब्ध न होने पर भी मैं मदद कर सकता हूं। आप आयुष के कौशल, प्रोजेक्ट, अनुभव या संपर्क के बारे में पूछ सकते हैं।"
    )


class GeminiRAG:
    def __init__(self):
        self.documents: List[str] = []
        self.embeddings: List[List[float]] = []
        self.ready = False

    def _embed_batch(self, texts: List[str]) -> List[List[float]]:
        if genai is None:
            raise RuntimeError("google-generativeai is not installed")
        results: List[List[float]] = []
        for text in texts:
            embedding = _with_retry(
                lambda: genai.embed_content(model=EMBEDDING_MODEL, content=text, task_type="retrieval_document")
            )
            results.append(embedding["embedding"])
        return results

    def _embed_query(self, text: str) -> List[float]:
        if genai is None:
            raise RuntimeError("google-generativeai is not installed")
        result = _with_retry(
            lambda: genai.embed_content(model=EMBEDDING_MODEL, content=text, task_type="retrieval_query")
        )
        return result["embedding"]

    def _load_resume_text(self) -> str:
        root = Path(__file__).resolve().parent.parent
        candidates = [root / "public" / "resume.pdf", root / "public" / "Resume.pdf"]
        resume_path = next((p for p in candidates if p.exists()), None)
        if resume_path is None:
            raise FileNotFoundError("resume.pdf not found in public/")
        reader = PdfReader(str(resume_path))
        extracted = "\n".join((page.extract_text() or "") for page in reader.pages)
        supplementary = """
Ayush Singh - Portfolio Projects:
1. CoCo AI Agent & SaaS Marketplace - AI agent platform with React, Node.js, and LLM integration.
2. Crypto Wallet (Ethereum) - Decentralized wallet using React, Three.js, and Solidity smart contracts.
3. Portfolio Website - Interactive 3D portfolio with AI chatbot powered by Gemini RAG.
4. LLM Chatbot with Voice Interface - Includes voice input/output.

Professional Summary:
- AI/ML Engineer at Infosys with 3+ years of experience.
- Focuses on GenAI, RAG pipelines, LLM integration, prompt engineering.
- Backend: Python, Node.js, REST APIs.
- Cloud: Azure, AWS, GCP.
- Contact: singhaayu311@gmail.com
"""
        return f"{extracted}\n\n{supplementary}"

    def initialize(self) -> bool:
        try:
            if CACHE_FILE.exists():
                cache = json.loads(CACHE_FILE.read_text(encoding="utf-8"))
                self.documents = cache.get("documents", [])
                self.embeddings = cache.get("embeddings", [])
                self.ready = bool(self.documents and self.embeddings)
                return self.ready

            resume_text = self._load_resume_text()
            self.documents = _chunk_text(resume_text)
            self.embeddings = self._embed_batch(self.documents)
            CACHE_FILE.write_text(
                json.dumps({"documents": self.documents, "embeddings": self.embeddings}, ensure_ascii=False),
                encoding="utf-8",
            )
            self.ready = True
            return True
        except Exception:
            self.ready = False
            return False

    def _retrieve(self, query: str, k: int = 4) -> List[str]:
        if not self.documents or not self.embeddings:
            return []
        qv = self._embed_query(query)
        scored = [
            (idx, _cosine_similarity(qv, emb))
            for idx, emb in enumerate(self.embeddings)
        ]
        scored.sort(key=lambda pair: pair[1], reverse=True)
        return [self.documents[idx] for idx, _ in scored[:k]]

    def generate(self, user_message: str, chat_history: List[Dict[str, Any]], language: str = "en") -> str:
        if not self.ready:
            ok = self.initialize()
            if not ok:
                return fallback_response(user_message, language)

        try:
            context_docs = self._retrieve(user_message, 4)
            context = "\n\n".join(context_docs)
            system_text = PORTFOLIO_CONTEXT_HI if language == "hi" else PORTFOLIO_CONTEXT_EN

            history_lines: List[str] = []
            for msg in (chat_history or [])[-6:]:
                role = "User" if msg.get("role") == "user" else "Assistant"
                history_lines.append(f"{role}: {msg.get('content', '')}")
            history_text = "\n".join(history_lines)

            prompt = f"""{system_text}

Context:
{context}

Conversation:
{history_text}

User question: {user_message}
"""
            if genai is None:
                return fallback_response(user_message, language)
            model = genai.GenerativeModel(CHAT_MODEL)
            result = _with_retry(lambda: model.generate_content(prompt))
            text = (result.text or "").strip()
            return text if text else fallback_response(user_message, language)
        except Exception:
            return fallback_response(user_message, language)


def build_rag() -> GeminiRAG:
    api_key = os.getenv("GOOGLE_API_KEY")
    if api_key and genai is not None:
        genai.configure(api_key=api_key)
    return GeminiRAG()

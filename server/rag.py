# server/rag.py
"""RAG pipeline — Resume.pdf grounded, Gemini powered, SSE streaming."""

from __future__ import annotations
import json, logging, os
from pathlib import Path
from typing import AsyncIterator
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
logger = logging.getLogger(__name__)

_RESUME_PDF   = Path(__file__).parent.parent / "public" / "Resume.pdf"
_vector_store: FAISS | None = None

_EN_SYSTEM = """You are Ayush Singh's portfolio AI assistant.
Answer questions about Ayush's background, skills, projects, certifications, and experience
based ONLY on the resume context and chat history below.
Be concise and specific. If the answer is not in the context, say so.
When asked about projects, mention the live URLs.
Append [RESUME_DOWNLOAD] if the user asks to download the resume.
Append [EMAIL_COMPOSE] if the user asks to send an email.
Append [SCROLL_TO_PORTFOLIO], [SCROLL_TO_SKILLS], or [SCROLL_TO_CONTACT] when directing the user to a section.

Resume context:\n{context}\n\nChat history:\n{history}"""

_HI_SYSTEM = """आप आयुष सिंह के पोर्टफोलियो AI असिस्टेंट हैं।
नीचे दिए गए रिज्यूमे संदर्भ के आधार पर प्रश्नों का उत्तर हिंदी में दें।
उत्तर संक्षिप्त और सटीक होने चाहिए।
रिज्यूमे डाउनलोड के लिए [RESUME_DOWNLOAD] जोड़ें।
ईमेल के लिए [EMAIL_COMPOSE] जोड़ें।

रिज्यूमे संदर्भ:\n{context}\n\nचैट इतिहास:\n{history}"""

_FALLBACK_EN = (
    "Ayush has 3.5+ years of Generative AI experience at Infosys — RAG pipelines "
    "(LangChain, FAISS, Pinecone), multi-agent workflows (LangGraph, CrewAI, AutoGen), "
    "LLM fine-tuning (LoRA/PEFT), ~30% hallucination reduction across 5+ production deployments. "
    "Projects: CoCo (coco17.netlify.app), AI Chatbot (ayushsingh17.netlify.app), "
    "Crypto Wallet (cryptowallet17.netlify.app)."
)
_FALLBACK_HI = (
    "आयुष के पास Infosys में 3.5+ वर्षों का Generative AI अनुभव है — "
    "RAG pipelines, LangGraph, CrewAI, AutoGen, LoRA/PEFT fine-tuning। "
    "5+ production deployments में ~30% hallucination reduction हासिल किया।"
)

async def init_rag() -> None:
    global _vector_store
    if not _RESUME_PDF.exists():
        logger.warning("Resume PDF not found at %s — using static fallback.", _RESUME_PDF)
        return
    logger.info("Building RAG index from %s …", _RESUME_PDF)
    docs   = PyPDFLoader(str(_RESUME_PDF)).load()
    chunks = RecursiveCharacterTextSplitter(
        chunk_size=800, chunk_overlap=150,
        separators=["\n\n", "\n", ".", " ", ""],
    ).split_documents(docs)
    embeddings    = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=os.environ["GOOGLE_API_KEY"],
    )
    _vector_store = await FAISS.afrom_documents(chunks, embeddings)
    logger.info("RAG ready ✓  (%d chunks)", len(chunks))

def _fmt_history(history: list[dict]) -> str:
    if not history: return "No prior conversation."
    return "\n".join(
        f"{'User' if m.get('role')=='user' else 'Assistant'}: {m.get('content','')}"
        for m in history[-6:]
    )

async def stream_rag_response(
    message: str, history: list[dict], language: str = "en"
) -> AsyncIterator[str]:
    if _vector_store is None:
        yield _FALLBACK_HI if language == "hi" else _FALLBACK_EN
        return
    docs    = await _vector_store.as_retriever(search_kwargs={"k": 4}).ainvoke(message)
    context = "\n\n".join(d.page_content for d in docs)
    system  = _HI_SYSTEM if language == "hi" else _EN_SYSTEM
    chain   = (
        ChatPromptTemplate.from_messages([("system", system), ("human", "{question}")])
        | ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=os.environ["GOOGLE_API_KEY"],
            temperature=0.3, max_output_tokens=600, streaming=True,
          )
        | StrOutputParser()
    )
    async for chunk in chain.astream(
        {"context": context, "history": _fmt_history(history), "question": message}
    ):
        yield chunk

import { GoogleGenerativeAI } from '@google/generative-ai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY not set in server/.env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const EMBEDDING_MODEL  = 'gemini-embedding-001';
const CHAT_MODEL       = 'gemini-2.0-flash';
const CACHE_FILE       = path.resolve(__dirname, 'embeddings-cache.json');

async function withRetry(fn, maxRetries = 3) {
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            const is429 = err?.message?.includes('429') || err?.status === 429;
            if (!is429 || attempt === maxRetries) throw err;
            const match = err.message.match(/retryDelay["\s:]+["']?(\d+)/);
            const waitMs = match ? parseInt(match[1], 10) * 1000 : (2 ** attempt) * 5000;
            console.warn(`⏳ 429 hit — retrying in ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/${maxRetries})`);
            await new Promise(r => setTimeout(r, waitMs + 1000));
        }
    }
    throw lastError;
}

const PORTFOLIO_CONTEXT = `You are an AI assistant for Ayush Singh's portfolio website.
Ayush is a Full Stack Developer & AI Specialist at Infosys with 3+ years of experience.
Answer ONLY questions about Ayush — his skills, projects, education, and work experience.
Be concise, friendly, and professional. Use the retrieved context below as your primary source.
If something is not mentioned in the context, say you don't have that information.`;

const PORTFOLIO_CONTEXT_HI = `आप आयुष सिंह की पोर्टफोलियो वेबसाइट के लिए एक AI सहायक हैं।
आयुष एक फुल स्टैक डेवलपर और AI विशेषज्ञ हैं जिनके पास Infosys में 3+ वर्षों का अनुभव है।
केवल आयुष के बारे में प्रश्नों का उत्तर दें — उनके कौशल, परियोजनाएँ, शिक्षा, और कार्य अनुभव।
संक्षिप्त, मित्रवत और पेशेवर रहें। नीचे दिए गए संदर्भ को अपना प्राथमिक स्रोत बनाएं।
यदि संदर्भ में कुछ नहीं है, विनम्रता से कहें कि आपके पास वह जानकारी नहीं है।`;

class GeminiVectorStore {
    constructor() {
        this.documents  = [];
        this.embeddings = [];
    }

    async embedBatch(texts) {
        const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
        return withRetry(async () => {
            const result = await model.batchEmbedContents({
                requests: texts.map(t => ({ content: { parts: [{ text: t }] } }))
            });
            return result.embeddings.map(e => e.values);
        });
    }

    async embedSingle(text) {
        const results = await this.embedBatch([text]);
        return results[0];
    }

    cosineSimilarity(a, b) {
        let dot = 0, normA = 0, normB = 0;
        for (let i = 0; i < a.length; i++) {
            dot   += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        return dot / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    loadFromCache(cacheData) {
        this.documents  = cacheData.documents;
        this.embeddings = cacheData.embeddings;
        console.log(`📂 Loaded ${this.documents.length} chunks from cache`);
    }

    async buildAndCache(documents) {
        console.log(`🧠 Embedding ${documents.length} chunks with Gemini (Batch)...`);
        this.documents  = documents;
        const texts = documents.map(d => d.pageContent);
        this.embeddings = await this.embedBatch(texts);
        
        const cache = { documents: this.documents, embeddings: this.embeddings };
        fs.writeFileSync(CACHE_FILE, JSON.stringify(cache), 'utf8');
        console.log(`💾 Embeddings cached to embeddings-cache.json`);
    }

    async similaritySearch(query, k = 4) {
        const queryVec = await withRetry(() => this.embedSingle(query));
        const scored = this.embeddings.map((vec, idx) => ({
            doc:   this.documents[idx],
            score: this.cosineSimilarity(queryVec, vec),
        }));
        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, k)
            .map(s => s.doc);
    }
}

let vectorStore = null;

export async function initializeRAG() {
    try {
        console.log('🔄 Initializing Gemini RAG system...');
        vectorStore = new GeminiVectorStore();

        if (fs.existsSync(CACHE_FILE)) {
            const cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
            vectorStore.loadFromCache(cacheData);
            console.log('✅ RAG ready (from cache — zero API calls used on startup)');
            return true;
        }

        const resumePath = path.resolve(__dirname, '..', 'public', 'Resume.pdf');
        if (!fs.existsSync(resumePath)) {
            throw new Error(`Resume.pdf not found at: ${resumePath}`);
        }

        const pdfBuffer  = fs.readFileSync(resumePath);
        const pdfData    = await pdf(pdfBuffer);
        const resumeText = pdfData.text;

        const supplementary = `
Ayush Singh — Portfolio Projects:
1. CoCo AI Agent & SaaS Marketplace — AI agent platform built with React, Node.js, LLM integration. Live: https://neuromarket17.netlify.app
2. Crypto Wallet (Ethereum) — Decentralized wallet using React, Three.js, Solidity smart contracts. Live: https://cryptowallet17.netlify.app
3. Portfolio Website — Interactive 3D portfolio with AI chatbot powered by Gemini RAG. Live: https://ayushsingh17.netlify.app
4. LLM Chatbot with Voice Interface — Built using Zephyr-7B-Beta, includes voice I/O.

Professional Summary:
- AI/ML Engineer at Infosys with 3+ years of experience.
- Specialises in Generative AI, RAG pipelines, LLM integration, prompt engineering.
- Backend experience: Python, Node.js, REST APIs.
- Cloud: Azure, AWS, GCP.
- Completing MCA at SRM University.
- Certifications: Infosys Generative AI, OpenAI API Development, Python.
- Contact: singhaayu311@gmail.com
`;

        const fullText = resumeText + '\n\n' + supplementary;
        const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 600, chunkOverlap: 80 });
        const docs = await splitter.createDocuments([fullText]);
        console.log(`📦 Created ${docs.length} chunks — starting embedding...`);

        await vectorStore.buildAndCache(docs);
        console.log('✅ Gemini RAG ready!');
        return true;
    } catch (err) {
        console.error('❌ RAG init failed:', err.message);
        return false;
    }
}

export async function getRAGResponse(userMessage, chatHistory = [], language = 'en') {
    if (!vectorStore) {
        const ok = await initializeRAG();
        if (!ok) throw new Error('RAG not available');
    }

    const isHindi    = language === 'hi';
    const systemText = isHindi ? PORTFOLIO_CONTEXT_HI : PORTFOLIO_CONTEXT;

    const docs    = await vectorStore.similaritySearch(userMessage, 4);
    const context = docs.map(d => d.pageContent).join('\n\n');

    // 2. Build conversation history for Gemini (role: user/model)
    // Gemini REQUIRES the first message in history to be 'user'
    let history = chatHistory
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({
            role:  m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
        }));

    const firstUserIdx = history.findIndex(h => h.role === 'user');
    if (firstUserIdx !== -1) {
        history = history.slice(firstUserIdx);
    } else {
        history = [];
    }

    // Keep last 6 turns
    history = history.slice(-6);

    const userTurn = `${systemText}

Context retrieved from Ayush's resume and portfolio:
---
${context}
---

User question: ${userMessage}`;

    const model = genAI.getGenerativeModel({ model: CHAT_MODEL });
    const chat  = model.startChat({ history });
    const result = await withRetry(() => chat.sendMessage(userTurn));
    return result.response.text().trim();
}

// Run to force-rebuild embeddings after Resume.pdf changes:
//   node --input-type=module <<< "import { clearCache } from './rag.js'; clearCache();"
export function clearCache() {
    if (fs.existsSync(CACHE_FILE)) {
        fs.unlinkSync(CACHE_FILE);
        console.log('🗑️  Cache cleared — will rebuild on next server start');
    } else {
        console.log('No cache file found');
    }
}

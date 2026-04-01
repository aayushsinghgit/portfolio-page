import { initializeRAG, getRAGResponse } from './rag.js';

async function test() {
    console.log('🧪 Starting Hugging Face RAG Test...');
    
    const initSuccess = await initializeRAG();
    if (!initSuccess) {
        console.error('❌ RAG Initialization Failed');
        process.exit(1);
    }

    const testQueries = [
        "What are Ayush's key skills?",
        "Tell me about the Crypto Wallet project",
        "Where did Ayush study?",
        "Help me with Ayush's resume"
    ];

    for (const query of testQueries) {
        console.log(`\nUser: ${query}`);
        try {
            const response = await getRAGResponse(query, [], 'en');
            console.log(`Bot: ${response}`);
        } catch (error) {
            console.error(`❌ Error for query "${query}":`, error.message);
        }
    }
}

test().catch(console.error);

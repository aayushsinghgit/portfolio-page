import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const keys = ['v1', 'v1beta'];
  for (const v of keys) {
    try {
      const url = `https://generativelanguage.googleapis.com/${v}/models?key=${process.env.GOOGLE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(`--- MODELS (${v}) ---`);
      console.log(data.models?.filter(m => m.supportedGenerationMethods.includes('generateContent')).map(m => m.name));
    } catch (err) {
      console.error(`ERROR (${v}):`, err.message);
    }
  }
}
test();






# Portfolio Deployment Guide

## 🏗️ Full-Stack Architecture
Your portfolio consists of a **React Frontend** and a **Node.js/Express Backend** with Gemini RAG integration.

## 🚀 1. Deploy Frontend (Netlify)

1. **GitHub Sync**: Push your code to GitHub.
2. **Netlify Dashboard**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment Variables**:
   - `VITE_API_URL`: Your live backend URL (e.g., `https://your-backend.onrender.com`)

## 🚀 2. Deploy Backend (Render / Railway)

### Recommended: Render (Free Tier)
1. **New Web Service**: Connect your GitHub repo.
2. **Build Settings**:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
3. **Environment Variables**:
   - `GOOGLE_API_KEY`: Your Gemini API Key from [Google AI Studio](https://aistudio.google.com/apikey).
   - `PORT`: `10000` (Render default)

## 🔑 3. Important: API Key Setup

The AI Chatbot requires a **Google Gemini API Key**.
1. Go to [Google AI Studio](https://aistudio.google.com/apikey).
2. Generate a new API Key.
3. Add it to your backend's environment variables as `GOOGLE_API_KEY`.

## 📊 Performance & SEO
- **Lazy Loading**: Components are lazy-loaded for 0.5s initial TTI.
- **RAG Cache**: Embeddings are cached in `server/embeddings-cache.json` to minimize API calls and costs.
- **Responsive**: Fully optimized for mobile and desktop.

## 🌐 Verification
Once both are deployed, ensure your frontend can talk to the backend by checking the `VITE_API_URL` setting.

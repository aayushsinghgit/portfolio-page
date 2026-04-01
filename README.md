# Modern AI-Powered Portfolio

A professional, full-stack portfolio website featuring a **Gemini 2.0 Powered RAG Chatbot**, multilingual support, and high-performance 3D animations.

## 🌟 Key Features

- **🤖 AI Assistant (RAG)**: Context-aware chatbot trained on Ayush's resume using Google Gemini 2.0 and PDF-based Retrieval-Augmented Generation.
- **🎙️ Voice Interface**: Hands-free interaction via Web Speech API integration.
- **🌐 Multilingual**: Seamless English/Hindi toggle with dynamic AI response translation.
- **🚀 Ultra-Fast**: Built with Vite and optimized for core web vitals.
- **🎨 Premium UI**: Smooth animations using Framer Motion, GSAP, and 3D scenes with React Three Fiber.
- **📧 Smart Contact**: Direct email triggers and form validation.

## 📁 Project Structure

```
.
├── src/                # Frontend (React + Vite)
│   ├── components/     # UI Components (Chatbot, Scene3D, etc.)
│   ├── pages/          # Portfolio Sections
│   └── context/        # State Management
├── server/             # Backend (Node.js + Express)
│   ├── rag.js          # Gemini RAG Logic & Vector Storage
│   ├── server.js       # Express API Endpoints
│   └── tests/          # Backend Test Scripts
└── public/             # Static Assets (Resume.pdf, etc.)
```

## 🛠️ Getting Started

### 1. Frontend Setup
```bash
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd server
npm install
# Create .env based on env.example with your GOOGLE_API_KEY
npm start
```

## 🔑 Environment Variables

- **Frontend**: `VITE_API_URL` (Point to your backend)
- **Backend**: `GOOGLE_API_KEY` (Get from AI Studio)

## 🎨 Technologies Used

- **Frontend**: React 18, Vite, TailwindCSS, Framer Motion, Three.js
- **Backend**: Node.js, Express, LangChain (Text Splitters), Google GenAI SDK
- **AI**: Gemini 2.0 Flash, Gemini Embedding Model

## 🚀 Deployment

- **Frontend**: Recommended on **Netlify** or **Vercel**.
- **Backend**: Recommended on **Render**, **Railway**, or **Railway.app** (requires persistent Node.js environment).
- **Environment Variables**: Ensure `GOOGLE_API_KEY` is set in your production environment.
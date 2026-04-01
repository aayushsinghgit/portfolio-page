# Modern AI-Powered Portfolio

Full-stack portfolio with React frontend and Python (FastAPI) backend, including Gemini-powered RAG chat with resilient fallback responses.

## Key Features

- AI chatbot with RAG over resume data (`public/resume.pdf`)
- Dual-language support (English/Hindi)
- Voice input in chat
- Contact form API + email delivery
- Graceful chatbot fallback when AI API/backend is unavailable

## Project Structure

```txt
.
├── src/                # Frontend (React + Vite)
├── server/             # Backend (Python + FastAPI)
│   ├── app.py          # API endpoints
│   ├── rag.py          # Gemini RAG + fallback logic
│   ├── requirements.txt
│   └── env.example
└── public/             # Static assets (resume.pdf)
```

## Local Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r server/requirements.txt
copy server/env.example server/.env
python -m uvicorn app:app --app-dir server --reload --host 0.0.0.0 --port 5000
```

## Environment Variables

Frontend:
- `VITE_API_URL=http://localhost:5000`

Backend (`server/.env`):
- `GOOGLE_API_KEY`
- `EMAIL_USER`
- `EMAIL_PASS`
- `CONTACT_TO_EMAIL` (optional)
- `PORT` (optional)

## Deployment

- Frontend: Netlify
- Backend: Render (Python Web Service)

Detailed steps: see `DEPLOYMENT.md`.
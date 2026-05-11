# Portfolio Deployment Guide

## Architecture
- Frontend: React + Vite (deploy to Netlify)
- Backend: FastAPI + Gemini RAG (deploy to Render)

## 1) Deploy Backend on Render

1. Push code to GitHub.
2. Render -> New -> Web Service -> Connect repo.
3. Use these settings:
   - Runtime: Python 3
   - Root Directory: `server`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
4. Add environment variables:
   - `GOOGLE_API_KEY`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `CONTACT_TO_EMAIL` (optional)
5. Deploy and verify:
   - `https://<your-render-service>.onrender.com/api/health`

## 2) Deploy Frontend on Netlify

1. Netlify -> Add new site -> Import from Git.
2. Build settings:
   - Base directory: (leave empty)
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variable:
   - `VITE_API_URL=https://<your-render-service>.onrender.com`
4. Deploy and verify chatbot/contact form.

## 3) Post-Deploy Checklist

- `api/health` returns `{ status: "ok" }`
- Chatbot returns responses when Gemini is up
- Chatbot still returns fallback answers if Gemini is down
- Contact form sends email successfully

## Notes

- First backend startup may be slower (PDF read + embeddings cache build).
- Keep `GOOGLE_API_KEY` and email credentials in platform env vars only.

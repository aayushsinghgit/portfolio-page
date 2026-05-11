# server/app.py
from __future__ import annotations
import json, logging, os, smtplib
from contextlib import asynccontextmanager
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from rag import init_rag, stream_rag_response

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_rag()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "https://ayushsingh17.netlify.app",
    ],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=True,
)

_PUBLIC = Path(__file__).parent.parent / "public"
if _PUBLIC.exists():
    app.mount("/public", StaticFiles(directory=str(_PUBLIC)), name="public")

class ChatRequest(BaseModel):
    message:  str
    history:  list[dict] = []
    language: str        = "en"

class ContactRequest(BaseModel):
    name:    str
    email:   str
    message: str

@app.post("/api/chat")
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message is required.")
    async def generate():
        try:
            async for chunk in stream_rag_response(req.message, req.history, req.language):
                yield f"data: {json.dumps({'text': chunk}, ensure_ascii=False)}\n\n"
        except Exception as exc:
            logger.error("RAG stream error: %s", exc)
            fallback = "माफ़ करें, एक त्रुटि हुई।" if req.language == "hi" else "Sorry, an error occurred."
            yield f"data: {json.dumps({'text': fallback})}\n\n"
    return StreamingResponse(generate(), media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no",
                 "Access-Control-Allow-Origin": "*"})

@app.post("/api/contact")
async def contact(req: ContactRequest):
    user  = os.getenv("EMAIL_USER")
    pwd   = os.getenv("EMAIL_PASS")
    to    = os.getenv("CONTACT_TO_EMAIL", "singhaayu311@gmail.com")
    if not user or not pwd:
        logger.warning("EMAIL_USER/EMAIL_PASS not set — skipping email.")
        return {"success": True}
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"]  = f"Portfolio contact from {req.name}"
        msg["From"]     = user
        msg["To"]       = to
        msg["Reply-To"] = req.email
        msg.attach(MIMEText(f"Name: {req.name}\nEmail: {req.email}\n\n{req.message}", "plain"))
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as s:
            s.login(user, pwd)
            s.sendmail(user, to, msg.as_string())
        return {"success": True}
    except Exception as exc:
        logger.error("Email failed: %s", exc)
        raise HTTPException(status_code=500, detail="Email send failed.")

@app.get("/api/health")
async def health():
    return {"status": "ok"}

import os
import smtplib
import time
from collections import defaultdict, deque
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any, Dict, List

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

from rag import build_rag, fallback_response

load_dotenv()

app = FastAPI(title="Portfolio Backend", version="2.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = build_rag()
rag_ready = rag.initialize()

RATE_WINDOW_SECONDS = 60
RATE_MAX_REQUESTS = 20
request_log: Dict[str, deque] = defaultdict(deque)


class ContactPayload(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatPayload(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    history: List[ChatMessage] = []
    language: str = "en"


def _allow_request(client_ip: str) -> bool:
    now = time.time()
    q = request_log[client_ip]
    while q and now - q[0] > RATE_WINDOW_SECONDS:
        q.popleft()
    if len(q) >= RATE_MAX_REQUESTS:
        return False
    q.append(now)
    return True


@app.get("/api/health")
def health():
    return {"status": "ok", "rag": rag_ready, "model": "gemini-2.0-flash", "fallback_enabled": True}


@app.post("/api/contact")
def contact(payload: ContactPayload):
    email_user = os.getenv("EMAIL_USER")
    email_pass = os.getenv("EMAIL_PASS")
    email_to = os.getenv("CONTACT_TO_EMAIL", "singhaayu311@gmail.com")

    if not email_user or not email_pass:
        return {
            "success": False,
            "message": "Email service is not configured. Set EMAIL_USER and EMAIL_PASS.",
        }

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: {payload.name}"
        msg["From"] = email_user
        msg["To"] = email_to

        html = f"""
<h3>New Contact</h3>
<p><b>Name:</b> {payload.name}</p>
<p><b>Email:</b> {payload.email}</p>
<p><b>Message:</b><br>{payload.message}</p>
"""
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(email_user, email_pass)
            server.sendmail(email_user, [email_to], msg.as_string())

        return {"success": True, "message": "Email sent!"}
    except Exception as exc:
        return {"success": False, "message": f"Failed to send email: {exc}"}


@app.post("/api/chat")
def chat(payload: ChatPayload, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if not _allow_request(client_ip):
        return {"error": "Too many requests. Please wait a moment.", "response": fallback_response(payload.message, payload.language)}

    history: List[Dict[str, Any]] = [
        {"role": item.role, "content": item.content}
        for item in payload.history
        if item.role in {"user", "assistant"}
    ]

    try:
        response = rag.generate(payload.message.strip(), history, payload.language)
        return {"response": response}
    except Exception:
        return {"response": fallback_response(payload.message, payload.language)}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "5000"))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=True)

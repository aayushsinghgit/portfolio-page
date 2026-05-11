from fastapi.testclient import TestClient

import app as app_module


def test_chat_returns_fallback_when_rag_fails(monkeypatch):
    client = TestClient(app_module.app)

    # Force streaming generator to fail immediately so fallback SSE path is used.
    def _boom_stream(*_args, **_kwargs):
        raise RuntimeError("Gemini down")

    monkeypatch.setattr(app_module.rag, "generate_stream", _boom_stream, raising=True)

    res = client.post("/api/chat", json={"message": "What are your skills?", "history": [], "language": "en"})
    assert res.status_code == 200
    assert "text/event-stream" in res.headers.get("content-type", "")
    assert "data:" in res.text
    assert "ayush" in res.text.lower() or "react" in res.text.lower()

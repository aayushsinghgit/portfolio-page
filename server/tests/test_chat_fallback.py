from fastapi.testclient import TestClient

import app as app_module


def test_chat_returns_fallback_when_rag_fails(monkeypatch):
    client = TestClient(app_module.app)

    # Force rag.generate to raise, ensuring API still returns a response via fallback.
    def _boom(*_args, **_kwargs):
        raise RuntimeError("Gemini down")

    monkeypatch.setattr(app_module.rag, "generate", _boom, raising=True)

    res = client.post("/api/chat", json={"message": "What are your skills?", "history": [], "language": "en"})
    assert res.status_code == 200
    data = res.json()
    assert "response" in data
    assert isinstance(data["response"], str)
    assert len(data["response"]) > 0

from fastapi.testclient import TestClient

from app import app


def test_contact_rejects_short_message():
    client = TestClient(app)
    res = client.post(
        "/api/contact",
        json={"name": "Ay", "email": "test@example.com", "message": "short"},
    )
    assert res.status_code == 422  # Pydantic validation


def test_contact_rejects_invalid_email():
    client = TestClient(app)
    res = client.post(
        "/api/contact",
        json={"name": "Ayush", "email": "not-an-email", "message": "This is a valid long message."},
    )
    assert res.status_code == 422

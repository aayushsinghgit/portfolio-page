import sqlite3
import time
from pathlib import Path

DB_FILE = Path(__file__).resolve().parent / "chat_analytics.db"

class ChatAnalytics:
    def __init__(self):
        self._init_db()

    def _init_db(self):
        try:
            with sqlite3.connect(DB_FILE) as conn:
                conn.execute('''
                    CREATE TABLE IF NOT EXISTS chat_logs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        timestamp REAL,
                        client_ip_hash TEXT,
                        question TEXT,
                        question_length INTEGER,
                        language TEXT
                    )
                ''')
                conn.commit()
        except Exception as e:
            print(f"Failed to init DB: {e}")

    def log_interaction(self, client_ip_hash: str, question: str, language: str):
        try:
            with sqlite3.connect(DB_FILE) as conn:
                # We save question and its length. For heavy production we'd encrypt IPs, so we only store hashed IPs
                conn.execute(
                    "INSERT INTO chat_logs (timestamp, client_ip_hash, question, question_length, language) VALUES (?, ?, ?, ?, ?)",
                    (time.time(), client_ip_hash, question, len(question), language)
                )
                conn.commit()
        except Exception as e:
            print(f"Analytics logging failed: {e}")

analytics_db = ChatAnalytics()

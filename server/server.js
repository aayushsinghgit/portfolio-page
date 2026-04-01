import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';
import { initializeRAG, getRAGResponse } from './rag.js';

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Email Transporter ────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── Contact Form ─────────────────────────────────────────────
app.post('/api/contact', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message too short'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'singhaayu311@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `<h3>New Contact</h3><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br>${message}</p>`,
    });
    res.json({ success: true, message: 'Email sent!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// ─── Rate Limiter ─────────────────────────────────────────────
const rateLimitMap = new Map();
const RATE_WINDOW  = 60 * 1000; // 1 min
const RATE_MAX     = 20;

function rateLimit(req, res, next) {
  const ip  = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return next();
  }
  entry.count++;
  if (entry.count > RATE_MAX) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }
  return next();
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of rateLimitMap) {
    if (now - e.start > RATE_WINDOW) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

// ─── Chat Endpoint ────────────────────────────────────────────
app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { message, history = [], language = 'en' } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const sanitized = message.trim().slice(0, 500);
    const response  = await getRAGResponse(sanitized, history, language);
    res.json({ response });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({
      error: 'Failed to generate response',
      response: '⚠️ Something went wrong. Please try again.',
    });
  }
});

// ─── Health Check ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', rag: !!global.ragReady, model: 'gemini-2.0-flash' });
});

// ─── Start ────────────────────────────────────────────────────
async function startServer() {
  const ok = await initializeRAG();
  global.ragReady = ok;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Chat API: http://localhost:${PORT}/api/chat`);
    console.log(`🤖 RAG ready: ${ok}`);
  });
}

startServer();

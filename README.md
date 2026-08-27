# AI Lead Capture Chatbot

A lightweight dental-office lead capture chatbot built with vanilla JS, Tailwind CSS (CDN), and a Vercel Serverless Function powered by Google's Gemini API.

## Project structure

```
ai-lead-agent/
├── index.html      # Floating chat widget UI
├── api/chat.js     # Vercel serverless chat endpoint
├── package.json
└── .env            # Local secrets (not committed)
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Open `.env` and set your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Where to get a key:** [Google AI Studio](https://aistudio.google.com/apikey) → Create API key → paste it into `.env`.

> **Important:** Never commit `.env` to git. It is already listed in `.gitignore`.

### 3. Run locally

Use the Vercel CLI so both the static page and `/api/chat` work together:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click the chat bubble.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
4. Deploy. Vercel automatically serves `index.html` and the `api/` functions.

## How it works

- **`index.html`** — Floating chat widget with message history, typing indicator, and a POST to `/api/chat`.
- **`api/chat.js`** — Receives the full conversation, applies a dental-receptionist system prompt via `@google/genai`, and returns the assistant reply.

The bot is instructed to collect the visitor's **name** and **phone number** for follow-up scheduling.

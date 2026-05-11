# Portfolio — Complete Implementation Guide

**Stack confirmed from source:** React 18 + Vite + Tailwind CSS + Framer Motion + Three.js  
**Backend:** Python / FastAPI / Uvicorn (server/app.py)  
**Deploy:** Netlify (frontend) · Render (backend)  
**Chatbot:** SSE streaming · Hindi/English bilingual · Voice input

> Work through each step in order. Every code block is copy-paste ready.

---

## Table of Contents

1. [Step 1 — Capture project screenshots with Playwright](#step-1--capture-project-screenshots)
2. [Step 2 — Update all content in `en.js`](#step-2--update-all-content-in-enjs)
3. [Step 3 — Upgrade `Portfolio.jsx` (local screenshots + metrics)](#step-3--upgrade-portfoliojsx)
4. [Step 4 — Update `About.jsx` (stats)](#step-4--update-aboutjsx)
5. [Step 5 — Add `Experience.jsx` (new section)](#step-5--add-experiencejsx)
6. [Step 6 — Wire Experience into `App.jsx`](#step-6--wire-experience-into-appjsx)
7. [Step 7 — RAG chatbot backend (Python/FastAPI)](#step-7--rag-chatbot-backend)
8. [Step 8 — Update chatbot frontend for RAG](#step-8--update-chatbot-frontend)
9. [Step 9 — GitHub Actions — automated weekly screenshots](#step-9--github-actions-automated-screenshots)
10. [Step 10 — Deploy checklist](#step-10--deploy-checklist)

---

## Step 1 — Capture project screenshots

You already have `@playwright/test ^1.59.1` in `devDependencies`. Use it directly.

### Install browsers (one time)

```bash
npx playwright install chromium
```

### Option A — CLI (fastest)

Run from project root:

```bash
# CoCo — agentic AI marketplace
npx playwright screenshot \
  --browser=chromium \
  --viewport-size="1280,720" \
  "https://coco17.netlify.app" \
  "public/media/projects/coco.png"

# AI Chatbot — RAG + Voice
npx playwright screenshot \
  --browser=chromium \
  --viewport-size="1280,720" \
  "https://ayushsingh17.netlify.app" \
  "public/media/projects/chatbot.png"

# Crypto Wallet — Ethereum dApp
npx playwright screenshot \
  --browser=chromium \
  --viewport-size="1280,720" \
  "https://cryptowallet17.netlify.app" \
  "public/media/projects/crypto.png"
```

### Option B — Script (better control over what is captured)

Create `scripts/capture-screenshots.js`:

```js
// scripts/capture-screenshots.js
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projects = [
  {
    name: 'coco',
    url: 'https://coco17.netlify.app',
    // Wait for the main agent panel to appear
    waitFor: '.agent-grid, [data-testid="agent-grid"], main, .hero',
    output: path.join(__dirname, '../public/media/projects/coco.png'),
  },
  {
    name: 'chatbot',
    url: 'https://ayushsingh17.netlify.app',
    waitFor: '#hero',
    output: path.join(__dirname, '../public/media/projects/chatbot.png'),
  },
  {
    name: 'crypto',
    url: 'https://cryptowallet17.netlify.app',
    waitFor: 'main, .wallet, #app',
    output: path.join(__dirname, '../public/media/projects/crypto.png'),
  },
];

(async () => {
  const browser = await chromium.launch();

  for (const project of projects) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1280, height: 720 });

    console.log(`Capturing ${project.name}...`);
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Try to wait for a specific element; fall back to a short delay
    await page.waitForSelector(project.waitFor, { timeout: 5000 })
      .catch(() => page.waitForTimeout(2500));

    await page.screenshot({ path: project.output, fullPage: false });
    await page.close();
    console.log(`  Saved → ${project.output}`);
  }

  await browser.close();
})();
```

Add to `package.json` scripts:

```json
"scripts": {
  "screenshots": "node scripts/capture-screenshots.js"
}
```

Run:

```bash
npm run screenshots
```

### Convert to WebP (smaller file size, faster loads)

```bash
# macOS
brew install webp

# Ubuntu / WSL
sudo apt install webp

# Convert all three
for f in public/media/projects/*.png; do
  cwebp -q 85 "$f" -o "${f%.png}.webp" && rm "$f"
done
```

Final files expected:
```
public/media/projects/coco.webp
public/media/projects/chatbot.webp
public/media/projects/crypto.webp
```

---

## Step 2 — Update all content in `en.js`

File: `src/locales/en.js`

Replace the **entire** file with the following. Every section is updated to match your resume.

```js
// src/locales/en.js
var e = {
  nav: {
    home:      `Home`,
    about:     `About`,
    skills:    `Skills`,
    portfolio: `Portfolio`,
    contact:   `Contact`,
  },

  hero: {
    greeting:       `Hi, I'm`,
    name:           `Ayush Singh`,
    title:          `Generative AI Developer · LLM Systems · RAG & Agentic Architecture`,
    subtitle:       `3.5+ years building production-grade LLM apps — RAG pipelines, multi-agent workflows (LangChain · LangGraph · CrewAI), LLM fine-tuning (LoRA/PEFT), and AI evaluation — on Azure, AWS, and GCP.`,
    scrollPrompt:   `Scroll to explore`,
    downloadResume: `Download Resume`,
  },

  about: {
    title:       `About Me`,
    description: `Generative AI Developer at Infosys with 3.5+ years of hands-on experience designing, building, and shipping production-grade LLM applications. Specialise in RAG pipeline engineering, prompt engineering, agentic workflow design (LangChain, LangGraph, CrewAI, AutoGen), and LLM fine-tuning (LoRA/PEFT) on enterprise datasets. Track record of measurable outcomes — ~30% hallucination reduction across 5+ production LLM deployments — on Azure OpenAI, Amazon Bedrock, and GCP Vertex AI.`,
    headline: {
      line1: `Building`,
      line2: `Intelligent`,
      line3: `Systems`,
    },
    stats: {
      experience: { number: `3.5+`, label: `Years Experience` },
      projects:   { number: `5+`,   label: `Production Deployments` },
    },
    cta: `LET'S WORK TOGETHER`,
  },

  brands: {
    title:    `Companies I Worked With`,
    subtitle: `TRUSTED BY LEADING COMPANIES`,
  },

  skills: {
    title: `Skills & Technologies`,
    headline: {
      line1: `Technical`,
      line2: `Expertise`,
    },
    description: `Specialised in production-grade Generative AI — from RAG pipeline engineering and agentic workflow design through LLM evaluation, safety, and cloud-native deployment.`,
    categories: {
      ml_deep_learning:  `ML / Fine-Tuning`,
      llm_genai:         `LLM & GenAI`,
      agentic_frameworks:`Agentic Frameworks`,
      rag_retrieval:     `RAG & Retrieval`,
      mlops_eval:        `MLOps & Evaluation`,
      safety_governance: `Safety & Governance`,
      cloud_dev:         `Cloud & Dev`,
    },
  },

  certifications: {
    title:    `Certifications`,
    subtitle: `CREDENTIALS`,
    headline: {
      line1: `Certified`,
      line2: `Excellence`,
    },
    description: `Continuous learning and professional development through industry-recognised certifications.`,
    loadMore: `LOAD MORE`,
    items: [
      {
        title:  `Generative AI Professional Developer`,
        issuer: `Infosys`,                                   // ← fixed from "Google Cloud"
        date:   `Earned Jan 2024`,
        id:     `INF-GAI-771`,
        link:   `https://infosys.com`,
        logo:   `/media/companies/infosys.svg`,              // ← local SVG
      },
      {
        title:  `OpenAI API Developer`,
        issuer: `Internshala`,                               // ← fixed from "OpenAI"
        date:   `Earned Dec 2023`,
        id:     `INT-OAI-827`,
        link:   `https://internshala.com`,
        logo:   `https://cdn.simpleicons.org/openai/white`,
      },
      {
        title:  `Python Developer`,
        issuer: `Infosys`,
        date:   `Earned Oct 2023`,
        id:     `INF-PY-928`,
        link:   `https://infosys.com`,
        logo:   `/media/companies/infosys.svg`,
      },
      {
        title:  `Data Consultant`,
        issuer: `Infosys`,
        date:   `Earned Aug 2023`,
        id:     `INF-DC-442`,
        link:   `https://infosys.com`,
        logo:   `/media/companies/infosys.svg`,
      },
    ],
  },

  portfolio: {
    title:        `Featured Projects`,
    headline:     `Selected Work`,
    projectLabel: `PROJECT`,
    links: {
      viewProject: `VIEW PROJECT`,
      github:      `GITHUB`,
    },
    projects: [
      {
        title: `CoCo — Agentic AI SaaS Platform`,
        description: `Full-stack multi-agent platform with planning loops, tool calling, and MCP Server integrations. Modular per-agent on/off control with progressive autonomy UX — review-before-execute or full-auto mode. Built evaluation hooks tracking task success and trajectory quality, with an event-driven backend and fault-tolerant retry logic.`,
        tech: [`LangChain`, `LangGraph`, `CrewAI`, `MCP Servers`, `Node.js`, `React.js`, `Tailwind CSS`, `Netlify`],
        link:   `https://coco17.netlify.app`,
        github: `https://github.com/aayushsinghgit`,
        image:  `/media/projects/coco.webp`,
        metric: `Multi-agent · Planning loops · MCP Server integrations · Progressive autonomy`,
      },
      {
        title: `AI Chatbot — LLM + RAG + Voice`,
        description: `End-to-end RAG pipeline with FAISS vector indexing, hybrid retrieval, re-ranking, hallucination detection, and confidence calibration. Fine-tuned on Zephyr-7B-Beta via Hugging Face. Real-time voice interface via Web Speech API. Deployed serverless with latency-optimised embedding caching and fault-tolerant retry handling.`,
        tech: [`Zephyr-7B`, `LangChain`, `FAISS`, `Sentence Transformers`, `Web Speech API`, `JavaScript`, `Netlify`],
        link:   `https://ayushsingh17.netlify.app`,
        github: `https://github.com/aayushsinghgit/portfolio-page`,
        image:  `/media/projects/chatbot.webp`,
        metric: `~30% hallucination reduction · Voice + text · Serverless RAG`,
      },
      {
        title: `Crypto Wallet — Ethereum dApp`,
        description: `Decentralised Ethereum wallet with Solidity smart contracts, wallet authentication, balance tracking, and full transaction history. Demonstrates full-stack engineering breadth beyond AI — from on-chain contract logic to a polished React frontend.`,
        tech: [`Solidity`, `Web3.js`, `Node.js`, `React.js`, `Ethereum`],
        link:   `https://cryptowallet17.netlify.app`,
        github: `https://github.com/aayushsinghgit`,
        image:  `/media/projects/crypto.webp`,
        metric: `On-chain · Smart contracts · Wallet auth · Transaction history`,
      },
    ],
  },

  contact: {
    title:   `Get In Touch`,
    headline: {
      line1: `Let's Create`,
      line2: `Something Great`,
    },
    description: `Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.`,
    info: {
      email:        `singhaayu311@gmail.com`,
      phone:        `+91 74618 79795`,
      location:     `Dwarka, New Delhi – 110078 · Open to Relocation`,
      linkedin:     `linkedin.com/in/aayush-singh-172992220`,
      portfolio:    `ayushsingh17.netlify.app`,
      cryptoWallet: `cryptowallet17.netlify.app`,
    },
    sections: {
      getInTouch: `Get In Touch`,
      followMe:   `Follow Me`,
    },
    form: {
      name:    `Name`,
      email:   `Email`,
      message: `Message`,
      send:    `Send Message`,
    },
  },

  footer: {
    copyright: `© 2025 Ayush Singh. All rights reserved.`,
  },
};

export { e as t };
```

---

## Step 3 — Upgrade `Portfolio.jsx`

File: `src/components/Portfolio.jsx`

Full replacement. Key changes:
- `ProjectScreenshot` now accepts a local `image` prop — no more mandatory thum.io dependency
- Fallback chain: local WebP → thum.io → styled error state
- `metric` line added above tech chips
- Alternating layout (odd projects swap image/text columns) preserved

```jsx
// src/components/Portfolio.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fadeIn, staggerContainer } from '../utils/animations';

// ─── Screenshot component ────────────────────────────────────────────────────
const ProjectScreenshot = ({ url, title, image }) => {
  const [status, setStatus] = useState('loading');

  // Priority: local WebP → thum.io fallback
  const primarySrc = image || null;
  const thumSrc    = `https://image.thum.io/get/width/800/crop/450/noanimate/${url}`;

  const handlePrimaryError = () => {
    // If the local image fails, try thum.io
    if (primarySrc) {
      setStatus('thum-fallback');
    } else {
      setStatus('errored');
    }
  };

  return (
    <div className="relative w-full h-80 bg-gray-900 overflow-hidden rounded-lg">

      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse">
          <div className="absolute bottom-6 left-6 space-y-2">
            <div className="w-32 h-3 bg-gray-700 rounded" />
            <div className="w-20 h-2 bg-gray-800 rounded" />
          </div>
        </div>
      )}

      {/* Styled error state — not just an icon */}
      {status === 'errored' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 border border-gray-800">
          <div className="flex flex-wrap gap-2 px-8 justify-center opacity-30">
            {['LangChain', 'RAG', 'Agents', 'LLM', 'FAISS'].map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-gray-400 border border-gray-700 px-3 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            {title}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-gray-500 hover:text-white transition-colors border border-gray-700 px-3 py-1 rounded"
          >
            VISIT SITE →
          </a>
        </div>
      )}

      {/* Primary image (local WebP) */}
      {primarySrc && status !== 'thum-fallback' && (
        <img
          src={primarySrc}
          alt={`Screenshot of ${title}`}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setStatus('loaded')}
          onError={handlePrimaryError}
        />
      )}

      {/* Fallback image (thum.io) */}
      {(!primarySrc || status === 'thum-fallback') && (
        <img
          src={thumSrc}
          alt={`Screenshot of ${title}`}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('errored')}
        />
      )}
    </div>
  );
};

// ─── Portfolio section ───────────────────────────────────────────────────────
const Portfolio = () => {
  const { texts } = useLanguage();

  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-32 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
            {texts.portfolio.title}
          </p>
          <h2 className="text-6xl lg:text-8xl font-display font-light text-white mb-10 leading-none tracking-tight text-balance">
            {texts.portfolio.headline}
          </h2>
          <div className="w-24 h-px bg-white/30" />
        </motion.div>

        {/* Projects */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-32"
        >
          {texts.portfolio.projects.map((project, index) => (
            <motion.div key={index} variants={fadeIn} className="group">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Screenshot */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.div
                    className="relative overflow-hidden rounded-lg bg-gray-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                  >
                    <ProjectScreenshot
                      url={project.link}
                      title={project.title}
                      image={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  {/* Title */}
                  <div>
                    <p className="text-sm font-mono text-gray-500 mb-2">
                      {texts.portfolio.projectLabel}
                    </p>
                    <h3 className="text-4xl lg:text-5xl font-display font-light text-white mb-6 tracking-tight text-balance">
                      {project.title}
                    </h3>
                    <div className="w-16 h-px bg-white/30 mb-6" />
                  </div>

                  {/* Description */}
                  <p className="text-xl text-gray-300 font-light leading-relaxed text-pretty">
                    {project.description}
                  </p>

                  {/* Impact metric */}
                  {project.metric && (
                    <p className="text-xs font-mono text-gray-500 border-l-2 border-gray-700 pl-4 py-1 leading-relaxed">
                      {project.metric}
                    </p>
                  )}

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-2 rounded hover:border-gray-700 hover:text-gray-400 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-8 pt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="group/link flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-mono">
                        {texts.portfolio.links.viewProject}
                      </span>
                      <div className="w-8 h-px bg-white group-hover/link:w-12 transition-all duration-300" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title} on GitHub`}
                      className="text-sm font-mono text-gray-500 hover:text-white transition-colors duration-300"
                    >
                      {texts.portfolio.links.github}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
```

---

## Step 4 — Update `About.jsx`

File: `src/components/About.jsx`

The only change is adding a third stat card for **deployments** and updating the headline to match your GenAI identity. This also switches from "Creating Digital Experiences" to "Building Intelligent Systems".

```jsx
// src/components/About.jsx
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fadeIn } from '../utils/animations';

const About = () => {
  const { texts } = useLanguage();

  return (
    <section id="about" className="py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
              {texts.about.title}
            </p>
            <h2 className="text-6xl lg:text-8xl font-display font-light mb-10 leading-none tracking-tight">
              <span className="block text-white text-balance">{texts.about.headline.line1}</span>
              <span className="block text-gray-500 text-balance">{texts.about.headline.line2}</span>
              <span className="block text-white text-balance">{texts.about.headline.line3}</span>
            </h2>
            <div className="w-24 h-px bg-white/30 mb-8" />
          </motion.div>

          {/* Right — description, stats, CTA */}
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 font-light leading-relaxed text-pretty max-w-2xl">
              {texts.about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h3 className="text-4xl font-display font-light text-white mb-3 tracking-tight">
                  {texts.about.stats.experience.number}
                </h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                  {texts.about.stats.experience.label}
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-light text-white mb-3 tracking-tight">
                  {texts.about.stats.projects.number}
                </h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                  {texts.about.stats.projects.label}
                </p>
              </div>
            </div>

            {/* Impact callout */}
            <div className="border border-gray-800 rounded-lg p-4 mt-2">
              <p className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">
                Key outcome
              </p>
              <p className="text-sm text-gray-300 font-light">
                ~30% hallucination reduction across 5+ production LLM deployments
                at Infosys — serving financial and enterprise clients on Azure &amp; AWS.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <a
                href="#contact"
                aria-label="Get in touch for collaboration"
                className="group inline-flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
              >
                <span className="text-sm font-mono">{texts.about.cta}</span>
                <div className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
```

---

## Step 5 — Add `Experience.jsx`

Create new file: `src/components/Experience.jsx`

This section sits between `About` and `Brands` in the page order.

```jsx
// src/components/Experience.jsx
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/animations';

const roles = [
  {
    company:  'Infosys Limited',
    title:    'Generative AI Developer (System Engineer — AI/ML)',
    period:   'Nov 2022 – Present',
    location: 'Delhi, India',
    highlights: [
      'Designed end-to-end RAG pipelines — document ingestion, semantic chunking, embedding generation (OpenAI, Sentence Transformers), vector indexing (FAISS, Azure AI Search, Pinecone), hybrid retrieval, re-ranking, and grounding — reducing hallucinations by ~30% across 5+ production LLM deployments.',
      'Architected multi-agent systems using LangChain, LangGraph, CrewAI, and AutoGen with planning loops, reflection cycles, MCP Server integrations, and configurable human-escalation thresholds for autonomous multi-step reasoning workflows.',
      'Fine-tuned foundation models (Zephyr-7B) on proprietary enterprise datasets using LoRA/PEFT via Hugging Face Transformers (PyTorch); deployed optimised checkpoints to production endpoints.',
      'Built GenAI evaluation frameworks using DeepEval, Ragas, and LangSmith tracking task success rate, trajectory quality, answer faithfulness, and context recall; implemented automated regression harnesses and A/B testing pipelines.',
      'Implemented safety layers including guardrails, policy enforcement, action-scoped permissioning, and hallucination detection; conducted systematic red-teaming and built human-in-the-loop escalation logic.',
      'Deployed containerised and serverless GenAI microservices on AWS and Azure with CI/CD, HA/DR failover, rate limiting, and cost controls.',
    ],
    tech: [
      'Azure OpenAI', 'Amazon Bedrock', 'LangChain', 'LangGraph',
      'CrewAI', 'AutoGen', 'FAISS', 'Pinecone', 'DeepEval', 'Ragas',
      'LoRA/PEFT', 'Docker', 'AWS', 'Azure',
    ],
  },
];

const Experience = () => (
  <section id="experience" className="py-32 bg-transparent">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">

      {/* Section header */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mb-20"
      >
        <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">EXPERIENCE</p>
        <h2 className="text-6xl lg:text-8xl font-display font-light text-white mb-10 leading-none tracking-tight">
          Work History
        </h2>
        <div className="w-24 h-px bg-white/30" />
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-20"
      >
        {roles.map((role, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
          >
            {/* Left — company meta */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2">
                  {role.period}
                </p>
                <h3 className="text-2xl font-light text-white mb-1">{role.company}</h3>
                <p className="text-sm text-gray-500 font-mono">{role.location}</p>
              </div>
            </div>

            {/* Right — role details */}
            <div className="lg:col-span-9">
              <p className="text-sm font-mono text-gray-400 mb-8 border-b border-gray-900 pb-4">
                {role.title}
              </p>

              <ul className="space-y-4 mb-8">
                {role.highlights.map((h, j) => (
                  <li key={j} className="flex gap-4 text-gray-300 font-light leading-relaxed">
                    <span className="text-gray-700 mt-1.5 shrink-0 text-xs">◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-900">
                {role.tech.map((t) => (
                  <motion.span
                    key={t}
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ duration: 0.15 }}
                    className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-1.5 rounded hover:border-gray-700 hover:text-gray-400 transition-colors cursor-default"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Experience;
```

---

## Step 6 — Wire Experience into `App.jsx`

File: `src/App.jsx`

Add the import and place the `<Experience />` component between `<About />` and `<Brands />`:

```jsx
// src/App.jsx — add this import at the top with the other component imports
import Experience from './components/Experience';

// Inside the JSX return, update the section order:
return (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Experience />      {/* ← NEW — add between About and Brands */}
      <Brands />
      <Skills />
      <Certifications />
      <Portfolio />
      <Contact />
    </main>
    <Footer />
    <BottomNav />
    <Chatbot />
  </>
);
```

Also update the nav links in `index-WNRF5uM4.js` (or wherever your `Navbar` component is built) to include experience:

```js
// In your Navbar component, update the nav items array:
const navItems = [
  { key: 'home',       href: '#hero' },
  { key: 'about',      href: '#about' },
  { key: 'experience', href: '#experience' },   // ← add
  { key: 'skills',     href: '#skills' },
  { key: 'portfolio',  href: '#portfolio' },
  { key: 'contact',    href: '#contact' },
];
```

And add `experience: 'Experience'` to the `nav` key in `en.js`.

---

## Step 7 — RAG Chatbot Backend

> **Important:** Your server runs Python (`python -m uvicorn app:app --app-dir server`), not Node.js.  
> All backend code below is Python/FastAPI.

### 7a — Install dependencies

Create or update `server/requirements.txt`:

```txt
fastapi==0.115.0
uvicorn[standard]==0.30.6
python-dotenv==1.0.1
langchain==0.3.7
langchain-core==0.3.15
langchain-google-genai==2.0.4
langchain-community==0.3.5
pypdf==4.3.1
faiss-cpu==1.9.0
sentence-transformers==3.2.1
python-multipart==0.0.12
```

Install:

```bash
cd server
pip install -r requirements.txt
```

### 7b — Environment file

`server/.env`:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

Get a free key (no billing required): https://aistudio.google.com/apikey

### 7c — RAG module

Create `server/rag.py`:

```python
# server/rag.py
"""
RAG pipeline grounded on Resume.pdf.
Uses Google Gemini for both embeddings and generation.
Supports bilingual responses (English + Hindi).
"""

from __future__ import annotations

import os
import re
import logging
from pathlib import Path
from typing import AsyncIterator

from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

load_dotenv()

logger = logging.getLogger(__name__)

# ─── Paths ────────────────────────────────────────────────────────────────────
_SERVER_DIR = Path(__file__).parent
_RESUME_PDF = _SERVER_DIR.parent / "public" / "Resume.pdf"

# ─── Module-level vector store (loaded once on startup) ───────────────────────
_vector_store: FAISS | None = None


def _build_prompt(language: str) -> ChatPromptTemplate:
    if language == "hi":
        system = (
            "आप आयुष सिंह के पोर्टफोलियो असिस्टेंट हैं। "
            "नीचे दिए गए रिज्यूमे संदर्भ और चैट इतिहास के आधार पर प्रश्नों का उत्तर दें। "
            "उत्तर संक्षिप्त, सटीक और सहायक होने चाहिए। "
            "यदि उत्तर संदर्भ में नहीं है, तो स्पष्ट रूप से बताएं।\n\n"
            "रिज्यूमे संदर्भ:\n{context}\n\n"
            "चैट इतिहास:\n{history}"
        )
    else:
        system = (
            "You are Ayush Singh's portfolio AI assistant. "
            "Answer questions about Ayush's professional background, skills, projects, "
            "and experience based only on the resume context and chat history provided. "
            "Be concise, specific, and helpful. "
            "If the answer isn't in the context, say so honestly. "
            "When asked about projects, mention the live URLs. "
            "When the user asks to download the resume, include [RESUME_DOWNLOAD] at the end of your response. "
            "When the user asks to send an email, include [EMAIL_COMPOSE] at the end. "
            "When directing to a section, include [SCROLL_TO_SECTION] where SECTION is "
            "PORTFOLIO, SKILLS, or CONTACT.\n\n"
            "Resume context:\n{context}\n\n"
            "Chat history:\n{history}"
        )

    return ChatPromptTemplate.from_messages([
        ("system", system),
        ("human", "{question}"),
    ])


async def init_rag() -> None:
    """Load Resume.pdf, chunk it, embed it, and build the FAISS store."""
    global _vector_store

    if not _RESUME_PDF.exists():
        logger.warning(f"Resume PDF not found at {_RESUME_PDF}. Chatbot will use fallback responses.")
        return

    logger.info("Initialising RAG pipeline from %s", _RESUME_PDF)

    loader = PyPDFLoader(str(_RESUME_PDF))
    docs   = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        separators=["\n\n", "\n", ".", " ", ""],
    )
    chunks = splitter.split_documents(docs)
    logger.info("Split into %d chunks", len(chunks))

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        google_api_key=os.environ["GOOGLE_API_KEY"],
    )

    _vector_store = await FAISS.afrom_documents(chunks, embeddings)
    logger.info("RAG pipeline ready ✓")


def _format_history(history: list[dict]) -> str:
    """Convert [{role, content}] to a readable string."""
    if not history:
        return "No prior conversation."
    lines = []
    for msg in history[-6:]:   # last 3 turns
        role = "User" if msg.get("role") == "user" else "Assistant"
        lines.append(f"{role}: {msg.get('content', '')}")
    return "\n".join(lines)


async def stream_rag_response(
    message: str,
    history: list[dict],
    language: str = "en",
) -> AsyncIterator[str]:
    """Yield text chunks as SSE-ready strings."""

    # ── Fallback when PDF wasn't loaded ───────────────────────────────────────
    if _vector_store is None:
        fallback = (
            "आयुष के पास Infosys में 3.5+ वर्षों का GenAI अनुभव है। "
            "LangChain, LangGraph, RAG और Cloud पर काम करते हैं।"
            if language == "hi"
            else
            "Ayush has 3.5+ years of GenAI experience at Infosys, specialising in "
            "RAG pipelines, agentic workflows (LangChain/LangGraph/CrewAI), and "
            "LLM fine-tuning on Azure and AWS."
        )
        yield fallback
        return

    # ── Retrieve relevant chunks ───────────────────────────────────────────────
    retriever   = _vector_store.as_retriever(search_kwargs={"k": 4})
    source_docs = await retriever.ainvoke(message)
    context     = "\n\n".join(doc.page_content for doc in source_docs)

    # ── Build chain ────────────────────────────────────────────────────────────
    llm    = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        google_api_key=os.environ["GOOGLE_API_KEY"],
        temperature=0.3,
        max_output_tokens=512,
        streaming=True,
    )
    prompt = _build_prompt(language)
    chain  = prompt | llm | StrOutputParser()

    # ── Stream chunks ──────────────────────────────────────────────────────────
    async for chunk in chain.astream({
        "context":  context,
        "history":  _format_history(history),
        "question": message,
    }):
        yield chunk
```

### 7d — Update `server/app.py`

Add the RAG startup and `/api/chat` endpoint to your existing FastAPI app.  
Find `server/app.py` and add the following (keep all existing routes intact):

```python
# server/app.py  — add these imports at the top
import asyncio
import json
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from rag import init_rag, stream_rag_response

logging.basicConfig(level=logging.INFO)

# ─── Lifespan: initialise RAG on startup ──────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_rag()
    yield

app = FastAPI(lifespan=lifespan)

# ─── CORS — allow Netlify frontend ────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",        # Vite dev
        "https://ayushsingh17.netlify.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Serve public/ folder (Resume.pdf, media, etc.) ───────────────────────────
app.mount("/public", StaticFiles(directory="../public"), name="public")


# ─── Request models ───────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message:  str
    history:  list[dict] = []
    language: str        = "en"

class ContactRequest(BaseModel):
    name:    str
    email:   str
    message: str


# ─── POST /api/chat — SSE streaming ───────────────────────────────────────────
@app.post("/api/chat")
async def chat(req: ChatRequest):
    async def generate():
        async for chunk in stream_rag_response(
            message=req.message,
            history=req.history,
            language=req.language,
        ):
            payload = json.dumps({"text": chunk}, ensure_ascii=False)
            yield f"data: {payload}\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control":               "no-cache",
            "X-Accel-Buffering":           "no",
            "Access-Control-Allow-Origin": "*",
        },
    )


# ─── POST /api/contact — keep your existing handler or add one ────────────────
@app.post("/api/contact")
async def contact(req: ContactRequest):
    # Replace with your actual email logic (e.g. SendGrid, SMTP, etc.)
    print(f"Contact from {req.name} <{req.email}>: {req.message}")
    return {"success": True}


# ─── Health check ─────────────────────────────────────────────────────────────
@app.get("/health")
async def health():
    return {"status": "ok"}
```

### 7e — Run locally

```bash
# Terminal 1 — backend
cd server
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 5000

# Terminal 2 — frontend
cd ..
npm run dev
```

Open the chatbot and ask: `"What are Ayush's skills?"` — you should get a response grounded in your Resume.pdf.

---

## Step 8 — Update Chatbot Frontend

File: `src/components/Chatbot.jsx`

The chatbot already calls `http://localhost:5000/api/chat` and handles SSE streaming correctly. The only change needed is to make the API URL configurable via environment variable so it works in production.

### 8a — Update the API base URL

Find this line near the top of `Chatbot.jsx`:

```js
// BEFORE
const API_BASE = `http://localhost:5000`;

// AFTER — reads from .env in dev, Netlify env var in production
const API_BASE = import.meta.env.VITE_API_URL || `http://localhost:5000`;
```

### 8b — Update root `.env`

File: `.env` (in project root, not in server/)

```env
VITE_API_URL=http://localhost:5000
```

File: `.env.production` (create this):

```env
VITE_API_URL=https://your-backend.onrender.com
```

### 8c — Update the fallback responses

In `Chatbot.jsx`, find the `getFallbackResponse` function (the `d` function in minified code) and update the project name from "NeuroMarket" to "CoCo":

```js
// Find and replace in the fallback function:
// BEFORE
"Key projects include an AI Agent Marketplace, an Ethereum Crypto Wallet..."

// AFTER
"Key projects: CoCo (multi-agent AI platform at coco17.netlify.app), " +
"an AI Chatbot with RAG + Voice, and an Ethereum Crypto Wallet. " +
"~30% hallucination reduction across 5+ production deployments at Infosys."
```

---

## Step 9 — GitHub Actions: Automated Screenshots

Create `.github/workflows/refresh-screenshots.yml`:

```yaml
name: Refresh project screenshots

on:
  schedule:
    - cron: '0 3 * * 1'      # Every Monday at 03:00 UTC
  workflow_dispatch:           # Manual trigger from GitHub Actions UI

permissions:
  contents: write              # Needed to commit screenshots back

jobs:
  screenshot:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Chromium
        run: npx playwright install chromium --with-deps

      - name: Capture screenshots
        run: node scripts/capture-screenshots.js

      - name: Install webp and convert
        run: |
          sudo apt-get install -y webp
          mkdir -p public/media/projects
          for f in public/media/projects/*.png; do
            [ -f "$f" ] || continue
            cwebp -q 85 "$f" -o "${f%.png}.webp"
            rm "$f"
          done

      - name: Commit if changed
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add public/media/projects/
          git diff --staged --quiet || git commit -m "chore: refresh project screenshots [skip ci]"
          git push
```

---

## Step 10 — Deploy Checklist

### Before every deploy

- [ ] Run `npm run build` locally — confirm no errors
- [ ] Open `dist/index.html` in browser via `npm run preview`
- [ ] Verify all three project screenshots load (check Network tab — should be 200 from `/media/projects/*.webp`)
- [ ] Open chatbot and test: `"What are your skills?"` → should cite your resume
- [ ] Test Hindi toggle — chatbot should respond in Hindi

### Content-only fixes (no build needed in source, but rebuild after)

| Item | File | Change |
|---|---|---|
| Hero title | `src/locales/en.js` | `hero.title` |
| Hero subtitle | `src/locales/en.js` | `hero.subtitle` |
| About description | `src/locales/en.js` | `about.description` |
| Stats | `src/locales/en.js` | `about.stats` |
| Projects (all 3) | `src/locales/en.js` | `portfolio.projects` |
| Cert issuer fix | `src/locales/en.js` | `certifications.items[3].issuer` → `Infosys` |
| Resume PDF | `public/Resume.pdf` | Replace with `Singh_Ayush_Resume_6th_April_2026.pdf` |
| Footer year | `src/locales/en.js` | `footer.copyright` → 2025 |

### Component changes (rebuild required)

| Item | File |
|---|---|
| Screenshot component | `src/components/Portfolio.jsx` |
| Impact metric line | `src/components/Portfolio.jsx` |
| About stats + callout | `src/components/About.jsx` |
| Experience section (new) | `src/components/Experience.jsx` |
| App.jsx wiring | `src/App.jsx` |
| Chatbot API URL | `src/components/Chatbot.jsx` |

### Backend changes

| Item | File |
|---|---|
| RAG module | `server/rag.py` (new) |
| FastAPI routes | `server/app.py` |
| Dependencies | `server/requirements.txt` |
| API key | `server/.env` |

### Netlify environment variables to set

In Netlify dashboard → **Site settings → Environment variables**:

```
VITE_API_URL = https://your-backend.onrender.com
```

### Render (backend) environment variables to set

In Render dashboard → **Environment**:

```
GOOGLE_API_KEY = your_gemini_api_key_here
```

### Deploy order

```
Step 1:  Capture screenshots → commit to public/media/projects/
Step 2:  Update en.js content → commit
Step 3:  Update Portfolio.jsx, About.jsx → commit
Step 4:  Add Experience.jsx → update App.jsx → commit
Step 5:  Push → Netlify auto-deploys frontend
Step 6:  Add server/rag.py, update server/app.py → push
Step 7:  Deploy backend to Render → copy URL
Step 8:  Set VITE_API_URL in Netlify → trigger redeploy
Step 9:  Add GitHub Actions workflow → push
```

---

## Reference: File Locations

```
portfolio-page/
├── public/
│   ├── Resume.pdf                        ← replace with Apr 2026 version
│   └── media/
│       ├── companies/
│       │   └── infosys.svg               ← already exists ✓
│       └── projects/                     ← create this folder
│           ├── coco.webp                 ← Step 1
│           ├── chatbot.webp              ← Step 1
│           └── crypto.webp              ← Step 1
├── scripts/
│   └── capture-screenshots.js           ← Step 1
├── src/
│   ├── locales/
│   │   └── en.js                        ← Step 2 (full replacement)
│   ├── components/
│   │   ├── Portfolio.jsx                ← Step 3
│   │   ├── About.jsx                    ← Step 4
│   │   ├── Experience.jsx               ← Step 5 (new)
│   │   └── Chatbot.jsx                  ← Step 8
│   └── App.jsx                          ← Step 6
├── server/
│   ├── rag.py                           ← Step 7c (new)
│   ├── app.py                           ← Step 7d (updated)
│   └── requirements.txt                 ← Step 7a
├── .env                                 ← Step 8b
├── .env.production                      ← Step 8b (new)
└── .github/
    └── workflows/
        └── refresh-screenshots.yml      ← Step 9 (new)
```

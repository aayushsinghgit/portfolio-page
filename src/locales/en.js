// src/locales/en.js
var e = {
  nav: {
    home: `Home`,
    about: `About`,
    experience: `Experience`,
    skills: `Skills`,
    portfolio: `Portfolio`,
    blog: `Blog`,
    contact: `Contact`,
  },

  hero: {
    greeting: `Hi, I'm`,
    name: `Ayush Singh`,
    title: `Generative AI Developer · LLM Systems · RAG & Agentic Architecture`,
    subtitle: `3.5+ years building production-grade LLM apps — RAG pipelines, multi-agent workflows (LangChain · LangGraph · CrewAI), LLM fine-tuning (LoRA/PEFT), and AI evaluation — on Azure, AWS, and GCP.`,
    scrollPrompt: `Scroll to explore`,
    downloadResume: `Download Resume`,
  },

  about: {
    title: `About Me`,
    description: `Generative AI Developer at Infosys with 3.5+ years of experience designing and shipping production-grade LLM applications. I design retrieval-augmented generation (RAG) pipelines for healthcare support teams, combining LangChain and vector DBs like FAISS to reduce triage time by 40%. My expertise spans agentic workflow design (LangGraph, CrewAI), LLM fine-tuning (LoRA/PEFT) on enterprise datasets, and building evaluation harnesses that have achieved a measurable ~30% hallucination reduction across 5+ production deployments.`,
    headline: {
      line1: `Building`,
      line2: `Intelligent`,
      line3: `Systems`,
    },
    stats: {
      experience: { number: `3.5+`, label: `Years Experience` },
      deployments: { number: `5+`, label: `Production Deployments` },
    },
    cta: `LET'S WORK TOGETHER`,
  },

  experience: {
    title: `Work History`,
    subtitle: `EXPERIENCE`,
    roles: [
      {
        company: `Infosys Limited`,
        badge: `Current`,
        title: `Generative AI Developer · System Engineer — AI/ML`,
        period: `Nov 2022 – Present`,
        location: `Delhi, India`,
        highlights: [
          { label: `RAG Pipeline Architecture`, text: `Designed end-to-end RAG pipelines for healthcare support teams, combining LangChain and vector DBs like FAISS to reduce triage time by 40%. Reduced hallucinations by ~30% across 5+ production LLM deployments.` },
          { label: `Agentic Workflow Design`, text: `Architected multi-agent systems using LangChain, LangGraph, CrewAI, and AutoGen with planning loops, reflection cycles, and configurable human-escalation thresholds.` },
          { label: `LLM App Development`, text: `Built production-grade LLM applications on Azure OpenAI Service and Amazon Bedrock; implemented prompt engineering patterns (CoT, few-shot), structured outputs, and function calling.` },
          { label: `LLM Fine-Tuning`, text: `Fine-tuned foundation models (Zephyr-7B and others) on proprietary enterprise datasets using LoRA/PEFT via Hugging Face Transformers.` },
          { label: `Evaluation Frameworks`, text: `Built GenAI evaluation frameworks using DeepEval, Ragas, and LangSmith tracking task success rate, answer faithfulness, and context recall.` },
          { label: `Safety & Governance`, text: `Implemented guardrails, policy enforcement, and hallucination detection; conducted systematic red-teaming for regulated enterprise environments.` },
        ],
        tech: [`Azure OpenAI`, `Amazon Bedrock`, `LangChain`, `LangGraph`, `CrewAI`, `AutoGen`, `FAISS`, `Pinecone`, `DeepEval`, `Ragas`, `LangSmith`, `LoRA/PEFT`, `Docker`, `AWS`, `Azure`, `GCP`],
      },
    ],
  },

  brands: {
    title: `Companies I Worked With`,
    subtitle: `TRUSTED BY LEADING COMPANIES`,
  },

  skills: {
    title: `Skills & Technologies`,
    headline: { line1: `Technical`, line2: `Expertise` },
    description: `Specialised in production-grade Generative AI — from RAG pipeline engineering and agentic workflow design through LLM evaluation, safety, and cloud-native deployment.`,
    categories: {
      ml_deep_learning: `ML / Fine-Tuning`,
      llm_genai: `LLM & GenAI`,
      agentic_frameworks: `Agentic Frameworks`,
      rag_retrieval: `RAG & Retrieval`,
      mlops_eval: `MLOps & Evaluation`,
      safety_governance: `Safety & Governance`,
      cloud_dev: `Cloud & Dev`,
    },
  },

  certifications: {
    title: `Certifications`,
    subtitle: `CREDENTIALS`,
    headline: { line1: `Certified`, line2: `Excellence` },
    description: `Continuous learning and professional development through industry-recognised certifications.`,
    loadMore: `LOAD MORE`,
    items: [
      {
        title: `Generative AI Developer`,
        issuer: `Infosys`,
        date: `Earned Jan 2024`,
        id: `INF-GAI-771`,
        link: `https://infosys.com`,
        logo: `/media/companies/infosys.svg`,
      },
      {
        title: `OpenAI API Developer`,
        issuer: `Internshala`,
        date: `Earned Dec 2023`,
        id: `INT-OAI-827`,
        link: `https://internshala.com`,
        logo: `https://cdn.simpleicons.org/openai/black`,
      },
      {
        title: `Python Developer`,
        issuer: `Infosys`,
        date: `Earned Oct 2023`,
        id: `INF-PY-928`,
        link: `https://infosys.com`,
        logo: `/media/companies/infosys.svg`,
      },
      {
        title: `Data Consultant`,
        issuer: `Infosys`,
        date: `Earned Aug 2023`,
        id: `INF-DC-442`,
        link: `https://infosys.com`,
        logo: `/media/companies/infosys.svg`,
      },
    ],
  },

  portfolio: {
    title: `Featured Projects`,
    headline: `Selected Work`,
    projectLabel: `PROJECT`,
    links: { viewProject: `VIEW PROJECT`, github: `GITHUB` },
    projects: [
      {
        title: `NeuroMarket — Agentic AI SaaS Platform`,
        description: `Full-stack multi-agent platform with planning loops, tool calling, and MCP Server integrations. Modular per-agent on/off control with progressive autonomy UX. Built evaluation hooks tracking task success and trajectory quality.`,
        tech: [`LangChain`, `LangGraph`, `CrewAI`, `MCP Servers`, `Node.js`, `React.js`, `Tailwind CSS`, `Netlify`],
        link: `https://neuromarket17.netlify.app/`,
        github: `https://github.com/aayushsinghgit`,
        image: `https://image.thum.io/get/width/1200/crop/800/noanimate/https://neuromarket17.netlify.app/`,
        metric: `Multi-agent · Planning loops · ~25% efficiency gain in workflow automation`,
        caseStudy: {
          problem: `Fragmented agent orchestration and lack of human-in-the-loop control for complex autonomous tasks.`,
          solution: `Implemented an event-driven architecture using LangGraph for cyclic multi-agent reasoning and a progressive autonomy dashboard.`,
          outcome: `Enabled reliable autonomous task execution with 90%+ success rate on standard evaluation benchmarks.`,
        },
      },
      {
        title: `AI Chatbot — LLM + RAG + Voice`,
        description: `End-to-end RAG pipeline with FAISS vector indexing, hybrid retrieval, re-ranking, hallucination detection, and confidence calibration. Fine-tuned on Zephyr-7B-Beta via Hugging Face. Real-time voice interface via Web Speech API.`,
        tech: [`Zephyr-7B`, `LangChain`, `FAISS`, `Sentence Transformers`, `Web Speech API`, `JavaScript`, `Netlify`],
        link: `https://ayushsingh17.netlify.app`,
        github: `https://github.com/aayushsinghgit/portfolio-page`,
        image: `https://image.thum.io/get/width/1200/crop/800/noanimate/https://ayushsingh17.netlify.app`,
        metric: `~30% hallucination reduction · Voice + text sessions · Serverless RAG`,
        caseStudy: {
          problem: `High latency and hallucination rates in generic RAG implementations for specific domain queries.`,
          solution: `Implemented hybrid search (BM25 + Semantic) and a cross-encoder re-ranker to improve context recall and precision.`,
          outcome: `Reduced hallucination rate by ~30% and improved response relevance by 45% based on human-eval.`,
        },
      },
      {
        title: `Crypto Wallet — Ethereum dApp`,
        description: `Decentralised Ethereum wallet with Solidity smart contracts, wallet authentication, balance tracking, and full transaction history. Demonstrates full-stack engineering breadth beyond AI.`,
        tech: [`Solidity`, `Web3.js`, `Node.js`, `React.js`, `Ethereum`],
        link: `https://cryptowallet17.netlify.app`,
        github: `https://github.com/aayushsinghgit`,
        image: `https://image.thum.io/get/width/1200/crop/800/noanimate/https://cryptowallet17.netlify.app`,
        metric: `On-chain · Smart contracts · Secure transaction execution`,
        caseStudy: {
          problem: `Security vulnerabilities and poor UX in standard Web3 wallet implementations.`,
          solution: `Architected a clean React interface integrated with Ethers.js and custom Solidity contracts for secure asset management.`,
          outcome: `Successfully deployed on testnet with 100% transaction integrity and seamless wallet connectivity.`,
        },
      },
    ],
  },

  testimonials: {
    title: `Social Proof`,
    subtitle: `TESTIMONIALS`,
    items: [
      {
        quote: `Ayush's expertise in RAG architectures and agentic systems was instrumental in our recent AI deployment. His focus on metrics and hallucination reduction sets him apart as a true GenAI engineer.`,
        author: `Senior Manager`,
        company: `Infosys`,
        link: `https://linkedin.com/in/aayush-singh-172992220`,
      },
      {
        quote: `A proactive developer who doesn't just build with tools but thinks about the end product and user impact. His work on CoCo shows a deep understanding of multi-agent workflows.`,
        author: `Project Lead`,
        company: `Client Project`,
        link: `https://linkedin.com/in/aayush-singh-172992220`,
      },
    ],
  },

  blog: {
    title: `Thought Leadership`,
    subtitle: `BLOG`,
    items: [
      {
        title: `Architecting Reliable RAG Pipelines for Enterprise`,
        date: `Mar 2024`,
        description: `Deep dive into hybrid retrieval, re-ranking strategies, and evaluation harnesses that reduce hallucinations in production.`,
        link: `https://medium.com/@singhaayu311`,
        content: `
          <p>Building a RAG (Retrieval-Augmented Generation) system for an enterprise requires more than just connecting a vector database to an LLM. It requires a robust architecture designed for reliability, scalability, and safety.</p>
          <h3>1. Hybrid Retrieval</h3>
          <p>We combine semantic search (using embeddings) with keyword search (BM25) to ensure that we capture both contextual meaning and specific terminology. This is particularly important in domains like healthcare or legal where exact terms matter.</p>
          <h3>2. Re-ranking Strategies</h3>
          <p>Initial retrieval often returns "close" matches that might not be the most relevant. Implementing a cross-encoder re-ranker helps prioritize the documents that actually answer the user's query, significantly improving synthesis quality.</p>
          <h3>3. Evaluation Harnesses</h3>
          <p>You cannot improve what you cannot measure. We use DeepEval and Ragas to track metrics like context precision, faithfulness, and answer relevancy. This feedback loop allowed us to achieve a 30% reduction in hallucinations.</p>
        `,
      },
      {
        title: `The Future is Agentic: Building with LangGraph and CrewAI`,
        date: `Feb 2024`,
        description: `Exploring multi-agent orchestration, planning loops, and the transition from static prompts to autonomous agents.`,
        link: `https://medium.com/@singhaayu311`,
        content: `
          <p>The transition from single-prompt interactions to multi-agent workflows is the next frontier in AI development. Tools like LangGraph and CrewAI are making this complex orchestration manageable.</p>
          <h3>1. Planning Loops</h3>
          <p>Agents are no longer just executing; they are planning. By implementing reflection cycles, agents can review their own work and correct errors before presenting a final answer.</p>
          <h3>2. Modular Autonomy</h3>
          <p>In the CoCo platform, we implemented per-agent on/off control. This allows humans to decide exactly how much autonomy an agent has in a specific workflow, maintaining safety while maximizing efficiency.</p>
        `,
      },
    ],
  },

  contact: {
    title: `Get In Touch`,
    headline: { line1: `Let's Create`, line2: `Something Great` },
    description: `Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.`,
    info: {
      email: `singhaayu311@gmail.com`,
      phone: `+91 74618 79795`,
      location: `Dwarka, New Delhi – 110078 · Open to Relocation`,
      linkedin: `linkedin.com/in/aayush-singh-172992220`,
      portfolio: `ayushsingh17.netlify.app`,
      cryptoWallet: `cryptowallet17.netlify.app`,
    },
    sections: { getInTouch: `Get In Touch`, followMe: `Follow Me` },
    form: { name: `Name`, email: `Email`, message: `Message`, send: `Send Message` },
  },

  footer: {
    copyright: `© 2025 Ayush Singh. All rights reserved.`,
  },
};

export { e as t };
export default e;

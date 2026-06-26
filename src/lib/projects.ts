export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string;
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "ml-paper",
    title: "LLM Fusion Study",
    subtitle: "Empirical Research",
    description:
      "Empirical study comparing fused multi-model panels with judge aggregation against single frontier models. Python harness with OpenRouter integration, standard benchmarks (DRACO, GSM8K, GPQA, HumanEval), and run-level cost tracking.",
    tags: ["Python", "OpenRouter", "LLM Fusion", "Benchmarking"],
    category: "Research",
    githubUrl: "https://github.com/asjad3/ml-paper",
  },
  {
    slug: "vyro-thon",
    title: "Event Photo Retrieval API",
    subtitle: "Vector Search Backend",
    description:
      "Backend API for event photo discovery. Face detection and embedding with dlib, identity clustering via streaming centroids, pgvector cosine search, and selfie-based authentication. Deployed with Docker on Render.",
    tags: ["FastAPI", "pgvector", "Python", "Docker"],
    category: "Backend",
    githubUrl: "https://github.com/asjad3/vyro-thon",
  },
  {
    slug: "agentic-knowledge",
    title: "Knowledge Base + MCP Server",
    subtitle: "Agent Tooling",
    description:
      "Personal knowledge system with a custom MCP server, FTS5 full-text search, a tag and rules engine, and a PARA-organized markdown vault backed by SQLite.",
    tags: ["MCP", "Next.js", "SQLite", "FTS5"],
    category: "Agentic Systems",
    githubUrl: "https://github.com/asjad3/agentic-knowledge",
  },
  {
    slug: "landing-page-mcp",
    title: "MCP-Integrated Landing Page",
    subtitle: "Next.js + MCP",
    description:
      "Next.js landing page connected to MCP tooling. Prototype for exposing agent-accessible tools and context through a web interface.",
    tags: ["Next.js", "TypeScript", "MCP"],
    category: "Agentic Systems",
    githubUrl: "https://github.com/asjad3/landing-page-mcp",
  },
  {
    slug: "mcp-imagineart",
    title: "MCP Server in Go",
    subtitle: "Protocol Implementation",
    description:
      "MCP server implementation in Go. Connects LLM clients to external tools and data sources over the Model Context Protocol.",
    tags: ["Go", "MCP"],
    category: "Agentic Systems",
    githubUrl: "https://github.com/asjad3/test-mcp-imagineart",
  },
  {
    slug: "expo-agentic-assistant",
    title: "Mobile LLM Assistant",
    subtitle: "React Native + Groq",
    description:
      "Expo mobile application with Groq-backed chat, Google Calendar and Gmail integration, Meet scheduling, voice input, and daily briefings.",
    tags: ["Expo", "React Native", "Groq", "Supabase"],
    category: "Mobile",
    githubUrl: "https://github.com/asjad3/expo-agentic-assistant-app",
  },
  {
    slug: "voice-journaling",
    title: "Voice Journaling App",
    subtitle: "Whisper + PostgreSQL",
    description:
      "React Native journaling app with OpenAI Whisper transcription, sentiment analysis, weekly summaries, and streak tracking. Node.js and PostgreSQL backend.",
    tags: ["React Native", "OpenAI", "PostgreSQL", "Node.js"],
    category: "Mobile",
    githubUrl: "https://github.com/asjad3/stealthstartup",
  },
  {
    slug: "ecommerce-clone",
    title: "E-Commerce Storefront Clone",
    subtitle: "Next.js + Supabase",
    description:
      "Next.js storefront with infinite scroll, ISR caching, JSON-LD structured data, NextAuth authentication, Supabase backend, and Zustand state management.",
    tags: ["Next.js", "Supabase", "Zustand", "NextAuth"],
    category: "Web App",
    githubUrl: "https://github.com/asjad3/clone",
    liveUrl: "https://lootmartclone.vercel.app",
  },
  {
    slug: "campus-rumor-verification",
    title: "Campus Rumor Verification",
    subtitle: "NUST Hackathon",
    description:
      "Anonymous campus rumor verification platform with Bayesian trust scoring, cryptographic voting, evidence uploads, and Gemini-based content moderation.",
    tags: ["React", "Express", "Supabase", "Gemini"],
    category: "Hackathon",
    githubUrl: "https://github.com/asjad3/hackathon-app",
  },
];

export const skills = [
  "MCP Protocol", "Multi-Agent Orchestration", "RAG Pipelines",
  "Python", "TypeScript", "Go", "FastAPI", "Next.js", "Pydantic", "SQLAlchemy",
  "pgvector", "IVFFlat", "Cosine Retrieval", "FTS5", "Embedding Pipelines",
  "OpenRouter", "LLM Fusion", "Benchmarking",
  "Docker", "Render", "Git",
];

export const timeline = [
  {
    title: "AI and systems",
    description:
      "LLM fusion research, MCP server development, and vector search backends with FastAPI and pgvector.",
  },
  {
    title: "Full-stack development",
    description:
      "Web and mobile applications including e-commerce, integrated assistants, and hackathon projects. Next.js, Supabase, and React Native.",
  },
];

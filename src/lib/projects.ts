export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "omnichannel-commerce",
    title: "Omni-Channel Commerce",
    subtitle: "Full-Stack E-Commerce",
    description:
      "Next.js 16 storefront with infinite scroll, ISR caching, JSON-LD structured data, NextAuth + Supabase backend, and Zustand state management.",
    tags: ["Next.js", "Supabase", "Zustand", "NextAuth"],
    category: "E-Commerce",
    year: "2025",
    githubUrl: "https://github.com/asjad3/clone",
    liveUrl: "https://lootmartclone.vercel.app",
  },
  {
    slug: "campustrust",
    title: "CampusTrust",
    subtitle: "Rumor Verification",
    description:
      "Anonymous campus rumor verification with Bayesian trust scores, cryptographic voting, evidence uploads, and Gemini AI moderation. Built for a NUST hackathon.",
    tags: ["React", "Express", "Supabase", "Gemini"],
    category: "Web App",
    year: "2025",
    githubUrl: "https://github.com/asjad3/hackathon-app",
  },
  {
    slug: "astra",
    title: "Astra",
    subtitle: "AI Virtual Assistant",
    description:
      "AI mobile assistant with Google Calendar, Gmail integration, Meet creation, voice input, and daily briefings. Built with Expo and Groq LLM.",
    tags: ["Expo", "React Native", "Groq", "Supabase"],
    category: "Mobile App",
    year: "2025",
    githubUrl: "https://github.com/asjad3/expo-agentic-assistant-app",
  },
  {
    slug: "voicejournal",
    title: "VoiceJournal AI",
    subtitle: "Voice-First Journaling",
    description:
      "Voice journaling with OpenAI Whisper transcription, emotional analysis, weekly recaps, and streak tracking. React Native + Node.js + PostgreSQL.",
    tags: ["React Native", "Node.js", "OpenAI", "PostgreSQL"],
    category: "Mobile App",
    year: "2026",
    githubUrl: "https://github.com/asjad3/stealthstartup",
  },
  {
    slug: "agentic-knowledge",
    description:
      "Knowledge base with MCP server, FTS5 search, tags, rules engine, and a PARA-organized markdown vault. SQLite-backed with a complete design system.",
    title: "Agentic Knowledge",
    subtitle: "Knowledge Base + MCP",
    tags: ["Next.js", "SQLite", "MDX", "MCP"],
    category: "Web App",
    year: "2025",
    githubUrl: "https://github.com/asjad3/agentic-knowledge",
  },
  {
    slug: "nust-event-portal",
    title: "NUST Event Portal",
    subtitle: "Event Ticketing",
    description:
      "Event ticketing with QR codes, EasyPaisa/JazzCash payments, PDF tickets, and manager analytics dashboard.",
    tags: ["React", "Express", "MongoDB", "JWT"],
    category: "Web App",
    year: "2025",
    githubUrl: "https://github.com/asjad3/nust-h12-app",
  },
  {
    slug: "task-tracker",
    title: "Task Tracker",
    subtitle: "Productivity",
    description:
      "TypeScript task management app with clean UI and responsive design.",
    tags: ["TypeScript", "React", "Vercel"],
    category: "Web App",
    year: "2025",
    githubUrl: "https://github.com/asjad3/task-tracker",
  },
  {
    slug: "ghost-commits",
    title: "Ghost Commits",
    subtitle: "Chrome Extension",
    description:
      "Chrome extension for automated daily ghost commits. Manifest V3.",
    tags: ["Chrome Extension", "JavaScript", "GitHub API"],
    category: "Extension",
    year: "2025",
    githubUrl: "https://github.com/asjad3/ghost-commits",
  },
];

export const skills = [
  "TypeScript", "Next.js", "React", "Node.js", "Express",
  "Supabase", "PostgreSQL", "MongoDB", "SQLite", "MySQL",
  "Tailwind CSS", "Zustand", "React Query", "NextAuth",
  "React Native", "Expo", "Groq", "OpenAI", "Gemini",
  "Docker", "Vercel", "Git", "REST APIs", "GraphQL",
];

export const timeline = [
  {
    year: "2026",
    title: "AI & Agentic Systems",
    description: "Building AI-powered apps with Groq, OpenAI, and Gemini. VoiceJournal AI, Astra assistant, and agentic knowledge systems with MCP servers.",
  },
  {
    year: "2025",
    title: "Full-Stack & Hackathons",
    description: "Shipped e-commerce platform, CampusTrust hackathon project, NUST event platform. Focus on Next.js + Supabase stack with 6+ projects delivered.",
  },
];

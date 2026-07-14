import { NextRequest, NextResponse } from "next/server";

// ── StayKaro knowledge base — short, conversational responses ──────────────
// Rules: max ~60 words, max 2 paragraphs, max 3 bullets, end with 1 question.
// No URLs, emails, phone numbers, or nav anchors unless user explicitly asks.
const KNOWLEDGE: Record<string, { keywords: string[]; response: string }> = {

  greeting: {
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "sup", "howdy"],
    response: "Hi! 👋 I'm Karo, StayKaro's AI guide.\n\nI can help you explore our AI products, pricing, integrations, or book a demo.\n\nWhat are you looking to automate?",
  },

  // ── Products ──────────────────────────────────────────────────────────────
  aiCaller: {
    keywords: ["ai caller", "caller agent", "voice ai", "ai phone", "voice call", "inbound call", "outbound call", "automated call", "call agent", "phone agent", "call handling", "ai calling"],
    response: "Our AI Caller Agent handles inbound and outbound calls 24/7 with human-like quality — qualifying leads, booking appointments, and following up automatically.\n\nIs your main goal sales calls, customer support, or lead qualification?",
  },

  lms: {
    keywords: ["lms", "learning management", "training platform", "course", "education", "ai tutor", "tutor", "student", "learning", "e-learning", "elearning", "certification", "assessment", "knowledge"],
    response: "Our LMS is an AI-powered learning platform with a personal AI tutor, automated assessments, certifications, and real-time progress tracking.\n\nAre you looking for an LMS for a college, training institute, or business?",
  },

  ops: {
    keywords: ["ops", "operations platform", "ops platform", "workflow automation", "kanban", "team management", "process automation", "command centre", "operations", "operational", "business ops"],
    response: "Our OPS Platform is an AI-powered command centre — with kanban boards, workflow automation, and real-time team performance monitoring.\n\nWhat part of your operations are you looking to streamline?",
  },

  customAgents: {
    keywords: ["custom ai", "custom agent", "bespoke", "custom build", "build for me", "agentic workflow", "autonomous", "internal copilot", "internal tool", "specific", "unique", "tailored", "custom automation"],
    response: "We build fully custom AI agents tailored to your workflows — from lead qualification bots to internal copilots and multi-step agentic systems.\n\nWhat kind of workflow are you looking to automate?",
  },

  allProducts: {
    keywords: ["all products", "product", "what do you offer", "what do you sell", "what do you build", "services", "what can you do", "offerings"],
    response: "StayKaro offers 4 core AI products:\n• AI Caller Agent — voice AI for calls and lead qualification\n• LMS Platform — AI-powered learning with a personal tutor\n• OPS Platform — workflow automation and team management\n• Custom AI Agents — bespoke agents for any use case\n\nWhich one sounds most relevant to you?",
  },

  // ── Process ───────────────────────────────────────────────────────────────
  process: {
    keywords: ["how does it work", "how do you work", "process", "steps", "6 steps", "discovery", "build process", "how it works", "workflow", "procedure"],
    response: "We follow 6 steps: Discover → Design → Deploy → Integrate → Train → Scale.\n\nMost clients go live in 7 days.\n\nWould you like to know more about any specific step?",
  },

  deployment: {
    keywords: ["how long", "timeline", "7 days", "deployment", "live in", "how fast", "speed", "quick", "fast", "turnaround", "launch"],
    response: "We guarantee going live in 7 days — it's in our contract, not just a marketing claim.\n\nDiscovery and build take Days 1–4; testing and go-live happen Days 5–7.\n\nWant to know what the discovery session looks like?",
  },

  // ── Integrations ──────────────────────────────────────────────────────────
  integrations: {
    keywords: ["integration", "connect", "salesforce", "hubspot", "whatsapp", "slack", "gmail", "zoho", "twilio", "freshdesk", "razorpay", "tally", "google sheets", "api", "webhook", "crm", "tools", "stack", "existing"],
    response: "StayKaro connects with 50+ tools out of the box — including WhatsApp, Salesforce, HubSpot, Zoho, Gmail, Slack, Twilio, and more.\n\nNo rip-and-replace needed — we work with your existing stack.\n\nIs there a specific tool you need to integrate?",
  },

  // ── Results & ROI ─────────────────────────────────────────────────────────
  results: {
    keywords: ["result", "roi", "return on investment", "outcome", "case study", "proof", "metric", "data", "stat", "before after", "improvement", "benefit", "numbers", "performance"],
    response: "Clients typically see faster response times, higher lead conversion, and significantly lower operational costs after deploying StayKaro.\n\nWould you like specific numbers, or are you curious about results for your particular use case?",
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  pricing: {
    keywords: ["price", "pricing", "cost", "how much", "charge", "fee", "rate", "subscription", "plan", "payment", "budget", "affordable", "quote", "estimate", "invoice"],
    response: "Pricing is custom — it depends on your use case, agent type, integrations, and volume.\n\nThe best next step is a free 30-minute audit where we scope your requirements and give an accurate estimate.\n\nWant to book one?",
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    keywords: ["contact", "reach", "phone", "email", "whatsapp", "talk to", "speak", "call you", "get in touch", "support", "team", "sales", "address", "location", "office", "hyderabad", "india"],
    response: "You can reach the StayKaro team by phone, WhatsApp, or email — available Mon–Fri, 9am–7pm IST.\n\nWould you like the contact details, or shall I help you book a demo instead?",
  },

  // ── Book demo ─────────────────────────────────────────────────────────────
  demo: {
    keywords: ["demo", "book", "schedule", "free audit", "free consultation", "trial", "free call", "sign up", "get started", "start", "consultation", "appointment", "meeting", "free demo", "try"],
    response: "A free 30-minute demo includes a workflow audit, live platform walkthrough, and a custom ROI estimate — with a commitment to go live in 7 days.\n\nShall I help you set one up?",
  },

  // ── Security ──────────────────────────────────────────────────────────────
  security: {
    keywords: ["security", "safe", "secure", "privacy", "data", "gdpr", "compliance", "encrypt", "confidential", "protection", "rbac", "audit log"],
    response: "All StayKaro products include end-to-end encryption, role-based access control, full audit logs, and GDPR compliance.\n\nIs there a specific security requirement you're trying to meet?",
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    keywords: ["about", "who are you", "what is staykaro", "what do you do", "company", "founded", "mission", "vision", "who", "background", "history"],
    response: "StayKaro builds AI agents that automate the most time-consuming parts of running a business — calls, operations, and learning.\n\nWe're based in Hyderabad and have deployed systems for 50+ businesses, typically live in 7 days.\n\nWhat would you like to know more about?",
  },

  // ── Two missions ──────────────────────────────────────────────────────────
  missions: {
    keywords: ["two missions", "student", "enterprise", "business vs student", "b2b", "coming soon", "student platform"],
    response: "StayKaro has two tracks:\n• Enterprise AI — custom agents, LMS, and OPS for businesses\n• Student Platform — AI-powered learning for institutions (coming soon)\n\nWhich track are you interested in?",
  },

  // ── Website navigation ────────────────────────────────────────────────────
  navigation: {
    keywords: ["where", "navigate", "find", "section", "scroll", "page sections", "website", "layout", "menu", "navigate to", "go to", "page"],
    response: "The website covers our AI products, integrations ecosystem, how the process works, real case studies, future vision, and a demo booking form at the bottom.\n\nWhat section would you like to know more about?",
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: {
    keywords: ["faq", "frequently asked", "common question", "question and answer", "q and a", "qa"],
    response: "Quick answers:\n• Deployment: 7 days, guaranteed\n• Existing tools: We integrate with what you already use\n• Pricing: Custom — a free audit gives you an accurate quote\n\nWhat else would you like to know?",
  },

  // ── Future ────────────────────────────────────────────────────────────────
  future: {
    keywords: ["future", "2030", "vision", "roadmap", "upcoming", "what's next", "coming soon", "trends"],
    response: "Our vision: by 2030, every business runs on an AI workforce. We're building the tools to get you there — starting with a 7-day deployment.\n\nWe're also building a student AI platform (coming soon).\n\nWhat brings you to StayKaro?",
  },

  // ── Stats ─────────────────────────────────────────────────────────────────
  stats: {
    keywords: ["50 businesses", "50+", "clients", "how many", "customers", "users", "average deployment", "who uses"],
    response: "StayKaro has deployed AI systems for 50+ businesses, with an average go-live time of 7 days.\n\nResults vary by use case — would you like to know what's typical for your industry or workflow?",
  },

  // ── Goodbye ───────────────────────────────────────────────────────────────
  goodbye: {
    keywords: ["bye", "goodbye", "thanks", "thank you", "cheers", "later", "exit", "done", "that's all", "no more"],
    response: "Thanks for chatting! 👋 Feel free to come back anytime.\n\nWhen you're ready to explore AI for your business, our team is happy to help.",
  },
};

const FALLBACK =
  "I'm not sure I have the exact answer for that. I know about our AI Caller Agent, LMS, OPS Platform, integrations, pricing, and how to book a demo.\n\nWhat would you like to know about?";

// Score-based intent matching — longer keyword phrases score higher
function findBestIntent(text: string): string | null {
  const lower = text.toLowerCase();
  let bestIntent: string | null = null;
  let bestScore = 0;

  for (const [intent, data] of Object.entries(KNOWLEDGE)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (lower.includes(keyword)) {
        score += keyword.split(" ").length * 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return bestScore > 0 ? bestIntent : null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body as { message?: string };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const intent = findBestIntent(message.trim());
    const response = intent ? KNOWLEDGE[intent].response : FALLBACK;

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

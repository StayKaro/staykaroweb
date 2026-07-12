import { NextRequest, NextResponse } from "next/server";

// ── StayKaro comprehensive knowledge base ──────────────────────────────────
const KNOWLEDGE: Record<string, { keywords: string[]; response: string }> = {

  greeting: {
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "sup", "howdy"],
    response: "Hi there! 👋 I'm Karo, StayKaro's AI assistant.\n\nI know everything about our website, products, and services. Ask me about:\n• AI Caller Agent, LMS Platform, OPS Platform\n• Integrations (50+ tools)\n• Results & ROI metrics\n• Pricing & how to book a demo\n• How to contact us\n\nWhat would you like to know?",
  },

  // ── Products ──────────────────────────────────────────────────────────────
  aiCaller: {
    keywords: ["ai caller", "caller agent", "voice ai", "ai phone", "voice call", "inbound call", "outbound call", "automated call", "call agent", "phone agent", "call handling", "ai calling"],
    response: "Our AI Caller Agent is a custom-built voice AI that handles inbound and outbound calls 24/7 — with human-like conversation quality.\n\nWhat it does:\n• Qualifies leads automatically on every call\n• Books appointments and meetings without a human\n• Handles follow-ups and reminders\n• Integrates with your CRM in real-time\n• Works around the clock — no breaks, no sick days\n\nResults clients see:\n• Response time: 8 hours → under 60 seconds (480× faster)\n• Lead conversion: 12% → 34% (+183%)\n\nLive at caller.staykaro.ai\n\nScroll to #products on the page to see a live dashboard demo, or book a free audit at #demo.",
  },

  lms: {
    keywords: ["lms", "learning management", "training platform", "course", "education", "ai tutor", "tutor", "student", "learning", "e-learning", "elearning", "certification", "assessment", "knowledge"],
    response: "Our LMS Platform is an AI-powered learning management system with a built-in personal AI tutor.\n\nKey features:\n• AI tutor adapts to each learner's pace and knowledge gaps\n• Automated assessments and certifications\n• Progress tracking and live dashboards\n• 1,243+ students enrolled across our clients\n• Supports institutions and businesses\n\nResult: 2× faster course completion with better knowledge retention.\n\nLive at lms.staykaro.ai\n\nScroll to #products to see the interactive course dashboard, or email staykaroatsales@staykaro.org to discuss your training needs.",
  },

  ops: {
    keywords: ["ops", "operations platform", "ops platform", "workflow automation", "kanban", "team management", "process automation", "command centre", "operations", "operational", "business ops"],
    response: "Our OPS Platform is your AI-powered command centre for business operations.\n\nWhat it does:\n• Kanban board for task and team management\n• Automates repetitive workflows end-to-end\n• AI-generated recommendations for optimization\n• Real-time team performance monitoring\n• Connects to your CRM, email, and business tools\n\nResult: Clients achieve 89% on-time delivery improvement.\n\nLive at ops.staykaro.ai\n\nScroll to #products to see the live OPS dashboard demo.",
  },

  customAgents: {
    keywords: ["custom ai", "custom agent", "bespoke", "custom build", "build for me", "agentic workflow", "autonomous", "internal copilot", "internal tool", "specific", "unique", "tailored", "custom automation"],
    response: "Beyond our standard products, we design and build fully custom AI agents — from internal copilots to multi-step autonomous systems.\n\nExamples we've built:\n• Lead qualification + meeting booking flow\n• Support ticket classification and auto-resolution\n• Internal knowledge base Q&A bots\n• Automated reporting and data entry agents\n• Multi-agent orchestration pipelines\n• Custom voice agents with your brand personality\n\nEvery custom build starts with a free discovery call where we map your workflows and identify the best automation opportunities.\n\nScroll to #products or email staykaroatsales@staykaro.org to discuss your use case.",
  },

  allProducts: {
    keywords: ["all products", "product", "what do you offer", "what do you sell", "what do you build", "services", "what can you do", "offerings", "platform"],
    response: "StayKaro offers 4 core products:\n\n1. AI Caller Agent — Custom voice AI for calls, lead qualification, and follow-ups (caller.staykaro.ai)\n\n2. LMS Platform — AI-powered learning management with a personal tutor (lms.staykaro.ai)\n\n3. OPS Platform — Command centre for workflow automation and team management (ops.staykaro.ai)\n\n4. Custom AI Agents — Fully bespoke AI agents and agentic workflows built around your specific business\n\nAll are live in 7 days, guaranteed. Scroll to #products to see interactive demos of each one.",
  },

  // ── Process ─────────��─────────────────────────────���───────────────────────
  process: {
    keywords: ["how does it work", "how do you work", "process", "steps", "6 steps", "discovery", "build process", "how it works", "workflow", "procedure"],
    response: "Our 6-step process from audit to live AI:\n\n01 Discover — Deep session to map your workflows and find highest-ROI automation opportunities\n02 Design — Engineers architect the perfect AI system for your processes and data\n03 Deploy — Goes live on secure cloud with zero downtime and instant rollback\n04 Integrate — Connect your CRM, WhatsApp, email, databases, and all existing tools\n05 Train — AI agents learn from your historical data and improve with every interaction\n06 Scale — Automatically handles more volume as your business grows\n\nScroll to #how-it-works to see the full interactive timeline.",
  },

  deployment: {
    keywords: ["how long", "timeline", "7 days", "deployment", "live in", "how fast", "speed", "quick", "fast", "turnaround", "launch"],
    response: "Live in 7 days — guaranteed. 🚀\n\nTypical timeline:\n• Day 1–2: Discovery call and workflow mapping\n• Day 3–4: Custom build and configuration\n• Day 5–6: Integration and end-to-end testing\n• Day 7: Go live!\n\nThis isn't a marketing claim — it's our contract commitment. We've built a battle-tested deployment process that eliminates the typical delays in AI projects. No weeks, no months.\n\nSee the full process at #how-it-works.",
  },

  // ── Integrations ──���─────────────────────────────���─────────────────────────
  integrations: {
    keywords: ["integration", "connect", "salesforce", "hubspot", "whatsapp", "slack", "gmail", "zoho", "twilio", "freshdesk", "razorpay", "tally", "google sheets", "api", "webhook", "crm", "tools", "stack", "existing"],
    response: "StayKaro has 50+ pre-built integrations:\n\nMessaging: WhatsApp, Slack\nCRM: Salesforce, HubSpot, Zoho CRM\nEmail: Gmail\nProductivity: Google Sheets\nCalling: Twilio\nSupport: Freshdesk\nFinance: Razorpay, Tally\nCustom: REST API and Webhooks for anything else\n\nNo rip-and-replace needed. Your data stays in your existing systems — our AI agents connect to them without disrupting your current setup.\n\nScroll to #ecosystem to see all integrations.",
  },

  // ── Results & ROI ───────────���──────────────────────────��──────────────────
  results: {
    keywords: ["result", "roi", "return on investment", "outcome", "case study", "proof", "metric", "data", "stat", "before after", "improvement", "benefit", "numbers", "performance"],
    response: "Real results from deployed StayKaro systems:\n\nResponse Time: 8 hours → under 1 min (480× faster)\nLead Conversion: 12% → 34% (+183%)\nOperational Cost: ₹4.2L/mo → ₹1.1L/mo (-74%)\nCustomer Satisfaction: 71% → 96% (+35 points)\n\nThese are typical outcomes across deployed clients. Your exact results depend on your business size, industry, and use-case. We model projections specific to your workflows during the free audit.\n\nScroll to #case-studies to see the full before/after comparison.",
  },

  // ── Pricing ────────────��──────────────────────────────────────────────────
  pricing: {
    keywords: ["price", "pricing", "cost", "how much", "charge", "fee", "rate", "subscription", "plan", "payment", "budget", "affordable", "quote", "estimate", "invoice"],
    response: "We don't have one-size-fits-all pricing — every build is custom.\n\nPricing depends on:\n• Type and number of AI agents\n• Call/interaction volume\n• Integrations required\n• Level of customization\n• Ongoing support needs\n\nMost clients see full ROI within the first few weeks of deployment.\n\nTo get a custom quote: Book a free 30-minute audit at #demo, email staykaroatsales@staykaro.org, or WhatsApp +91 7013987868. We'll assess your workflows and give you an accurate estimate.",
  },

  // ── Contact ─────────────��──────────────────────────────��──────────────────
  contact: {
    keywords: ["contact", "reach", "phone", "email", "whatsapp", "talk to", "speak", "call you", "get in touch", "support", "team", "sales", "address", "location", "office", "hyderabad", "india"],
    response: "Here's how to reach the StayKaro team:\n\nPhone: +91 7013987868\nAvailable Mon–Fri, 9am–7pm IST\n\nWhatsApp: wa.me/917013987868\nUsually replies within 10 minutes\n\nEmail: staykaroatsales@staykaro.org\nWe reply within 24 hours\n\nOffice: Hyderabad, India\nAvailable for in-person demos\n\nOr fill the demo request form at #demo — our team will send a calendar link within 24 hours.",
  },

  // ── Book demo ─────────────────────────────────────────────────────────────
  demo: {
    keywords: ["demo", "book", "schedule", "free audit", "free consultation", "trial", "free call", "sign up", "get started", "start", "consultation", "appointment", "meeting", "free demo", "try"],
    response: "Ready to see StayKaro in action? Here's how to book:\n\nOption 1: Scroll to the bottom of this page to the Book Your Demo form (#demo)\nOption 2: Email staykaroatsales@staykaro.org\nOption 3: WhatsApp +91 7013987868 (replies within 10 min)\nOption 4: Call +91 7013987868 (Mon��Fri, 9am–7pm IST)\n\nThe demo is free, 30 minutes, and has no commitment. We will:\n• Audit your current workflows\n• Show you exactly how AI agents fit your business\n• Give a live walkthrough of the platform\n• Provide a custom ROI estimate\n• Commit to going live in 7 days",
  },

  // ── Security ──────���─────────────────────────────��─────────────────────────
  security: {
    keywords: ["security", "safe", "secure", "privacy", "data", "gdpr", "compliance", "encrypt", "confidential", "protection", "rbac", "audit log"],
    response: "Security is core to every product we build:\n\nEnd-to-end encryption — all data in transit and at rest\nRole-based access control (RBAC) — granular user permissions\nFull audit logs — every action is tracked and timestamped\nConfigurable data residency — keep data in your region\nGDPR compliant — meets international data standards\n\nYour data stays in your existing systems. Our AI agents connect to them without storing sensitive information unnecessarily.",
  },

  // ── Website navigation ─────────────���──────────────────────────────────────
  navigation: {
    keywords: ["where", "navigate", "find", "section", "scroll", "page sections", "website", "layout", "menu", "navigate to", "go to", "page"],
    response: "Here's what's on the StayKaro website:\n\nHero — Overview with interactive product layer stack\n#about — The problem we solve + our AI solution\n#ecosystem — 50+ integrations and connectors\n#products — All 4 products with live demos\n#how-it-works — 6-step deployment process\n#case-studies — Real before/after metrics\n#future-vision — Our 2030 AI workforce vision\n#faq — Frequently asked questions\n#demo — Book a free demo (contact form at the bottom)\n\nThe top navbar also has quick links to Products, Solutions, How It Works, Results, and About.",
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    keywords: ["about", "who are you", "what is staykaro", "what do you do", "company", "founded", "mission", "vision", "who", "background", "history"],
    response: "StayKaro builds intelligent AI systems that automate the most time-consuming parts of running a business.\n\nWe build:\n• Custom AI Caller Agents for sales and support\n• LMS Platforms with AI tutors\n• OPS Platforms for workflow automation\n• Fully bespoke agentic systems for any use case\n\nOur mission: Give every business an AI workforce that handles repetitive, high-volume work — so your human team can focus on growth.\n\n50+ businesses are already live on StayKaro, with an average deployment of just 7 days.\n\nBased in Hyderabad, India. Learn more at #about.",
  },

  // ── Two missions ─────────���────────────────────────────────────────────────
  missions: {
    keywords: ["two missions", "student", "enterprise", "business vs student", "b2b", "coming soon", "student platform"],
    response: "StayKaro has two parallel missions:\n\n1. Enterprise AI — Building custom AI agents, LMS, and OPS platforms for businesses that want to automate and scale\n\n2. Student Platform — An AI-powered learning system coming soon for students and educational institutions (currently in development)\n\nSee both missions in the #two-missions section near the bottom of the page.",
  },

  // ── FAQ ───────────────────────────────────���───────────────────────────────
  faq: {
    keywords: ["faq", "frequently asked", "common question", "question and answer", "q and a", "qa"],
    response: "Common questions answered:\n\nHow long does deployment take? 7 days or less, guaranteed.\n\nDo I need to change my existing tools? No — we integrate with what you already use.\n\nIs there ongoing support? Yes — a dedicated success manager monitors and optimizes performance.\n\nHow is pricing determined? Based on your use case, volume, and customization. Book a free audit for a custom quote.\n\nWhat industries does StayKaro serve? Sales teams, EdTech, healthcare, real estate, e-commerce, logistics, and more.\n\nCan I see a live demo? Yes — book a free 30-minute audit at #demo.\n\nMore FAQs are in the #faq section.",
  },

  // ── Future ────────────────────────────────────────────��───────────────────
  future: {
    keywords: ["future", "2030", "vision", "roadmap", "upcoming", "what's next", "coming soon", "trends"],
    response: "StayKaro's vision for 2030:\n\nBy 2030, every business will have an AI workforce. The companies building their AI systems today will dominate their industries tomorrow. The window to act is closing.\n\nWe exist to help businesses get there fast — with a guaranteed 7-day deployment and continuous improvement after go-live.\n\nWe're also building a Student Platform — an AI-powered learning system for students and educational institutions (coming soon).\n\nSee the full vision at #future-vision.",
  },

  // ── Stats ──────���──────────────────────────────────────────────────────────
  stats: {
    keywords: ["50 businesses", "50+", "clients", "how many", "customers", "users", "average deployment", "who uses"],
    response: "StayKaro by the numbers:\n\n• 50+ businesses live on StayKaro\n• Average deployment time: 7 days\n• 480× faster response time (typical)\n• +183% lead conversion (typical)\n• -74% operational cost reduction (typical)\n• 96% customer satisfaction (typical)\n• 50+ pre-built integrations\n\nEvery business is different — we model specific projections for your workflows during the free audit at #demo.",
  },

  goodbye: {
    keywords: ["bye", "goodbye", "thanks", "thank you", "cheers", "later", "exit", "done", "that's all", "no more"],
    response: "Thanks for chatting! 👋\n\nWhen you're ready to explore AI for your business:\n\nPhone: +91 7013987868 (Mon–Fri, 9am–7pm IST)\nWhatsApp: wa.me/917013987868\nEmail: staykaroatsales@staykaro.org\nBook demo: Scroll to #demo\n\nHave a great day — the AI future is closer than you think! 🚀",
  },
};

const FALLBACK =
  "That's an interesting question! I may not have the exact details, but here's what I can tell you about:\n\n• Products: AI Caller Agent, LMS Platform, OPS Platform, Custom Agents\n• Integrations: 50+ tools (WhatsApp, Salesforce, HubSpot, Slack...)\n• Deployment: Live in 7 days, guaranteed\n• Results: 480× faster response, +183% conversion, -74% costs\n• Contact: +91 7013987868 | staykaroatsales@staykaro.org\n\nTry asking me about any of these, or book a free demo at #demo to speak with our team directly!";

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

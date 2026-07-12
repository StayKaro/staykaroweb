# StayKaro — AI Agents That Never Sleep

A high-performance Next.js landing page showcasing StayKaro's AI automation platform. Features interactive 3D animations, seamless scrolling, and a conversational AI chatbot powered by OpenAI.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key (for chatbot)
- Supabase project (for database)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your keys:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - OPENAI_API_KEY
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.2.7 (App Router) |
| **Frontend** | React 19.2.4 + Tailwind CSS 4 |
| **3D/Animation** | Three.js, React Three Fiber, GSAP, Framer Motion |
| **Smooth Scroll** | Lenis |
| **UI Components** | Radix UI + shadcn/ui patterns |
| **Backend** | Supabase (PostgreSQL) |
| **Chatbot** | Self-contained intent-based system (no external APIs) |
| **Typography** | Cormorant Garamond (headings), Plus Jakarta Sans (body) |

---

## 🎯 Features

### Pages & Sections (16 Total)
- **Hero** - AI platform introduction with interactive features showcase
- **Trust Bar** - Client/partner logos
- **About** - Problem/solution narrative with parallax scroll
- **AI Ecosystem** - Integration showcase (50+ connectors)
- **Products** - AI Caller, LMS Platform, OPS Platform, Custom AI
- **AI Automation** - What we build and process overview
- **Quote Engine** - Interactive pricing/demo request
- **How It Works** - 7-step implementation journey
- **Case Studies** - Before/after metrics and results
- **Testimonials** - Customer reviews with 5-star ratings
- **Future Vision** - Roadmap and vision section
- **Student Coming Soon** - Educational platform teaser
- **FAQ** - Common questions
- **Two Missions** - Company mission and values
- **Final CTA** - Contact and call-to-action
- **Footer** - Links, social, contact info

### Interactive Features
- **Custom 3D Canvases**: BrainCanvas, GlassBrainCanvas, NeuralGlobe, NeuralCanvas2D
- **Animated Hero**: Parallax layered intro
- **Smooth Scrolling**: Lenis for buttery-smooth page scroll
- **Responsive Design**: Mobile-first, works on all devices
- **Magnetic Cursor**: Custom cursor with particle effects
- **Conversational Chatbot**: AI assistant on every page

---

## 📡 API Endpoints

### Chatbot (Self-Contained - No AI APIs)
```
POST /api/chat
Body: { message: string, name?: string, email?: string }
Response: { message: string }
Uses intent-based matching without external API calls
```

### Demo Requests
```
POST /api/demo
Body: { name, phone, email, company, message? }
Response: { success: true }
```

### Waitlist
```
POST /api/waitlist
Body: { email }
Response: { success: true, message?: string }
```

### Reviews
```
POST /api/review
Body: { name, role?, company?, review, rating }
Response: { success: true }
```

---

## 🗄️ Database Schema (Supabase)

### Tables
- **demo_requests** - Demo booking inquiries
- **waitlist** - Email signups (unique constraint)
- **reviews** - User testimonials with ratings

---

### Chatbot Configuration

The **conversational chatbot** is fully self-contained and requires **NO external AI APIs**. It uses:
- **Intent-based matching** - Recognizes user queries and matches them to predefined intents
- **Smart responses** - Returns contextual answers from a knowledge base
- **Contact integration** - Collects visitor information and integrates with demo requests
- **No dependencies** - Works entirely within the Next.js backend

**Features:**
- Answers questions about AI Caller Agents, LMS Platform, OPS Platform
- Explains features, deployment timelines, pricing, ROI, integrations, security
- Collects contact information (name, email, company)
- Saves inquiries to Supabase for follow-up
- Fallback responses for unknown queries

To customize responses, edit the `INTENT_RESPONSES` object in `src/app/api/chat/route.ts`:

```typescript
const INTENT_RESPONSES: Record<string, { keywords: string[]; responses: string[] }> = {
  productName: {
    keywords: ["keyword1", "keyword2"],
    responses: ["Response 1", "Response 2"],
  },
  // ... add more intents
};
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata & providers
│   ├── page.tsx             # Home page (16 sections)
│   ├── globals.css          # Global styles
│   └── api/
│       ├── chat/route.ts    # Chatbot API
│       ├── demo/route.ts    # Demo requests
│       ├── review/route.ts  # Reviews
│       └── waitlist/route.ts # Email signups
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/            # 16 page sections
│   │   ├── Hero.tsx
│   │   ├── Products.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CaseStudies.tsx
│   │   └── ...13 more
│   ├── ui/
│   │   ├── chatbot.tsx      # Conversational chatbot
│   │   ├── animated-hero.tsx
│   │   ├── BrainCanvas.tsx
│   │   ├── NeuralGlobe.tsx
│   │   └── ...other UI components
│   └── cursor/
│       └── CustomCursor.tsx
├── lib/
│   ├── supabase.ts          # Supabase client
│   └── utils.ts             # Utility functions
└── providers/
    └── LenisProvider.tsx    # Smooth scroll provider
```

---

## ⚙️ Configuration

### TypeScript
- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- Target: ES2017

### Tailwind CSS v4
- Built-in with PostCSS
- Custom Tailwind config in `tailwind.config.ts` (if needed)

### Allowed Dev Domains
For ngrok testing, the following domains are whitelisted in `next.config.ts`:
- `iodine-charbroil-pagan.ngrok-free.dev`
- `*.ngrok-free.dev`

---

## 🔐 Environment Variables

Required variables in `.env.local`:

```env
# Supabase Configuration (for storing demo requests, reviews, waitlist)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# No AI APIs required!
# Chatbot runs entirely on intent-based matching (see src/app/api/chat/route.ts)
```

---

## 📊 Performance Optimizations

- Next.js Image optimization for static assets
- Lazy-loaded 3D canvases and animations
- Tailwind CSS v4 with PostCSS for minimal CSS output
- React 19 concurrent rendering
- Framer Motion for GPU-accelerated animations
- Code splitting and dynamic imports

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Environment Setup on Vercel
Add these to Vercel environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`

---

## 📝 License

Private project for StayKaro. All rights reserved.

---

## 📧 Support

For questions or issues, contact the StayKaro development team or visit https://www.staykaro.org

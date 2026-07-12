# StayKaro Chatbot Setup Guide

## 🤖 Overview
We've implemented a **fully self-contained conversational chatbot** that requires NO external AI APIs or paid services. The chatbot handles customer inquiries, collects lead information, and integrates seamlessly with your landing page.

---

## ✨ Key Features

### 1. **Self-Contained Intent Matching**
- No OpenAI, Claude, or external AI dependencies
- Fast, reliable, and zero latency
- 100% free operation

### 2. **Smart Conversational Responses**
The chatbot understands and responds to 10+ intents:
- **Product inquiries** - AI Agents, LMS Platform, OPS Automation
- **Technical questions** - Deployment, integrations, ROI
- **Contact collection** - Captures leads automatically
- **Fallback handling** - Graceful responses for unknown queries

### 3. **Lead Collection**
Built-in contact form that captures:
- Name
- Email
- Company
- Message/Notes
- Saves directly to Supabase `demo_requests` table

### 4. **Floating Widget**
- Fixed position chatbot button (bottom-right)
- Smooth animations
- Collapsible chat window
- Mobile responsive

---

## 🗂️ Implementation Details

### Files Created/Modified

#### New Files
1. **src/app/api/chat/route.ts** - Chatbot API endpoint
   - Intent matching logic
   - Response mapping
   - Supabase integration

2. **src/components/ui/chatbot.tsx** - Chat UI component
   - Floating button
   - Message window
   - Contact form
   - State management

#### Modified Files
1. **src/app/layout.tsx** - Added Chatbot component
2. **.env.local.example** - Removed OpenAI API key requirement
3. **README.md** - Updated documentation

---

## 🎯 How It Works

### 1. User sends a message
```
User: "Tell me about your AI agents"
```

### 2. Backend Intent Matching
```javascript
- Looks for keywords: "ai", "agent", "voice", "caller"
- Finds matching intent: "aiAgents"
- Selects random response from that intent
```

### 3. Response Returned
```
Assistant: "Our AI Caller Agent handles inbound and 
outbound calls 24/7 with human-like conversations..."
```

### 4. Contact Collection (Optional)
```
User clicks "Contact Us" button
→ Contact form appears
→ Fills: name, email, company, message
→ Submits to /api/demo
→ Saved in Supabase
```

---

## 🎨 Intent Configuration

All responses are defined in `src/app/api/chat/route.ts`:

```typescript
const INTENT_RESPONSES = {
  productName: {
    keywords: ["keyword1", "keyword2", "keyword3"],
    responses: [
      "Response option 1",
      "Response option 2",
      "Response option 3",
    ]
  }
};
```

### Current Intents

| Intent | Keywords | Purpose |
|--------|----------|---------|
| `greeting` | hi, hello, hey | Initial welcome |
| `aiAgents` | ai agent, caller, voice | Explain AI Caller Agent |
| `lms` | lms, learning, tutor, course | Explain LMS Platform |
| `opsAutomation` | ops, workflow, automation | Explain OPS Platform |
| `deployment` | deploy, timeline, 7 days | Deployment info |
| `integration` | integrate, connect, crm, api | Integration details |
| `pricing` | price, cost, investment, quote | Pricing info |
| `roi` | roi, return, metrics, results | ROI metrics |
| `demo` | demo, schedule, meeting, audit | Book demo |
| `security` | security, encryption, compliance | Security info |
| `contact` | contact, reach, phone, email | Contact info |
| `goodbye` | bye, goodbye, thanks, exit | Closing |

---

## 📝 Customization Guide

### Add a New Intent

1. Open `src/app/api/chat/route.ts`
2. Add to `INTENT_RESPONSES`:

```typescript
newProduct: {
  keywords: ["product", "feature", "use", "case"],
  responses: [
    "Response 1 about the product",
    "Response 2 about the product",
    "Response 3 about the product",
  ]
}
```

3. Save and test in the chatbot

### Update Existing Responses

Simply edit the `responses` array for any intent:

```typescript
aiAgents: {
  keywords: ["ai agent", "caller", "voice"],
  responses: [
    "New response 1",
    "New response 2",
  ]
}
```

### Change Keywords

Modify the `keywords` array to match different user queries:

```typescript
myIntent: {
  keywords: ["new", "keyword", "patterns"],
  responses: [...]
}
```

---

## 🚀 Deployment

### Local Development
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Production (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**No OpenAI API key needed!**

---

## 📊 Tracking Analytics

### Demo Requests
All contact submissions are saved to Supabase table: `demo_requests`

Query example:
```sql
SELECT name, email, company, created_at 
FROM demo_requests 
WHERE created_at > now() - interval '7 days'
ORDER BY created_at DESC;
```

### Chat Logs
To track chatbot usage, add logging to `src/app/api/chat/route.ts`:

```typescript
// Add to POST handler
console.log("Chat request:", {
  message,
  timestamp: new Date(),
  intent: findIntent(message),
});
```

---

## 🔧 Troubleshooting

### Chatbot not showing
- Check Chatbot component is imported in `src/app/layout.tsx`
- Verify no console errors (check browser DevTools)

### Form not submitting
- Ensure Supabase is configured (.env.local)
- Check `/api/demo` endpoint is working
- Verify `demo_requests` table exists in Supabase

### Wrong responses
- Add more specific keywords to your intent
- Adjust keyword matching logic if needed
- Check for typos in intent definitions

### Performance issues
- Add response limit/cache if needed
- Consider adding typing indicators
- Optimize for mobile devices

---

## 📚 Related Files

- Chat API: [src/app/api/chat/route.ts](../src/app/api/chat/route.ts)
- Chat UI: [src/components/ui/chatbot.tsx](../src/components/ui/chatbot.tsx)
- Layout: [src/app/layout.tsx](../src/app/layout.tsx)
- Documentation: [README.md](../README.md)

---

## ✅ Checklist

- ✅ Chatbot deployed on production
- ✅ No external API keys required
- ✅ Contact form collects leads
- ✅ Responses customizable
- ✅ Mobile responsive
- ✅ Supabase integration working
- ✅ Documentation complete

---

## 📧 Support

For questions or custom modifications, check:
1. Intent configuration in chat/route.ts
2. Chat component in components/ui/chatbot.tsx
3. Supabase schema for demo_requests table
4. Browser console for errors

---

**Chatbot Setup Complete! 🎉**

Your conversational chatbot is now live and ready to engage visitors. No AI APIs, no costs, just smart intent matching.

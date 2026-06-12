"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How quickly can StayKaro deploy an AI system for my business?",
    a: "Most deployments go live within 7-14 business days. Our streamlined onboarding process includes discovery, configuration, integration, and testing — all managed by our dedicated implementation team.",
  },
  {
    q: "Does the AI Caller Agent support multiple languages?",
    a: "Yes. Our AI Caller Agent currently supports English, Hindi, and several regional languages. We can add additional languages based on your business requirements.",
  },
  {
    q: "How does the AI learn and improve over time?",
    a: "Our AI systems use continuous learning — every conversation and interaction feeds back into the model, improving accuracy, tone, and effectiveness over time. You'll see measurable improvement within the first 30 days.",
  },
  {
    q: "Can StayKaro integrate with our existing CRM and tools?",
    a: "Absolutely. We have pre-built integrations with Salesforce, HubSpot, Zoho, WhatsApp Business, Gmail, and dozens of other platforms. Custom integrations are also available via our API.",
  },
  {
    q: "Is our data secure with StayKaro?",
    a: "Security is foundational to everything we build. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. We're compliant with data protection regulations and offer private cloud deployment options.",
  },
  {
    q: "What kind of support does StayKaro provide post-deployment?",
    a: "Every client gets a dedicated success manager, 24/7 technical support, monthly performance reviews, and proactive optimization recommendations. We're invested in your success long-term.",
  },
  {
    q: "Can we customize the AI agents to match our brand voice?",
    a: "Yes — completely. We train the AI on your specific brand voice, terminology, business rules, and customer personas. The agent should feel like a natural extension of your team.",
  },
  {
    q: "Do you build fully custom AI agents, or only use pre-built tools?",
    a: "We build fully custom AI agents and agentic systems specific to your business — from a single automation to multi-step autonomous workflows. Pre-built products (AI Caller, LMS, OPS) are starting points; everything can be customized further.",
  },
  {
    q: "What is 'agentic development'?",
    a: "Agentic systems are AI agents that don't just respond — they take actions, make decisions, and complete multi-step tasks across your tools autonomously, with minimal human oversight.",
  },
  {
    q: "Is the student app available yet?",
    a: "Not yet — it's currently in development and testing. Join our waitlist to be notified the moment it launches.",
  },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.06 }}
      style={{
        borderRadius: 16,
        background: "var(--color-card-light)",
        border: `1px solid ${open ? "#9B1D28" : "#E7DED5"}`,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(155,29,40,0.04)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        style={{
          width: "100%",
          padding: "clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 2.5vw, 2rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: "none",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            color: open ? "#9B1D28" : "#111111",
            lineHeight: 1.4,
            transition: "color 0.3s",
          }}
        >
          {faq.q}
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: open ? "#9B1D28" : "rgba(155,29,40,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.3s",
          }}
        >
          {open ? <Minus size={16} color="#FFFFFF" /> : <Plus size={16} color="#9B1D28" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              style={{
                padding: "0 clamp(1.25rem, 2.5vw, 2rem) clamp(1rem, 2vw, 1.5rem)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                  color: "#555555",
                  lineHeight: 1.7,
                }}
              >
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      style={{
        background: "#FAF7F2",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        borderTop: "1px solid #E7DED5",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              color: "#9B1D28",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="display-md"
            style={{ fontFamily: "var(--font-heading)", color: "#111111" }}
          >
            Common{" "}
            <span className="text-gradient">Questions</span>
          </motion.h2>
        </div>

        {/* FAQ items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
          style={{
            textAlign: "center",
            marginTop: "clamp(2rem, 5vw, 3rem)",
            padding: "clamp(1.5rem, 3vw, 2rem)",
            borderRadius: 20,
            background: "var(--color-card-light)",
            border: "1px solid #E7DED5",
            boxShadow: "0 8px 32px rgba(155,29,40,0.04)",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#555555", marginBottom: 16 }}>
            Still have questions?
          </p>
          <motion.a
            href="#contact"
            className="magnetic-btn"
            whileHover={{ scale: 1.05, backgroundColor: "#7A1520" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 100,
              background: "#9B1D28",
              color: "#FFFFFF",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Talk to Our Team
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  MessageCircle, Cloud, BarChart2, Database,
  Mail, Sheet, MessageSquare, Phone,
  Headphones, CreditCard, BookOpen, Code2, Zap,
} from "lucide-react";

const INTEGRATIONS = [
  { name: "WhatsApp",      Icon: MessageCircle, color: "#25D366", bg: "#25D36614" },
  { name: "Salesforce",    Icon: Cloud,         color: "#00A1E0", bg: "#00A1E014" },
  { name: "HubSpot",       Icon: BarChart2,     color: "#FF7A59", bg: "#FF7A5914" },
  { name: "Zoho CRM",      Icon: Database,      color: "#E42527", bg: "#E4252714" },
  { name: "Gmail",         Icon: Mail,          color: "#EA4335", bg: "#EA433514" },
  { name: "Google Sheets", Icon: Sheet,         color: "#34A853", bg: "#34A85314" },
  { name: "Slack",         Icon: MessageSquare, color: "#4A154B", bg: "#4A154B14" },
  { name: "Twilio",        Icon: Phone,         color: "#F22F46", bg: "#F22F4614" },
  { name: "Freshdesk",     Icon: Headphones,    color: "#25C16F", bg: "#25C16F14" },
  { name: "Razorpay",      Icon: CreditCard,    color: "#3395FF", bg: "#3395FF14" },
  { name: "Tally",         Icon: BookOpen,      color: "#0066CC", bg: "#0066CC14" },
  { name: "Custom API",    Icon: Code2,         color: "#7C3AED", bg: "#7C3AED14" },
];

export default function AIEcosystem() {
  return (
    <section
      id="ecosystem"
      style={{
        background: "transparent",
        padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic pattern and radial background glows */}
      <div className="dark-pattern-grid" />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(ellipse at 50% 100%, rgba(155,29,40,0.16) 0%, transparent 60%), radial-gradient(circle at 10% 20%, rgba(241,106,106,0.06) 0%, transparent 40%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div className="max-w-6xl mx-auto" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem,7vw,5rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{
              display: "inline-block", fontFamily: "var(--font-body)",
              fontSize: 12, fontWeight: 600, color: "#F16A6A",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
            }}
          >
            Integrations
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="display-md"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)", marginBottom: 18 }}
          >
            Works With Your{" "}
            <span className="text-gradient">Entire Stack</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.8vw,1.1rem)",
              color: "var(--color-muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65,
            }}
          >
            No rip-and-replace. We build custom agents and automations that layer on top of your existing tools — CRM, helpdesk, messaging, and finance — connected exactly how your business needs.
          </motion.p>
        </div>

        {/* Integration grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "clamp(0.75rem,1.5vw,1.25rem)",
            marginBottom: "clamp(2.5rem,5vw,4rem)",
          }}
        >
          {INTEGRATIONS.map(({ name, Icon, color, bg }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}22` }}
              style={{
                background: "var(--color-card-light)",
                border: "1px solid #E7DED5",
                borderRadius: 28,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                cursor: "default",
                boxShadow: "0 8px 24px rgba(155,29,40,0.04)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: bg, border: `1px solid ${color}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={20} color={color} strokeWidth={1.8} />
              </div>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                color: "#111111", textAlign: "center", lineHeight: 1.3,
              }}>
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 100,
            background: "rgba(155,29,40,0.12)", border: "1px solid rgba(155,29,40,0.25)",
          }}>
            <Zap size={14} color="#F16A6A" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#F16A6A" }}>
              50+ pre-built integrations
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-muted)" }}>
            + custom integrations via REST API
          </span>
        </motion.div>
      </div>
    </section>
  );
}

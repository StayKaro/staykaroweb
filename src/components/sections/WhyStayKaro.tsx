"use client";

import { motion } from "framer-motion";
import { Clock, Brain, Zap, Link2, BarChart2, Mic } from "lucide-react";

const FEATURES = [
  {
    Icon: Clock,
    title: "Always On, Never Tired",
    description:
      "Your AI agents work 24/7 — handling calls, qualifying leads, and completing tasks at 3am exactly as well as at 3pm. Zero sick days, zero attrition.",
    badge: "24/7 uptime",
    iconColor: "#CC1A1A",
    topBg: "linear-gradient(135deg, rgba(204,26,26,0.06) 0%, rgba(255,220,220,0.14) 100%)",
  },
  {
    Icon: Brain,
    title: "Built For Your Business",
    description:
      "Not a generic template. We build each agent around your exact processes, terminology, and team — so it feels like a natural extension of your company.",
    badge: "Fully custom",
    iconColor: "#B01C1C",
    topBg: "linear-gradient(135deg, rgba(180,28,28,0.05) 0%, rgba(255,210,210,0.12) 100%)",
  },
  {
    Icon: Zap,
    title: "Live in Days, Not Months",
    description:
      "From discovery call to live deployment in 7 days or less. Our structured build process eliminates the delays that kill most AI projects.",
    badge: "7-day deploy",
    iconColor: "#CC1A1A",
    topBg: "linear-gradient(135deg, rgba(204,26,26,0.06) 0%, rgba(255,230,210,0.14) 100%)",
  },
  {
    Icon: Link2,
    title: "Connects To Everything",
    description:
      "CRM, helpdesk, WhatsApp, email, Slack — our agents plug into your existing stack with pre-built integrations and a custom API layer where needed.",
    badge: "100+ integrations",
    iconColor: "#B01C1C",
    topBg: "linear-gradient(135deg, rgba(180,28,28,0.05) 0%, rgba(210,220,255,0.1) 100%)",
  },
  {
    Icon: BarChart2,
    title: "ROI From Week One",
    description:
      "Every agent ships with a live performance dashboard. Track calls handled, leads converted, hours saved — the numbers are visible from day one.",
    badge: "Real-time ROI",
    iconColor: "#CC1A1A",
    topBg: "linear-gradient(135deg, rgba(204,26,26,0.06) 0%, rgba(220,255,220,0.1) 100%)",
  },
  {
    Icon: Mic,
    title: "Human-Quality AI Voice",
    description:
      "Our AI Caller agents don't sound robotic. Natural language, real-time responses, and dynamic conversation handling that customers don't notice is AI.",
    badge: "Natural language",
    iconColor: "#B01C1C",
    topBg: "linear-gradient(135deg, rgba(180,28,28,0.05) 0%, rgba(255,215,200,0.12) 100%)",
  },
] as const;

const CARD_H = 195;

export default function WhyStayKaro() {
  return (
    <section
      id="why"
      style={{
        background: "transparent",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dark-pattern-grid" style={{ opacity: 0.55 }} />
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(155,29,40,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 7vw, 5rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              color: "#F16A6A",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Why Stay Karo
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="display-md"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)", marginBottom: 18 }}
          >
            The AI Partner That{" "}
            <span className="text-gradient">Actually Delivers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.8vw, 1.1rem)",
              color: "var(--color-muted)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Six reasons businesses choose Stay Karo over generic software and full-time hires.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1rem, 1.8vw, 1.5rem)",
          }}
        >
          {FEATURES.map((f, i) => {
            const { Icon } = f;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(155,29,40,0.14)" }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  cursor: "default",
                  transition: "box-shadow 0.3s",
                }}
              >
                {/* Gradient header panel */}
                <div
                  style={{
                    height: CARD_H,
                    background: f.topBg,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px 24px 0",
                  }}
                >
                  {/* Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontSize: 10,
                      fontWeight: 700,
                      color: f.iconColor,
                      background: `${f.iconColor}14`,
                      border: `1px solid ${f.iconColor}22`,
                      padding: "3px 10px",
                      borderRadius: 100,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {f.badge}
                  </div>

                  {/* Icon circle */}
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 22,
                      background: "#FFFFFF",
                      boxShadow: `0 8px 28px ${f.iconColor}20, 0 2px 8px rgba(0,0,0,0.07)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={30} color={f.iconColor} strokeWidth={1.8} />
                  </div>

                  {/* Red accent bar at bottom of header */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 40,
                      height: 3,
                      borderRadius: "3px 3px 0 0",
                      background: `linear-gradient(90deg, ${f.iconColor}, rgba(204,26,26,0.4))`,
                    }}
                  />
                </div>

                {/* Text body */}
                <div style={{ padding: "20px 24px 24px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                      color: "#111111",
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(0.875rem, 1.3vw, 0.95rem)",
                      color: "#555555",
                      lineHeight: 1.68,
                      margin: 0,
                    }}
                  >
                    {f.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Bot, GitBranch, Workflow, Plug, Wrench, Phone, Search, Code2, CheckCircle, HeadphonesIcon } from "lucide-react";

const WHAT_WE_BUILD = [
  { icon: Bot,        label: "Custom AI Agents",      desc: "Voice, chat, or silent — agents built around your exact workflows." },
  { icon: GitBranch,  label: "Agentic Workflows",      desc: "Multi-step autonomous systems that make decisions and take actions." },
  { icon: Workflow,   label: "Process Automation",     desc: "Replace manual, repetitive tasks with reliable AI execution." },
  { icon: Plug,       label: "System Integrations",    desc: "Connect your CRM, helpdesk, messaging, and finance tools." },
  { icon: Wrench,     label: "Internal AI Tools",      desc: "Custom copilots and dashboards for your internal teams." },
];

const PROCESS = [
  { step: "01", icon: Phone,           label: "Discovery Call",          desc: "We map your workflows and identify the highest-ROI automation opportunities." },
  { step: "02", icon: Code2,           label: "Custom Build",            desc: "We design and build your AI agents using your brand voice and business logic." },
  { step: "03", icon: Search,          label: "Integration & Testing",   desc: "We connect your existing tools and run end-to-end QA before any go-live." },
  { step: "04", icon: CheckCircle,     label: "Live in Days",            desc: "Most builds go live within 7 days — not 7 weeks." },
  { step: "05", icon: HeadphonesIcon,  label: "Ongoing Support",         desc: "Your dedicated success manager monitors performance and optimises over time." },
];

export default function AIAutomation() {
  return (
    <section
      id="ai-automation"
      style={{
        background: "transparent",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dark-pattern-grid" style={{ opacity: 0.5 }} />
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(204,26,26,0.1) 0%, transparent 50%), radial-gradient(ellipse at 10% 100%, rgba(155,29,40,0.07) 0%, transparent 45%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 8vw, 5.5rem)" }}>
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
            AI Automation Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="display-md"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)", marginBottom: 22, lineHeight: 1.12 }}
          >
            We Build The AI Workforce{" "}
            <span className="text-gradient">Your Business Doesn&apos;t Have Yet</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "var(--color-muted)",
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            From a single custom AI agent to a full agentic system — we design, build, and deploy the AI that runs your business while your team focuses on growth.
          </motion.p>
        </div>

        {/* Two-col layout */}
        <div
          className="ai-auto-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2.5rem, 6vw, 5rem)",
            alignItems: "flex-start",
          }}
        >
          {/* Left — What We Build */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 28,
                    background: "linear-gradient(180deg, #CC1A1A, rgba(204,26,26,0.3))",
                    borderRadius: 9999,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    color: "var(--color-foreground)",
                  }}
                >
                  What We Build
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {WHAT_WE_BUILD.map((item, i) => {
                  const { icon: ItemIcon } = item;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.07, duration: 0.55 }}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 16,
                        padding: "14px 18px",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: "rgba(204,26,26,0.12)",
                          border: "1px solid rgba(204,26,26,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ItemIcon size={19} color="#CC1A1A" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontWeight: 700,
                            fontSize: 15,
                            color: "var(--color-foreground)",
                            marginBottom: 4,
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: 13,
                            color: "var(--color-muted)",
                            lineHeight: 1.55,
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right — Our Process */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div
                  style={{
                    width: 3,
                    height: 28,
                    background: "linear-gradient(180deg, #CC1A1A, rgba(204,26,26,0.3))",
                    borderRadius: 9999,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    color: "var(--color-foreground)",
                  }}
                >
                  Our Process
                </h3>
              </div>

              <div style={{ position: "relative" }}>
                {/* Vertical connector line */}
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    top: 42,
                    bottom: 42,
                    width: 1,
                    background: "linear-gradient(180deg, rgba(204,26,26,0.5), rgba(204,26,26,0.08))",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {PROCESS.map((step, i) => {
                    const { icon: StepIcon } = step;
                    return (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.08, duration: 0.55 }}
                        style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #CC1A1A, #9B1D28)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            position: "relative",
                            zIndex: 2,
                            boxShadow: "0 4px 14px rgba(204,26,26,0.3)",
                          }}
                        >
                          <StepIcon size={16} color="white" strokeWidth={2} />
                        </div>
                        <div
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 14,
                            padding: "12px 16px",
                            flex: 1,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <span
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: 10,
                                fontWeight: 700,
                                color: "#CC1A1A",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {step.step}
                            </span>
                            <span
                              style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 700,
                                fontSize: 14,
                                color: "var(--color-foreground)",
                              }}
                            >
                              {step.label}
                            </span>
                          </div>
                          <p
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 12.5,
                              color: "var(--color-muted)",
                              lineHeight: 1.55,
                              margin: 0,
                            }}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center", marginTop: "clamp(3rem, 7vw, 5rem)" }}
        >
          <motion.a
            href="#demo"
            whileHover={{ scale: 1.04, boxShadow: "0 20px 48px rgba(204,26,26,0.35)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 40px",
              borderRadius: 100,
              background: "linear-gradient(135deg, #CC1A1A, #9B1D28)",
              color: "#FFFFFF",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 12px 32px rgba(204,26,26,0.28)",
              letterSpacing: "0.02em",
            }}
          >
            Book a Free Automation Audit →
          </motion.a>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: "var(--color-muted)",
              marginTop: 14,
            }}
          >
            Free · 30 minutes · No commitment required
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ai-auto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

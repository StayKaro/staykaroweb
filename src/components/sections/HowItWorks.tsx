"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Cpu, Rocket, Plug, GraduationCap, TrendingUp } from "lucide-react";

const STEPS = [
  {
    num: "01", icon: Search,        title: "Discover",   color: "#9B1D28",
    desc: "Deep discovery session — we map your workflows, identify pain points, and define AI objectives that drive the highest ROI.",
  },
  {
    num: "02", icon: Cpu,           title: "Design",     color: "#F16A6A",
    desc: "Our engineers architect the optimal AI system, tailored to your specific processes, data sources, and business outcomes.",
  },
  {
    num: "03", icon: Rocket,        title: "Deploy",     color: "#9B1D28",
    desc: "Your AI infrastructure goes live on secure cloud with zero downtime, full monitoring, and instant rollback capability.",
  },
  {
    num: "04", icon: Plug,          title: "Integrate",  color: "#F16A6A",
    desc: "Seamless connections to your CRM, WhatsApp, email, databases, and every tool your team already uses.",
  },
  {
    num: "05", icon: GraduationCap, title: "Train",      color: "#9B1D28",
    desc: "AI agents learn from historical data and live interactions — continuously improving accuracy, tone, and decision-making.",
  },
  {
    num: "06", icon: TrendingUp,    title: "Scale",      color: "#F16A6A",
    desc: "As your business grows, your AI workforce scales automatically — handling increased volume without additional cost.",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="how-it-works"
      style={{
        background: "transparent",
        padding: "clamp(4rem,10vw,7rem) clamp(1.5rem,5vw,8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic pattern and radial background glows */}
      <div className="dark-pattern-dots" />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 30%, rgba(155,29,40,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(241,106,106,0.08) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem,7vw,5rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
              color: "#F16A6A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
            }}
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "var(--color-foreground)",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
            }}
          >
            From Workflow Audit to{" "}
            <span style={{ color: "#F16A6A" }}>AI-Powered</span>{" "}
            in 6 Steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.8vw,1.15rem)",
              color: "var(--color-muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.65,
            }}
          >
            A structured discovery-to-deployment process — we map your workflows, build custom agents,
            and get them live and delivering results within days, not months.
          </motion.p>
        </div>

        {/* DESKTOP VIEW: Horizontal Interactive Timeline (lg and up) */}
        <div className="hidden lg:block relative w-full h-[540px] my-12">
          {/* Main Horizontal Timeline Line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "40px",
              right: "40px",
              height: "2px",
              background: "linear-gradient(90deg, rgba(241,106,106,0.05) 0%, rgba(241,106,106,0.3) 30%, rgba(241,106,106,0.3) 70%, rgba(241,106,106,0.05) 100%)",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          />

          {/* Glowing Animated Particle along the line */}
          <motion.div
            animate={{ left: ["40px", "calc(100% - 40px)"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "50%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#F16A6A",
              boxShadow: "0 0 10px #F16A6A, 0 0 20px #F16A6A",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Timeline Step Columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              height: "100%",
              position: "relative",
              zIndex: 3,
            }}
          >
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isOdd = index % 2 === 0; // Steps 1, 3, 5 are odd index-wise (0, 2, 4), showing ABOVE
              const isActive = activeStep === index;

              return (
                <div
                  key={step.num}
                  className="relative flex flex-col items-center justify-center h-full"
                  onMouseEnter={() => setActiveStep(index)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Step Circle Node on the Line */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      boxShadow: isActive ? "0 0 20px rgba(241,106,106,0.45)" : "none",
                      backgroundColor: isActive ? "#F16A6A" : "#FFFFFF",
                      borderColor: isActive ? "#F16A6A" : "#E7DED5",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      border: "2px solid",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 5,
                      transition: "color 0.2s ease",
                      color: isActive ? "#0F0506" : "#9B1D28",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>
                      {step.num}
                    </span>
                  </motion.div>

                  {/* Step Title Label under/above the circle (Always visible static helper) */}
                  <div
                    style={{
                      position: "absolute",
                      ...(isOdd ? { top: "calc(50% + 32px)" } : { bottom: "calc(50% + 32px)" }),
                      fontFamily: "var(--font-heading)",
                      fontWeight: 600,
                      fontSize: 13,
                      color: isActive ? "var(--color-foreground)" : "rgba(250,247,242,0.35)",
                      textAlign: "center",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {step.title}
                  </div>

                  {/* Connecting Line and Detail Card */}
                  <AnimatePresence>
                    {isActive && (
                      <>
                        {/* Vertical Connector Line */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 48 }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          style={{
                            position: "absolute",
                            left: "50%",
                            width: 1.5,
                            background: `linear-gradient(to ${isOdd ? "top" : "bottom"}, #F16A6A, rgba(241,106,106,0.1))`,
                            transform: "translateX(-50%)",
                            zIndex: 4,
                            ...(isOdd ? { bottom: "calc(50% + 24px)" } : { top: "calc(50% + 24px)" })
                          }}
                        />

                        {/* Floating Card */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.93, y: isOdd ? -15 : 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.93, y: isOdd ? -15 : 15 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 290,
                            zIndex: 10,
                            pointerEvents: "none", // Let hover pass through to column container
                            ...(isOdd ? { bottom: "calc(50% + 72px)" } : { top: "calc(50% + 72px)" })
                          }}
                        >
                          <div style={{
                            background: "var(--color-card-light)",
                            border: "1px solid #E7DED5",
                            borderRadius: 20,
                            padding: "20px",
                            boxShadow: "0 12px 36px rgba(155,29,40,0.08)",
                            position: "relative",
                          }}>
                            {/* Card Header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: "rgba(155,29,40,0.12)", border: "1px solid rgba(155,29,40,0.25)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <Icon size={16} color="#F16A6A" strokeWidth={2} />
                              </div>
                              <div>
                                <span style={{
                                  display: "block",
                                  fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700,
                                  color: "#F16A6A", letterSpacing: "0.08em", textTransform: "uppercase",
                                  lineHeight: 1, marginBottom: 2
                                }}>
                                  Step {step.num}
                                </span>
                                <h4 style={{
                                  fontFamily: "var(--font-heading)", fontWeight: 700,
                                  fontSize: 15, color: "#111111", margin: 0,
                                }}>
                                  {step.title}
                                </h4>
                              </div>
                            </div>
                            {/* Card Body */}
                            <p style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 13,
                              color: "#555555",
                              lineHeight: 1.6,
                              margin: 0,
                            }}>
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE VIEW: Vertical Timeline (hidden on lg and up) */}
        <div className="block lg:hidden relative my-8" style={{ paddingLeft: 40 }}>
          {/* Vertical Line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 20,
              width: "2px",
              background: "linear-gradient(to bottom, rgba(241,106,106,0.05) 0%, rgba(241,106,106,0.3) 15%, rgba(241,106,106,0.3) 85%, rgba(241,106,106,0.05) 100%)",
            }}
          />

          {/* Mobile Steps List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                  style={{ position: "relative" }}
                >
                  {/* Step Node Circle */}
                  <div
                    style={{
                      position: "absolute",
                      left: -32,
                      top: 4,
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#F16A6A",
                      border: "2px solid var(--color-background)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(155,29,40,0.25)",
                      zIndex: 2,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 8, color: "#FFFFFF" }}>
                      {step.num}
                    </span>
                  </div>

                  {/* Step Content Card */}
                  <div
                    style={{
                      background: "var(--color-card-light)",
                      border: "1px solid #E7DED5",
                      borderRadius: 16,
                      padding: "16px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "rgba(241,106,106,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={14} color="#F16A6A" strokeWidth={2} />
                      </div>
                      <div>
                        <span style={{
                          display: "block",
                          fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700,
                          color: "#F16A6A", letterSpacing: "0.08em", textTransform: "uppercase",
                          lineHeight: 1, marginBottom: 2
                        }}>
                          Step {step.num}
                        </span>
                        <h4 style={{
                          fontFamily: "var(--font-heading)", fontWeight: 700,
                          fontSize: 14, color: "#111111", margin: 0,
                        }}>
                          {step.title}
                        </h4>
                      </div>
                    </div>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12.5,
                      color: "#555555",
                      lineHeight: 1.55,
                      margin: 0,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Affordance hint — desktop only */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
          className="hidden lg:block"
          style={{
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--color-muted)",
            marginTop: "clamp(1rem,2vw,1.5rem)",
            letterSpacing: "0.04em",
          }}
        >
          Hover each step to explore the detail
        </motion.p>
      </div>
    </section>
  );
}

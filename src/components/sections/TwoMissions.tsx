"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap } from "lucide-react";

export default function TwoMissions() {
  return (
    <section
      id="two-missions"
      style={{
        background: "#FAF7F2",
        padding: "clamp(4.5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid #E7DED5",
      }}
    >
      {/* Subtle red glow */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(204,26,26,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-5xl mx-auto" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Eyebrow */}
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
            marginBottom: 20,
          }}
        >
          Two Paths. One Purpose.
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1, duration: 0.9 }}
          className="display-md"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#111111",
            marginBottom: 22,
            lineHeight: 1.1,
          }}
        >
          Two Missions.{" "}
          <span className="text-gradient">One Mission Statement.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.8vw, 1.12rem)",
            color: "#555555",
            maxWidth: 620,
            margin: "0 auto 56px",
            lineHeight: 1.7,
          }}
        >
          Today, we help businesses run smarter with AI — faster processes, better outcomes, custom agents built for your team. Tomorrow, we help students grow smarter with AI — accessible tools, better learning, and preparation for a world that runs on intelligence.
        </motion.p>

        {/* Two CTA cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(1rem, 2.5vw, 1.75rem)",
            maxWidth: 720,
            margin: "0 auto",
          }}
          className="two-missions-grid"
        >
          {/* Business CTA */}
          <motion.a
            href="#demo"
            whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(155,29,40,0.18)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 14,
              padding: "clamp(1.5rem, 3vw, 2rem)",
              borderRadius: 20,
              background: "linear-gradient(135deg, #9B1D28, #C73A45)",
              color: "#FFFFFF",
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(155,29,40,0.2)",
              transition: "box-shadow 0.3s",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Building2 size={22} color="white" strokeWidth={1.8} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                For Businesses
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  lineHeight: 1.3,
                }}
              >
                Talk to Us About Your Business →
              </div>
            </div>
          </motion.a>

          {/* Student CTA */}
          <motion.a
            href="#students"
            whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(155,29,40,0.14)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 14,
              padding: "clamp(1.5rem, 3vw, 2rem)",
              borderRadius: 20,
              background: "#FFFFFF",
              color: "#111111",
              textDecoration: "none",
              border: "1.5px solid #E7DED5",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.3s",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                background: "rgba(204,26,26,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap size={22} color="#9B1D28" strokeWidth={1.8} />
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(0,0,0,0.4)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                For Students
              </div>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: "#9B1D28",
                  lineHeight: 1.3,
                }}
              >
                Join the Student Waitlist →
              </div>
            </div>
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .two-missions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

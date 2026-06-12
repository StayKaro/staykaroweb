"use client";

import { motion } from "framer-motion";

const METRICS = [
  { value: "10K+", label: "AI Calls Handled Daily",  detail: "across all deployed clients" },
  { value: "98%",  label: "Client Satisfaction Rate", detail: "measured over 12-month cohort" },
  { value: "3×",   label: "Faster Operations",         detail: "avg. vs. manual processes" },
  { value: "7d",   label: "Average Time to Live",      detail: "from contract to deployment" },
];
export default function TrustBar() {
  return (
    <section
      style={{
        background: "#FAF7F2",
        borderTop: "1px solid #E7DED5",
        borderBottom: "1px solid #E7DED5",
        padding: "clamp(2.5rem,6vw,4rem) clamp(1.5rem,5vw,8rem)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(1.5rem,4vw,3rem)",
            textAlign: "center",
          }}
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.08 }}
            >
              <div style={{
                fontFamily: "var(--font-heading)", fontWeight: 800,
                fontSize: "clamp(2rem,3.5vw,2.8rem)",
                color: "#9B1D28", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 7,
              }}>
                {m.value}
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem,1.3vw,0.95rem)",
                color: "#111111", fontWeight: 600, marginBottom: 4,
              }}>
                {m.label}
              </div>
              <div style={{
                fontFamily: "var(--font-body)", fontSize: 11,
                color: "#555555", letterSpacing: "0.01em",
              }}>
                {m.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

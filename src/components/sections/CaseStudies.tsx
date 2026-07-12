"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const METRICS = [
  { label: "Response Time",         before: "8 hrs",     after: "< 1 min",  improvement: "480×",   positive: true  },
  { label: "Lead Conversion",       before: "12%",       after: "34%",      improvement: "+183%",  positive: true  },
  { label: "Operational Cost",      before: "₹4.2L/mo",  after: "₹1.1L/mo", improvement: "−74%",   positive: false },
  { label: "Customer Satisfaction", before: "71%",       after: "96%",      improvement: "+35 pts", positive: true  },
];

const BEFORE = [
  "Manual call handling — 8-hour average response times",
  "Sales team buried in unqualified, cold leads",
  "Operations tracked across disconnected spreadsheets",
  "Training delivered once, knowledge lost on churn",
  "Generic software that doesn’t fit how your team actually works",
];

const AFTER = [
  "AI caller responds in under 60 seconds, 24/7/365",
  "Only appointment-ready, qualified leads reach sales",
  "Real-time OPS dashboard with AI-generated recommendations",
  "LMS AI tutor adapts to every learner, continuously updated",
  "Custom AI agents and automations built around your exact processes",
];

function MetricCard({ metric, index }: { metric: typeof METRICS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#9B1D28" : "var(--color-card-light)",
        borderRadius: 20,
        padding: "clamp(1.25rem,2.5vw,2rem)",
        border: `1px solid ${hovered ? "#9B1D28" : "#E7DED5"}`,
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
        boxShadow: hovered ? "0 16px 48px rgba(155,29,40,0.22)" : "0 8px 32px rgba(155,29,40,0.06)",
        cursor: "default",
      }}
    >
      <div style={{
        fontFamily: "var(--font-heading)", fontWeight: 800,
        fontSize: "clamp(2rem,4vw,2.8rem)",
        color: hovered ? "#FFFFFF" : "#9B1D28",
        letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 7,
        transition: "color 0.3s",
      }}>
        {metric.improvement}
      </div>
      <div style={{
        fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 12,
        color: hovered ? "rgba(255,255,255,0.75)" : "#555555",
        textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16,
        transition: "color 0.3s",
      }}>
        {metric.label}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:600, color: hovered ? "rgba(255,255,255,0.45)" : "rgba(85,85,85,0.5)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Before</div>
          <div style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:14, color: hovered ? "rgba(255,255,255,0.65)" : "rgba(85,85,85,0.8)" }}>{metric.before}</div>
        </div>
        <ArrowRight size={13} color={hovered ? "rgba(255,255,255,0.4)" : "rgba(85,85,85,0.4)"} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:600, color: hovered ? "rgba(255,255,255,0.45)" : "rgba(85,85,85,0.5)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>After</div>
          <div style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:14, color: hovered ? "#FFFFFF" : "#111111" }}>{metric.after}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      style={{
        background: "#FAF7F2",
        padding: "clamp(4rem,10vw,7rem) clamp(1.5rem,5vw,8rem)",
        borderBottom: "1px solid #E7DED5",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem,7vw,5rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{
              display: "inline-block", fontFamily: "var(--font-body)",
              fontSize: 12, fontWeight: 600, color: "#9B1D28",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
            }}
          >
            Results That Speak
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#111111",
              letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16,
            }}
          >
            Before AI vs{" "}
            <span style={{ color: "#9B1D28" }}>After AI</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.8vw,1.1rem)",
              color: "#555555", maxWidth: 540, margin: "0 auto", lineHeight: 1.65,
            }}
          >
            Real outcomes from custom AI agents and automations we&apos;ve deployed. Every business is different — we&apos;ll model projections specific to your workflows during your free audit.
          </motion.p>
        </div>

        {/* Before / After comparison */}
        <div className="case-studies-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(1rem,3vw,1.5rem)",
          marginBottom: "clamp(2.5rem,6vw,4rem)",
        }}>
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65 }}
            style={{
              background: "var(--color-card-light)", borderRadius: 24,
              padding: "clamp(1.5rem,3vw,2.5rem)",
              border: "1px solid #E7DED5",
              boxShadow: "0 8px 32px rgba(155,29,40,0.06)",
            }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(155,29,40,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <TrendingDown size={18} color="#9B1D28" />
              </div>
              <span style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:16, color:"#9B1D28" }}>Before AI</span>
            </div>
            {BEFORE.map((point, i) => (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:13, alignItems:"flex-start" }}>
                <span style={{ color:"#9B1D28", fontSize:14, marginTop:2, flexShrink:0, fontWeight:700 }}>✕</span>
                <span style={{ fontFamily:"var(--font-body)", fontSize:"clamp(0.875rem,1.4vw,0.93rem)", color:"#555555", lineHeight:1.65 }}>{point}</span>
              </div>
            ))}
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65 }}
            style={{
              background: "linear-gradient(135deg, #9B1D28 0%, #C73A45 50%, #F16A6A 100%)", borderRadius: 24,
              padding: "clamp(1.5rem,3vw,2.5rem)",
              boxShadow: "0 20px 60px rgba(155, 29, 40, 0.35)",
            }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <TrendingUp size={18} color="#FFFFFF" />
              </div>
              <span style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:16, color:"#FFFFFF" }}>After AI</span>
            </div>
            {/* Lead metric */}
            <div style={{
              background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 16px",
              marginBottom: 18, border: "1px solid rgba(255,255,255,0.18)",
            }}>
              <div style={{ fontFamily:"var(--font-heading)", fontWeight:800, fontSize:"clamp(1.8rem,3vw,2.4rem)", color:"#FFFFFF", lineHeight:1 }}>+183%</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:12, color:"rgba(255,255,255,0.7)", marginTop:4 }}>average lead conversion increase</div>
            </div>
            {AFTER.map((point, i) => (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:13, alignItems:"flex-start" }}>
                <span style={{ color:"rgba(255,255,255,0.9)", fontSize:14, marginTop:2, flexShrink:0, fontWeight:700 }}>✓</span>
                <span style={{ fontFamily:"var(--font-body)", fontSize:"clamp(0.875rem,1.4vw,0.93rem)", color:"rgba(255,255,255,0.85)", lineHeight:1.65 }}>{point}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Metric cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(1rem,2vw,1.5rem)",
        }}>
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center", marginTop: 28,
            fontFamily: "var(--font-body)", fontSize: 11,
            color: "#555555", letterSpacing: "0.02em",
          }}
        >
          * Figures represent typical outcomes across deployed clients. Individual results depend on business size, industry, and use-case.
        </motion.p>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .case-studies-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

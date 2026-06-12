"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Bell } from "lucide-react";

export default function StudentComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setApiError("");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="students"
      style={{
        background: "linear-gradient(135deg, #0F0506 0%, #1A0708 40%, #240B0B 100%)",
        padding: "clamp(5rem, 12vw, 9rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 50% 60%, rgba(204,26,26,0.16) 0%, transparent 55%), radial-gradient(ellipse at 90% 10%, rgba(241,106,106,0.06) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative floating shapes */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "12%",
          left: "6%",
          width: 56,
          height: 56,
          borderRadius: 18,
          background: "rgba(204,26,26,0.08)",
          border: "1px solid rgba(204,26,26,0.14)",
        }}
      />
      <motion.div
        animate={{ y: [0, 18, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "15%",
          right: "7%",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(241,106,106,0.06)",
          border: "1px solid rgba(241,106,106,0.1)",
        }}
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        style={{
          position: "absolute",
          top: "55%",
          right: "12%",
          width: 22,
          height: 22,
          borderRadius: 7,
          background: "rgba(204,26,26,0.12)",
        }}
      />

      <div
        className="max-w-3xl mx-auto"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        {/* Icon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(204,26,26,0.1)",
            border: "1px solid rgba(204,26,26,0.2)",
            borderRadius: 100,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <Sparkles size={14} color="#F16A6A" />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 700,
              color: "#F16A6A",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Coming Soon
          </span>
          <Sparkles size={14} color="#F16A6A" />
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.08, duration: 0.85 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}
        >
          <GraduationCap size={52} color="#CC1A1A" strokeWidth={1.5} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="display-md"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-foreground)",
            marginBottom: 22,
            lineHeight: 1.1,
          }}
        >
          Something Big Is Coming{" "}
          <span className="text-gradient">For Students.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.25 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            color: "var(--color-muted)",
            lineHeight: 1.68,
            marginBottom: 44,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          We&apos;re building a student-first AI platform that helps you learn smarter, prepare for the future, and access tools that were once only available to large enterprises. Be the first to know when it launches.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {submitted ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 100,
                padding: "14px 32px",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 11, color: "white", fontWeight: 700 }}>✓</span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#22C55E",
                }}
              >
                You&apos;re on the list! We&apos;ll reach out soon.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: 10,
                maxWidth: 460,
                margin: "0 auto",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                required
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1 1 220px",
                  padding: "13px 20px",
                  borderRadius: 100,
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--color-foreground)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(204,26,26,0.5)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.04, boxShadow: "0 12px 32px rgba(204,26,26,0.35)" } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  borderRadius: 100,
                  background: loading ? "rgba(155,29,40,0.5)" : "linear-gradient(135deg, #CC1A1A, #9B1D28)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 14,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 8px 24px rgba(204,26,26,0.28)",
                  whiteSpace: "nowrap",
                }}
              >
                <Bell size={15} />
                {loading ? "Joining…" : "Join the Waitlist"}
              </motion.button>
            </form>
          )}
          {apiError && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#F16A6A",
                marginTop: 10,
              }}
            >
              {apiError}
            </p>
          )}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(255,255,255,0.28)",
              marginTop: 14,
            }}
          >
            No spam. Unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

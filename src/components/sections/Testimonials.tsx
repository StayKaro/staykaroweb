"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle, PenLine } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "StayKaro's AI caller transformed our lead qualification. We went from 12% to 34% conversion in 60 days — that's a number our entire sales team couldn't hit manually.",
    name: "Rajesh Mehta",
    role: "CEO",
    company: "TechVentures India",
    avatar: "RM",
    color: "#9B1D28",
    stars: 5,
  },
  {
    quote: "The OPS platform gives us real-time visibility we never had before. My team's efficiency improved by over 60% and I can finally see exactly where deals are getting stuck.",
    name: "Priya Sharma",
    role: "COO",
    company: "GrowthFirst Consulting",
    avatar: "PS",
    color: "#F16A6A",
    stars: 5,
  },
  {
    quote: "We replaced 3 different tools with StayKaro's LMS. The AI tutor is uncanny — students complete courses 2× faster and actually retain the material.",
    name: "Arjun Kapoor",
    role: "Head of L&D",
    company: "SkillBridge Academy",
    avatar: "AK",
    color: "#9B1D28",
    stars: 5,
  },
  {
    quote: "The 24/7 availability alone was worth the switch. Our AI agent handles support calls at 2am with the same quality as our best human agent.",
    name: "Sunita Rao",
    role: "VP Operations",
    company: "Nexus Healthcare",
    avatar: "SR",
    color: "#F16A6A",
    stars: 5,
  },
  {
    quote: "I expected the usual 2-month setup process. We were live in 8 days and saw measurable ROI in the first week. Nothing like any vendor we've worked with.",
    name: "Vikram Singh",
    role: "Founder",
    company: "FastTrack Realty",
    avatar: "VS",
    color: "#9B1D28",
    stars: 5,
  },
  {
    quote: "StayKaro is a genuine strategic partner. They understood our business deeply before writing a single line of AI script. The difference shows in every call.",
    name: "Meera Nair",
    role: "CTO",
    company: "Infinity Digital",
    avatar: "MN",
    color: "#F16A6A",
    stars: 5,
  },
];

const STAR_LABELS = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

function StarDisplay() {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill="#F16A6A" color="#F16A6A" />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      style={{
        background: "var(--color-card-light)",
        borderRadius: 20,
        padding: "clamp(1.5rem, 2.5vw, 2rem)",
        border: "1px solid #E7DED5",
        boxShadow: "0 8px 32px rgba(155,29,40,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
      }}
    >
      <div>
        <StarDisplay />
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(0.9rem, 1.4vw, 0.97rem)",
          color: "#555555",
          lineHeight: 1.72,
          margin: 0,
        }}>
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: `linear-gradient(135deg, ${t.color}, ${t.color}90)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#FFFFFF" }}>{t.avatar}</span>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14, color: "#111111", lineHeight: 1.3 }}>{t.name}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555555", marginTop: 3, lineHeight: 1.4 }}>
            {t.role} · <span style={{ color: "#9B1D28", fontWeight: 600 }}>{t.company}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Star Rating Input ── */
function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < display;
          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHovered(i + 1)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onChange(i + 1)}
              style={{
                background: "none",
                border: "none",
                padding: 2,
                cursor: "pointer",
                transition: "transform 0.12s",
                transform: filled ? "scale(1.15)" : "scale(1)",
              }}
              aria-label={`${i + 1} star${i > 0 ? "s" : ""}`}
            >
              <Star
                size={28}
                fill={filled ? "#F16A6A" : "transparent"}
                color={filled ? "#F16A6A" : "rgba(255,255,255,0.25)"}
                strokeWidth={1.8}
              />
            </button>
          );
        })}
      </div>
      <div style={{
        fontFamily: "var(--font-body)",
        fontSize: 12,
        color: display ? "#F16A6A" : "rgba(255,255,255,0.3)",
        fontWeight: 600,
        minHeight: 18,
        transition: "color 0.2s",
      }}>
        {display ? STAR_LABELS[display - 1] : "Tap to rate"}
      </div>
    </div>
  );
}

/* ── Review Form ── */
function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({ name: "", role: "", company: "", review: "" });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) return;
    setApiError("");
    setLoading(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    border: "1.5px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.06)",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "var(--color-foreground)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: 0.2, duration: 0.7 }}
      style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}
    >
      {/* Toggle button */}
      {!open && (
        <div style={{ textAlign: "center" }}>
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(204,26,26,0.3)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 32px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.14)",
              color: "var(--color-foreground)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
          >
            <PenLine size={17} color="#F16A6A" />
            Share Your Experience
          </motion.button>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(255,255,255,0.28)", marginTop: 10 }}>
            Used Stay Karo? Tell others what you think.
          </p>
        </div>
      )}

      {/* Form panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{
              maxWidth: 720,
              margin: "0 auto",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: "clamp(1.75rem, 4vw, 2.5rem)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{ textAlign: "center", padding: "2rem 0" }}
              >
                <CheckCircle size={52} color="#22C55E" strokeWidth={1.5} style={{ marginBottom: 16 }} />
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)", color: "var(--color-foreground)", marginBottom: 10 }}>
                  Thank you, {form.name.split(" ")[0] || "friend"}!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-muted)", lineHeight: 1.65 }}>
                  Your review has been received. We&apos;ll review it and share it on our site.
                </p>
                <button
                  onClick={() => { setOpen(false); setSubmitted(false); setRating(0); setForm({ name: "", role: "", company: "", review: "" }); }}
                  style={{ marginTop: 24, fontFamily: "var(--font-body)", fontSize: 13, color: "#F16A6A", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Write another review
                </button>
              </motion.div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", color: "var(--color-foreground)", marginBottom: 4 }}>
                      Write a Review
                    </h3>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-muted)" }}>
                      Your experience helps others make better decisions.
                    </p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                {/* Star rating */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                    Your Rating <span style={{ color: "#F16A6A" }}>*</span>
                  </label>
                  <StarRatingInput value={rating} onChange={setRating} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="review-name-grid">
                    <div>
                      <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                        Your Name <span style={{ color: "#F16A6A" }}>*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Arjun Mehta"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(204,26,26,0.5)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                      />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                        Role / Title
                      </label>
                      <input
                        type="text"
                        placeholder="CEO, Founder…"
                        value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(204,26,26,0.5)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Your company name"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(204,26,26,0.5)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", display: "block", marginBottom: 6 }}>
                      Your Review <span style={{ color: "#F16A6A" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your experience with Stay Karo — what changed for your business?"
                      value={form.review}
                      onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(204,26,26,0.5)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    {rating === 0 && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#F16A6A", margin: 0 }}>
                        Please select a star rating above
                      </p>
                    )}
                    {apiError && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#F16A6A", margin: 0 }}>
                        {apiError}
                      </p>
                    )}
                    <div style={{ marginLeft: "auto" }}>
                      <motion.button
                        type="submit"
                        disabled={rating === 0 || loading}
                        whileHover={rating > 0 && !loading ? { scale: 1.04, boxShadow: "0 12px 32px rgba(204,26,26,0.35)" } : {}}
                        whileTap={rating > 0 && !loading ? { scale: 0.97 } : {}}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 28px",
                          borderRadius: 100,
                          background: rating === 0 || loading ? "rgba(155,29,40,0.35)" : "linear-gradient(135deg, #CC1A1A, #9B1D28)",
                          color: "#FFFFFF",
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          fontSize: 14,
                          border: "none",
                          cursor: rating === 0 || loading ? "not-allowed" : "pointer",
                          boxShadow: rating > 0 && !loading ? "0 8px 24px rgba(204,26,26,0.28)" : "none",
                          transition: "all 0.2s",
                        }}
                      >
                        <Send size={14} />
                        {loading ? "Submitting…" : "Submit Review"}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 540px) {
          .review-name-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}

/* ══════════════════════════════════
   Testimonials section
   ══════════════════════════════════ */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        background: "transparent",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dark-pattern-grid" style={{ opacity: 0.8 }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(155,29,40,0.12) 0%, transparent 65%), radial-gradient(circle at 90% 10%, rgba(241,106,106,0.05) 0%, transparent 40%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 7vw, 5rem)" }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#F16A6A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="display-md"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-foreground)", marginBottom: 16 }}
          >
            What Our Clients{" "}
            <span className="text-gradient">Actually Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.8vw,1.1rem)", color: "var(--color-muted)", maxWidth: 460, margin: "0 auto", lineHeight: 1.65 }}
          >
            Businesses running custom AI agents and automations built by Stay Karo — in their own words.
          </motion.p>
        </div>

        {/* 3-col testimonials grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(1rem, 2vw, 1.5rem)",
        }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Write a review */}
        <ReviewForm />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CalendarDays, Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle } from "lucide-react";

/* ── Validation helpers ── */
const isEmpty   = (v: string) => v.trim().length === 0;
const badEmail  = (v: string) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const badPhone  = (v: string) => v.trim().length > 0 && !/^[+\d\s\-().]{7,20}$/.test(v.trim());
const tooShort  = (v: string, n: number) => v.trim().length < n;

function validate(form: { name: string; phone: string; email: string; company: string; message: string }) {
  const e: Partial<typeof form> = {};
  if (isEmpty(form.name))                      e.name    = "Name is required";
  else if (tooShort(form.name, 2))             e.name    = "Name must be at least 2 characters";
  if (isEmpty(form.phone))                     e.phone   = "Phone number is required";
  else if (badPhone(form.phone))               e.phone   = "Enter a valid phone number";
  if (isEmpty(form.email))                     e.email   = "Work email is required";
  else if (badEmail(form.email))               e.email   = "Enter a valid email address";
  if (isEmpty(form.company))                   e.company = "Company name is required";
  return e;
}

/* ── Contact card ── */
const CONTACT = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 7013987868",
    href: "tel:+917013987868",
    note: "Mon–Fri, 9am–7pm IST",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/917013987868",
    note: "Usually replies within 10 min",
  },
  {
    icon: Mail,
    label: "Email",
    value: "staykaroatsales@staykaro.org",
    href: "mailto:staykaroatsales@staykaro.org",
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Hyderabad, India",
    href: "#",
    note: "Available for in-person demos",
  },
];

export default function FinalCTA() {
  const [form, setForm]       = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [errors, setErrors]   = useState<Partial<typeof form>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof form, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");

  const setField = (field: keyof typeof form, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      const e = validate(next);
      setErrors(prev => ({ ...prev, [field]: e[field] }));
    }
  };

  const blur = (field: keyof typeof form) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const e = validate(form);
    setErrors(prev => ({ ...prev, [field]: e[field] }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");
    setTouched({ name: true, phone: true, email: true, company: true, message: true });
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: "#111111",
    outline: "none",
    background: "#FAF7F2",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const inputStyle = (field: keyof typeof form): React.CSSProperties => ({
    ...inputBase,
    border: `1.5px solid ${touched[field] && errors[field] ? "#E53E3E" : "#E7DED5"}`,
    boxShadow: touched[field] && errors[field] ? "0 0 0 3px rgba(229,62,62,0.1)" : "none",
  });

  return (
    <section
      id="demo"
      style={{
        background: "linear-gradient(135deg, #9B1D28 0%, #C73A45 50%, #F16A6A 100%)",
        padding: "clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 60% 0%, rgba(241,106,106,0.3) 0%, transparent 55%), radial-gradient(ellipse at 30% 100%, rgba(122,21,32,0.3) 0%, transparent 55%)", pointerEvents: "none" }} />

      <div className="max-w-6xl mx-auto" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,7vw,6rem)", alignItems: "flex-start" }}
          className="grid-cta"
        >
          {/* ── Left: copy + contact ── */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}
            >
              Get Started
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              transition={{ delay: 0.1, duration: 0.9 }}
              className="display-lg"
              style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF", marginBottom: 24, lineHeight: 1.05 }}
            >
              See Stay Karo{" "}
              <span style={{ background: "linear-gradient(135deg,#E8C9A0,#FFFFFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                in Action
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.8vw,1.15rem)", color: "rgba(255,255,255,0.85)", lineHeight: 1.65, marginBottom: 36 }}
            >
              Book a free consultation — we&apos;ll audit your workflows, identify automation opportunities, and show you exactly how custom AI agents fit your business — live in 7 days or less.
            </motion.p>

            {/* Bullets */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}
            >
              {[
                { icon: "⚡", text: "Live in 7 days, guaranteed" },
                { icon: "🔗", text: "Connects to your existing tools" },
                { icon: "📊", text: "ROI dashboard from day one" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* ── Contact details ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              transition={{ delay: 0.4 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.18)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Or reach us directly</span>
                <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.18)" }} />
              </div>
              <div className="contact-cards-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {CONTACT.map(({ icon: Icon, label, value, href, note }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -2, background: "rgba(255,255,255,0.14)" }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 11,
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.09)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      textDecoration: "none",
                      transition: "all 0.18s",
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <Icon size={16} color="white" strokeWidth={1.8} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.92)", lineHeight: 1.3, marginBottom: 2 }}>{value}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={9} color="rgba(255,255,255,0.35)" />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "rgba(255,255,255,0.38)" }}>{note}</span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              background: "var(--color-card-light)",
              borderRadius: 24,
              padding: "clamp(2rem,4vw,3rem)",
              boxShadow: "0 32px 80px rgba(15,5,6,0.18)",
              border: "1px solid #E7DED5",
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
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", color: "#111111", marginBottom: 12 }}>We&apos;ll be in touch!</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#555555", lineHeight: 1.65 }}>Expect a calendar link from our team within 24 hours. We&apos;ll come prepared with a demo built around your use-case.</p>
              </motion.div>
            ) : (
              <>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.1rem,2vw,1.4rem)", color: "#111111", marginBottom: 6 }}>
                    <CalendarDays size={18} style={{ display: "inline", marginRight: 8, color: "#9B1D28", verticalAlign: "middle" }} />
                    Book Your Demo
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#555555" }}>Free · 30 minutes · No commitment</p>
                </div>

                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
                    {/* Name */}
                    <div>
                      <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#555555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Your Name *</label>
                      <input
                        type="text"
                        placeholder="Arjun Mehta"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        onBlur={() => blur("name")}
                        style={inputStyle("name")}
                        onFocus={(e) => { if (!(touched.name && errors.name)) e.target.style.borderColor = "#9B1D28"; }}
                      />
                      {touched.name && errors.name && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E53E3E", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                          <span>⚠</span> {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Phone */}
                    <div>
                      <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#555555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 7013987868"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        onBlur={() => blur("phone")}
                        style={inputStyle("phone")}
                        onFocus={(e) => { if (!(touched.phone && errors.phone)) e.target.style.borderColor = "#9B1D28"; }}
                      />
                      {touched.phone && errors.phone && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E53E3E", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                          <span>⚠</span> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#555555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Work Email *</label>
                    <input
                      type="email"
                      placeholder="arjun@company.com"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      onBlur={() => blur("email")}
                      style={inputStyle("email")}
                      onFocus={(e) => { if (!(touched.email && errors.email)) e.target.style.borderColor = "#9B1D28"; }}
                    />
                    {touched.email && errors.email && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E53E3E", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span>⚠</span> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#555555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>Company *</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => setField("company", e.target.value)}
                      onBlur={() => blur("company")}
                      style={inputStyle("company")}
                      onFocus={(e) => { if (!(touched.company && errors.company)) e.target.style.borderColor = "#9B1D28"; }}
                    />
                    {touched.company && errors.company && (
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#E53E3E", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <span>⚠</span> {errors.company}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#555555", letterSpacing: "0.04em", display: "block", marginBottom: 6 }}>
                      What do you want to automate? <span style={{ fontWeight: 400 }}>(optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Inbound sales calls, lead follow-up, internal reporting, custom AI agent..."
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      style={{ ...inputBase, border: "1.5px solid #E7DED5", resize: "none" }}
                      onFocus={(e) => { e.target.style.borderColor = "#9B1D28"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E7DED5"; }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      padding: "14px 28px", borderRadius: 100,
                      background: loading ? "rgba(155,29,40,0.6)" : "#9B1D28",
                      color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 15,
                      border: "none", cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.25s", boxShadow: "0 8px 24px rgba(155,29,40,0.3)",
                      marginTop: 4,
                    }}
                    onMouseEnter={(e) => { if (!loading) { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(155,29,40,0.4)"; } }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(155,29,40,0.3)"; }}
                  >
                    {loading ? "Sending…" : (<><Send size={16} /> Book My Demo</>)}
                  </button>
                  {apiError && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#E53E3E", textAlign: "center", margin: 0 }}>
                      {apiError}
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cta  { grid-template-columns: 1fr !important; }
          .form-row  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

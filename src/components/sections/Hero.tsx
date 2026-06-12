"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE        = [0.16, 1, 0.3, 1] as const;
const SPRING_OVAL = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.6 };
const SPRING_CARD = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.9 };

const LAYERS = [
  {
    id: "caller", num: "01",
    label: "Custom AI Agents",
    desc:  "Built for your exact workflow — handles calls, support, lead qualification, and follow-ups automatically, around the clock.",
    tags:  ["Custom-built", "Any workflow", "24/7 uptime"],
  },
  {
    id: "lms", num: "02",
    label: "LMS Platform",
    desc:  "AI-powered learning management with a personal tutor that adapts to each learner's pace and knowledge gaps.",
    tags:  ["AI Tutor", "Auto-assessments", "Certificates"],
  },
  {
    id: "ops", num: "03",
    label: "OPS Platform",
    desc:  "Command centre for your business — automate workflows, monitor teams, and get AI-driven recommendations in real-time.",
    tags:  ["Workflow automation", "Team analytics", "AI insights"],
  },
  {
    id: "integrations", num: "04",
    label: "Integrations",
    desc:  "50+ pre-built connectors to your CRM, messaging, and finance stack — no rip-and-replace required.",
    tags:  ["50+ connectors", "REST API", "Webhooks"],
  },
  {
    id: "analytics", num: "05",
    label: "Analytics & Insights",
    desc:  "Real-time dashboards, call recordings, performance scores, and AI-generated weekly reports delivered automatically.",
    tags:  ["Live dashboards", "Recordings", "AI reports"],
  },
  {
    id: "security", num: "06",
    label: "Security & Compliance",
    desc:  "End-to-end encryption, role-based access control, full audit logs, and configurable data residency.",
    tags:  ["E2E encryption", "RBAC", "Audit logs"],
  },
] as const;

/* ── Geometry ── */
const CX    = 132;
const RX    = 104;
const RY    = 32;
const GAP   = 50;
const DEPTH = 9;
const FY    = 70;
const DOTX  = CX + RX;     // 236
const LINX  = DOTX + 28;   // 264
const SVG_W = 290;
const SVG_H = FY + (LAYERS.length - 1) * GAP + RY + DEPTH + 30;

/* Rounded rhombus / diamond path — same shape, rx/ry controls flatness & rounding */
function roundedRhombusPath(cx: number, cy: number): string {
  const bx = RX * 0.42;
  const by = RY * 0.42;
  return [
    `M ${cx + RX} ${cy}`,
    `C ${cx + RX} ${cy + by}  ${cx + bx} ${cy + RY}  ${cx} ${cy + RY}`,
    `C ${cx - bx} ${cy + RY}  ${cx - RX} ${cy + by}  ${cx - RX} ${cy}`,
    `C ${cx - RX} ${cy - by}  ${cx - bx} ${cy - RY}  ${cx} ${cy - RY}`,
    `C ${cx + bx} ${cy - RY}  ${cx + RX} ${cy - by}  ${cx + RX} ${cy}`,
    "Z",
  ].join(" ");
}

const CARD_HALF_H = 92;
function cardY(i: number) { return FY + i * GAP - CARD_HALF_H; }
function oy(i: number)    { return FY + i * GAP; }

/* ══════════════════════════════════════════════════
   DiamondStack
   ══════════════════════════════════════════════════ */
function DiamondStack({
  active,
  onPick,
}: {
  active: number;
  onPick: (i: number) => void;
}) {
  const order = useMemo(() => {
    const reversed = [...LAYERS.map((_, i) => i)].reverse();
    return [...reversed.filter(i => i !== active), active];
  }, [active]);

  return (
    <svg
      width={SVG_W}
      height={SVG_H}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      style={{ overflow: "visible", display: "block", flexShrink: 0 }}
    >
      {order.map(i => {
        const layer = LAYERS[i];
        const cy    = oy(i);
        const isA   = active === i;

        return (
          <motion.g
            key={layer.id}
            onClick={() => onPick(i)}
            style={{ cursor: "pointer", transformOrigin: `${CX}px ${cy}px` }}
            animate={{ scale: isA ? 1.1 : 1 }}
            transition={SPRING_OVAL}
          >
            {/* ── 3-D side face (depth illusion) ── */}
            <motion.path
              d={roundedRhombusPath(CX, cy + DEPTH)}
              initial={false}
              animate={{
                fill: isA ? "rgba(155,29,40,0.32)" : "rgba(22,6,7,0.85)",
              }}
              transition={{ duration: 0.22 }}
            />

            {/* ── Glow halo ── */}
            <motion.path
              d={roundedRhombusPath(CX, cy)}
              fill="rgba(241,106,106,0.12)"
              stroke="#F16A6A"
              strokeWidth={18}
              initial={false}
              animate={{ opacity: isA ? 1 : 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              style={{ filter: "blur(16px)", pointerEvents: "none" }}
            />

            {/* ── Top face ── */}
            <motion.path
              d={roundedRhombusPath(CX, cy)}
              initial={false}
              animate={{
                fill:        isA ? "rgba(255,255,255,0.97)" : "rgba(55,15,18,0.88)",
                stroke:      isA ? "#CC1A1A" : "rgba(155,29,40,0.45)",
                strokeWidth: isA ? 1.5 : 1.2,
              }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            />

            {/* ── Specular sheen — white light inside active shape ── */}
            <motion.ellipse
              cx={CX}
              cy={cy - RY * 0.3}
              rx={RX * 0.5}
              ry={RY * 0.32}
              fill="white"
              initial={false}
              animate={{ opacity: isA ? 0.38 : 0.07 }}
              transition={{ duration: 0.25 }}
              style={{ filter: "blur(5px)", pointerEvents: "none" }}
            />

            {/* ── Right-edge dot ── */}
            <motion.circle
              cx={DOTX} cy={cy}
              initial={false}
              animate={{
                r:    isA ? 4 : 2.5,
                fill: isA ? "#9B1D28" : "rgba(155,29,40,0.22)",
              }}
              transition={{ duration: 0.2 }}
            />

            {/* ── Connecting line to label ── */}
            <motion.line
              x1={DOTX} y1={cy} x2={LINX} y2={cy}
              initial={false}
              animate={{
                stroke:      isA ? "#9B1D28" : "rgba(155,29,40,0.14)",
                strokeWidth: isA ? 1.5 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   Hero
   ══════════════════════════════════════════════════ */
export default function Hero() {
  const [active,    setActive]    = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = useMemo(() => ["Sleep.", "Rest.", "Stop.", "Pause.", "Fail."], []);

  useEffect(() => {
    const t = setTimeout(() => setWordIndex(p => (p + 1) % words.length), 2800);
    return () => clearTimeout(t);
  }, [wordIndex, words]);

  const handlePick = (i: number) => setActive(i);
  const layer = LAYERS[active];

  return (
    <section
      id="hero"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "transparent" }}
    >
      {/* ── Red dot grid ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(155,29,40,0.14) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse at 62% 40%, rgba(0,0,0,0.4) 0%, transparent 62%)",
        WebkitMaskImage: "radial-gradient(ellipse at 62% 40%, rgba(0,0,0,0.4) 0%, transparent 62%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto w-full" style={{ padding: "0 clamp(1.5rem,5vw,5rem)" }}>
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            paddingTop: "clamp(5rem,10vw,8rem)",
            paddingBottom: "clamp(3rem,6vw,5rem)",
            gap: 0,
            alignItems: "center",
          }}
        >

          {/* ──────────── LEFT: copy ──────────── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}
            >
              <span style={{ width: 28, height: 2, borderRadius: 9999, background: "#9B1D28", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#9B1D28", letterSpacing: "0.09em", textTransform: "uppercase" }}>
                AI-Powered Business Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.6rem,4.3vw,4.8rem)", fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.03em", textTransform: "uppercase", color: "var(--color-foreground)", marginBottom: 26 }}
            >
              AI Agents &amp;{"\n"}Automation That Never{" "}
              <span style={{ position: "relative", display: "inline-block", overflow: "hidden", verticalAlign: "bottom", height: "1.05em" }}>
                <span style={{ opacity: 0, visibility: "hidden", display: "inline-block" }}>Sleep.</span>
                {words.map((word, i) => (
                  <motion.span key={i}
                    style={{ position: "absolute", left: 0, background: "linear-gradient(135deg,#9B1D28 0%,#F16A6A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    initial={{ opacity: 0, y: "100%" }}
                    transition={{ type: "spring", stiffness: 35, damping: 15 }}
                    animate={wordIndex === i ? { y: "0%", opacity: 1 } : { y: wordIndex > i ? "-100%" : "100%", opacity: 0 }}
                  >{word}</motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
              style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.5vw,1.1rem)", color: "var(--color-muted)", lineHeight: 1.76, marginBottom: 40, maxWidth: 480 }}
            >
              We design and build custom AI agents, automations, and agentic systems
              that run your calls, operations, learning, and internal workflows — 24/7, tailored to your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}
            >
              <motion.a href="#demo"
                whileHover={{ y: -2, backgroundColor: "#7A1520", boxShadow: "0 20px 52px rgba(155,29,40,0.25)" }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "14px 28px", borderRadius: 100, background: "#9B1D28", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 28px rgba(155,29,40,0.18)", transition: "all 0.2s" }}
              >
                Book a Demo <ArrowRight size={16} />
              </motion.a>
              <motion.a href="#products"
                whileHover={{ y: -2, background: "rgba(155,29,40,0.18)", borderColor: "#F16A6A" }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 100, background: "rgba(155,29,40,0.08)", color: "#F16A6A", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15, textDecoration: "none", border: "1.5px solid rgba(155,29,40,0.3)", transition: "all 0.2s" }}
              >
                Explore Platform
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div style={{ display: "flex" }}>
                {["#9B1D28", "#F16A6A", "#7A1520", "#C73A45", "#FF8B8B"].map((c, i) => (
                  <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg,${c}DD,${c}88)`, border: "2px solid var(--color-background)", marginLeft: i === 0 ? 0 : -9, zIndex: 5 - i, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 9, color: "#FFFFFF" }}>{["R", "P", "A", "S", "V"][i]}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "var(--color-foreground)" }}>50+ businesses live on StayKaro</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--color-muted)", marginTop: 2 }}>Average deployment: 7 days</div>
              </div>
            </motion.div>
          </div>

          {/* ──────────── RIGHT: interactive diamond stack ──────────── */}
          <div
            className="hidden lg:block"
            style={{ position: "relative", width: "50vw", transform: "translateX(clamp(6rem, 10vw, 11rem))" }}
          >
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9 }}
            >
              {/* "Your Live Business" pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, marginLeft: CX - 62, marginBottom: 12, background: "rgba(155,29,40,0.12)", border: "1px solid rgba(155,29,40,0.35)", borderRadius: 9999, padding: "5px 16px", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#F16A6A" }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B1D28", display: "inline-block" }}
                />
                Your Live Business
              </motion.div>

              {/* ── Three-column row: [SVG] [Labels] [Card] ── */}
              <div style={{ display: "flex", alignItems: "flex-start" }}>

                {/* 1. Diamond stack SVG with glowing background gradient */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    position: "absolute",
                    top: "5%", left: "-15%", right: "-15%", bottom: "5%",
                    background: "radial-gradient(ellipse at 45% 50%, rgba(241,106,106,0.13) 0%, rgba(155,29,40,0.06) 50%, transparent 75%)",
                    filter: "blur(32px)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <DiamondStack active={active} onPick={handlePick} />
                  </div>
                </div>

                {/* 2. Labels column */}
                <div style={{ width: 150, flexShrink: 0, marginLeft: 10, paddingTop: FY - GAP / 2 }}>
                  {LAYERS.map((l, i) => {
                    const isA = active === i;
                    return (
                      <motion.div
                        key={l.id}
                        onClick={() => handlePick(i)}
                        animate={{ opacity: isA ? 1 : 0.35 }}
                        transition={{ duration: 0.18 }}
                        style={{ height: GAP, display: "flex", alignItems: "center", gap: 5, cursor: "pointer", userSelect: "none" }}
                      >
                        <motion.span
                          animate={{ color: isA ? "#F16A6A" : "rgba(241,106,106,0.35)" }}
                          transition={{ duration: 0.18 }}
                          style={{ fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", flexShrink: 0 }}
                        >
                          {l.num}
                        </motion.span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: isA ? "var(--color-foreground)" : "var(--color-muted)", fontWeight: isA ? 600 : 400 }}>
                          {l.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 3. Card — spring-driven vertical position */}
                <div style={{ width: 240, flexShrink: 0, position: "relative", minHeight: SVG_H, marginLeft: 14 }}>
                  <motion.div
                    initial={false}
                    animate={{ y: cardY(active) }}
                    transition={SPRING_CARD}
                    style={{ position: "absolute", top: 0, left: 0, right: 0 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={layer.id}
                        initial={{ opacity: 0, x: 12, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{
                          background: "var(--color-card-light)",
                          border: "1px solid #E7DED5",
                          borderRadius: 18,
                          padding: "16px 17px",
                          boxShadow: "0 12px 40px rgba(155,29,40,0.08)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                          <div style={{ width: 3, height: 12, borderRadius: 9999, background: "#F16A6A", flexShrink: 0 }} />
                          <span style={{ fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 700, color: "#F16A6A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                            Layer {layer.num}
                          </span>
                        </div>
                        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "#111111", marginBottom: 8, lineHeight: 1.2 }}>
                          {layer.label}
                        </div>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#555555", lineHeight: 1.6, margin: "0 0 11px" }}>
                          {layer.desc}
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {layer.tags.map(tag => (
                            <span key={tag} style={{ fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500, color: "#9B1D28", padding: "3px 9px", borderRadius: 9999, background: "rgba(155,29,40,0.08)", border: "1px solid rgba(155,29,40,0.18)", whiteSpace: "nowrap" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}
      >
        <span style={{ fontFamily: "var(--font-body)", fontSize: 9, color: "var(--color-muted)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ width: 1, height: 26, background: "linear-gradient(to bottom,rgba(155,29,40,0.38),transparent)" }}
        />
      </motion.div>
    </section>
  );
}

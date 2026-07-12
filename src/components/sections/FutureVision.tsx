"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    const cx = () => W / 2;
    const cy = () => H / 2;
    const R = () => Math.min(W, H) * 0.35;

    const DOTS = 200;
    const dots = Array.from({ length: DOTS }, () => {
      const lat = (Math.random() - 0.5) * Math.PI;
      const lon = Math.random() * Math.PI * 2;
      return { lat, lon, pulse: Math.random() * Math.PI * 2 };
    });

    const NODES: { lat: number; lon: number; label: string }[] = [
      { lat: 0.5, lon: 0.3, label: "AI Caller" },
      { lat: -0.3, lon: 1.2, label: "LMS" },
      { lat: 0.8, lon: 2.1, label: "OPS" },
      { lat: -0.6, lon: 3.4, label: "Analytics" },
      { lat: 0.2, lon: 4.5, label: "CRM" },
      { lat: -0.1, lon: 5.6, label: "Automation" },
    ];

    let t = 0;

    const project = (lat: number, lon: number, rotation: number, r: number) => {
      const x3 = r * Math.cos(lat) * Math.cos(lon + rotation);
      const y3 = r * Math.cos(lat) * Math.sin(lon + rotation);
      const z3 = r * Math.sin(lat);
      return { x: cx() + x3, y: cy() - z3, z: y3 };
    };

    const draw = () => {
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      t += 0.004;

      const r = R();

      // Draw globe wireframe
      ctx.save();
      for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += Math.PI / 10) {
        ctx.beginPath();
        for (let lon = 0; lon <= Math.PI * 2; lon += 0.05) {
          const p = project(lat, lon, t, r);
          if (p.z < 0) { ctx.moveTo(p.x, p.y); continue; }
          if (lon === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(241,106,106,0.15)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let lon = 0; lon <= Math.PI * 2; lon += Math.PI / 8) {
        ctx.beginPath();
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.05) {
          const p = project(lat, lon, t, r);
          if (p.z < 0) { ctx.moveTo(p.x, p.y); continue; }
          if (lat === -Math.PI / 2) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(241,106,106,0.12)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.restore();

      // Dots
      for (const dot of dots) {
        dot.pulse += 0.02;
        const p = project(dot.lat, dot.lon, t, r);
        if (p.z < 0) continue;
        const alpha = (p.z / r + 1) / 2;
        const size = 1.5 + Math.sin(dot.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,106,106,${alpha * 0.6})`;
        ctx.fill();
      }

      // Nodes with glow
      for (const node of NODES) {
        const p = project(node.lat, node.lon, t, r * 1.05);
        if (p.z < 0) continue;
        const alpha = r > 0 ? Math.max(0, Math.min(1, (p.z / r + 1) / 2)) : 0;

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 20);
        grd.addColorStop(0, `rgba(241,106,106,${alpha * 0.5})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,106,106,${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
        ctx.fill();
      }

      // Outer orbit rings
      for (let ring = 0; ring < 3; ring++) {
        const ringR = r * (1.15 + ring * 0.12);
        const rotSpeed = t * (0.5 + ring * 0.3);
        ctx.save();
        ctx.translate(cx(), cy());
        ctx.rotate(rotSpeed);
        ctx.scale(1, 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(241,106,106,${0.1 - ring * 0.02})`;
        ctx.lineWidth = ring === 0 ? 1.5 : 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // Orbiting dot on each ring
        const angle = t * (1 + ring * 0.5) + (ring * Math.PI * 2) / 3;
        const dx = Math.cos(angle) * ringR;
        const dy = Math.sin(angle) * ringR * 0.35;
        ctx.beginPath();
        ctx.arc(cx() + dx, cy() + dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,106,106,0.7)`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

export default function FutureVision() {
  return (
    <section
      id="future-vision"
      style={{
        background: "transparent",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background grid pattern & ambient glows */}
      <div className="dark-pattern-dots" style={{ opacity: 1.2 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse at 60% 50%, rgba(155,29,40,0.18) 0%, transparent 65%), radial-gradient(circle at 10% 80%, rgba(241,106,106,0.08) 0%, transparent 45%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="max-w-7xl mx-auto w-full future-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(2rem, 6vw, 5rem)",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Text */}
        <div>
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
            The Future Is Now
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1, duration: 0.9 }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(4rem, 10vw, 9rem)",
                color: "#F16A6A",
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                marginBottom: 24,
              }}
            >
              2030
            </div>
            <h2
              className="display-md"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-foreground)",
                marginBottom: 24,
              }}
            >
              Every Business Will Have{" "}
              <span className="text-gradient">AI Employees</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                color: "var(--color-muted)",
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: 32,
              }}
            >
              The companies that build a custom AI workforce today will dominate their
              industries tomorrow. The window to act is closing. Stay Karo designs,
              builds, and deploys the AI agents and automations that get you there — fast.
            </p>
            <motion.a
              href="#demo"
              className="magnetic-btn"
              data-cursor="start"
              whileHover={{ scale: 1.05, backgroundColor: "#7A1520", boxShadow: "0 12px 40px rgba(155,29,40,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 32px",
                borderRadius: 100,
                background: "#9B1D28",
                color: "#FFFFFF",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 16,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(155,29,40,0.3)",
              }}
            >
              Start Your AI Journey →
            </motion.a>
          </motion.div>
        </div>

        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: "relative",
            height: "clamp(350px, 60vw, 600px)",
          }}
        >
          <GlobeCanvas />
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .future-grid { grid-template-columns: 1fr !important; }
          .future-grid > div:last-child { height: 280px !important; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  vx: number;
  vy: number;
}

const LABELS: Record<string, string> = {
  "data-cursor-view": "View",
  "data-cursor-explore": "Explore AI",
  "data-cursor-learn": "Learn More",
  "data-cursor-start": "Get Started",
  "data-cursor-demo": "Book Demo",
  "data-cursor-product": "View Product",
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorPosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const animFrameRef = useRef<number>(0);

  const addParticle = useCallback((x: number, y: number) => {
    if (particlesRef.current.length > 40) particlesRef.current.shift();
    particlesRef.current.push({
      x,
      y,
      alpha: 0.6,
      size: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      addParticle(e.clientX, e.clientY);

      const target = e.target as HTMLElement;
      const closest = target.closest("[data-cursor]") as HTMLElement | null;

      if (closest) {
        const attr = closest.getAttribute("data-cursor") || "";
        setLabel(LABELS[`data-cursor-${attr}`] || attr);
        setExpanded(true);
      } else if (
        target.closest("button, a, [role='button'], .magnetic-btn")
      ) {
        setLabel("");
        setExpanded(true);
      } else {
        setLabel("");
        setExpanded(false);
      }
    };

    window.addEventListener("mousemove", onMove);

    let lastParticleTime = 0;
    const tick = (time: number) => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;

      // Lerp cursor
      cursorPosRef.current.x += (mouseRef.current.x - cursorPosRef.current.x) * 0.12;
      cursorPosRef.current.y += (mouseRef.current.y - cursorPosRef.current.y) * 0.12;

      if (cursor) {
        const size = expanded ? 64 : 32;
        cursor.style.transform = `translate(${cursorPosRef.current.x - size / 2}px, ${cursorPosRef.current.y - size / 2}px)`;
        cursor.style.width = `${size}px`;
        cursor.style.height = `${size}px`;
      }
      if (dot) {
        dot.style.transform = `translate(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px)`;
      }

      // Particle trail
      if (time - lastParticleTime > 40) {
        addParticle(mouseRef.current.x, mouseRef.current.y);
        lastParticleTime = time;
      }

      // Draw particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.88;
        p.size *= 0.96;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha * 0.5})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [expanded, addParticle]);

  // Magnetic effect on buttons
  useEffect(() => {
    const buttons = document.querySelectorAll(".magnetic-btn");
    const handlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: (e: MouseEvent) => void }> = [];

    buttons.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        (btn as HTMLElement).style.transform = `translate(${dx}px, ${dy}px)`;
      };
      const leave = () => {
        (btn as HTMLElement).style.transform = "";
      };
      btn.addEventListener("mousemove", move as EventListener);
      btn.addEventListener("mouseleave", leave as EventListener);
      handlers.push({ el: btn, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move as EventListener);
        el.removeEventListener("mouseleave", leave as EventListener);
      });
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      />
      {/* Main cursor ring — mix-blend-mode: difference makes it visible on any background */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 9999,
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: "1.5px solid #ffffff",
          background: expanded ? "rgba(255,255,255,0.10)" : "transparent",
          backdropFilter: expanded ? "blur(4px)" : "none",
          transition: "width 0.25s cubic-bezier(0.23,1,0.32,1), height 0.25s cubic-bezier(0.23,1,0.32,1), background 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          mixBlendMode: "difference",
        }}
      >
        {label && (
          <span
            ref={labelRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              textTransform: "uppercase",
            }}
          >
            {label}
          </span>
        )}
      </div>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 10000,
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#ffffff",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

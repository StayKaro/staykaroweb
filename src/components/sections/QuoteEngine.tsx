"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  "Your competitors hire people. We deploy intelligence.",
  "The future belongs to automated businesses.",
  "AI doesn't replace teams. It amplifies them.",
  "Automation is not a feature. It is a strategy.",
  "Stop hiring for repetitive work. Build an AI workforce instead.",
  "Every business deserves an AI workforce.",
  "The best employees never sleep, never tire, never stop.",
  "Intelligence at scale. Execution at speed.",
];

export default function QuoteEngine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prevIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          let next;
          do {
            next = Math.floor(Math.random() * QUOTES.length);
          } while (next === prev);
          prevIndex.current = prev;
          return next;
        });
        setVisible(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #9B1D28 0%, #C73A45 50%, #F16A6A 100%)",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(241,106,106,0.3) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(122,21,32,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Decorative quote marks */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "5%",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(120px, 20vw, 240px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        "
      </div>

      <div className="max-w-5xl mx-auto" style={{ position: "relative", textAlign: "center" }}>
        <AnimatePresence mode="wait">
          {visible && (
            <motion.blockquote
              key={currentIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                color: "#FFFFFF",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {QUOTES[currentIndex]}
            </motion.blockquote>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 40 }}>
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setVisible(false);
                setTimeout(() => { setCurrentIndex(i); setVisible(true); }, 300);
              }}
              style={{
                width: i === currentIndex ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background: i === currentIndex ? "#FFFFFF" : "rgba(255,255,255,0.3)",
                border: "none",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

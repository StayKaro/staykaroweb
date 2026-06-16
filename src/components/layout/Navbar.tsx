"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Products",     href: "#products"    },
  { label: "Solutions",    href: "#ecosystem"   },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results",      href: "#case-studies" },
  { label: "About",        href: "#about"        },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: scrolled ? "10px 40px" : "18px 40px",
          background: "rgba(15, 5, 6, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid rgba(45, 20, 23, 0.3)",
          boxShadow: scrolled ? "0 4px 30px rgba(155, 29, 40, 0.15)" : "none",
          transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <img 
              src="/logo.png" 
              alt="StayKaro Logo" 
              style={{ height: 40, width: "auto", objectFit: "contain" }} 
            />
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 19, color: "var(--color-foreground)", letterSpacing: "-0.02em" }}>
              StayKaro
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
                  color: "var(--color-muted)", textDecoration: "none",
                  transition: "color 0.18s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F16A6A")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-5">
            {/* Text link — no button */}
            <a
              href="#contact"
              style={{
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 14,
                color: "var(--color-muted)", textDecoration: "none",
                transition: "color 0.18s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F16A6A")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              Talk to Experts
            </a>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.04, backgroundColor: "#7A1520" }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14,
                color: "#FFFFFF", textDecoration: "none",
                padding: "8px 20px", borderRadius: 100,
                background: "#9B1D28",
              }}
            >
              Get Demo
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", color: "var(--color-foreground)", padding: 4 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-6"
            style={{ background: "rgba(15, 5, 6, 0.98)", backdropFilter: "blur(20px)" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 28,
                  color: "var(--color-foreground)", textDecoration: "none",
                  padding: "14px 0", borderBottom: "1px solid var(--color-border)",
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#demo"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: 28, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 16,
                color: "#FFFFFF", textAlign: "center", padding: "14px",
                borderRadius: 100, background: "#9B1D28", textDecoration: "none",
              }}
            >
              Get Demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

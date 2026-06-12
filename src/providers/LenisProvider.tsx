"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,           // lower = smoother, slower response
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      // autoRaf: false — we drive the loop via gsap.ticker below
      autoRaf: false,
    });

    // KEY FIX 1: Tell GSAP ScrollTrigger to use Lenis's virtual scroll position.
    // Without this, ScrollTrigger reads native window.scrollY which Lenis
    // has desync'd, making scrub animations and pins fight each other.
    lenis.on("scroll", ScrollTrigger.update);

    // KEY FIX 2: Drive Lenis from GSAP's unified ticker instead of a
    // separate requestAnimationFrame loop. This guarantees both run
    // in the same frame and read identical timestamps.
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    };
    gsap.ticker.add(onTick);

    // Disable lag-smoothing so GSAP doesn't artificially delay frames
    // when the tab was inactive — prevents a sudden scroll jump on refocus.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMG_PADDING = 12;

type TextParallaxContentProps = {
  imgUrl: string;
  eyebrow: string;
  heading: ReactNode;
  description: string;
  dark?: boolean;
  children: ReactNode;
};

export function TextParallaxContent({
  imgUrl,
  eyebrow,
  heading,
  description,
  dark = true,
  children,
}: TextParallaxContentProps) {
  return (
    <div
      style={{
        background: dark ? "var(--color-background)" : "#FFFFFF",
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div style={{ position: "relative", height: "145vh" }}>
        <StickyImage imgUrl={imgUrl} dark={dark} />
        <OverlayCopy eyebrow={eyebrow} heading={heading} description={description} dark={dark} />
      </div>
      {children}
    </div>
  );
}

function StickyImage({ imgUrl, dark }: { imgUrl: string; dark: boolean }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        position: "sticky",
        top: IMG_PADDING,
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        overflow: "hidden",
        borderRadius: 20,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        scale,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity,
          background: dark
            ? "linear-gradient(90deg, rgba(15,5,6,0.95) 0%, rgba(15,5,6,0.78) 48%, rgba(15,5,6,0.25) 100%)"
            : "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.24) 100%)",
        }}
      />
    </motion.div>
  );
}

function OverlayCopy({
  eyebrow,
  heading,
  description,
  dark,
}: {
  eyebrow: string;
  heading: ReactNode;
  description: string;
  dark: boolean;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.42, 0.72], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        position: "absolute",
        inset: 0,
        y,
        opacity,
        display: "flex",
        alignItems: "center",
        color: dark ? "var(--color-foreground)" : "#111111",
        padding: "clamp(2rem, 7vw, 6rem)",
      }}
    >
      <div style={{ maxWidth: 680 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 700,
            color: dark ? "#F16A6A" : "#CC1A1A",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 6vw, 5.4rem)",
            lineHeight: 0.95,
            letterSpacing: "0",
            marginBottom: 24,
            color: dark ? "var(--color-foreground)" : "#111111",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            color: dark ? "var(--color-muted)" : "#555555",
            lineHeight: 1.65,
            maxWidth: 620,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

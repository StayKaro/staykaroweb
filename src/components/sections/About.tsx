"use client";

import { motion } from "framer-motion";
import { TextParallaxContent } from "@/components/ui/text-parallax-content-scroll";

const PROBLEM_IMAGE = "/problem-bg.jpg";
const AI_SHIFT_IMAGE = "/shift-bg.jpg";

const PROBLEMS = [
  { image: "/card-backgrounds/hours-lost.svg", title: "Hours Lost Daily",      desc: "Teams spend 60% of their time on repetitive tasks — calls, follow-ups, data entry — that custom AI agents could run instead." },
  { image: "/card-backgrounds/missed-opportunities.svg", title: "Missed Opportunities",  desc: "Leads go cold while your team is buried in manual work. Agentic automation acts the moment an opportunity appears." },
  { image: "/card-backgrounds/training-gaps.svg", title: "Training Gaps",          desc: "Onboarding takes weeks, knowledge walks out the door with staff turnover — our LMS and AI tutors fix that permanently." },
];

const SOLUTIONS = [
  { image: "/card-backgrounds/instant-response.svg", title: "Instant Response",    desc: "Custom AI agents respond to every query in under 60 seconds — built for your business, running 24/7 without breaks." },
  { image: "/card-backgrounds/continuous-learning.svg", title: "Continuous Learning",  desc: "Every interaction trains your agents. Your custom AI workforce gets smarter with each task it completes." },
  { image: "/card-backgrounds/realtime-insights.svg", title: "Real-Time Insights",   desc: "Live dashboards built around your workflows — surfacing bottlenecks and opportunities before they cost you." },
];

export default function About() {
  return (
    <section id="about" style={{ background: "#FAF7F2" }}>

      {/* ── Problem ── */}
      <TextParallaxContent
        dark={false}
        imgUrl={PROBLEM_IMAGE}
        eyebrow="01 — The Problem"
        heading={<>Hours Wasted<br /><span style={{ color: "#9B1D28" }}>Every Single Day.</span></>}
        description="Businesses lose thousands of productive hours to repetitive, manual work that AI can handle instantly — and better."
      >
        <div style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,8rem)", background: "#FAF7F2", borderBottom: "1px solid #E7DED5" }}>
          <div className="max-w-7xl mx-auto">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1rem,2.5vw,1.5rem)",
          }}>
            {PROBLEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 72, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ delay: i * 0.14, duration: 0.8, ease: [0.16,1,0.3,1] }}
                  whileHover={{
                    y: -10,
                    rotate: i === 1 ? 0.6 : -0.6,
                    scale: 1.015,
                    boxShadow: "0 28px 70px rgba(155,29,40,0.12), 0 8px 24px rgba(155,29,40,0.06)",
                    borderColor: "#9B1D28"
                  }}
                  className="soft-orbit-card"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,243,242,0.85) 52%, #FFF3F2 100%), url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "1px solid #E7DED5",
                    borderRadius: 38,
                    padding: "clamp(1.5rem,3vw,2rem)",
                    minHeight: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    boxShadow: "0 18px 55px rgba(155, 29, 40, 0.08)",
                  }}
                >
                  <h3 style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:"clamp(1rem,1.8vw,1.15rem)", color:"#111111", marginBottom:8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"clamp(0.875rem,1.4vw,0.95rem)", color:"#555555", lineHeight:1.7 }}>
                    {item.desc}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
      </TextParallaxContent>

      {/* ── AI Shift ── */}
      <TextParallaxContent
        dark={false}
        imgUrl={AI_SHIFT_IMAGE}
        eyebrow="02 — The AI Shift"
        heading={<>AI Is Changing<br /><span style={{ color: "#9B1D28" }}>Everything.</span></>}
        description="The leaders of tomorrow aren't hiring more people — they're deploying intelligence. AI systems that work faster, learn continuously, and never burn out."
      >
        <div style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,8rem)", background: "#FAF7F2", borderBottom: "1px solid #E7DED5" }}>
          <div className="max-w-7xl mx-auto">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1rem,2.5vw,1.5rem)",
          }}>
            {SOLUTIONS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 72, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ delay: i * 0.14, duration: 0.8, ease: [0.16,1,0.3,1] }}
                  whileHover={{
                    y: -10,
                    rotate: i === 1 ? 0.6 : -0.6,
                    scale: 1.015,
                    boxShadow: "0 28px 70px rgba(155,29,40,0.12), 0 8px 24px rgba(155,29,40,0.06)",
                    borderColor: "#9B1D28"
                  }}
                  className="soft-orbit-card"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.75) 52%, #FFFFFF 100%), url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "1px solid #E7DED5",
                    borderRadius: 38,
                    padding: "clamp(1.5rem,3vw,2rem)",
                    minHeight: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    boxShadow: "0 18px 55px rgba(155, 29, 40, 0.08)",
                  }}
                >
                  <h3 style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:"clamp(1rem,1.8vw,1.15rem)", color:"#111111", marginBottom:8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"clamp(0.875rem,1.4vw,0.95rem)", color:"#555555", lineHeight:1.7 }}>
                    {item.desc}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      </div>
      </TextParallaxContent>

    </section>
  );
}

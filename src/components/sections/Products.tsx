"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, BookOpen, Settings, Zap,
  ExternalLink, RotateCw, ChevronLeft, ChevronRight,
} from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 340, damping: 32, mass: 0.7 };

/* ── Product data ── */
const PRODUCTS = [
  {
    id: "caller",
    icon: Phone,
    name: "AI Caller Agent",
    tagline: "Your 24/7 sales & support team",
    description:
      "Custom-built voice AI that handles inbound and outbound calls with human-like conversation — qualifying leads, booking appointments, and following up automatically, tailored to your sales process.",
    url: "https://caller.staykaro.ai",
    urlLabel: "caller.staykaro.ai",
    color: "#CC1A1A",
    gradient: "linear-gradient(135deg, #CC1A1A, #DD3030)",
    badge: "+183% conversion",
    chips: ["AI voice calls", "Lead qualifying", "Auto follow-up"],
    feed: [
      { name: "Rajesh Mehta",  status: "Waiting",  wait: "00:42", dot: "#F59E0B" },
      { name: "Priya Singh",   status: "Waiting",  wait: "01:14", dot: "#F59E0B" },
      { name: "Arjun Kapoor",  status: "Priority", wait: "02:30", dot: "#CC1A1A" },
      { name: "Sunita Rao",    status: "New",      wait: "00:05", dot: "#3B82F6" },
    ],
  },
  {
    id: "lms",
    icon: BookOpen,
    name: "LMS Platform",
    tagline: "AI-powered learning at scale",
    description:
      "A complete learning management system with an embedded AI tutor that personalises learning paths, tracks progress, and delivers certifications automatically — built for institutions and businesses alike.",
    url: "https://lms.staykaro.ai",
    urlLabel: "lms.staykaro.ai",
    color: "#DD2828",
    gradient: "linear-gradient(135deg, #DD2828, #E85050)",
    badge: "2× faster learning",
    chips: ["AI tutor", "Auto certs", "Progress tracking"],
    courses: [
      { name: "Digital Marketing Mastery", progress: 82, students: 142 },
      { name: "Sales Excellence Program",  progress: 67, students: 98  },
      { name: "AI for Business Leaders",   progress: 45, students: 213 },
      { name: "Customer Success Pro",      progress: 91, students: 76  },
    ],
  },
  {
    id: "ops",
    icon: Settings,
    name: "OPS Platform",
    tagline: "Intelligent operations, amplified",
    description:
      "A command centre for your entire business — automate workflows, monitor teams, track performance, and get AI-powered recommendations that optimise operations before problems occur.",
    url: "https://ops.staykaro.ai",
    urlLabel: "ops.staykaro.ai",
    color: "#AA1414",
    gradient: "linear-gradient(135deg, #AA1414, #CC1A1A)",
    badge: "89% on-time delivery",
    chips: ["Kanban board", "Team analytics", "AI suggestions"],
    columns: [
      { name: "To Do",       color: "#6B7280", tasks: [{ title: "Q3 Sales Report",  assignee: "RM", priority: "High", due: "Jun 12" }, { title: "Onboard Nexus",    assignee: "PS", priority: "Med",  due: "Jun 14" }] },
      { name: "In Progress", color: "#3B82F6", tasks: [{ title: "AI Caller Setup",  assignee: "AK", priority: "High", due: "Jun 10" }, { title: "CRM Integration",  assignee: "SR", priority: "Med",  due: "Jun 13" }] },
      { name: "Review",      color: "#F59E0B", tasks: [{ title: "Contract Draft",   assignee: "RM", priority: "High", due: "Jun 11" }] },
      { name: "Done",        color: "#22C55E", tasks: [{ title: "Team Training",    assignee: "PS", priority: "Low",  due: "Jun 09" }, { title: "Q2 Analysis",      assignee: "AK", priority: "Med",  due: "Jun 08" }] },
    ],
  },
  {
    id: "custom",
    icon: Zap,
    name: "Custom AI Agents",
    tagline: "Built around your business",
    description:
      "We design, build, and deploy bespoke AI agents and agentic workflows — from internal copilots to fully autonomous multi-step systems — integrated directly into your existing tools and processes.",
    url: "https://staykaro.ai/contact",
    urlLabel: "Book a Free Audit",
    color: "#8B1010",
    gradient: "linear-gradient(135deg, #8B1010, #CC1A1A)",
    badge: "Fully custom",
    chips: ["Custom build", "Any workflow", "Full integration"],
    flows: [
      {
        trigger: "New Lead — WhatsApp",
        steps: [
          { action: "AI Qualify",   status: "passed",  time: "0.3s" },
          { action: "Score Lead",   status: "passed",  time: "0.1s" },
          { action: "Book Meeting", status: "active",  time: "—"    },
          { action: "CRM Update",   status: "pending", time: "—"    },
        ],
      },
      {
        trigger: "Support Ticket — Email",
        steps: [
          { action: "Classify",       status: "passed",  time: "0.2s" },
          { action: "Auto Resolve",   status: "failed",  time: "1.2s" },
          { action: "Escalate Agent", status: "active",  time: "—"    },
          { action: "Notify Team",    status: "pending", time: "—"    },
        ],
      },
    ],
  },
] as const;

type Product = typeof PRODUCTS[number];

/* ── Realistic dashboard mockups ── */

function CallerDashboard({ p }: { p: typeof PRODUCTS[0] }) {
  return (
    <div style={{ display: "flex", height: 360, overflow: "hidden" }}>
      {/* Queue sidebar */}
      <div style={{ width: 196, background: "#1C1C2E", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: 4 }}>Call Queue</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>12 waiting</span>
          </div>
        </div>
        {p.feed.map((caller, i) => (
          <div key={i} style={{ padding: "9px 14px", borderBottom: "1px solid rgba(255,255,255,0.04)", background: i === 0 ? "rgba(255,255,255,0.07)" : "transparent", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(204,26,26,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 8, fontWeight: 800, color: "#FF8080" }}>{caller.name.split(" ").map((n: string) => n[0]).join("")}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{caller.name}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>Waiting {caller.wait}</div>
            </div>
            <div style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, background: `${caller.dot}22`, color: caller.dot, flexShrink: 0 }}>{caller.status}</div>
          </div>
        ))}
      </div>

      {/* Active call panel */}
      <div style={{ flex: 1, padding: "13px 15px", background: "#F8F8FA", overflow: "hidden" }}>
        <div style={{ background: "white", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 11, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 11 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#22C55E", letterSpacing: "0.06em" }}>LIVE CALL</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#CC1A1A", letterSpacing: "-0.02em", marginLeft: "auto" }}>02:34</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 2 }}>TechVentures India</div>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", marginBottom: 12 }}>+91 98765 43210 · Rajesh Mehta, CEO</div>
          <div style={{ background: "rgba(204,26,26,0.04)", border: "1px solid rgba(204,26,26,0.1)", borderRadius: 8, padding: "8px 12px", marginBottom: 11 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#CC1A1A", letterSpacing: "0.06em", marginBottom: 3 }}>AI INSIGHT</div>
            <div style={{ fontSize: 11, color: "#111", lineHeight: 1.5 }}>Budget concerns raised. Suggest Enterprise tier with 3-month trial to close today.</div>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {["Mute", "Hold", "Transfer", "End"].map((action, i) => (
              <div key={action} style={{ flex: 1, height: 28, borderRadius: 7, background: i === 3 ? "#CC1A1A" : "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: i === 3 ? "white" : "rgba(0,0,0,0.5)" }}>{action}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[{ label: "Calls Today", value: "247", trend: "+12%" }, { label: "Conversion", value: "34%", trend: "+8%" }, { label: "Avg Duration", value: "2:45", trend: "—" }].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 9, padding: "9px 10px", border: "1px solid rgba(0,0,0,0.07)", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "rgba(0,0,0,0.38)", marginTop: 3 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: "#22C55E", fontWeight: 600, marginTop: 2 }}>{s.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LMSDashboard({ p }: { p: typeof PRODUCTS[1] }) {
  return (
    <div style={{ display: "flex", height: 360, overflow: "hidden" }}>
      <div style={{ width: 152, background: "#1E1B4B", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "13px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: "white" }}>StayKaro LMS</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Learning Hub</div>
        </div>
        {["Dashboard", "Courses", "Students", "Grades", "Reports"].map((item, i) => (
          <div key={item} style={{ padding: "9px 14px", margin: "2px 6px", borderRadius: 7, background: i === 0 ? "rgba(221,40,40,0.18)" : "transparent" }}>
            <span style={{ fontSize: 12, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? "#DD4444" : "rgba(255,255,255,0.42)" }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "11px 14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>ACTIVE NOW</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "white", lineHeight: 1 }}>1,243</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>students enrolled</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "13px 14px", background: "#F4F4F8", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Active Courses</span>
          <span style={{ fontSize: 10, color: "#DD2828", fontWeight: 600 }}>View all →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 11 }}>
          {p.courses.map((course, i) => (
            <div key={i} style={{ background: "white", borderRadius: 10, padding: "10px 11px", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#111", lineHeight: 1.3, marginBottom: 7 }}>{course.name}</div>
              <div style={{ height: 3, background: "rgba(0,0,0,0.07)", borderRadius: 9999, marginBottom: 5, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }} style={{ height: "100%", background: p.gradient, borderRadius: 9999 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: "rgba(0,0,0,0.35)" }}>{course.students} enrolled</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: p.color }}>{course.progress}%</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 10, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
          <div style={{ padding: "7px 11px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#111" }}>Recent Certifications</span>
          </div>
          {[{ name: "Arjun K.", course: "Sales Excellence", time: "2m ago" }, { name: "Priya R.", course: "Digital Marketing", time: "14m ago" }].map((item, i) => (
            <div key={i} style={{ padding: "6px 11px", display: "flex", alignItems: "center", gap: 8, borderBottom: i === 0 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(204,26,26,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 7, fontWeight: 700, color: "#CC1A1A" }}>{item.name.split(" ").map((n: string) => n[0]).join("")}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#111" }}>{item.name}</span>
                <span style={{ fontSize: 10, color: "rgba(0,0,0,0.38)" }}> · {item.course}</span>
              </div>
              <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 100, background: "rgba(34,197,94,0.1)", color: "#22C55E", fontWeight: 600 }}>✓ Certified</span>
              <span style={{ fontSize: 9, color: "rgba(0,0,0,0.3)" }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OPSDashboard({ p }: { p: typeof PRODUCTS[2] }) {
  return (
    <div style={{ height: 360, overflow: "hidden" }}>
      <div style={{ background: "white", padding: "8px 15px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        {["Board", "List", "Timeline", "Reports"].map((tab, i) => (
          <span key={tab} style={{ fontSize: 11, fontWeight: i === 0 ? 700 : 400, color: i === 0 ? p.color : "rgba(0,0,0,0.38)", padding: "3px 10px", borderRadius: 6, background: i === 0 ? "rgba(170,20,20,0.07)" : "transparent" }}>{tab}</span>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
          {["+ Add", "Filter"].map((btn, i) => (
            <span key={btn} style={{ fontSize: 10, fontWeight: 600, color: i === 0 ? "#CC1A1A" : "rgba(0,0,0,0.38)", padding: "3px 8px", borderRadius: 5, background: i === 0 ? "rgba(204,26,26,0.06)" : "rgba(0,0,0,0.04)" }}>{btn}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "11px 13px", display: "flex", gap: 9, height: "calc(100% - 41px)", background: "#F8F8FA", overflow: "hidden" }}>
        {p.columns.map(col => (
          <div key={col.name} style={{ width: 140, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: col.color }}>{col.name}</span>
              <span style={{ fontSize: 9, background: "rgba(0,0,0,0.06)", borderRadius: 9999, padding: "1px 6px", color: "rgba(0,0,0,0.4)", fontWeight: 600 }}>{col.tasks.length}</span>
            </div>
            {col.tasks.map((task, ti) => (
              <div key={ti} style={{ background: "white", borderRadius: 9, padding: "8px 10px", border: "1px solid rgba(0,0,0,0.07)", marginBottom: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: "#111", lineHeight: 1.35, marginBottom: 7 }}>{task.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 17, height: 17, borderRadius: "50%", background: "rgba(170,20,20,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 6, fontWeight: 800, color: "#AA1414" }}>{task.assignee}</span>
                  </div>
                  <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, background: task.priority === "High" ? "rgba(204,26,26,0.09)" : task.priority === "Med" ? "rgba(245,158,11,0.09)" : "rgba(0,0,0,0.05)", color: task.priority === "High" ? "#CC1A1A" : task.priority === "Med" ? "#D97706" : "rgba(0,0,0,0.35)", fontWeight: 600 }}>{task.priority}</span>
                  <span style={{ fontSize: 8, color: "rgba(0,0,0,0.3)", marginLeft: "auto" }}>{task.due}</span>
                </div>
              </div>
            ))}
            <div style={{ border: "1px dashed rgba(0,0,0,0.1)", borderRadius: 9, padding: "6px 10px", textAlign: "center" }}>
              <span style={{ fontSize: 10, color: "rgba(0,0,0,0.28)" }}>+ Add task</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowDashboard({ p }: { p: typeof PRODUCTS[3] }) {
  const statusColor = (s: string) =>
    s === "passed" ? "#22C55E" : s === "active" ? "#CC1A1A" : s === "failed" ? "#EF4444" : "rgba(0,0,0,0.25)";
  const statusBg = (s: string) =>
    s === "passed" ? "rgba(34,197,94,0.08)" : s === "active" ? "rgba(204,26,26,0.08)" : s === "failed" ? "rgba(239,68,68,0.08)" : "rgba(0,0,0,0.04)";
  const statusIcon = (s: string) =>
    s === "passed" ? "✓" : s === "active" ? "●" : s === "failed" ? "✕" : "○";

  return (
    <div style={{ height: 360, overflow: "hidden" }}>
      <div style={{ background: "white", padding: "9px 15px", borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Automation Canvas</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "rgba(34,197,94,0.1)", color: "#22C55E", fontWeight: 600 }}>● 4 Active</span>
          <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 5, background: "rgba(139,16,16,0.07)", color: "#8B1010", fontWeight: 600 }}>+ New Flow</span>
        </div>
      </div>
      <div style={{ padding: "13px 15px", background: "#F8F8FA", height: "calc(100% - 41px)", overflow: "hidden" }}>
        {p.flows.map((flow, fi) => (
          <div key={fi} style={{ background: "white", borderRadius: 11, border: "1px solid rgba(0,0,0,0.07)", padding: "11px 13px", marginBottom: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#CC1A1A", boxShadow: "0 0 6px rgba(204,26,26,0.5)" }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: "#CC1A1A", letterSpacing: "0.06em" }}>TRIGGER</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#111" }}>{flow.trigger}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" as const }}>
              {flow.steps.flatMap((step, si) => [
                <div
                  key={`s-${fi}-${si}`}
                  style={{
                    padding: "4px 9px", borderRadius: 7, fontSize: 10, fontWeight: 600,
                    background: statusBg(step.status),
                    color: statusColor(step.status),
                    border: `1px solid ${statusColor(step.status)}33`,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {statusIcon(step.status)} {step.action}
                  {step.time !== "—" && <span style={{ fontSize: 8, opacity: 0.6 }}> {step.time}</span>}
                </div>,
                si < flow.steps.length - 1
                  ? <span key={`a-${fi}-${si}`} style={{ color: "rgba(0,0,0,0.2)", fontSize: 12, flexShrink: 0 }}>›</span>
                  : null,
              ]).filter(Boolean)}
            </div>
          </div>
        ))}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
          {[{ label: "Flows Active", value: "24", trend: "+3 today" }, { label: "Tasks/Day", value: "1,847", trend: "↑ 12%" }, { label: "Hours Saved", value: "340h", trend: "this month" }].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 9, padding: "9px 10px", border: "1px solid rgba(0,0,0,0.07)", textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#111", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "rgba(0,0,0,0.38)", marginTop: 3 }}>{s.label}</div>
              <div style={{ fontSize: 9, color: "#22C55E", fontWeight: 600, marginTop: 2 }}>{s.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ product }: { product: Product }) {
  if (product.id === "caller") return <CallerDashboard p={product as typeof PRODUCTS[0]} />;
  if (product.id === "lms")    return <LMSDashboard    p={product as typeof PRODUCTS[1]} />;
  if (product.id === "ops")    return <OPSDashboard    p={product as typeof PRODUCTS[2]} />;
  return                              <WorkflowDashboard p={product as typeof PRODUCTS[3]} />;
}

/* ── Browser window ── */
function BrowserWindow({ product }: { product: Product }) {
  const Icon = product.icon;
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.09)" }}>
      <div style={{ background: "#EFEFEF", padding: "9px 14px", display: "flex", alignItems: "center", gap: 9, borderBottom: "1px solid rgba(0,0,0,0.09)" }}>
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F56" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#FFBD2E" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#27C93F" }} />
        </div>
        <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={12} color="rgba(0,0,0,0.3)" />
          </div>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={12} color="rgba(0,0,0,0.3)" />
          </div>
        </div>
        <div style={{ flex: 1, background: "white", borderRadius: 7, padding: "5px 11px", display: "flex", alignItems: "center", gap: 6, border: "1px solid rgba(0,0,0,0.1)", minWidth: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #22C55E", flexShrink: 0 }} />
          <AnimatePresence mode="wait">
            <motion.span key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "rgba(0,0,0,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.urlLabel}
            </motion.span>
          </AnimatePresence>
        </div>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <RotateCw size={11} color="rgba(0,0,0,0.3)" />
        </div>
      </div>

      <div style={{ background: "#F7F5F3" }}>
        <AnimatePresence mode="wait">
          <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26, ease: "easeOut" }}>
            <div style={{ background: "white", padding: "9px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: product.gradient, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} color="white" />
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "#111" }}>{product.name}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                {["Overview", "Reports"].map(tab => (
                  <span key={tab} style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(0,0,0,0.38)", padding: "3px 8px", borderRadius: 5 }}>{tab}</span>
                ))}
                <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: product.color, padding: "3px 8px", borderRadius: 5, background: "rgba(204,26,26,0.07)", fontWeight: 600 }}>Dashboard</span>
              </div>
            </div>
            <Dashboard product={product} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Product tab ── */
function ProductTab({
  product, isActive, isLast, onClick,
}: {
  product: Product;
  isActive: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  const Icon = product.icon;
  return (
    <div>
      <div
        onClick={onClick}
        style={{
          borderLeft: `3px solid ${isActive ? product.color : "transparent"}`,
          background: isActive ? "linear-gradient(135deg, rgba(204,26,26,0.04) 0%, rgba(255,248,248,0.9) 100%)" : "transparent",
          borderRadius: isActive ? "0 12px 12px 0" : "0",
          transition: "all 0.22s",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 16px 14px 16px" }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18, flexShrink: 0,
            background: isActive ? product.gradient : "rgba(204,26,26,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.25s",
            boxShadow: isActive ? "0 12px 32px rgba(204,26,26,0.28), 0 0 0 4px rgba(204,26,26,0.06)" : "none",
          }}>
            <Icon size={26} color={isActive ? "#fff" : product.color} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" as const }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "#111", letterSpacing: "-0.02em" }}>{product.name}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#CC1A1A", background: "rgba(204,26,26,0.08)", border: "1px solid rgba(204,26,26,0.12)", padding: "2px 8px", borderRadius: 100, whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                {product.badge}
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: isActive ? product.color : "rgba(0,0,0,0.42)", marginBottom: isActive ? 0 : 8, transition: "color 0.2s" }}>
              {product.tagline}
            </div>
            {!isActive && (
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 5 }}>
                {product.chips.map((chip: string) => (
                  <span key={chip} style={{ fontSize: 9, color: "rgba(0,0,0,0.35)", background: "rgba(0,0,0,0.04)", padding: "2px 7px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.07)" }}>{chip}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div key="expanded" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={SPRING} style={{ overflow: "hidden", paddingLeft: 75 }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, color: "rgba(0,0,0,0.56)", lineHeight: 1.72, margin: "0 0 16px", paddingRight: 12 }}>
              {product.description}
            </p>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 100, border: `1.5px solid ${product.color}`, color: product.color, fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, textDecoration: "none", marginBottom: 20, transition: "all 0.18s" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = product.gradient; el.style.color = "white"; el.style.borderColor = "transparent"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = product.color; el.style.borderColor = product.color; }}
            >
              {product.id === "custom" ? "Book a Free Audit" : "Open Platform"} <ExternalLink size={13} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLast && <div style={{ height: 1, background: "rgba(0,0,0,0.06)", marginLeft: 16 }} />}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   Products section
   ══════════════════════════════════════════════════ */
export default function Products() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="products"
      style={{
        background: "radial-gradient(ellipse at 95% 5%, rgba(204,26,26,0.05) 0%, transparent 42%), #F9F7F5",
        padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,8rem)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "clamp(3rem,8vw,5rem)" }}>
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#CC1A1A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
          What We Build
        </motion.span>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: 0.1 }} className="display-md" style={{ fontFamily: "var(--font-heading)", color: "#111111", marginBottom: 20 }}>
          Our{" "}<span className="text-gradient">Products</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.2 }} style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "rgba(17,17,17,0.6)", maxWidth: 580, margin: "0 auto", lineHeight: 1.6 }}>
          Real, focused AI systems for customer conversations, team learning, daily operations — and fully custom agents built around your workflows.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto products-split" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "clamp(2rem,5vw,4rem)", alignItems: "flex-start" }}>
        <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} style={{ background: "#FFFFFF", borderRadius: 20, padding: "8px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.07)" }}>
          {PRODUCTS.map((p, i) => (
            <ProductTab key={p.id} product={p} isActive={active === i} isLast={i === PRODUCTS.length - 1} onClick={() => setActive(i)} />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }} style={{ position: "sticky", top: 100 }}>
          <BrowserWindow product={PRODUCTS[active]} />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .products-split { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

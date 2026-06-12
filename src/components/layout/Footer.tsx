"use client";

import { Globe, Send, Mail } from "lucide-react";

const LINKS: Record<string, { label: string; href: string }[]> = {
  Products: [
    { label: "AI Caller Agent",  href: "#products"    },
    { label: "LMS Platform",     href: "#products"    },
    { label: "OPS Platform",     href: "#products"    },
  ],
  Company: [
    { label: "About Us",   href: "#about"       },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact",      href: "mailto:staykaroatsales@staykaro.org" },
  ],
  Resources: [
    { label: "Integrations",  href: "#ecosystem"     },
    { label: "FAQ",           href: "#faq"           },
    { label: "Book a Demo",   href: "#demo"          },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy"   },
    { label: "Terms of Service",  href: "/terms"     },
    { label: "Cookie Policy",     href: "/cookies"   },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-background)",
        padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 8rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:"clamp(2rem,4vw,4rem)", marginBottom:"clamp(3rem,6vw,5rem)" }}>

          {/* Brand */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#9B1D28,#F16A6A)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#FFFFFF", fontFamily:"var(--font-heading)", fontWeight:800, fontSize:16 }}>S</span>
              </div>
              <span style={{ fontFamily:"var(--font-heading)", fontWeight:700, fontSize:20, color:"var(--color-foreground)" }}>StayKaro</span>
            </div>
            <p style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--color-muted)", lineHeight:1.7, maxWidth:260, marginBottom:24 }}>
              AI-powered business automation — intelligent systems that work 24/7, learn continuously, and deliver measurable ROI.
            </p>
            <div style={{ display:"flex", gap:12 }}>
              {[
                { Icon: Globe, href: "https://staykaro.org", label: "Website" },
                { Icon: Send,  href: "#",                    label: "Telegram" },
                { Icon: Mail,  href: "mailto:staykaroatsales@staykaro.org", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                   key={label}
                   href={href}
                   style={{ width:36, height:36, borderRadius:10, background:"rgba(155,29,40,0.12)", border:"1px solid var(--color-border)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", textDecoration:"none" }}
                   onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background="rgba(155,29,40,0.22)"; el.style.borderColor="#F16A6A"; }}
                   onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background="rgba(155,29,40,0.12)"; el.style.borderColor="var(--color-border)"; }}
                   aria-label={label}
                >
                  <Icon size={16} color="#F16A6A" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h4 style={{ fontFamily:"var(--font-heading)", fontWeight:600, fontSize:13, color:"var(--color-foreground)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:16 }}>
                {category}
              </h4>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {items.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{ fontFamily:"var(--font-body)", fontSize:14, color:"var(--color-muted)", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color="#F16A6A"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color="var(--color-muted)"; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop:"clamp(1.5rem,3vw,2rem)", borderTop:"1px solid var(--color-border)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <span style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--color-muted)" }}>
            © {new Date().getFullYear()} StayKaro. All rights reserved.
          </span>
          <a
            href="mailto:staykaroatsales@staykaro.org"
            style={{ fontFamily:"var(--font-body)", fontSize:13, color:"var(--color-muted)", textDecoration:"none", transition:"color 0.2s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color="#F16A6A"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color="var(--color-muted)"; }}
          >
            staykaroatsales@staykaro.org
          </a>
        </div>
      </div>
    </footer>
  );
}





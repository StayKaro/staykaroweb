import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import Chatbot from "@/components/ui/chatbot";

/*
  Heading font: Cormorant Garamond — elegant, classic, high-contrast serif.
  Body font: Plus Jakarta Sans — geometric, clean, and highly readable.
*/
const cormorant = Cormorant_Garamond({
  variable: "--font-heading-local",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body-local",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StayKaro — AI Agents That Never Sleep",
  description:
    "StayKaro builds intelligent AI systems — AI Caller Agents, LMS Platforms, and OPS Automation — empowering businesses with autonomous digital employees.",
  keywords: [
    "AI Agents", "AI Caller Agent", "Business Automation",
    "Operations Platform", "Learning Management System",
    "AI Workflow Automation", "AI Solutions", "Enterprise AI", "StayKaro",
  ],
  authors: [{ name: "StayKaro" }],
  openGraph: {
    title: "StayKaro — AI Agents That Never Sleep",
    description: "Automate calls, operations, learning and workflows with intelligent AI systems.",
    url: "https://www.staykaro.org",
    siteName: "StayKaro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayKaro — AI Agents That Never Sleep",
    description: "Automate calls, operations, learning and workflows with intelligent AI systems.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StayKaro",
  url: "https://www.staykaro.org",
  description: "StayKaro builds intelligent AI systems for business automation.",
  offers: [
    { "@type": "Offer", name: "AI Caller Agent", description: "24/7 AI-powered calling system" },
    { "@type": "Offer", name: "LMS Platform", description: "AI-powered learning management system" },
    { "@type": "Offer", name: "OPS Platform", description: "Intelligent operations platform" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden" suppressHydrationWarning>
        <LenisProvider>
          {children}
        </LenisProvider>
        <Chatbot />
      </body>
    </html>
  );
}

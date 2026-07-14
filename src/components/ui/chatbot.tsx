"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Message { role: "user" | "assistant"; content: string; }

type LeadStage =
  | "DISCOVERY"
  | "CONTACT_COLLECTION_NAME"
  | "CONTACT_COLLECTION_PHONE"
  | "COMPLETED";

interface ConvState {
  leadStage: LeadStage;
  userName: string | null;
  contact: string | null;
}

// ── Word sets ──────────────────────────────────────────────────────────────
const GREETINGS = new Set([
  "hi", "hii", "hiii", "hello", "hey", "yo", "sup",
  "good morning", "good afternoon", "good evening",
  "namaste", "howdy", "greetings", "helo", "heyy", "hiya",
]);

const NOT_A_NAME = new Set([
  "yes", "no", "okay", "ok", "sure", "price", "demo", "what",
  "how", "why", "when", "where", "who", "tell", "show", "help",
  "thanks", "thank you", "bye", "goodbye",
]);

const DEMO_KEYWORDS = [
  "demo", "book", "schedule", "free audit", "talk to your team",
  "speak with", "contact your team", "free call", "appointment",
  "consultation", "get started", "meet your team", "sign up",
];

const QUICK_REPLIES = [
  "AI Caller Agent",
  "LMS Platform",
  "OPS Platform",
  "Integrations",
  "Pricing",
  "Book a demo",
];

const WELCOME =
  "Hi! 👋 I'm Karo, StayKaro's AI guide.\n\nI can help you explore our AI agents, automation solutions, AI Caller Agent, LMS, OPS platform, integrations, or book a demo.\n\nWhat can I help you with?";

// ── Helpers ────────────────────────────────────────────────────────────────
function isGreeting(text: string): boolean {
  const t = text.toLowerCase().trim();
  if (GREETINGS.has(t)) return true;
  return /^(hi+|hey+|hello+)\s*[!?.]*$/.test(t);
}

function isDemoRequest(text: string): boolean {
  const t = text.toLowerCase();
  return DEMO_KEYWORDS.some((kw) => t.includes(kw));
}

function looksLikeIntent(text: string): boolean {
  const t = text.toLowerCase().trim();
  if (isGreeting(text) || isDemoRequest(text)) return true;
  if (/[?]/.test(text)) return true;
  return [
    "caller", "lms", "ops", "pric", "integrat", "contact", "about",
    "product", "automate", "deploy", "feature", "result", "roi",
    "security", "faq", "what", "how", "why", "tell", "show",
    "explain", "can ", "do ", "does ", "is ", "help", "workflow",
    "platform", "voice", "ai ", "learning", "course",
  ].some((kw) => t.includes(kw));
}

function isValidName(text: string): boolean {
  const t = text.trim();
  if (t.length < 2) return false;
  if (isGreeting(text)) return false;
  if (NOT_A_NAME.has(t.toLowerCase())) return false;
  if (/^\d+$/.test(t)) return false;
  if (/\S+@\S+\.\S+/.test(t)) return false;
  if (/^\+?[\d\s\-().]{7,}$/.test(t)) return false;
  if (looksLikeIntent(text)) return false;
  if (!/[a-zA-Z]/.test(t)) return false;
  return true;
}

function validateContact(text: string): { valid: boolean } {
  const t = text.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return { valid: true };
  const digits = t.replace(/[\s\-().+]/g, "");
  if (/^\d{10,13}$/.test(digits)) return { valid: true };
  return { valid: false };
}

// ── Component ──────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conv, setConv] = useState<ConvState>({
    leadStage: "DISCOVERY",
    userName: null,
    contact: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Keep a ref for userName so async callbacks always see the latest value
  const userNameRef = useRef<string | null>(null);

  // Mobile detection — drives near-full-screen layout below 640 px.
  // Initialised after mount to avoid SSR/hydration mismatch.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    userNameRef.current = conv.userName;
  }, [conv.userName]);

  // Only scroll when messages change (new message added), NOT when loading
  // state flips. Watching loading causes the view to snap to bottom while
  // the typing indicator is showing, preventing users from reading long replies.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setConv({ leadStage: "DISCOVERY", userName: null, contact: null });
      setMessages([{ role: "assistant", content: WELCOME }]);
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const addBot = useCallback((content: string) => {
    setMessages((prev) => [...prev, { role: "assistant", content }]);
  }, []);

  const addBotDelayed = useCallback((content: string, ms = 400) => {
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content }]);
      setLoading(false);
    }, ms);
  }, []);

  const askApi = useCallback(
    async (message: string, suffix?: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, userName: userNameRef.current }),
        });
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        const reply = suffix ? `${data.message}\n\n${suffix}` : data.message;
        addBot(reply);
      } catch {
        addBot(
          "Something went wrong. Reach us directly:\n📞 +91 7013987868\n✉️ staykaroatsales@staykaro.org"
        );
      } finally {
        setLoading(false);
      }
    },
    [addBot]
  );

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const msg = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);

    const stage = conv.leadStage;

    // ── Name collection ────────────────────────────────────────────────────
    if (stage === "CONTACT_COLLECTION_NAME") {
      if (looksLikeIntent(msg)) {
        await askApi(msg, "By the way, what's your name so our team can follow up with you?");
        return;
      }
      if (isValidName(msg)) {
        const name = msg.trim();
        userNameRef.current = name;
        setConv((prev) => ({ ...prev, userName: name, leadStage: "CONTACT_COLLECTION_PHONE" }));
        addBotDelayed(`Thanks, ${name}! 😊\n\nWhat's the best phone number or email to reach you?`);
        return;
      }
      addBotDelayed("I didn't catch that as a name. What should I call you?");
      return;
    }

    // ── Contact collection ─────────────────────────────────────────────────
    if (stage === "CONTACT_COLLECTION_PHONE") {
      if (looksLikeIntent(msg) && !validateContact(msg).valid) {
        await askApi(msg, "I still need your phone number or email to set up the demo.");
        return;
      }
      if (validateContact(msg).valid) {
        const name = conv.userName ?? "there";
        setConv((prev) => ({ ...prev, contact: msg.trim(), leadStage: "COMPLETED" }));
        addBotDelayed(
          `Got it, ${name}! ✅\n\nOur team will reach you at ${msg.trim()} within 24 hours to confirm your free 30-minute demo.\n\nFeel free to keep asking me anything about StayKaro in the meantime.`
        );
        return;
      }
      addBotDelayed(
        "That doesn't look like a valid phone number or email.\n\nPlease enter a valid number (e.g. +91 98765 43210) or email address."
      );
      return;
    }

    // ── Normal conversation ────────────────────────────────────────────────
    if (isGreeting(msg)) {
      addBotDelayed(
        "Hey! 👋 How can I help you today?\n\nAsk me about StayKaro's AI solutions, pricing, integrations — or tell me what you'd like to automate."
      );
      return;
    }

    if (isDemoRequest(msg)) {
      setConv((prev) => ({ ...prev, leadStage: "CONTACT_COLLECTION_NAME" }));
      addBotDelayed("I'd love to set that up for you! 🎯\n\nFirst, what's your name?");
      return;
    }

    // Everything else → knowledge base
    await askApi(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showQuickReplies =
    conv.leadStage === "DISCOVERY" && messages.length <= 1 && !loading;

  const placeholder =
    conv.leadStage === "CONTACT_COLLECTION_NAME"
      ? "Your name…"
      : conv.leadStage === "CONTACT_COLLECTION_PHONE"
      ? "Phone number or email…"
      : "Ask me anything…";

  return (
    <>
      {/* ── FAB ─────────────────────────────────────────────────────────────
          Hidden (opacity + pointer-events) on mobile while the full-screen
          overlay is open — the header close button handles dismissal there. */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center rounded-full cursor-pointer"
        style={{
          background: "linear-gradient(145deg,#B91C2C,#DC2626)",
          width: 56,
          height: 56,
          boxShadow:
            "0 4px 24px rgba(185,28,44,0.55), 0 1px 6px rgba(0,0,0,0.5)",
          pointerEvents: isOpen && isMobile ? "none" : "auto",
          opacity: isOpen && isMobile ? 0 : 1,
          transition: "opacity 0.15s",
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle chat"
        aria-hidden={isOpen && isMobile}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ──────────────────────────────────────────────────────
          Mobile  (<640 px): near-full-screen — inset 8px on every side.
          Desktop (≥640 px): floating widget anchored bottom-right.
          Only isMobile-gated styles differ; desktop styles are unchanged.  */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 48 : 18, scale: isMobile ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? 48 : 18, scale: isMobile ? 1 : 0.96 }}
            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
            className="fixed z-50 flex flex-col overflow-hidden"
            style={
              isMobile
                ? {
                    inset: 8,
                    width: "calc(100vw - 16px)",
                    height: "calc(100dvh - 16px)",
                    borderRadius: 20,
                    background: "#0E0507",
                    border: "1px solid rgba(185,28,44,0.3)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.8)",
                  }
                : {
                    bottom: "4.75rem",
                    right: "0.75rem",
                    width: "calc(100vw - 1.5rem)",
                    maxWidth: 400,
                    height: "min(600px, calc(100dvh - 120px))",
                    borderRadius: 20,
                    background: "#0E0507",
                    border: "1px solid rgba(185,28,44,0.3)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(185,28,44,0.1)",
                  }
            }
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div
              className="flex items-center gap-3 px-4 flex-shrink-0"
              style={{
                height: 60,
                background: "linear-gradient(135deg,#991B1B 0%,#B91C2C 50%,#DC2626 100%)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Avatar */}
              <div
                className="relative flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 38,
                  height: 38,
                  background: "rgba(255,255,255,0.18)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                }}
              >
                <Bot className="w-[18px] h-[18px] text-white" />
                {/* Online dot */}
                <span
                  className="absolute rounded-full border-2"
                  style={{
                    width: 10,
                    height: 10,
                    bottom: 0,
                    right: 0,
                    background: "#22c55e",
                    borderColor: "#B91C2C",
                    boxShadow: "0 0 5px rgba(34,197,94,0.8)",
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-white leading-tight font-semibold"
                  style={{ fontSize: 14, letterSpacing: "0.01em" }}
                >
                  Karo
                </p>
                <p
                  className="flex items-center gap-1.5"
                  style={{ fontSize: 11, color: "rgba(255,220,220,0.85)", marginTop: 1 }}
                >
                  <span
                    className="inline-block rounded-full"
                    style={{
                      width: 5,
                      height: 5,
                      background: "#22c55e",
                      boxShadow: "0 0 4px rgba(34,197,94,0.9)",
                    }}
                  />
                  StayKaro AI · Online
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-lg transition-colors"
                style={{
                  width: 32,
                  height: 32,
                  color: "rgba(255,255,255,0.65)",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(255,255,255,0.65)")
                }
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Messages ────────────────────────────────────────────────
                data-lenis-prevent: stops Lenis from intercepting wheel
                events, letting the container scroll natively.
                min-h-0: collapses flex-basis so overflow-y-auto works.
                pb-4: clearance above the composer.                         */}
            <div
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
              style={{
                background: "#0E0507",
                padding: "14px 14px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    justifyContent:
                      msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Bot avatar — only on assistant side */}
                  {msg.role === "assistant" && (
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "linear-gradient(145deg,#B91C2C,#DC2626)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 2,
                        boxShadow: "0 2px 8px rgba(185,28,44,0.5)",
                        flexShrink: 0,
                      }}
                    >
                      <Bot style={{ width: 14, height: 14, color: "#fff" }} />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    style={
                      msg.role === "user"
                        ? {
                            /* ── USER BUBBLE ──────────────────────────────
                               Solid white on dark background — maximum
                               contrast and readability. Clean pill shape
                               with a sharp bottom-right corner (the "tail").  */
                            maxWidth: isMobile ? "78%" : "72%",
                            background: "#FFFFFF",
                            color: "#1A0608",
                            padding: "10px 14px",
                            borderRadius: "18px 18px 4px 18px",
                            fontSize: 14,
                            lineHeight: 1.55,
                            fontWeight: 500,
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            whiteSpace: "pre-line",
                            boxShadow:
                              "0 2px 12px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)",
                          }
                        : {
                            /* ── KARO BUBBLE ──────────────────────────────
                               Dark card, clearly distinct from both the user
                               bubble and the chat background. Sharp bottom-
                               left corner as the "tail".                    */
                            maxWidth: isMobile ? "88%" : "80%",
                            background: "#1E0A0E",
                            color: "#F0E8E4",
                            padding: "10px 14px",
                            borderRadius: "18px 18px 18px 4px",
                            fontSize: 14,
                            lineHeight: 1.6,
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                            whiteSpace: "pre-line",
                            border: "1px solid rgba(220,38,38,0.18)",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.35)",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* ── Typing indicator ──────────────────────────────────── */}
              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 8,
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "linear-gradient(145deg,#B91C2C,#DC2626)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginBottom: 2,
                    }}
                  >
                    <Bot style={{ width: 14, height: 14, color: "#fff" }} />
                  </div>
                  <div
                    style={{
                      background: "#1E0A0E",
                      border: "1px solid rgba(220,38,38,0.18)",
                      borderRadius: "18px 18px 18px 4px",
                      padding: "12px 16px",
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((j) => (
                      <motion.span
                        key={j}
                        style={{
                          display: "block",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#F16A6A",
                        }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: j * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Quick-reply chips ─────────────────────────────────── */}
              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 7,
                    paddingTop: 4,
                    paddingLeft: 36,
                  }}
                >
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      style={{
                        fontSize: 12,
                        padding: "5px 12px",
                        borderRadius: 99,
                        border: "1px solid rgba(220,38,38,0.35)",
                        color: "#F87171",
                        background: "rgba(185,28,44,0.1)",
                        cursor: "pointer",
                        transition: "background 0.15s, border-color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(185,28,44,0.22)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(220,38,38,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(185,28,44,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(220,38,38,0.35)";
                      }}
                    >
                      {qr}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Composer ──────────────────────────────────────────────────
                flex-shrink-0 keeps it pinned at the bottom at all times.
                paddingBottom respects iOS safe-area on mobile.             */}
            <div
              className="flex-shrink-0"
              style={{
                background: "#150609",
                borderTop: "1px solid rgba(185,28,44,0.25)",
                boxShadow: "0 -8px 24px rgba(0,0,0,0.45)",
                padding: `12px 12px ${
                  isMobile ? "max(12px, env(safe-area-inset-bottom))" : "12px"
                }`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0A0304",
                  border: "1px solid rgba(185,28,44,0.4)",
                  borderRadius: 14,
                  minHeight: 52,
                  padding: "0 6px 0 14px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocusCapture={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(220,38,38,0.7)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 0 3px rgba(185,28,44,0.18)";
                }}
                onBlurCapture={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(185,28,44,0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#F0E8E4",
                    caretColor: "#F87171",
                    fontSize: isMobile ? 16 : 14,
                    lineHeight: 1.4,
                    padding: "14px 0",
                    opacity: loading ? 0.55 : 1,
                  }}
                />
                {/* Send button */}
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading}
                  aria-label="Send message"
                  style={{
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: loading ? "default" : "pointer",
                    background:
                      input.trim() && !loading
                        ? "linear-gradient(145deg,#B91C2C,#DC2626)"
                        : "rgba(185,28,44,0.15)",
                    boxShadow:
                      input.trim() && !loading
                        ? "0 2px 10px rgba(185,28,44,0.5)"
                        : "none",
                    transition: "background 0.18s, box-shadow 0.18s",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (input.trim() && !loading)
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  {loading ? (
                    <Loader2
                      className="animate-spin"
                      style={{
                        width: 16,
                        height: 16,
                        color: "rgba(248,113,113,0.7)",
                      }}
                    />
                  ) : (
                    <Send
                      style={{
                        width: 15,
                        height: 15,
                        color: input.trim() ? "#fff" : "rgba(248,113,113,0.4)",
                        transition: "color 0.18s",
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

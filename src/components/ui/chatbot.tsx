"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "What are AI Caller Agents?",
  "Tell me about the LMS",
  "How fast is deployment?",
  "What integrations exist?",
  "Pricing info",
  "Book a demo",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Hi! 👋 I'm Karo, StayKaro's assistant. Ask me anything about our AI agents, LMS platform, OPS automation, pricing, and more.",
      }]);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage = text.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again or reach out to our team directly at staykaro26@gmail.com.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showQuickReplies = messages.length <= 1 && !loading;

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
        style={{ background: "linear-gradient(135deg,#9B1D28,#CC1A1A)", width: 52, height: 52 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="fixed z-50 flex flex-col overflow-hidden rounded-2xl shadow-2xl border border-gray-200"
            style={{
              bottom: "4.5rem",
              right: "0.75rem",
              width: "calc(100vw - 1.5rem)",
              maxWidth: 400,
              height: "min(580px, calc(100dvh - 120px))",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#9B1D28 0%,#CC1A1A 100%)" }}
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm leading-tight">StayKaro Assistant</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-red-100 text-xs">Online · Here to help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded ml-1"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
              style={{ background: "#f8f8f8" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
                      style={{ background: "linear-gradient(135deg,#9B1D28,#CC1A1A)" }}
                    >
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "text-white rounded-2xl rounded-br-sm"
                        : "text-gray-800 bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm"
                    }`}
                    style={msg.role === "user" ? { background: "linear-gradient(135deg,#9B1D28,#CC1A1A)" } : {}}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#9B1D28,#CC1A1A)" }}
                  >
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 px-3 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
                    {[0, 1, 2].map(j => (
                      <motion.div
                        key={j}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#9B1D28" }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: j * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quick reply chips */}
              {showQuickReplies && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_REPLIES.map(qr => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      className="text-xs px-2.5 py-1.5 rounded-full border transition-colors hover:bg-red-50"
                      style={{
                        borderColor: "rgba(155,29,40,0.3)",
                        color: "#9B1D28",
                        background: "rgba(155,29,40,0.04)",
                      }}
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="flex-shrink-0 bg-white border-t border-gray-200 px-3 py-2.5 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about StayKaro…"
                disabled={loading}
                className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-700/40 focus:border-transparent disabled:opacity-50 transition"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg,#9B1D28,#CC1A1A)" }}
                aria-label="Send message"
              >
                {loading
                  ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                  : <Send className="w-3.5 h-3.5 text-white" />
                }
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

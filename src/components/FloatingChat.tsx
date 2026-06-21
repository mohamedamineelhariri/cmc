"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "👋 Bonjour ! Je suis l'assistant E-CMC. Posez-moi vos questions sur la Cité des Métiers et des Compétences Béni Mellal-Khénifra." },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsGenerating(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      // Build conversation history for context
      const history = messages
        .filter((m, i) => !(i === 0 && m.role === "assistant"))  // skip welcome
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/chatsystem/public/chat?stream=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const chunk = (parsed.content || parsed.choices?.[0]?.delta?.content || "").replace(/\[NEWLINE\]/g, "\n");
              accumulated += chunk;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: accumulated };
                return copy;
              });
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: "Désolé, une erreur est survenue. Veuillez réessayer." };
        return copy;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-160px)] bg-white border border-[var(--border-warm)] rounded-none shadow-2xl flex flex-col overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-warm)] bg-[var(--cmc-teal-subtle)]">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-none bg-[var(--cmc-teal)] flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)] block">Assistant E-CMC</span>
                <span className="text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">En ligne</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/60 rounded-none text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-none px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--cmc-teal)] text-white rounded-tr-none"
                      : "bg-[var(--panel-warm)] text-[var(--text-primary)] rounded-tl-none"
                  }`}
                >
                  {msg.role === "user" ? (
                    msg.content
                  ) : isGenerating && i === messages.length - 1 && !msg.content ? (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Réflexion...
                    </span>
                  ) : msg.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  ) : null}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-[var(--border-warm)] bg-white">
            <div className="flex items-center gap-2 bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-none px-4 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                disabled={isGenerating}
                className="flex-1 bg-transparent border-0 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                disabled={isGenerating || !input.trim()}
                className="p-1.5 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white rounded-none transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white rounded-full shadow-lg flex items-center justify-center transition active:scale-95 cursor-pointer animate-pulse-glow"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </>
  );
}

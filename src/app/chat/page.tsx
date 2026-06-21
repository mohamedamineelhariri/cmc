"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Loader2, FileText, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, MapPin, Plus } from "lucide-react";
import { matchLocation, SECTIONS } from "@/data/sections";
import CampusMapView from "@/components/CampusMapView";
import LayoutWrapper from "@/app/layout-wrapper";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: any[];
  rating?: boolean | null;
  feedback?: string | null;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: `👋 **Bienvenue sur Chat E-CMC !**

Je suis l'assistant documentaire de la **Cité des Métiers et des Compétences Béni Mellal-Khénifra**.

Je peux vous renseigner sur :
- Les **filières** et **pôles métiers**
- Les **conditions d'admission** et l'inscription
- La **vie du stagiaire** et les infrastructures
- Les **bourses** et aides disponibles
- Les **débouchés** et le contexte régional

Posez-moi toutes vos questions !`,
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedSources, setExpandedSources] = useState<{ [key: string]: boolean }>({});
  const [showCampusMap, setShowCampusMap] = useState(false);
  const [focusMarkerId, setFocusMarkerId] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (query: string) => {
    if (!query.trim() || isGenerating) return;

    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: query };
    const assistantMsg: Message = { id: `assistant-${Date.now()}`, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsGenerating(true);

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${backendUrl}/chatsystem/public/chat?stream=true`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

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
              const chunk = parsed.content || parsed.choices?.[0]?.delta?.content || "";
              accumulated += chunk;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { ...copy[copy.length - 1], content: accumulated };
                return copy;
              });
            } catch {}
          }
        }
      }

      // Check for location match
      const matched = matchLocation(query) || matchLocation(accumulated);
      if (matched) {
        setFocusMarkerId(matched);
        setShowCampusMap(true);
      }
    } catch (err: any) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          ...copy[copy.length - 1],
          content: `*(Erreur : ${err.message || "Impossible de contacter le serveur"})*`,
        };
        return copy;
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input;
    setInput("");
    sendMessage(q);
  };

  // Auto-send a question passed from the hero search bar (/chat?q=...)
  const autoSentRef = useRef(false);
  useEffect(() => {
    if (autoSentRef.current) return;
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const q = params?.get("q");
    if (q && q.trim()) {
      autoSentRef.current = true;
      sendMessage(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSources = (msgId: string) => {
    setExpandedSources((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <LayoutWrapper>
      <div className="h-[calc(100vh-var(--nav-height))] flex">
        {/* Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="h-16 border-b border-[var(--border-warm)] px-6 flex items-center justify-between bg-white/80">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-none bg-[var(--cmc-teal)] flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Chat E-CMC</span>
                <span className="text-[9px] font-mono text-[var(--text-secondary)] ml-2 uppercase tracking-wider">Assistant RAG</span>
              </div>
            </div>
            <button
              onClick={() => { setShowCampusMap(!showCampusMap); setFocusMarkerId(undefined); }}
              className={`p-2 rounded-none border transition cursor-pointer ${
                showCampusMap
                  ? "bg-[var(--cmc-teal-subtle)] border-[var(--cmc-teal)] text-[var(--cmc-teal)]"
                  : "border-[var(--border-warm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title="Plan du campus"
            >
              <MapPin className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl w-full mx-auto">
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const isTemp = msg.id.startsWith("assistant") && i === messages.length - 1 && isGenerating && !msg.content;

              return (
                <div key={msg.id || i} className={`flex flex-col ${isUser ? "items-end" : "items-start"} animate-fade-in`}>
                  <div className={`max-w-[85%] md:max-w-[75%] rounded-none px-5 py-4 text-sm leading-relaxed ${
                    isUser
                      ? "bg-[var(--cmc-teal)] text-white rounded-tr-none"
                      : "bg-white border border-[var(--border-warm)] rounded-tl-none"
                  }`}>
                    {isTemp ? (
                      <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Réflexion en cours...
                      </span>
                    ) : (
                      msg.content
                    )}
                  </div>

                  {!isUser && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 w-full max-w-[85%] md:max-w-[75%]">
                      <button
                        onClick={() => toggleSources(msg.id)}
                        className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
                      >
                        <FileText className="h-3 w-3" />
                        Sources ({msg.sources.length})
                        {expandedSources[msg.id] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      {expandedSources[msg.id] && (
                        <div className="mt-2 space-y-2 bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-none p-4">
                          {msg.sources.map((src: any, sIdx: number) => (
                            <div key={sIdx} className="text-xs text-[var(--text-secondary)]">
                              <span className="font-medium text-[var(--text-primary)]">{src.filename || "Source"}</span>
                              {src.score !== undefined && (
                                <span className="ml-2 text-[var(--cmc-teal)]">({(src.score * 100).toFixed(0)}%)</span>
                              )}
                              <p className="mt-1 italic">&ldquo;{src.content?.substring(0, 200)}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--border-warm)] bg-white p-4">
            <form onSubmit={handleSend} className="max-w-4xl mx-auto flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-none px-4 py-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  disabled={isGenerating}
                  className="flex-1 bg-transparent border-0 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                disabled={isGenerating || !input.trim()}
                className="bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white p-3 rounded-none transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Campus Map Panel */}
        {showCampusMap && (
          <div className="w-[45%] min-w-[380px] border-l border-[var(--border-warm)] hidden lg:block">
            <CampusMapView
              onClose={() => { setShowCampusMap(false); setFocusMarkerId(undefined); }}
              focusMarkerId={focusMarkerId}
            />
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}

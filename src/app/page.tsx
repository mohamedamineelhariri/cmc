"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/utils/api";
import { consumeChatStream } from "@/utils/stream-reader";
import Link from "next/link";
import {
  MessageSquare,
  Plus,
  LogOut,
  Settings,
  User as UserIcon,
  Send,
  ThumbsUp,
  ThumbsDown,
  Check,
  Lock,
  Mail,
  Phone,
  Shield,
  Activity,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  Menu,
  Loader2,
  MapPin
} from "lucide-react";

interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  title: string | null;
}

interface Message {
  id: string;
  created_at: string;
  role: string;
  content: string;
  rating?: boolean | null;
  feedback?: string | null;
  sources?: any[];
}

export default function Home() {
  const { user, loading, login, logout, refreshUser } = useAuth();

  // Auth state inputs
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // App workspace states
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // UI states
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [expandedSources, setExpandedSources] = useState<{ [msgId: string]: boolean }>({});
  const [activeFeedbackMsgId, setActiveFeedbackMsgId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  // User profile inputs
  const [profileFirstName, setProfileFirstName] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Password update inputs
  const [pwdOld, setPwdOld] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load conversations on successful login
  useEffect(() => {
    if (!user) return;

    loadConversations();
  }, [user, loading]);

  // Load message history on active conversation change
  useEffect(() => {
    if (activeConvId) {
      loadHistory(activeConvId);
    } else {
      setMessages([]);
    }
  }, [activeConvId]);

  // Sync settings inputs when user data updates
  useEffect(() => {
    if (user) {
      setProfileFirstName(user.first_name || "");
      setProfileLastName(user.last_name || "");
      setProfilePhone(user.phone_number || "");
      setProfileEmail(user.email || "");
    }
  }, [user, showSettingsModal]);

  const loadConversations = async () => {
    try {
      const res = await apiFetch("chatsystem/conversations");
      const data: Conversation[] = await res.json();
      setConversations(data);
      // Select the first conversation if none is selected
      if (data.length > 0 && !activeConvId) {
        setActiveConvId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to load conversations", err);
      setConversations([]);
    }
  };

  const loadHistory = async (convId: string) => {
    setIsLoadingHistory(true);
    try {
      const res = await apiFetch(`chatsystem/conversations/${convId}/history`);
      const data: Message[] = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      await login(usernameInput, passwordInput);
    } catch (err: any) {
      setLoginError(err.message || "Identifiants invalides");
    } finally {
      setLoginLoading(false);
    }
  };

  const startNewConversation = async () => {
    try {
      const res = await apiFetch("chatsystem/conversations", { method: "POST" });
      const newConv: Conversation = await res.json();
      setConversations([newConv, ...conversations]);
      setActiveConvId(newConv.id);
      setMobileSidebarOpen(false);
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isGenerating || !activeConvId) return;

    const queryText = inputText;
    setInputText("");
    setIsGenerating(true);

    // 1. Append User message locally
    const tempUserMsgId = `user-temp-${Date.now()}`;
    const userMsg: Message = {
      id: tempUserMsgId,
      created_at: new Date().toISOString(),
      role: "user",
      content: queryText,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Append empty Assistant message locally to stream into
    const tempAssistantMsgId = `assistant-temp-${Date.now()}`;
    const assistantMsg: Message = {
      id: tempAssistantMsgId,
      created_at: new Date().toISOString(),
      role: "assistant",
      content: "",
      sources: []
    };
    setMessages((prev) => [...prev, assistantMsg]);

    try {
      // Call endpoint with stream=true
      const response = await apiFetch(
        `chatsystem/conversations/${activeConvId}/chat?stream=true&precreate_uuids=true`,
        {
          method: "POST",
          body: JSON.stringify({ message: queryText }),
        }
      );

      let accumulatedContent = "";
      let realAssistantId: string | null = null;

      await consumeChatStream(response, {
        onMessageId: (id) => {
          realAssistantId = id;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempAssistantMsgId ? { ...msg, id } : msg
            )
          );
        },
        onChunk: (chunk) => {
          accumulatedContent += chunk;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === (realAssistantId || tempAssistantMsgId)
                ? { ...msg, content: accumulatedContent }
                : msg
            )
          );
        },
        onDone: () => {
          setIsGenerating(false);
          loadHistory(activeConvId);
          loadConversations();
        },
        onError: (err) => {
          console.error("Streaming error", err);
          setIsGenerating(false);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === (realAssistantId || tempAssistantMsgId)
                ? {
                  ...msg,
                  content:
                    accumulatedContent +
                    "\n\n*(Une erreur de communication est survenue lors de la génération)*",
                }
                : msg
            )
          );
        },
      });
    } catch (err: any) {
      console.error(err);
      setIsGenerating(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempAssistantMsgId
            ? {
              ...msg,
              content: `*(Erreur: ${err.message || "Une erreur est survenue"})*`,
            }
            : msg
        )
      );
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);
    try {
      await apiFetch("auth/me", {
        method: "PUT",
        body: JSON.stringify({
          first_name: profileFirstName || null,
          last_name: profileLastName || null,
          phone_number: profilePhone || null,
          email: profileEmail || null,
        }),
      });
      setProfileSuccess("Profil mis à jour avec succès !");
      await refreshUser();
    } catch (err: any) {
      setProfileError(err.message || "Erreur de mise à jour");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess("");
    setPwdLoading(true);
    try {
      await apiFetch("auth/password", {
        method: "POST",
        body: JSON.stringify({
          old_password: pwdOld,
          new_password: pwdNew,
        }),
      });
      setPwdSuccess("Mot de passe mis à jour avec succès !");
      setPwdOld("");
      setPwdNew("");
    } catch (err: any) {
      setPwdError(err.message || "Erreur de mise à jour");
    } finally {
      setPwdLoading(false);
    }
  };

  const handleRating = async (msgId: string, rating: boolean) => {
    try {
      const res = await apiFetch(
        `chatsystem/conversations/${activeConvId}/messages/${msgId}/feedback`,
        {
          method: "POST",
          body: JSON.stringify({ rating }),
        }
      );
      const updatedMsg: Message = await res.json();
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, rating: updatedMsg.rating } : m))
      );
    } catch (err) {
      console.error("Failed to submit rating", err);
    }
  };

  const openFeedbackTextDialog = (msgId: string) => {
    const currentMsg = messages.find((m) => m.id === msgId);
    setFeedbackText(currentMsg?.feedback || "");
    setActiveFeedbackMsgId(msgId);
  };

  const handleSubmitFeedbackText = async () => {
    if (!activeFeedbackMsgId || !activeConvId) return;

    try {
      const res = await apiFetch(
        `chatsystem/conversations/${activeConvId}/messages/${activeFeedbackMsgId}/feedback`,
        {
          method: "POST",
          body: JSON.stringify({ feedback: feedbackText }),
        }
      );
      const updatedMsg: Message = await res.json();
      setMessages((prev) =>
        prev.map((m) =>
          m.id === activeFeedbackMsgId ? { ...m, feedback: updatedMsg.feedback } : m
        )
      );
      setActiveFeedbackMsgId(null);
      setFeedbackText("");
    } catch (err) {
      console.error("Failed to submit feedback comment", err);
    }
  };

  const toggleSources = (msgId: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  // Loading Gate
  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-[var(--bg-warm)]">
        <Loader2 className="h-8 w-8 text-[var(--cmc-teal)] animate-spin mb-4" />
        <p className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-widest">Initialisation de Chat E-CMC...</p>
      </div>
    );
  }

  // Authentication Screen (Login)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-warm)] text-[var(--text-primary)] p-4 relative overflow-hidden font-sans">
        {/* Soft atmospheric background grids / details inspired by Synapser */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E1D9_1px,transparent_1px),linear-gradient(to_bottom,#E2E1D9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--cmc-teal)]/5 rounded-full blur-[100px]" />

        <div className="w-full max-w-md bg-white border border-[var(--border-warm)] p-10 rounded-2xl shadow-xl hover-lift relative animate-fade-in-up z-10">
          {/* Header Branding */}
          <div className="text-center mb-8">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--cmc-teal)] block mb-4">
              // SECURE ACCESS SYSTEM
            </span>
            <div className="mx-auto mb-6 w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="/logo/logo.png"
                alt="CMC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-serif font-medium tracking-tight text-[var(--text-primary)] mb-2">
              Chat E-CMC
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-[10px] uppercase tracking-wider">
              PORTAIL CMC — OFPPT
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-[var(--panel-warm)] border border-[var(--border-warm)] text-[var(--cmc-danger)] font-mono text-xs rounded-xl flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[var(--cmc-danger)] rounded-full shrink-0" />
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                Nom d'utilisateur / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-4 py-3 pl-11 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cmc-teal)] transition font-sans text-sm"
                  placeholder="admin@medbotv2.local"
                />
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-secondary)]">
                  Mot de passe
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-4 py-3 pl-11 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cmc-teal)] transition font-sans text-sm"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[var(--text-secondary)]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[var(--text-primary)] hover:bg-[#2A2A28] text-white font-medium py-3.5 px-4 rounded-xl shadow-xs transition active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-mono text-xs uppercase tracking-widest"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                "Accéder au portail"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--border-light)] text-center">
            <div className="flex items-center justify-center gap-2 text-[9px] text-[var(--text-secondary)] font-mono uppercase tracking-widest">
              <Shield className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <span>Accès CMC Administrateur</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Area
  return (
    <div className="h-screen w-screen flex bg-[var(--bg-warm)] text-[var(--text-primary)] overflow-hidden relative font-sans">

      {/* 1. SIDEBAR (Left pane - Desktop static / Mobile overlay) */}
      <aside
        className={`w-80 border-r border-[var(--border-warm)] bg-[var(--panel-warm)] flex flex-col z-30 transition-transform duration-300 absolute md:static inset-y-0 left-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Title branding bar */}
        <div className="h-16 border-b border-[var(--border-warm)] px-6 flex items-center justify-between bg-white/40">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="/logo/logo.png"
                alt="CMC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif font-bold text-sm tracking-wide text-[var(--text-primary)]">
              Chat E-CMC
            </span>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1.5 hover:bg-[var(--border-light)] rounded-lg text-[var(--text-secondary)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action Button: Create new chat */}
        <div className="p-4 space-y-2">
          <button
            onClick={startNewConversation}
            className="w-full bg-[var(--text-primary)] hover:bg-[#2A2A28] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-95 text-xs font-mono uppercase tracking-widest"
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle Session</span>
          </button>
          <Link
            href="/campus"
            className="w-full bg-white border border-[var(--border-warm)] hover:bg-[var(--panel-warm)] text-[var(--text-primary)] rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-xs transition cursor-pointer active:scale-95 text-xs font-mono uppercase tracking-widest"
          >
            <MapPin className="h-4 w-4" />
            <span>Plan Campus</span>
          </Link>
        </div>

        {/* Scrollable conversation history */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1 py-2 dark-scroll">
          <span className="font-mono text-[8px] tracking-widest text-[var(--text-muted)] uppercase block px-3 mb-2">// 01 SESSIONS HISTORY</span>
          {conversations.length === 0 ? (
            <div className="text-center py-8 font-mono text-[10px] text-[var(--text-secondary)]">
              Aucun historique.
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = activeConvId === conv.id;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition cursor-pointer ${isActive
                    ? "bg-white border border-[var(--border-warm)] text-[var(--text-primary)] font-medium shadow-xs"
                    : "hover:bg-white/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-[var(--cmc-teal)]" />
                  <span className="text-sm truncate block flex-1">
                    {conv.title || `Chat ${conv.id.substring(0, 8)}`}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer block - Logged user context */}
        <div className="p-4 border-t border-[var(--border-warm)] bg-white/40 flex items-center justify-between font-sans">
          <div className="flex items-center gap-3 truncate max-w-[70%]">
            <div className="h-9 w-9 bg-white border border-[var(--border-warm)] rounded-full flex items-center justify-center text-[var(--text-primary)] font-mono text-xs font-semibold">
              {user.first_name ? user.first_name[0] : user.username[0].toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.username}
              </p>
              <p className="text-[9px] font-mono text-[var(--text-secondary)] tracking-wider uppercase">
                {user.username.split("@")[1] || "CMC USER"}
              </p>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 hover:bg-white/80 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
              title="Paramètres"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={logout}
              className="p-2 hover:bg-red-50 rounded-lg text-[var(--text-secondary)] hover:text-[var(--cmc-danger)] transition cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop overlay for mobile sidebar */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/10 z-20 md:hidden backdrop-blur-xs"
        />
      )}

      {/* 2. CHAT WORKSPACE (Right pane - Scroll area and input console) */}
      <main className="flex-1 flex flex-col bg-[var(--bg-warm)] relative">

        {/* App bar / workspace header */}
        <header className="h-16 border-b border-[var(--border-warm)] px-6 flex items-center justify-between bg-white/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-1.5 hover:bg-[var(--border-light)] rounded-lg text-[var(--text-secondary)]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-serif font-medium text-[var(--text-primary)]">
                Chat E-CMC — Workspace
              </span>
              <span className="text-[9px] font-mono text-[var(--text-secondary)] truncate max-w-[200px] md:max-w-none">
                {activeConvId ? `ID // ${activeConvId}` : "AUCUNE SESSION"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-mono text-[var(--cmc-success)] tracking-widest uppercase font-semibold">
              RAG ACTIVE
            </span>
          </div>
        </header>

        {/* Message scroll pane */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 max-w-4xl w-full mx-auto pb-32">
          {isLoadingHistory ? (
            <div className="h-full w-full flex flex-col justify-center items-center">
              <Loader2 className="h-8 w-8 text-[var(--cmc-teal)] animate-spin mb-2" />
              <p className="text-xs font-mono text-[var(--text-secondary)]">Chargement de l'historique...</p>
            </div>
          ) : !activeConvId ? (
            <div className="h-full w-full flex flex-col justify-center items-center text-center p-6 bg-white border border-[var(--border-warm)] rounded-2xl max-w-xl mx-auto my-auto max-h-[300px] shadow-xs">
              <MessageSquare className="h-10 w-10 text-[var(--cmc-teal)]/30 mb-4" />
              <h3 className="text-xl font-serif font-medium text-[var(--text-primary)]">Portail Chat E-CMC</h3>
              <p className="text-[var(--text-secondary)] text-sm max-w-xs mt-2 leading-relaxed font-sans">
                Veuillez créer ou sélectionner une session dans le panneau de gauche pour débuter l'exploration.
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full w-full flex flex-col justify-center items-center text-center p-8 bg-white border border-[var(--border-warm)] rounded-2xl max-w-xl mx-auto my-auto max-h-[300px] shadow-xs animate-fade-in">
              <div className="h-12 w-12 bg-[var(--cmc-teal-subtle)] rounded-xl flex items-center justify-center mb-5 border border-[var(--cmc-teal)]/10 shadow-xs">
                <FileText className="h-6 w-6 text-[var(--cmc-teal)]" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-[var(--text-primary)]">Assistant RAG — Chat E-CMC</h3>
              <p className="text-[var(--text-secondary)] text-sm max-w-sm mt-3 leading-relaxed font-sans">
                Posez vos questions administratives ou pédagogiques. L'assistant formule des réponses sourcées à partir de la base documentaire de la Cité des Métiers et des Compétences.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isUser = msg.role === "user";
              const isTemp = msg.id.startsWith("assistant-temp");
              return (
                <div
                  key={msg.id || index}
                  className="flex flex-col animate-fade-in w-full"
                >
                  {/* Sender & Timestamp block */}
                  <div className={`flex items-center gap-2 text-[9px] font-mono text-[var(--text-secondary)] mb-2 px-1 ${isUser ? "justify-end" : "justify-start"}`}>
                    <span className="uppercase tracking-widest font-semibold text-[var(--text-primary)]">
                      {isUser ? "// USER" : "// E-CMC ASSISTANT"}
                    </span>
                    <span>•</span>
                    <span>
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                        : "EN STREAM"}
                    </span>
                  </div>

                  {/* Message body */}
                  <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                    {isUser ? (
                      // User Message: Clean white cards with faint shadows and borders
                      <div className="max-w-[85%] md:max-w-[75%] rounded-2xl px-6 py-4 bg-white border border-[var(--border-warm)] text-[var(--text-primary)] shadow-xs font-sans text-sm rounded-tr-none">
                        {msg.content}
                      </div>
                    ) : (
                      // Assistant Message: BUBBLE-FREE directly flowing on the background! Extremely elegant Claude-style.
                      <div className={`w-full font-sans text-sm leading-relaxed text-[var(--text-primary)] pl-1 pr-4 whitespace-pre-wrap select-text ${isTemp && isGenerating ? "typing-caret" : ""}`}>
                        {msg.content}
                      </div>
                    )}
                  </div>

                  {/* Assistant controls: Footnote Citations & Feedback */}
                  {!isUser && !isTemp && (
                    <div className="mt-4 w-full pl-1 max-w-3xl flex flex-col gap-4">
                      {/* citation toggle */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="border border-[var(--border-warm)] rounded-xl bg-white overflow-hidden shadow-xs">
                          <button
                            onClick={() => toggleSources(msg.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-xs text-[var(--text-primary)] hover:bg-[var(--panel-warm)]/40 transition cursor-pointer font-mono uppercase tracking-wider"
                          >
                            <span className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-[var(--cmc-teal)]" />
                              Sources Documentaires ({msg.sources.length})
                            </span>
                            {expandedSources[msg.id] ? (
                              <ChevronUp className="h-4 w-4 text-[var(--text-secondary)]" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-[var(--text-secondary)]" />
                            )}
                          </button>

                          {expandedSources[msg.id] && (
                            <div className="border-t border-[var(--border-warm)] p-4 space-y-4 bg-[var(--panel-warm)]/30 divide-y divide-[var(--border-light)] font-sans">
                              {msg.sources.map((src, sIdx) => (
                                <div key={sIdx} className="pt-4 first:pt-0">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-[var(--text-primary)] font-serif">
                                      {src.filename || src.meta?.filename || "Document Source"}
                                    </span>
                                    {src.score !== undefined && (
                                      <span className="bg-[var(--cmc-teal-subtle)] text-[var(--cmc-teal-dark)] px-2.5 py-0.5 rounded-full text-[10px] border border-[var(--cmc-teal)]/10 font-mono font-medium">
                                        MATCH: {(src.score * 100).toFixed(0)}%
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[var(--text-secondary)] leading-relaxed italic bg-white p-3 rounded-xl border border-[var(--border-warm)] text-xs font-sans">
                                    "{src.content || src.text}"
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* feedback block */}
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRating(msg.id, true)}
                            className={`p-1.5 rounded-lg border transition cursor-pointer ${msg.rating === true
                              ? "bg-emerald-50 border-emerald-300 text-[var(--cmc-success)]"
                              : "border-[var(--border-warm)] bg-white hover:bg-[var(--panel-warm)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              }`}
                            title="Réponse utile"
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleRating(msg.id, false)}
                            className={`p-1.5 rounded-lg border transition cursor-pointer ${msg.rating === false
                              ? "bg-orange-50 border-orange-300 text-[var(--cmc-danger)]"
                              : "border-[var(--border-warm)] bg-white hover:bg-[var(--panel-warm)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              }`}
                            title="Réponse incorrecte"
                          >
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => openFeedbackTextDialog(msg.id)}
                            className={`text-[11px] font-mono uppercase tracking-wider hover:underline transition cursor-pointer ${msg.feedback
                              ? "text-[var(--cmc-teal)]"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              }`}
                          >
                            {msg.feedback ? "// AVIS ENREGISTRÉ" : "// COMPLÉTER LA RÉPONSE"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Console */}
        {activeConvId && (
          <footer className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--bg-warm)] via-[var(--bg-warm)]/90 to-transparent">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative bg-white border border-[var(--border-warm)] rounded-2xl shadow-md p-1.5 flex items-center gap-2 hover-lift">
              <input
                type="text"
                maxLength={512}
                disabled={isGenerating}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-transparent border-0 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-0 py-3 pl-4 pr-12 text-sm font-sans"
                placeholder={
                  isGenerating
                    ? "Génération RAG en cours..."
                    : "Rechercher un document ou poser une question..."
                }
              />
              <button
                type="submit"
                disabled={isGenerating || !inputText.trim()}
                className="p-2.5 bg-[var(--text-primary)] hover:bg-[var(--cmc-teal)] text-white rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="max-w-3xl mx-auto flex items-center justify-between mt-2 px-2 text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-widest">
              <span>Limite // 512 caract.</span>
              <span>Moteur // Qwen3 30B RAG</span>
            </div>
          </footer>
        )}
      </main>

      {/* 3. SETTINGS & PROFILE DIALOG MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1A]/10 backdrop-blur-xs p-4">
          <div className="bg-white border border-[var(--border-warm)] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[var(--border-warm)] flex items-center justify-between bg-[var(--panel-warm)]/40">
              <div className="flex items-center gap-2 text-[var(--text-primary)]">
                <Settings className="h-5 w-5 text-[var(--cmc-teal)]" />
                <h3 className="font-serif font-medium text-base">Configuration Profil</h3>
              </div>
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setProfileError("");
                  setProfileSuccess("");
                  setPwdError("");
                  setPwdSuccess("");
                }}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 hover:bg-white/80 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh] font-sans">
              {/* Form A: General Profile Info */}
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)] border-b border-[var(--border-warm)] pb-2">
                  // INFORMATIONS PERSONELLES
                </h4>

                {profileError && (
                  <div className="p-3 bg-orange-50 border border-orange-200 text-[var(--cmc-danger)] text-xs rounded-lg font-mono">
                    {profileError}
                  </div>
                )}
                {profileSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-[var(--cmc-success)] text-xs rounded-lg font-mono">
                    {profileSuccess}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 font-sans">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={profileFirstName}
                      onChange={(e) => setProfileFirstName(e.target.value)}
                      className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--cmc-teal)] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 font-sans">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={profileLastName}
                      onChange={(e) => setProfileLastName(e.target.value)}
                      className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--cmc-teal)] font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                      Numéro de téléphone
                    </label>
                    <input
                      type="text"
                      placeholder="+212600000000"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--cmc-teal)] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      placeholder="nom@ofppt.ma"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--cmc-teal)] font-sans"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="bg-[var(--text-primary)] hover:bg-[#2A2A28] text-white text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
                  >
                    {profileLoading ? "Enregistrement..." : "Sauvegarder"}
                  </button>
                </div>
              </form>

              {/* Form B: Update Password */}
              <form onSubmit={handleUpdatePassword} className="space-y-4 pt-4 border-t border-[var(--border-warm)]">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)] border-b border-[var(--border-warm)] pb-2 font-serif">
                  // MODIFIER LE MOT DE PASSE
                </h4>

                {pwdError && (
                  <div className="p-3 bg-orange-50 border border-orange-200 text-[var(--cmc-danger)] text-xs rounded-lg font-mono">
                    {pwdError}
                  </div>
                )}
                {pwdSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-[var(--cmc-success)] text-xs rounded-lg font-mono">
                    {pwdSuccess}
                  </div>
                )}

                <div>
                  <label className="block text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                    Ancien mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdOld}
                    onChange={(e) => setPwdOld(e.target.value)}
                    className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--cmc-teal)]"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={pwdNew}
                    onChange={(e) => setPwdNew(e.target.value)}
                    className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--cmc-teal)]"
                    placeholder="Min. 8 caractères"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={pwdLoading}
                    className="bg-[var(--text-primary)] hover:bg-[#2A2A28] text-white text-xs font-mono uppercase tracking-wider px-4 py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
                  >
                    {pwdLoading ? "Mise à jour..." : "Mettre à jour"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 4. FEEDBACK / COMMENT MODAL DIALOG */}
      {activeFeedbackMsgId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C1A]/10 backdrop-blur-xs p-4 animate-fade-in font-sans">
          <div className="bg-white border border-[var(--border-warm)] rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
            <h3 className="font-serif font-medium text-sm text-[var(--text-primary)] mb-2">
              Commenter la réponse
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Précisez le problème rencontré ou suggérez une correction pour améliorer l'assistant RAG.
            </p>
            <textarea
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full bg-[var(--bg-warm)] border border-[var(--border-warm)] rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--cmc-teal)] transition font-sans"
              placeholder="Décrivez votre retour ou correction..."
            />
            <div className="flex justify-end gap-2 mt-4 font-mono text-xs uppercase tracking-wider">
              <button
                onClick={() => {
                  setActiveFeedbackMsgId(null);
                  setFeedbackText("");
                }}
                className="px-3.5 py-2 rounded-xl text-xs hover:bg-[var(--panel-warm)]/40 text-[var(--text-secondary)] cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmitFeedbackText}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--text-primary)] hover:bg-[#2A2A28] text-white cursor-pointer"
              >
                Envoyer le retour
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

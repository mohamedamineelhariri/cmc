"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2, Users, MapPin, ArrowRight, Search, BookOpen, Sparkles, ChevronDown,
  FileText, ClipboardCheck, GraduationCap,
  ChevronLeft, ChevronRight, ArrowUpRight,
} from "lucide-react";
import LayoutWrapper from "./layout-wrapper";
import Reveal from "@/components/Reveal";
import { POLES } from "@/data/poles";
import { NEWS } from "@/data/news";

const STATS = [
  { value: "2 676", label: "Places pédagogiques", icon: Users },
  { value: "64", label: "Filières de formation", icon: BookOpen },
  { value: "10", label: "Pôles métiers", icon: Building2 },
  { value: "414", label: "Lits et couverts", icon: MapPin },
];

const SUGGESTIONS = [
  "Quelles sont les filières du pôle Digital ?",
  "Conditions d'inscription en Technicien Spécialisé ?",
  "Combien vaut la bourse des stagiaires ?",
  "Comment se déroule l'admission ?",
];

// Campus spaces — "Nos structures communes", reversed so centre-conferences anchors inner right edge
const ESPACES = [
  { slug: "centre-langues", name: "Centre de langues & Soft Skills" },
  { slug: "cop", name: "Centre d'orientation professionnelle" },
  { slug: "innovation", name: "Espaces d'innovation" },
  { slug: "incubateur", name: "Incubateur" },
  { slug: "mediatheque", name: "Médiathèque" },
  { slug: "services-entreprises", name: "Services aux entreprises & entrepreneuriat" },
  { slug: "centre-conferences", name: "Centre de conférences" },
];

const ADMISSION_STEPS = [
  { icon: FileText, title: "Pré-inscription en ligne", desc: "Téléchargez la fiche de pré-inscription sur la plateforme MyWay et joignez les pièces requises." },
  { icon: ClipboardCheck, title: "Test d'admission", desc: "Passez le test de sélection correspondant à votre niveau (Spécialisation, Qualification, Technicien, TS)." },
  { icon: GraduationCap, title: "Inscription définitive", desc: "Confirmez votre place après résultats et rejoignez la rentrée de la CMC Béni Mellal-Khénifra." },
];

const PARTNERS = [
  { name: "UM6P", slug: "um6p" },
  { name: "Bank Al-Maghrib", slug: "bankal" },
  { name: "ANAPEC", slug: "anapec" },
  { name: "CRI Béni Mellal-Khénifra", slug: "cri" },
  { name: "Université Sultan Moulay Slimane", slug: "usms" },
  { name: "Swisscontact", slug: "swisscontact" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "OCP — Al Moutmir", slug: "ocp" },
  { name: "FRMF", slug: "frmf" },
];

// Actualités filter tabs (curated from the busiest news categories)
const NEWS_TABS = ["Tous", "Événement", "Orientation", "Entrepreneuriat", "Partenariat"];

export default function HomePage() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const ask = (text?: string) => {
    const query = (text ?? q).trim();
    if (!query) return;
    router.push(`/chat?q=${encodeURIComponent(query)}`);
  };

  // Cinematic hero parallax + top scroll-progress bar (rAF-throttled, reduced-motion aware)
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroVeilRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight || 1;
        const p = Math.min(y / vh, 1);
        if (progressRef.current) {
          const docH = document.documentElement.scrollHeight - window.innerHeight;
          progressRef.current.style.transform = `scaleX(${docH > 0 ? y / docH : 0})`;
        }
        if (!reduce) {
          if (heroVideoRef.current) {
            heroVideoRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + p * 0.12})`;
          }
          if (heroVeilRef.current) {
            heroVeilRef.current.style.opacity = String(0.1 + p * 0.5);
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── §4 Pôles carousel ──
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollTrack = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    restartAutoPlay();
  };
  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setActiveIdx(Math.round(p * (POLES.length - 1)));
  };
  const goToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (POLES.length - 1)) * max, behavior: "smooth" });
    restartAutoPlay();
  };

  // ── §5 Campus-spaces carousel ──
  const track2Ref = useRef<HTMLDivElement>(null);
  const [activeIdx2, setActiveIdx2] = useState(0);
  useEffect(() => {
    const el = track2Ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth - el.clientWidth;
    });
  }, []);
  const scrollTrack2 = (dir: number) => {
    const el = track2Ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    restartAutoPlay2();
  };
  const onTrack2Scroll = () => {
    const el = track2Ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setActiveIdx2(Math.round(p * (ESPACES.length - 1)));
  };
  const goToCard2 = (i: number) => {
    const el = track2Ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (ESPACES.length - 1)) * max, behavior: "smooth" });
    restartAutoPlay2();
  };

  // ── Click-to-scroll for all carousels ──
  const trackClick = (e: React.MouseEvent, track: typeof trackRef, scroll: typeof scrollTrack) => {
    const t = e.target as HTMLElement;
    if (t.closest("a")) return;
    const el = track.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    scroll(e.clientX < rect.left + rect.width / 2 ? -1 : 1);
  };

  // ── §7 News carousel ──
  const track3Ref = useRef<HTMLDivElement>(null);
  const [activeIdx3, setActiveIdx3] = useState(0);
  const [newsFilter, setNewsFilter] = useState("Tous");
  const filteredNews = newsFilter === "Tous" ? NEWS : NEWS.filter((n) => n.category === newsFilter);
  const scrollTrack3 = (dir: number) => {
    const el = track3Ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    restartAutoPlay3();
  };
  const onTrackScroll3 = () => {
    const el = track3Ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setActiveIdx3(Math.round(p * (filteredNews.length - 1)));
  };
  const goToCard3 = (i: number) => {
    const el = track3Ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (i / (filteredNews.length - 1)) * max, behavior: "smooth" });
    restartAutoPlay3();
  };

  // ── Autoplay ──
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoPlay2Ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoPlay3Ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const startAutoPlay = () => {
    clearInterval(autoPlayRef.current!);
    autoPlayRef.current = setInterval(() => {
      const next = (activeIdx + 1) % POLES.length;
      goToCard(next);
    }, 4500);
  };
  const startAutoPlay2 = () => {
    clearInterval(autoPlay2Ref.current!);
    autoPlay2Ref.current = setInterval(() => {
      const next = (activeIdx2 + 1) % ESPACES.length;
      goToCard2(next);
    }, 5000);
  };
  const startAutoPlay3 = () => {
    clearInterval(autoPlay3Ref.current!);
    autoPlay3Ref.current = setInterval(() => {
      const len = filteredNews.length;
      if (len < 2) return;
      const next = (activeIdx3 + 1) % len;
      goToCard3(next);
    }, 4500);
  };
  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (autoPlay2Ref.current) clearInterval(autoPlay2Ref.current);
    if (autoPlay3Ref.current) clearInterval(autoPlay3Ref.current);
  };
  useEffect(() => { startAutoPlay(); startAutoPlay2(); startAutoPlay3(); return stopAutoPlay; }, [filteredNews.length]);
  // restart after manual scroll
  const restartAutoPlay = () => { stopAutoPlay(); startAutoPlay(); };
  const restartAutoPlay2 = () => { stopAutoPlay(); startAutoPlay2(); };
  const restartAutoPlay3 = () => { stopAutoPlay(); startAutoPlay3(); };

  return (
    <LayoutWrapper>
      {/* Scroll-progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--cmc-teal)] origin-left z-[60] scale-x-0 pointer-events-none"
      />

      {/* ── §1 Hero — full-screen video only ── */}
      <section className="relative w-full h-[calc(100vh-var(--nav-height))] overflow-hidden bg-[var(--cmc-navy)]">
        <video ref={heroVideoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover will-change-transform">
          <source src="/campus/hero.mp4" type="video/mp4" />
        </video>
        {/* Parallax darkening veil — intensifies as you scroll out of the hero */}
        <div ref={heroVeilRef} className="absolute inset-0 bg-black pointer-events-none" style={{ opacity: 0.1 }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-warm)] via-[var(--bg-warm)]/40 to-transparent" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown className="h-7 w-7 text-white/70 animate-bounce" />
        </div>
      </section>

      {/* ── §2 AI assistant — open & airy ── */}
      <section className="relative z-10 mx-auto px-6 lg:px-10 pt-20 md:pt-28 pb-24 md:pb-32 text-center" style={{ maxWidth: "var(--max-width)" }}>
        <Reveal variant="scale" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--cmc-teal)]/20 bg-white text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--cmc-teal)] mb-6">
          <Sparkles className="h-3.5 w-3.5" /> Assistant E-CMC
        </Reveal>
        <Reveal as="h1" delay={80} className="font-serif font-bold text-[var(--text-primary)] text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-balance max-w-3xl mx-auto">
          Une question sur la CMC Béni Mellal-Khénifra ?
        </Reveal>
        <Reveal as="p" delay={170} className="text-base md:text-lg text-[var(--text-secondary)] mt-5 max-w-xl mx-auto leading-relaxed text-pretty">
          Formations, admission, bourse, vie étudiante — l&apos;assistant vous répond instantanément.
        </Reveal>

        <Reveal as="form" delay={260} onSubmit={(e: React.FormEvent) => { e.preventDefault(); ask(); }} className="mt-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-white border border-[var(--border-warm)] rounded-none shadow-[0_24px_60px_-28px_rgba(28,28,26,0.3)] p-2 pl-5">
            <Sparkles className="h-5 w-5 text-[var(--cmc-teal)] shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Posez votre question sur la CMC…"
              className="flex-1 bg-transparent border-0 text-sm md:text-base text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none py-3"
              aria-label="Posez votre question à l'assistant"
            />
            <button type="submit" className="flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-5 py-3 rounded-none text-sm font-medium transition active:scale-95 shrink-0">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Demander</span>
            </button>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {SUGGESTIONS.map((s, i) => (
            <Reveal as="button" key={s} delay={340 + i * 60} onClick={() => ask(s)} className="text-xs text-[var(--text-secondary)] bg-white hover:bg-[var(--cmc-teal-subtle)] hover:text-[var(--cmc-teal)] border border-[var(--border-warm)] rounded-full px-3.5 py-1.5 transition">
              {s}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── §3 Statement + key figures ── */}
      <section className="bg-[#32acc1] py-24 md:py-36">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: statement + paragraph + tiles */}
            <div>
              <h2 className="font-serif font-extrabold tracking-tight leading-[1.02] text-white text-5xl md:text-6xl lg:text-7xl">
                <Reveal as="span" className="block">Découvrir.</Reveal>
                <Reveal as="span" delay={140} className="block">Apprendre.</Reveal>
                <Reveal as="span" delay={280} className="block text-[#ebbb31]">Entreprendre.</Reveal>
              </h2>
              <Reveal as="p" delay={380} className="text-white/75 text-base md:text-[17px] leading-relaxed max-w-xl mt-7">
                « Découvrir, Apprendre, Entreprendre » incarne l&apos;engagement de la CMC Béni Mellal-Khénifra :
                éveiller les vocations, transmettre des compétences concrètes et préparer chaque stagiaire à un métier d&apos;avenir.
              </Reveal>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {STATS.map((stat, i) => (
                  <Reveal key={stat.label} variant="scale" delay={i * 110} className="relative aspect-square bg-white/10 border border-white/20 p-4 flex flex-col transition-colors hover:bg-white/15">
                    <div className="text-2xl md:text-3xl font-bold leading-none text-white">{stat.value}</div>
                    <div className="text-[12px] mt-2 leading-tight text-white/70">{stat.label}</div>
                    <stat.icon className="h-5 w-5 mt-auto text-[#ebbb31]" />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right: rentrée image */}
            <Reveal variant="right" delay={120} className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[400px] aspect-[4/5] overflow-hidden border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/campus/rentree.jpg" alt="Rentrée 2025-2026 — 23 590 places pédagogiques" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── §4 Pôles métiers — statement + UM6P-style carousel ── */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="lg:grid lg:grid-cols-[40%_60%] lg:items-center lg:gap-8">
          {/* Left: statement only */}
          <div className="px-6 lg:pl-10 lg:pr-0 min-[1320px]:pl-[calc((100vw-1280px)/2+2.5rem)] mb-12 lg:mb-0">
            <h2 className="font-serif font-extrabold tracking-tight leading-[1.0] text-[var(--text-primary)] text-5xl md:text-6xl lg:text-7xl">
              <Reveal as="span" className="block">Votre métier</Reveal>
              <Reveal as="span" delay={140} className="block">commence</Reveal>
              <Reveal as="span" delay={280} className="block text-[var(--cmc-teal)]">ici.</Reveal>
            </h2>
            <Reveal as={Link} href="/programs" delay={400} className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cmc-teal)] hover:gap-2.5 transition-all">
              Toutes les filières <ArrowRight className="h-4 w-4" />
            </Reveal>
          </div>

          {/* Right: carousel with bleeding portrait + text cards */}
          <Reveal variant="left" delay={120} amount={0.05} className="relative min-w-0">
            {/* Track of full pôle-image cards */}
            <div
              ref={trackRef}
              onScroll={onTrackScroll}
              onClick={(e) => trackClick(e, trackRef, scrollTrack)}
              onMouseEnter={stopAutoPlay}
              onMouseLeave={startAutoPlay}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-6 lg:pl-10 pr-6 lg:pr-18 pb-2 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {POLES.map((pole) => (
                <article
                  key={pole.slug}
                  className="group relative shrink-0 snap-start w-[280px] sm:w-[300px] h-[400px] overflow-hidden border border-[var(--border-warm)] bg-[var(--panel-warm)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/poles/cards/${pole.slug}.jpg`} alt={`Pôle ${pole.name}`} draggable="false" className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/15 to-transparent">
                    <Link
                      href={`/programs/${pole.slug}`}
                      className="inline-flex items-center gap-2 bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-lg hover:bg-gray-100 transition"
                    >
                      <span className="text-[13px] font-semibold text-[var(--text-primary)] whitespace-nowrap">Découvrir le pôle</span>
                      <span className="h-7 w-7 rounded-full bg-[var(--cmc-teal)] text-white flex items-center justify-center">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Controls: arrows + dots (bottom-right) */}
            <div className="flex justify-end items-center gap-4 mt-6 pr-6 lg:pr-18">
              <div className="flex items-center gap-2">
                {POLES.map((pole, i) => (
                  <button
                    key={pole.slug}
                    onClick={() => goToCard(i)}
                    aria-label={`Aller au pôle ${pole.short}`}
                    className={`h-2 rounded-full transition-all ${i === activeIdx ? "w-6 bg-[var(--cmc-teal)]" : "w-2 bg-[var(--border-warm)] hover:bg-[var(--text-muted)]"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button onClick={() => scrollTrack(-1)} aria-label="Précédent" className="h-10 w-10 rounded-full border border-[var(--border-warm)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--cmc-teal)] hover:text-[var(--cmc-teal)] transition">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => scrollTrack(1)} aria-label="Suivant" className="h-10 w-10 rounded-full border border-[var(--border-warm)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--cmc-teal)] hover:text-[var(--cmc-teal)] transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── §5 Nos structures communes — statement + campus-space image carousel ── */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="lg:grid lg:grid-cols-[60%_40%] lg:items-center lg:gap-8">
          {/* Right (desktop): statement — kept first in DOM so it leads on mobile */}
          <div className="lg:order-2 flex flex-col lg:items-end px-6 lg:pr-18 lg:pl-0 min-[1320px]:pr-[calc((100vw-1280px)/2+4.5rem)] mb-12 lg:mb-0">
            <h2 className="w-full text-left lg:text-right font-serif font-extrabold tracking-tight leading-[1.0] text-[var(--text-primary)] text-5xl md:text-6xl lg:text-7xl">
              <Reveal as="span" className="block">Des espaces</Reveal>
              <Reveal as="span" delay={140} className="block">pensés pour</Reveal>
              <Reveal as="span" delay={280} className="block text-[var(--cmc-teal)]">apprendre.</Reveal>
            </h2>
            <Reveal as={Link} href="/vie-etudiante" delay={380} className="mt-8 self-start lg:self-end inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cmc-teal)] hover:gap-2.5 transition-all">
              Découvrir le campus <ArrowRight className="h-4 w-4" />
            </Reveal>
          </div>

          {/* Left (desktop): full-image carousel of campus spaces */}
          <div className="relative min-w-0 lg:order-1">
            <div
              ref={track2Ref}
              onScroll={onTrack2Scroll}
              onClick={(e) => trackClick(e, track2Ref, scrollTrack2)}
              onMouseEnter={stopAutoPlay}
              onMouseLeave={startAutoPlay2}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pr-6 lg:pr-10 min-[1320px]:pr-[calc((100vw-1280px)/2+2.5rem)] pl-6 lg:pl-10 pb-2 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {ESPACES.map((e, i) => (
                <Reveal
                  as="article"
                  key={e.slug}
                  variant="right"
                  delay={i * 90}
                  amount={0}
                  rootMargin="0px 100% -5% 0px"
                  className="group relative shrink-0 snap-end w-[280px] sm:w-[300px] h-[400px] overflow-hidden border border-[var(--border-warm)] bg-[var(--panel-warm)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/espaces/${e.slug}.png`} alt={e.name} draggable="false" className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 p-4 pt-14 bg-gradient-to-t from-black/80 via-black/35 to-transparent">
                    <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-white/70 mb-1.5">Structure commune</span>
                    <h3 className="text-white font-serif font-semibold text-lg leading-tight">{e.name}</h3>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Controls: dots + arrows (aligned left under the carousel) */}
            <div className="flex justify-start items-center gap-4 mt-6 lg:pl-10">
              <div className="flex items-center gap-2">
                <button onClick={() => scrollTrack2(-1)} aria-label="Précédent" className="h-10 w-10 rounded-full border border-[var(--border-warm)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--cmc-teal)] hover:text-[var(--cmc-teal)] transition">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => scrollTrack2(1)} aria-label="Suivant" className="h-10 w-10 rounded-full border border-[var(--border-warm)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--cmc-teal)] hover:text-[var(--cmc-teal)] transition">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 ml-2">
                {ESPACES.map((e, i) => (
                  <button
                    key={e.slug}
                    onClick={() => goToCard2(i)}
                    aria-label={`Aller à ${e.name}`}
                    className={`h-2 rounded-full transition-all ${i === activeIdx2 ? "w-6 bg-[var(--cmc-teal)]" : "w-2 bg-[var(--border-warm)] hover:bg-[var(--text-muted)]"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §6 Admission en 3 étapes ── */}
      <section className="bg-[#32acc1] py-24 md:py-36">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: image */}
            <Reveal variant="left" delay={120} className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="w-full overflow-hidden border border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/campus/admission.jpg" alt="Admission à la CMC Béni Mellal" className="w-full object-cover" />
              </div>
            </Reveal>
            {/* Right: text */}
            <div className="order-1 lg:order-2">
              <Reveal as="span" className="text-xs font-mono uppercase tracking-widest text-white/70 mb-3 block">// Nous rejoindre</Reveal>
              <Reveal as="h2" delay={80} className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight leading-[1.02] text-white mb-5">L&apos;admission en 3 étapes</Reveal>
              <Reveal as="p" delay={150} className="text-white/75 text-base md:text-[17px] leading-relaxed mb-8">
                Les inscriptions se font en ligne via la plateforme <span className="font-medium text-white">MyWay</span> de l&apos;OFPPT.
              </Reveal>
              <ol className="space-y-5">
                {ADMISSION_STEPS.map((step, i) => (
                  <Reveal as="li" key={step.title} delay={220 + i * 110} className="flex gap-4">
                    <span className="relative shrink-0">
                      <span className="h-11 w-11 rounded-none bg-white/10 border border-white/20 flex items-center justify-center">
                        <step.icon className="h-5 w-5 text-white" />
                      </span>
                      <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-white text-[#32acc1] text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                    </span>
                    <div>
                      <h3 className="font-serif font-semibold text-white">{step.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
              <Reveal as={Link} href="/admissions" delay={560} className="mt-8 inline-flex items-center gap-2 bg-white text-[#32acc1] hover:bg-white/90 px-6 py-3 rounded-none text-sm font-semibold transition active:scale-95">
                Candidature & admission <ArrowRight className="h-4 w-4" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── §7 Actualités — revue de presse (UM6P Media-Review style) ── */}
      <section className="bg-white py-24 md:py-36">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "var(--max-width)" }}>
          <Reveal as="span" className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)] mb-3 block">// Actualités</Reveal>
          <Reveal as="h2" delay={80} className="text-3xl md:text-5xl font-serif font-bold text-[var(--text-primary)]">La vie de la cité</Reveal>

          {/* Filter tabs */}
          <Reveal delay={160} className="mt-8 mb-12 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap items-center gap-1 bg-[var(--panel-warm)] rounded-full p-1.5">
              {NEWS_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNewsFilter(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${newsFilter === tab
                    ? "bg-white text-[var(--text-primary)] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.2)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Reveal as={Link} delay={220} href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cmc-teal)] hover:gap-2.5 transition-all shrink-0">
              Toutes les actualités <ArrowRight className="h-4 w-4" />
            </Reveal>
          </Reveal>

          {/* Carousel track */}
          <div className="relative">
            <div
              ref={track3Ref}
              onScroll={onTrackScroll3}
              onClick={(e) => trackClick(e, track3Ref, scrollTrack3)}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {filteredNews.map((item, i) => (
                <article
                  key={`${newsFilter}-${item.slug}`}
                  className="group shrink-0 snap-start w-[280px] sm:w-[300px] flex flex-col bg-white border border-[var(--border-light)] shadow-[0_4px_30px_-16px_rgba(0,0,0,0.25)]"
                >
                  <div className="aspect-[1024/1277] overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[11px] font-mono uppercase tracking-[0.14em] font-bold text-[var(--text-secondary)]">{item.category}</span>
                    <span className="text-sm text-[var(--text-primary)] mt-2">{item.dateLabel}</span>
                    <h3 className="text-[15px] font-serif font-semibold text-[var(--text-primary)] leading-snug mt-2">{item.title}</h3>
                    <div className="mt-auto pt-5 border-t border-[var(--border-warm)]">
                      <Link
                        href={`/news/${item.slug}`}
                        className="flex items-center justify-between gap-3 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white rounded-full pl-5 pr-2 py-2 transition-colors"
                      >
                        <span className="text-sm font-semibold">Lire plus</span>
                        <span className="h-7 w-7 rounded-full border border-white/50 flex items-center justify-center shrink-0">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Controls */}
            {filteredNews.length > 1 && (
              <div className="flex justify-end items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  {filteredNews.map((item, i) => (
                    <button
                      key={item.slug}
                      onClick={() => goToCard3(i)}
                      aria-label={`Aller à ${item.title}`}
                      className={`h-2 rounded-full transition-all ${i === activeIdx3 ? "w-6 bg-[var(--cmc-teal)]" : "w-2 bg-[var(--border-warm)] hover:bg-[var(--text-muted)]"}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <button onClick={() => scrollTrack3(-1)} aria-label="Précédent" className="h-10 w-10 rounded-full border border-[var(--border-warm)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--cmc-teal)] hover:text-[var(--cmc-teal)] transition">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button onClick={() => scrollTrack3(1)} aria-label="Suivant" className="h-10 w-10 rounded-full border border-[var(--border-warm)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--cmc-teal)] hover:text-[var(--cmc-teal)] transition">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── §8 Partenaires & écosystème ── */}
      <section className="py-20 md:py-28 overflow-hidden">
        <div className="mx-auto px-6 lg:px-10 text-center mb-10" style={{ maxWidth: "var(--max-width)" }}>
          <Reveal as="span" className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Écosystème</Reveal>
          <Reveal as="h2" delay={80} className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight leading-[1.02] text-[var(--text-primary)] mt-3">
            Nos partenaires
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative overflow-hidden">
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                animation: marquee 60s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="marquee-track flex gap-12 md:gap-16 px-6 lg:px-10 w-max">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 flex flex-col items-center justify-center gap-2 min-w-[140px]"
                >
                  <div className="h-10 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/partners/${p.slug}.png`}
                      alt={p.name}
                      className="max-h-full max-w-[100px] object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[var(--text-muted)] text-center leading-tight">{p.name}</span>
                </div>
              ))}
            </div>
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--bg-warm)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--bg-warm)] to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* ── §9 Final CTA ── */}
      <section className="bg-[#32acc1] text-white py-24 md:py-32 relative overflow-hidden">
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        {/* soft glow accent */}
        <div className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="mx-auto px-6 lg:px-10 text-center relative" style={{ maxWidth: "var(--max-width)" }}>
          <Reveal as="span" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/25 bg-white/10 text-[11px] font-mono uppercase tracking-[0.18em] text-white mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Rejoignez la CMC
          </Reveal>
          <Reveal as="h2" variant="scale" className="font-serif font-extrabold tracking-tight leading-[1.02] text-white text-4xl md:text-6xl max-w-3xl mx-auto">
            Prêt à construire votre avenir ?
          </Reveal>
          <Reveal as="p" delay={120} className="text-white/80 max-w-xl mx-auto mt-6 mb-10 text-base md:text-lg leading-relaxed">
            Explorez nos filières, préparez votre dossier d&apos;inscription, ou posez votre question à l&apos;assistant E-CMC.
          </Reveal>
          <Reveal delay={220} className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="group inline-flex items-center gap-2 bg-white text-[#1b6f7d] hover:bg-white/90 px-7 py-4 rounded-none font-semibold text-sm transition-colors active:scale-95">
              Admission &amp; Inscription <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/chat" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-7 py-4 rounded-none font-medium text-sm hover:bg-white/20 transition active:scale-95">
              <Sparkles className="h-4 w-4" /> Poser une question
            </Link>
          </Reveal>
        </div>

        {/* separator line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl h-px bg-white/20" />
      </section>
    </LayoutWrapper>
  );
}
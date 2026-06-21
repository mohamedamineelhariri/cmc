"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Search } from "lucide-react";
import { POLES, filieresOfPole, poleLogo, NIVEAU_LABEL } from "@/data/poles";

const NAV_LINKS = [
  { href: "/admissions", label: "Admission" },
  { href: "/vie-etudiante", label: "Vie étudiante" },
  { href: "/partenariats", label: "Partenariats" },
  { href: "/news", label: "Actualités" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

function Logo({ className = "h-12" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center shrink-0" aria-label="CMC Béni Mellal-Khénifra — accueil">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/long-cmc-logo.png"
        alt="Cité des Métiers et des Compétences"
        className={`${className} w-auto object-contain`}
      />
    </Link>
  );
}

function PoleIcon({ slug, size = "h-9 w-9" }: { slug: string; size?: string }) {
  const src = poleLogo(slug);
  return (
    <span className={`${size} shrink-0 flex items-center justify-center`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-contain" />
      ) : null}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activePole, setActivePole] = useState(POLES[0].slug);
  const [mobileFormations, setMobileFormations] = useState(false);

  const closeAll = () => {
    setMobileOpen(false);
    setMegaOpen(false);
  };

  const filieres = filieresOfPole(activePole);
  const pole = POLES.find((p) => p.slug === activePole) ?? POLES[0];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[var(--border-warm)]"
      style={{ height: "var(--nav-height)" }}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div
        className="mx-auto flex items-center justify-between h-full px-6 lg:px-10"
        style={{ maxWidth: "var(--max-width)" }}
      >
        <Logo />

        {/* Desktop nav — pipe-separated, UM6P-style */}
        <div className="hidden lg:flex items-center h-full">
          <nav className="flex items-center h-full">
            {/* Formations (mega trigger) */}
            <div className="flex items-center h-full" onMouseEnter={() => setMegaOpen(true)}>
              <Link
                href="/programs"
                className={`relative flex items-center h-full px-4 text-[15px] font-medium transition-colors ${
                  pathname.startsWith("/programs") || megaOpen
                    ? "text-[var(--cmc-teal)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Formations
                {(pathname.startsWith("/programs") || megaOpen) && (
                  <span className="absolute left-4 right-4 bottom-0 h-[3px] bg-[var(--cmc-teal)]" />
                )}
              </Link>
            </div>

            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="flex items-center h-full">
                  <span className="h-4 w-px bg-[var(--border-warm)]" aria-hidden />
                  <Link
                    href={link.href}
                    className={`relative flex items-center h-full px-4 text-[15px] font-medium transition-colors ${
                      isActive
                        ? "text-[var(--cmc-teal)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute left-4 right-4 bottom-0 h-[3px] bg-[var(--cmc-teal)]" />
                    )}
                  </Link>
                </div>
              );
            })}
            <span className="h-4 w-px bg-[var(--border-warm)]" aria-hidden />
          </nav>

          {/* Right controls — sharp corners */}
          <div className="flex items-center gap-2 pl-4 ml-2">
            <Link
              href="/admissions"
              className="bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-5 py-2.5 text-sm font-semibold transition active:translate-y-px"
            >
              Candidature
            </Link>
            <span className="inline-flex items-center gap-1 px-3 py-2 border border-[var(--border-warm)] text-sm font-medium text-[var(--text-secondary)]">
              FR
              <ChevronDown className="h-3.5 w-3.5" />
            </span>
            <Link
              href="/chat"
              aria-label="Assistant CMC"
              title="Poser une question à l'assistant"
              className="inline-flex items-center justify-center h-9 w-9 border border-[var(--border-warm)] text-[var(--text-secondary)] hover:text-[var(--cmc-teal)] hover:border-[var(--cmc-teal-light)] transition"
            >
              <Search className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 hover:bg-[var(--panel-warm)] text-[var(--text-secondary)]"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop mega-menu — UM6P layout, sharp corners */}
      {megaOpen && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full bg-white border-b border-[var(--border-warm)] shadow-[0_28px_56px_-28px_rgba(28,28,26,0.22)] animate-fade-in"
          onMouseEnter={() => setMegaOpen(true)}
        >
          <div className="mx-auto px-10 py-9" style={{ maxWidth: "var(--max-width)" }}>
            {/* Heading row */}
            <div className="flex items-end justify-between border-b border-[var(--border-light)] pb-5 mb-6">
              <div>
                <h2 className="font-serif text-[2rem] leading-none text-[var(--text-primary)]">Formations</h2>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  10 pôles métiers · 64 filières — Technicien Spécialisé, Technicien, Qualification &amp; Spécialisation
                </p>
              </div>
              <Link
                href="/programs"
                onClick={closeAll}
                className="flex items-center gap-1.5 text-sm font-semibold text-[var(--cmc-teal)] hover:gap-2.5 transition-all"
              >
                Toutes les formations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-[280px_1fr] gap-10 items-start">
              {/* Left: vertical pôle list */}
              <ul>
                {POLES.map((p) => {
                  const isOn = p.slug === activePole;
                  const count = filieresOfPole(p.slug).length;
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/programs/${p.slug}`}
                        onMouseEnter={() => setActivePole(p.slug)}
                        onFocus={() => setActivePole(p.slug)}
                        onClick={closeAll}
                        className={`group flex items-center gap-3 px-3 py-2.5 border-l-2 transition ${
                          isOn
                            ? "bg-[var(--cmc-teal-subtle)] border-[var(--cmc-teal)]"
                            : "border-transparent hover:bg-[var(--panel-warm)]"
                        }`}
                      >
                        <PoleIcon slug={p.slug} size="h-8 w-8" />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-sm font-semibold leading-tight ${
                              isOn ? "text-[var(--cmc-teal)]" : "text-[var(--text-primary)]"
                            }`}
                          >
                            {p.short}
                          </span>
                          <span className="block text-[11px] text-[var(--text-muted)]">
                            {count} {count > 1 ? "filières" : "filière"}
                          </span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 -rotate-90 transition ${
                            isOn
                              ? "text-[var(--cmc-teal)] opacity-100"
                              : "text-[var(--text-muted)] opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Right: preview of the hovered pôle */}
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <PoleIcon slug={pole.slug} size="h-11 w-11" />
                    <div>
                      <h3 className="font-serif text-xl text-[var(--text-primary)] leading-tight">{pole.name}</h3>
                      <p className="text-[13px] text-[var(--text-secondary)] mt-0.5">
                        {pole.tagline}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/programs/${pole.slug}`}
                    onClick={closeAll}
                    className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-[var(--cmc-teal)] hover:gap-2.5 transition-all whitespace-nowrap"
                  >
                    Découvrir le pôle <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-4">
                  {pole.description}
                </p>

                <div className="mt-5 mb-2 flex items-center gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {filieres.length} filière{filieres.length > 1 ? "s" : ""}
                  </span>
                  <span className="h-px flex-1 bg-[var(--border-light)]" />
                </div>
                <div className="grid grid-cols-1">
                  {filieres.map((f) => (
                    <Link
                      key={f.slug}
                      href={`/programs/${pole.slug}/${f.slug}`}
                      onClick={closeAll}
                      className="group flex items-center justify-between gap-3 py-2 border-b border-[var(--border-light)]"
                    >
                      <span className="text-[13px] font-medium text-[var(--text-primary)] leading-snug group-hover:text-[var(--cmc-teal)] transition min-w-0 truncate">
                        {f.name}
                      </span>
                      <span
                        className="shrink-0 text-[10px] font-semibold text-[var(--text-muted)]"
                        title={NIVEAU_LABEL[f.niveau]}
                      >
                        {f.niveau}
                        {f.places ? ` · ${f.places}` : ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[var(--border-warm)] px-6 py-4 space-y-1 max-h-[calc(100vh-var(--nav-height))] overflow-y-auto">
          {/* Formations accordion */}
          <button
            onClick={() => setMobileFormations(!mobileFormations)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--panel-warm)]"
          >
            Formations
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileFormations ? "rotate-180" : ""}`} />
          </button>
          {mobileFormations && (
            <div className="pl-2 pb-2 space-y-0.5">
              <Link href="/programs" onClick={closeAll} className="block px-4 py-2 text-sm text-[var(--cmc-teal)] font-medium">
                Toutes les formations →
              </Link>
              {POLES.map((p) => (
                <Link
                  key={p.slug}
                  href={`/programs/${p.slug}`}
                  onClick={closeAll}
                  className="flex items-center gap-2.5 px-2 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--panel-warm)]"
                >
                  <PoleIcon slug={p.slug} size="h-7 w-7" /> {p.short}
                </Link>
              ))}
            </div>
          )}

          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className={`block px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--cmc-teal-subtle)] text-[var(--cmc-teal)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--panel-warm)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-2 pt-2">
            <Link
              href="/admissions"
              onClick={closeAll}
              className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-semibold bg-[var(--cmc-teal)] text-white"
            >
              Candidature
            </Link>
            <Link
              href="/chat"
              onClick={closeAll}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border border-[var(--border-warm)] text-[var(--text-secondary)]"
            >
              <Search className="h-4 w-4" /> Assistant
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

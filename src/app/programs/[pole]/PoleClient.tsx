"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Clock,
  TrendingUp,
  Building2,
  Users,
  Target,
  Gauge,
  Award,
  BadgeCheck,
} from "lucide-react";
import LayoutWrapper from "@/app/layout-wrapper";
import { getPole, filieresOfPole, NIVEAU_LABEL, poleLogo, type Niveau, type SectorStat } from "@/data/poles";

const NIVEAU_ORDER: Niveau[] = ["TS", "T", "FQ", "Q"];

const SECTOR_ICON: Record<NonNullable<SectorStat["icon"]>, React.ComponentType<{ className?: string }>> = {
  "trending-up": TrendingUp,
  "target": Target,
  "building-2": Building2,
  "users": Users,
  "gauge": Gauge,
};

// Pick a desktop column count that tiles the stats evenly (4 stats → 4 cols,
// 6 → 3 cols). Literal classes so Tailwind keeps them.
const SECTOR_COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};
function sectorColsClass(count: number): string {
  const cols = count % 4 === 0 ? 4 : count % 3 === 0 ? 3 : 2;
  return SECTOR_COLS[cols];
}

export default function PoleClient({ slug }: { slug: string }) {
  const pole = getPole(slug);

  if (!pole) {
    return (
      <LayoutWrapper>
        <div className="mx-auto px-6 py-40 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)]">Pôle introuvable</h1>
          <Link href="/programs" className="text-[var(--cmc-teal)] mt-4 inline-block">← Toutes les formations</Link>
        </div>
      </LayoutWrapper>
    );
  }

  const filieres = filieresOfPole(pole.slug);
  const niveauxCount = new Set(filieres.map((f) => f.niveau)).size;

  return (
    <LayoutWrapper>
      {/* Hero */}
      <section className="bg-white pb-12 md:pb-16">
        <div className="relative w-full h-[220px] md:h-[380px] bg-[var(--cmc-navy)] overflow-hidden">
          <img src={`/poles/banners/${pole.slug}.png`} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto px-6 lg:px-10 relative z-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="-mt-20 md:-mt-32 inline-block relative z-20">
            <div className="h-36 w-36 md:h-56 md:w-56 rounded-full bg-white border-[3px] flex items-center justify-center shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]" style={{ borderColor: pole.accent }}>
              <img src={poleLogo(pole.slug) ?? ""} alt={pole.name} className="h-[62%] w-[62%] object-contain" />
            </div>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-10">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-4">
              <Link href="/programs" className="hover:text-[var(--cmc-teal)] transition-colors">Formations</Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">{pole.name}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] max-w-3xl leading-[1.1]">{pole.name}</h1>
            <p className="text-lg text-[var(--text-secondary)] mt-2 max-w-2xl">{pole.tagline}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
              <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] font-mono">
                <MapPin className="h-3.5 w-3.5" /> {pole.plateforme}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] font-mono">
                <GraduationCap className="h-3.5 w-3.5" /> {filieres.length} filière{filieres.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="mx-auto px-6 lg:px-10 mt-8 mb-8 relative" style={{ maxWidth: "var(--max-width)" }}>
        <div className="bg-white border border-[var(--border-warm)] shadow-lg p-6 grid grid-cols-3 gap-4 text-center" style={{ borderLeft: `4px solid ${pole.accent}` }}>
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">{filieres.length}</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mt-1">Filières</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif font-bold text-[var(--text-primary)]">{niveauxCount}</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mt-1">{niveauxCount > 1 ? "Niveaux" : "Niveau"}</div>
          </div>
          <div>
            <div className="text-base md:text-lg font-serif font-bold text-[var(--text-primary)] leading-tight pt-1">{pole.plateforme}</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mt-1">Plateforme</div>
          </div>
        </div>
      </section>

      {/* Description + débouchés */}
      <section className="mx-auto px-6 lg:px-10 py-16 md:py-20 grid md:grid-cols-3 gap-10 bg-white" style={{ maxWidth: "var(--max-width)" }}>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-4">Présentation</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">{pole.description}</p>
          <div className="mt-6 inline-flex items-center gap-2.5 bg-[var(--cmc-teal-subtle)] text-[var(--cmc-teal)] px-4 py-2.5 rounded-none text-sm font-medium">
            <MapPin className="h-4 w-4" /> Plateforme pédagogique : {pole.plateforme}
          </div>
        </div>
        <div className="bg-[var(--panel-warm)] border border-[var(--border-warm)] rounded-none p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] mb-4">
            <Briefcase className="h-4 w-4 text-[var(--cmc-teal)]" /> Débouchés
          </h3>
          <ul className="space-y-3">
            {pole.debouches.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: pole.accent }} />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Secteur au Maroc — economic indicators (full-bleed accent band) */}
      {pole.sectorStats && pole.sectorStats.length > 0 && (
        <section className="relative" style={{ backgroundColor: pole.accent }}>
          <div className="mx-auto px-6 lg:px-10 py-14 md:py-16" style={{ maxWidth: "var(--max-width)" }}>
            <div className="flex items-center gap-2.5 mb-8">
              <TrendingUp className="h-5 w-5 text-white/80" />
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
                {pole.sectorTitle ?? `Le secteur ${pole.name} au Maroc`}
              </h2>
            </div>
            <div className={`grid grid-cols-2 ${sectorColsClass(pole.sectorStats.length)} gap-px bg-white/20 border border-white/20`}>
              {pole.sectorStats.map((stat) => {
                const Icon = stat.icon ? SECTOR_ICON[stat.icon] : Gauge;
                return (
                  <div key={stat.label} className="p-6" style={{ backgroundColor: pole.accent }}>
                    <Icon className="h-5 w-5 text-white/60 mb-3" />
                    <div className="text-3xl md:text-4xl font-serif font-bold text-white leading-none">{stat.value}</div>
                    <div className="text-xs md:text-[13px] text-white/80 mt-2 leading-snug">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filières by niveau */}
      <section className="mx-auto px-6 lg:px-10 py-16 md:py-20 bg-white" style={{ maxWidth: "var(--max-width)" }}>
        <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-[var(--cmc-teal)]" /> Filières du pôle
        </h2>
        {NIVEAU_ORDER.map((niv) => {
          const items = filieres.filter((f) => f.niveau === niv);
          if (items.length === 0) return null;
          return (
            <div key={niv} className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)] mb-4 pb-2 border-b border-[var(--border-light)]">
                {NIVEAU_LABEL[niv]}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((f) => (
                  <Link
                    key={f.slug}
                    href={`/programs/${pole.slug}/${f.slug}`}
                    className="group flex flex-col bg-white border border-[var(--border-warm)] p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1" style={{ backgroundColor: `${pole.accent}1A`, color: pole.accent }}>
                        {niv}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-muted)]">
                        <Clock className="h-3 w-3" /> {f.duree}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-snug group-hover:text-[var(--cmc-teal)] transition-colors">
                      {f.name}
                    </h4>
                    {f.objectif && (
                      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-2 line-clamp-3">{f.objectif}</p>
                    )}
                    {f.specialites && f.specialites.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {f.specialites.map((s) => (
                          <span key={s} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--panel-warm)] px-1.5 py-0.5">{s}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 text-xs text-[var(--text-muted)]">
                      <span>{f.places ? `${f.places} places` : "Places limitées"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Compétences recherchées par les employeurs */}
      {pole.skills && pole.skills.length > 0 && (
        <section className="bg-white border-y border-[var(--border-warm)]">
          <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
            <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <Award className="h-6 w-6 text-[var(--cmc-teal)]" /> Compétences recherchées par les employeurs
            </h2>
            <p className="text-[var(--text-secondary)] text-[15px] mb-8 max-w-2xl">
              Les savoir-être les plus valorisés sur le marché du travail pour les métiers de ce pôle.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pole.skills.map((skill) => (
                <div key={skill} className="flex items-start gap-3 bg-white border border-[var(--border-warm)] p-5" style={{ borderTop: `3px solid ${pole.accent}` }}>
                  <BadgeCheck className="h-5 w-5 shrink-0 mt-0.5" style={{ color: pole.accent }} />
                  <span className="text-sm font-medium text-[var(--text-primary)] leading-snug">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto px-6 lg:px-10 py-16 md:py-20 pb-24 md:pb-32 bg-white" style={{ maxWidth: "var(--max-width)" }}>
        <div className="flex flex-wrap gap-4">
          <Link href="/admissions" className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-6 py-3.5 rounded-none font-medium text-sm transition active:scale-95">
            S&apos;inscrire <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href={`/chat?q=${encodeURIComponent(`Parlez-moi du pôle ${pole.name} et de ses filières`)}`} className="inline-flex items-center gap-2 bg-white border border-[var(--border-warm)] hover:border-[var(--cmc-teal-light)] text-[var(--text-primary)] px-6 py-3.5 rounded-none font-medium text-sm transition active:scale-95">
            <Sparkles className="h-4 w-4 text-[var(--cmc-teal)]" /> Poser une question
          </Link>
        </div>
      </section>
    </LayoutWrapper>
  );
}

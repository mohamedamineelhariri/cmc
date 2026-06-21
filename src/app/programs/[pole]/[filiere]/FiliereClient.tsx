"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Users, GraduationCap, CheckCircle2, Briefcase, Sparkles, Target, MapPin, CreditCard } from "lucide-react";
import LayoutWrapper from "@/app/layout-wrapper";
import { getFiliere, getPole, NIVEAU_LABEL, NIVEAU_ACCESS, NIVEAU_PRIX, poleLogo } from "@/data/poles";

export default function FiliereClient({ slug }: { slug: string }) {
  const filiere = getFiliere(slug);
  const pole = filiere ? getPole(filiere.pole) : undefined;

  if (!filiere || !pole) {
    return (
      <LayoutWrapper>
        <div className="mx-auto px-6 py-40 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)]">Filière introuvable</h1>
          <Link href="/programs" className="text-[var(--cmc-teal)] mt-4 inline-block">← Toutes les formations</Link>
        </div>
      </LayoutWrapper>
    );
  }

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
              <Link href={`/programs/${pole.slug}`} className="hover:text-[var(--cmc-teal)] transition-colors">{pole.short}</Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">{filiere.name}</span>
            </div>
            <span className="inline-block text-[10px] font-mono uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--panel-warm)] px-2.5 py-1 mb-3">
              {NIVEAU_LABEL[filiere.niveau]}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] max-w-3xl leading-[1.1] mt-3">{filiere.name}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
              <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] font-mono">
                <MapPin className="h-3.5 w-3.5" /> {pole.plateforme}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] font-mono">
                <Clock className="h-3.5 w-3.5" /> {filiere.duree}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="mx-auto px-6 lg:px-10 mt-8 mb-8 relative" style={{ maxWidth: "var(--max-width)" }}>
        <div className="bg-white border border-[var(--border-warm)] shadow-lg p-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center" style={{ borderLeft: `4px solid ${pole.accent}` }}>
          <Fact icon={GraduationCap} label="Diplôme" value={NIVEAU_LABEL[filiere.niveau]} />
          <Fact icon={Clock} label="Durée" value={filiere.duree} />
          <Fact icon={Users} label="Niveau" value={filiere.niveau} />
          <Fact icon={CreditCard} label="Frais d'inscription" value={NIVEAU_PRIX[filiere.niveau]} />
          <Fact icon={Briefcase} label="Pôle" value={pole.short} />
        </div>
      </section>

      {/* Spécialités */}
      {filiere.specialites && filiere.specialites.length > 0 && (
        <section className="mx-auto px-6 lg:px-10 mt-8 pt-12 bg-white" style={{ maxWidth: "var(--max-width)" }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)] mr-1">Spécialités :</span>
            {filiere.specialites.map((s) => (
              <span key={s} className="text-xs font-mono px-3 py-1 border" style={{ borderColor: pole.accent, color: pole.accent }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Body */}
      <section className="mx-auto px-6 lg:px-10 py-12 md:py-16 pb-24 md:pb-32 grid md:grid-cols-3 gap-10 bg-white" style={{ maxWidth: "var(--max-width)" }}>
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-serif font-bold text-[var(--text-primary)] mb-3">
              <Target className="h-5 w-5 text-[var(--cmc-teal)]" /> Objectif de la formation
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">{filiere.objectif}</p>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-serif font-bold text-[var(--text-primary)] mb-3">
              <CheckCircle2 className="h-5 w-5 text-[var(--cmc-teal)]" /> Conditions d&apos;accès
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">{NIVEAU_ACCESS[filiere.niveau]}</p>
            <div className="mt-3 p-4 bg-[var(--panel-warm)] border border-[var(--border-warm)] text-sm text-[var(--text-secondary)] space-y-1">
              <p>Inscription en ligne sur <span className="font-medium text-[var(--text-primary)]">myway.ac.ma</span></p>
              <p>Frais de dossier : 50 DH</p>
              <p>Frais de formation : <span className="font-medium text-[var(--text-primary)]">{NIVEAU_PRIX[filiere.niveau]}</span></p>
              <p>Âge limite : 30 ans (33 ans par passerelles)</p>
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-xl font-serif font-bold text-[var(--text-primary)] mb-3">
              <Briefcase className="h-5 w-5 text-[var(--cmc-teal)]" /> Débouchés du pôle {pole.short}
            </h2>
            <div className="flex flex-wrap gap-2">
              {pole.debouches.map((d) => (
                <span key={d} className="text-sm bg-[var(--panel-warm)] border border-[var(--border-warm)] px-3.5 py-1.5 text-[var(--text-secondary)]">{d}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar CTA */}
        <aside className="md:col-span-1">
          <div className="bg-[var(--panel-warm)] border border-[var(--border-warm)] p-6 sticky top-28">
            <h3 className="font-serif font-bold text-[var(--text-primary)] mb-2">Intéressé(e) ?</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-5">Préparez votre inscription ou posez vos questions à l&apos;assistant.</p>
            <Link href="/admissions" className="flex items-center justify-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-5 py-3 rounded-none font-medium text-sm transition active:scale-95 mb-3">
              S&apos;inscrire <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/chat?q=${encodeURIComponent(`Donne-moi plus de détails sur la filière ${filiere.name}`)}`} className="flex items-center justify-center gap-2 bg-white border border-[var(--border-warm)] hover:border-[var(--cmc-teal-light)] text-[var(--text-primary)] px-5 py-3 rounded-none font-medium text-sm transition active:scale-95">
              <Sparkles className="h-4 w-4 text-[var(--cmc-teal)]" /> Demander à l&apos;assistant
            </Link>
            <Link href={`/programs/${pole.slug}`} className="block text-center text-sm text-[var(--cmc-teal)] mt-4 hover:underline">
              ← Autres filières du pôle
            </Link>
          </div>
        </aside>
      </section>
    </LayoutWrapper>
  );
}

function Fact({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div>
      <Icon className="h-5 w-5 text-[var(--cmc-teal)] mx-auto mb-2" />
      <div className="text-base md:text-lg font-serif font-bold text-[var(--text-primary)] leading-tight">{value}</div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)] mt-1">{label}</div>
    </div>
  );
}

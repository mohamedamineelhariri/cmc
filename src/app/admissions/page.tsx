"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ExternalLink, Home, ArrowRight, GraduationCap, FileText, CreditCard, UserCheck, ClipboardList, DollarSign } from "lucide-react";
import LayoutWrapper from "@/app/layout-wrapper";

const LEVELS = [
  {
    name: "Technicien Spécialisé (TS)",
    badge: "TS",
    condition: "Baccalauréat (ou Licence, ou diplôme TS)",
    age: "30 ans max (33 ans par passerelles)",
    selection: "Présélection sur notes du Bac (≥12/20 = accès direct)",
    prix: "950 DH",
  },
  {
    name: "Technicien (T)",
    badge: "T",
    condition: "Niveau 2e année Bac (ou diplôme Qualification)",
    age: "30 ans max",
    selection: "Test psychotechnique / examen d'admission",
    prix: "800 DH",
  },
  {
    name: "Qualification (Q)",
    badge: "Q",
    condition: "Niveau 3e année collège (ou diplôme Spécialisation)",
    age: "15-30 ans",
    selection: "Test psychotechnique / examen d'admission",
    prix: "550 DH",
  },
  {
    name: "Spécialisation (S)",
    badge: "S",
    condition: "Niveau 6e année primaire",
    age: "15-30 ans",
    selection: "Premier arrivé, premier servi",
    prix: "400 DH",
  },
];

const STATUS_STEPS = [
  { status: "Candidat en ligne", meaning: "Documents non téléversés, frais non payés" },
  { status: "Postulant", meaning: "Frais de dossier (50 DH) non encore payés" },
  { status: "Frais du dossier payés", meaning: "Payé, en attente de vérification administrative" },
  { status: "Dossier accepté", meaning: "Tous les documents sont valides" },
  { status: "Admis", meaning: "Accepté définitivement" },
];

export default function AdmissionsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { q: "Quand ouvrent les inscriptions pour 2026-2027 ?", a: "Les inscriptions sont ouvertes à partir du 1er mai 2026 sur myway.ac.ma." },
    { q: "Quels sont les frais d'inscription ?", a: "Frais de dossier : 50 DH (fiche d'orientation). Frais de formation : 950 DH (TS), 800 DH (Technicien), 550 DH (Qualification), 400 DH (Spécialisation), 400–950 DH (Formation Qualifiante)." },
    { q: "Puis-je postuler dans plusieurs filières ?", a: "Oui, vous pouvez déposer plusieurs candidatures, mais une seule par niveau dans un même établissement." },
    { q: "Y a-t-il une bourse ?", a: "Oui, l'OFPPT octroie une bourse d'études : bourse complète de 6 334 DH/an (hors périmètre urbain) ou demi-bourse de 3 167 DH/an (même ville)." },
    { q: "Quels documents fournir ?", a: "Copie CIN, 2 photos d'identité, copie du diplôme/attestation, extrait d'acte de naissance, reçu fiche d'orientation (50 DH)." },
  ];

  return (
    <LayoutWrapper>
      {/* Hero */}
      <section className="bg-white">
        <div className="relative w-full h-[220px] md:h-[380px] bg-[var(--cmc-navy)] overflow-hidden">
          <img src="/hero/formations-map.png" alt="Vue satellite de la région Béni Mellal-Khénifra" className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto px-6 lg:px-10 relative z-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="-mt-20 md:-mt-32 inline-block relative z-20">
            <div className="h-36 w-36 md:h-56 md:w-56 rounded-full bg-white border-[3px] border-[#32acc1] flex items-center justify-center shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
              <img src="/logo/logo.png" alt="Logo CMC Béni Mellal-Khénifra" className="h-[62%] w-[62%] object-contain" />
            </div>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] max-w-3xl leading-[1.1]">
              Admission et inscription
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              L&apos;inscription à la CMC Béni Mellal-Khénifra se fait en ligne via le portail officiel
              de l&apos;OFPPT — <strong>myway.ac.ma</strong>. Suivez les étapes ci-dessous pour candidater.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Admission</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#etapes" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Étapes
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#niveaux" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Niveaux
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#statuts" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Statuts
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#faq" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#32acc1] text-white">
        <div className="mx-auto px-6 lg:px-10 py-10 md:py-12" style={{ maxWidth: "var(--max-width)" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{LEVELS.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Niveaux de formation</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">5</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Étapes d&apos;inscription</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">50 DH</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Frais de dossier</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">≥12/20</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Accès direct Bac TS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Étapes d'inscription */}
      <section id="etapes" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Procédure</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Étapes d&apos;inscription
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          Cinq étapes simples pour candidater à la CMC Béni Mellal-Khénifra via la plateforme MyWay de l&apos;OFPPT.
        </p>
        <div className="relative">
          {/* Barre de progression verticale sur mobile, horizontale sur desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[var(--border-warm)]" />
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "1", title: "Créer un compte", desc: "Sur myway.ac.ma avec votre code Massar ou CIN", icon: UserCheck },
              { step: "2", title: "Remplir le formulaire", desc: "Données personnelles et niveau scolaire", icon: ClipboardList },
              { step: "3", title: "Choisir la CMC BMK", desc: "Sélectionnez l'établissement et les filières", icon: GraduationCap },
              { step: "4", title: "Téléverser les docs", desc: "Pièces justificatives scannées", icon: FileText },
              { step: "5", title: "Déposer le dossier", desc: "Imprimer la fiche et déposer le dossier physique", icon: ArrowRight },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center">
                  <div className="md:mb-4 relative z-10 flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full bg-white border-2 border-[var(--cmc-teal)] text-[var(--cmc-teal)]">
                    <span className="md:hidden font-bold font-mono text-sm">{item.step}</span>
                    <Icon className="hidden md:block h-6 w-6" />
                  </div>
                  <div className="md:mt-2">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Niveaux + Conditions */}
      <section id="niveaux" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Conditions d'accès</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Conditions d&apos;accès par niveau
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
            Chaque niveau de formation a des prérequis spécifiques. Vérifiez votre éligibilité avant de candidater.
          </p>
          <div className="space-y-5">
            {LEVELS.map((level) => (
              <div key={level.name} className="bg-white border-2 border-[var(--border-warm)]">
                <div className="flex items-center gap-3 px-6 pt-6 pb-3 border-b border-[var(--border-light)]">
                  <span className="bg-[var(--cmc-teal)] text-white text-xs font-mono px-2.5 py-1">{level.badge}</span>
                  <h3 className="font-semibold text-base text-[var(--text-primary)]">{level.name}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-warm)]">
                  <div className="bg-white p-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-2">
                      <GraduationCap className="h-3 w-3" /> Niveau requis
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{level.condition}</span>
                  </div>
                  <div className="bg-white p-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-2">
                      <UserCheck className="h-3 w-3" /> Âge limite
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{level.age}</span>
                  </div>
                  <div className="bg-white p-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-2">
                      <ClipboardList className="h-3 w-3" /> Sélection
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{level.selection}</span>
                  </div>
                  <div className="bg-white p-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5 mb-2">
                      <DollarSign className="h-3 w-3" /> Frais de formation
                    </span>
                    <span className="text-sm font-bold text-[var(--cmc-teal)]">{level.prix}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statuts MyWay */}
      <section id="statuts" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Suivi</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Comprendre les statuts MyWay
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          Après avoir soumis votre candidature sur MyWay, votre dossier passe par plusieurs statuts. Voici ce que chacun signifie.
        </p>
        <div className="grid gap-4">
          {STATUS_STEPS.map((s, i) => (
            <div key={s.status} className="flex items-start gap-4 bg-white border-2 border-[var(--border-warm)] p-5">
              <div className="h-10 w-10 shrink-0 rounded-full bg-[var(--cmc-teal-subtle)] flex items-center justify-center">
                <span className="text-xs font-bold font-mono text-[var(--cmc-teal)]">{i + 1}</span>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-[var(--text-primary)]">{s.status}</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">{s.meaning}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// FAQ</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
            Tout ce que vous devez savoir sur l&apos;admission à la CMC Béni Mellal-Khénifra.
          </p>
          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border-2 border-[var(--border-warm)] overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group hover:bg-[var(--bg-warm)] transition"
                >
                  <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--cmc-teal)] transition-colors">{faq.q}</span>
                  {expandedFaq === i ? (
                    <ChevronUp className="h-4 w-4 text-[var(--text-secondary)] shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[var(--text-secondary)] shrink-0" />
                  )}
                </button>
                {expandedFaq === i && (
                  <div className="px-6 pb-5 text-sm text-[var(--text-secondary)] leading-relaxed animate-fade-in border-t border-[var(--border-light)] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border-2 border-[var(--cmc-teal)]/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ExternalLink className="h-5 w-5 text-[var(--cmc-teal)] shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">Portail d&apos;inscription officiel</span>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Inscrivez-vous sur myway.ac.ma — plateforme nationale de l&apos;OFPPT</p>
              </div>
            </div>
            <a
              href="https://myway.ac.ma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-6 py-3 rounded-none text-sm font-medium transition shrink-0"
            >
              Accéder à MyWay <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cmc-navy)] text-white">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Prêt à construire votre avenir&nbsp;?
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto text-[15px]">
            Rejoignez la CMC Béni Mellal-Khénifra et bénéficiez d&apos;une formation professionnelle de qualité dans l&apos;un de nos 10 pôles métiers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-8 py-4 rounded-none font-medium text-sm transition active:scale-95"
            >
              Voir les formations <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-none font-medium text-sm transition"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}

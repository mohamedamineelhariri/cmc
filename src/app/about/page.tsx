"use client";

import React from "react";
import Link from "next/link";
import {
  Home, ArrowRight, Building2, Users, Lightbulb, Target,
  TreePine, Cog, GraduationCap, Eye,
} from "lucide-react";
import LayoutWrapper from "@/app/layout-wrapper";

const PILLARS = [
  {
    title: "Offre actualisée",
    desc: "Des formations alignées sur les besoins réels du marché du travail, orientées vers les secteurs à fort potentiel d'emploi.",
    icon: Target,
  },
  {
    title: "Espaces modernes",
    desc: "Plateformes applicatives par secteur, reproduisant l'environnement professionnel réel pour une immersion totale.",
    icon: Building2,
  },
  {
    title: "Capital humain",
    desc: "Des formateurs et encadrants qualifiés, un Centre d'Orientation Professionnelle pour accompagner chaque stagiaire.",
    icon: Users,
  },
  {
    title: "Learning by doing",
    desc: "Pédagogie innovante fondée sur la pratique, l'expérimentation et l'immersion en situation réelle d'entreprise.",
    icon: Lightbulb,
  },
];

const SECTEURS = [
  "Agriculture : 11% de la SAU nationale",
  "Mines et phosphates (Khouribga)",
  "Agro-industrie leader régional",
  "Tourisme de montagne et de nature",
  "Plateformes Industrielles Intégrées (P2I)",
];

export default function AboutPage() {
  return (
    <LayoutWrapper>
      {/* Hero */}
      <section className="bg-white">
        <div className="relative w-full h-[220px] md:h-[380px] bg-[var(--cmc-navy)] overflow-hidden">
          <img src="/hero/formations-map.png" alt="Région Béni Mellal-Khénifra" className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto px-6 lg:px-10 relative z-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="-mt-20 md:-mt-32 inline-block relative z-20">
            <div className="h-36 w-36 md:h-56 md:w-56 rounded-full bg-white border-[3px] border-[#32acc1] flex items-center justify-center shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
              <img src="/logo/logo.png" alt="Logo CMC Béni Mellal-Khénifra" className="h-[62%] w-[62%] object-contain" />
            </div>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] max-w-3xl leading-[1.1]">
              CMC Béni Mellal-Khénifra
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              La Cité des Métiers et des Compétences de la région Béni Mellal-Khénifra est un établissement
              de formation professionnelle de nouvelle génération créé par l&apos;OFPPT. Ouverte en septembre 2024,
              elle incarne la vision d&apos;une formation professionnelle moderne, innovante et connectée aux besoins
              du marché du travail.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">À propos</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#presentation" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Présentation
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#piliers" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Piliers
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#region" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Région
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
              <div className="text-3xl md:text-4xl font-bold font-serif">15</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Hectares</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">2 676</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Places pédagogiques</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">64</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Filières</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">414</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Lits internat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section id="presentation" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Présentation</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Qu&apos;est-ce qu&apos;une Cité des Métiers et des Compétences&nbsp;?
        </h2>
        <p className="text-[var(--text-secondary)] max-w-3xl mb-10 text-[15px]">
          Les CMC sont des établissements de formation professionnelle de nouvelle génération créés par l&apos;OFPPT.
          Un réseau de 12 cités, à raison d&apos;une par région, constituant l&apos;épine dorsale de la feuille de route
          de développement de la formation professionnelle au Maroc.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-[var(--border-warm)] p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[var(--cmc-teal-subtle)] flex items-center justify-center border border-[var(--cmc-teal)]/10">
                <Eye className="h-6 w-6 text-[var(--cmc-teal)]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">Vision &amp; concept</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              La CMC Béni Mellal-Khénifra a ouvert ses portes aux premiers stagiaires en septembre 2024.
              Sa conception architecturale innovante et ses équipements de pointe rapprochent les espaces
              de formation des environnements réels de l&apos;entreprise, afin de favoriser l&apos;employabilité
              des jeunes et la création de valeur dans la région.
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Le lancement officiel de l&apos;année de formation 2025-2026 a eu lieu le 11 septembre 2025,
              en présence du ministre Younes Sekkouri et de la directrice générale de l&apos;OFPPT Loubna Tricha.
            </p>
          </div>
          <div className="bg-white border-2 border-[var(--border-warm)] p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[var(--cmc-teal-subtle)] flex items-center justify-center border border-[var(--cmc-teal)]/10">
                <GraduationCap className="h-6 w-6 text-[var(--cmc-teal)]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">Capacité &amp; offre</h3>
            </div>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--cmc-teal)] rounded-full mt-2 shrink-0" />
                <span><strong className="text-[var(--text-primary)]">2 676 places pédagogiques</strong> dont 1 875 en première année</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--cmc-teal)] rounded-full mt-2 shrink-0" />
                <span><strong className="text-[var(--text-primary)]">64 filières</strong> réparties sur 10 pôles métiers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--cmc-teal)] rounded-full mt-2 shrink-0" />
                <span><strong className="text-[var(--text-primary)]">414 lits et couverts</strong> à la maison des stagiaires</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--cmc-teal)] rounded-full mt-2 shrink-0" />
                <span><strong className="text-[var(--text-primary)]">15 hectares</strong> de campus moderne à l&apos;Agropole</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 bg-[var(--cmc-teal)] rounded-full mt-2 shrink-0" />
                <span><strong className="text-[var(--text-primary)]">Institut agro-industrie</strong> rattaché de 420 places</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Piliers */}
      <section id="piliers" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Fondamentaux</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Nos piliers fondamentaux
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
            Le concept des CMC repose sur trois piliers auxquels s&apos;ajoute une pédagogie innovante.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="bg-white border-2 border-[var(--border-warm)] p-8 transition hover:shadow-md hover:-translate-y-0.5">
                <div className="h-12 w-12 bg-[var(--cmc-teal-subtle)] flex items-center justify-center mb-5 border border-[var(--cmc-teal)]/10">
                  <pillar.icon className="h-6 w-6 text-[var(--cmc-teal)]" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] mb-3">{pillar.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contexte régional */}
      <section id="region" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Contexte régional</span>
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
              Une réponse aux besoins de la région
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4 text-[15px]">
              L&apos;offre de formation de la CMC Béni Mellal-Khénifra est conçue pour répondre aux besoins
              spécifiques du marché du travail régional. Elle couvre 10 pôles métiers correspondant aux
              attentes des professionnels et aux secteurs à fort potentiel d&apos;emploi de la région.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-[15px]">
              La cité organise régulièrement des formations spécialisées innovantes, comme la formation
              au pilotage de drones pour l&apos;agriculture moderne, illustrant son orientation vers les
              métiers d&apos;avenir.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-[var(--cmc-teal)] font-medium text-sm hover:underline"
            >
              Voir nos formations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="bg-white border-2 border-[var(--border-warm)] p-8">
            <div className="flex items-center gap-3 mb-5">
              <TreePine className="h-6 w-6 text-[var(--cmc-teal)]" />
              <h3 className="font-serif font-semibold text-lg text-[var(--text-primary)]">Secteurs économiques clés</h3>
            </div>
            <ul className="space-y-4">
              {SECTEURS.map((sector) => (
                <li key={sector} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="h-1.5 w-1.5 bg-[var(--cmc-teal)] rounded-full shrink-0" />
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cmc-navy)] text-white pb-24 md:pb-32">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Prêt à construire votre avenir&nbsp;?
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto text-[15px]">
            Rejoignez la CMC Béni Mellal-Khénifra et bénéficiez d&apos;une formation professionnelle de qualité dans l&apos;un de nos 10 pôles métiers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-8 py-4 rounded-none font-medium text-sm transition active:scale-95"
            >
              S&apos;inscrire maintenant <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-none font-medium text-sm transition"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}

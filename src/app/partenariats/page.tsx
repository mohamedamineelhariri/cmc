"use client";

import React from "react";
import Link from "next/link";
import {
  Handshake, Rocket, Building2, GraduationCap, Trophy, Plane,
  Home, ArrowRight, Users,
} from "lucide-react";
import LayoutWrapper from "@/app/layout-wrapper";

const PARTNERS = [
  { name: "UM6P", desc: "Université Mohammed VI Polytechnique — recherche & innovation", slug: "um6p" },
  { name: "Université Sultan Moulay Slimane", desc: "Université publique de la région BMK", slug: "usms" },
  { name: "CRI Béni Mellal-Khénifra", desc: "Centre Régional d'Investissement — promotion économique", slug: "cri" },
  { name: "ANAPEC", desc: "Agence Nationale de Promotion de l'Emploi et des Compétences", slug: "anapec" },
  { name: "OCP — Al Moutmir", desc: "Programme d'accompagnement agricole du Groupe OCP", slug: "ocp" },
  { name: "Cluster COER", desc: "Cluster Agro-Industriel Oum Er-Rbia", slug: "coer" },
  { name: "Swisscontact", desc: "Fondation suisse pour la coopération technique", slug: "swisscontact" },
  { name: "Microsoft", desc: "Programmes de certification et compétences numériques", slug: "microsoft" },
  { name: "Bank Al-Maghrib", desc: "Banque centrale — éducation financière & stages", slug: "bankal" },
  { name: "FRMF", desc: "Fédération Royale Marocaine de Football — formation sportive", slug: "frmf" },
];

const AXES = [
  { icon: Building2, title: "Services aux entreprises", desc: "Un espace dédié aux services aux entreprises et à l'entrepreneuriat, pour rapprocher la formation des besoins des employeurs." },
  { icon: GraduationCap, title: "Stages en entreprise", desc: "Des stages obligatoires intégrés au cursus (formation résidentielle et alternée 50/50) pour une immersion professionnelle réelle." },
  { icon: Rocket, title: "Incubateur & entrepreneuriat", desc: "Un incubateur accompagne les stagiaires porteurs de projets vers la création d'entreprise." },
  { icon: Handshake, title: "Conventions de coopération", desc: "Des conventions avec le CRI BMK, le Cluster COER, l'OFPPT et d'autres acteurs renforcent l'investissement, l'innovation et l'entrepreneuriat dans la région." },
];

const EVENTS = [
  {
    icon: Trophy,
    accent: "#7BA05B",
    date: "18 mai 2026",
    title: "Hackathon AgroInnov Impact 2026",
    desc: "Première édition organisée par le Cluster Agro-Industriel Oum Er-Rbia (COER), en partenariat avec le CRI Béni Mellal-Khénifra, l'OFPPT BMK et l'Université Sultan Moulay Slimane (USMS). 170+ porteurs de projets, 10 finalistes, autour de l'agriculture durable, l'agro-industrie et l'économie circulaire. Une convention de coopération a été signée à cette occasion.",
  },
  {
    icon: Plane,
    accent: "#C9842E",
    date: "10 oct. 2024",
    title: "Formation pilotage de drones — AGRI-EDGE",
    desc: "Session pratique au profit des stagiaires du pôle Agriculture : sensibilisation aux nouvelles technologies agricoles et techniques de pilotage de drones pour améliorer la productivité des exploitations.",
  },
];

export default function PartenariatsPage() {
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
              Partenariats &amp; entreprises
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              La CMC connecte les stagiaires au tissu économique régional : entreprises, clusters, université et institutions.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Partenariats</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#axes" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Axes
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#partenaires" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Partenaires
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#evenements" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Événements
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
              <div className="text-3xl md:text-4xl font-bold font-serif">{PARTNERS.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Partenaires</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">4</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Axes de coopération</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">50/50</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Cours / stage en entreprise</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">10</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Pôles métiers connectés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Axes */}
      <section id="axes" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Coopération</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Axes de coopération
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          Quatre piliers structurent les relations de la CMC avec le monde professionnel et institutionnel.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {AXES.map((a) => (
            <div key={a.title} className="bg-white border-2 border-[var(--border-warm)] p-7 transition hover:shadow-md hover:-translate-y-0.5">
              <div className="h-11 w-11 bg-[var(--cmc-teal-subtle)] flex items-center justify-center mb-4 border border-[var(--cmc-teal)]/10">
                <a.icon className="h-5 w-5 text-[var(--cmc-teal)]" />
              </div>
              <h3 className="text-base font-serif font-semibold text-[var(--text-primary)] mb-2">{a.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partenaires */}
      <section id="partenaires" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Partenaires</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Nos partenaires
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
            La CMC Béni Mellal-Khénifra s&apos;appuie sur un réseau de {PARTNERS.length} partenaires issus de l&apos;enseignement supérieur, de l&apos;industrie, des institutions publiques et de la coopération internationale.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {PARTNERS.map((p) => (
              <div key={p.slug} className="bg-white border-2 border-[var(--border-warm)] p-5 text-center transition hover:shadow-md hover:-translate-y-0.5">
                <div className="h-14 w-14 rounded-full bg-[var(--cmc-teal-subtle)] flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-[var(--cmc-teal)]" />
                </div>
                <h3 className="text-sm font-bold font-serif text-[var(--text-primary)]">{p.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Événements */}
      <section id="evenements" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Temps forts</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Événements &amp; initiatives
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          Des projets collaboratifs qui illustrent la mise en relation des stagiaires avec l&apos;écosystème économique régional.
        </p>
        <div className="space-y-5">
          {EVENTS.map((e) => (
            <div key={e.title} className="bg-white border-2 border-[var(--border-warm)] p-7 flex flex-col md:flex-row gap-5 transition hover:shadow-md">
              <div className="shrink-0">
                <span className="h-14 w-14 flex items-center justify-center" style={{ backgroundColor: `${e.accent}1A` }}>
                  <e.icon className="h-7 w-7" style={{ color: e.accent }} />
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">{e.date}</span>
                <h3 className="text-lg font-serif font-semibold text-[var(--text-primary)] mt-1 mb-2">{e.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cmc-navy)] text-white pb-24 md:pb-32">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Entreprise ou partenaire&nbsp;?
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto text-[15px]">
            Collaborez avec la CMC pour le recrutement, les stages, ou des projets d&apos;innovation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-8 py-4 rounded-none font-medium text-sm transition active:scale-95"
            >
              Nous contacter <ArrowRight className="h-4 w-4" />
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

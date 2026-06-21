"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Home, ChevronDown } from "lucide-react";
import LayoutWrapper from "@/app/layout-wrapper";
import { POLES, FILIERES, NIVEAU_LABEL, filieresOfPole, poleLogo } from "@/data/poles";

const HERO_SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/cmc_officiel_/", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
];

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "instagram":
      return <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.6 4 4 5.6 4 7.6V16.4C4 18.4 5.6 20 7.6 20H16.4C18.4 20 20 18.4 20 16.4V7.6C20 5.6 18.4 4 16.4 4H7.6ZM17.25 7.5C16.84 7.5 16.5 7.17 16.5 6.75C16.5 6.34 16.84 6 17.25 6C17.66 6 18 6.34 18 6.75C18 7.17 17.66 7.5 17.25 7.5ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" />;
    case "facebook":
      return <path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.1 6.47 14.29 6.29C14.47 6.1 14.73 6 15 6H18V2Z" />;
    case "linkedin":
      return <path d="M19 3C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19ZM8.5 10.5H6.5V17.5H8.5V10.5ZM7.5 9C8.33 9 9 8.33 9 7.5C9 6.67 8.33 6 7.5 6C6.67 6 6 6.67 6 7.5C6 8.33 6.67 9 7.5 9ZM17.5 13.5C17.5 11.84 16.16 10.5 14.5 10.5C13.77 10.5 13.08 10.77 12.5 11.21V10.5H10.5V17.5H12.5V14.5C12.5 13.67 13.17 13 14 13C14.83 13 15.5 13.67 15.5 14.5V17.5H17.5V13.5Z" />;
    default:
      return <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />;
  }
}

const totalFilières = FILIERES.length;
const niveauxDiplomants = new Set(FILIERES.filter((f) => f.niveau !== "FQ").map((f) => f.niveau)).size;

export default function ProgramsPage() {
  const [expandedPole, setExpandedPole] = useState<string | null>(null);

  return (
    <LayoutWrapper>
      {/* Hero */}
      <section className="bg-white">
        <div className="relative w-full h-[220px] md:h-[380px] bg-[var(--cmc-navy)] overflow-hidden">
          <img src="/hero/formations-map.png" alt="Vue satellite de la région Béni Mellal-Khénifra" className="w-full h-full object-cover" />
          <div className="absolute bottom-5 right-6 md:right-12 flex items-center gap-3">
            {HERO_SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="h-10 w-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-[#32acc1] transition-colors">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <SocialIcon name={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto px-6 lg:px-10 relative z-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="-mt-20 md:-mt-32 inline-block relative z-20">
            <div className="h-36 w-36 md:h-56 md:w-56 rounded-full bg-white border-[3px] border-[#32acc1] flex items-center justify-center shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
              <img src="/logo/logo.png" alt="Logo CMC Béni Mellal-Khénifra" className="h-[62%] w-[62%] object-contain" />
            </div>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] max-w-3xl leading-[1.1]">
              Construire votre avenir avec la CMC Béni Mellal-Khénifra
            </h1>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <Link href="/programs" className="hover:text-[var(--cmc-teal)] transition-colors">Formations</Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Pôles &amp; filières</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#poles" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Pôles métiers
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* Stats bar — style brochure page 2 */}
      <section className="bg-[#32acc1] text-white">
        <div className="mx-auto px-6 lg:px-10 py-10 md:py-12" style={{ maxWidth: "var(--max-width)" }}>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{POLES.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Secteurs métiers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{totalFilières}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Filières de formation</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{niveauxDiplomants}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Niveaux diplômants</div>
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:justify-center border-l border-white/20 pl-6">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono uppercase tracking-wider text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-white">TS</span>
                  <span className="text-white/60">Technicien spécialisé</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-white">T</span>
                  <span className="text-white/60">Technicien</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-white">Q</span>
                  <span className="text-white/60">Qualification</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-white">FQ</span>
                  <span className="text-white/60">Formation qualifiante</span>
                </span>
              </div>
              <div className="flex gap-4 mt-1.5 text-[10px] font-mono text-white/50">
                <span>TS · T · Q : diplôme</span>
                <span>FQ : certificat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pôles métiers avec accordéon */}
      <section id="poles" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Pôles métiers</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-8">
          Les {POLES.length} pôles métiers et leurs <span className="text-[#32acc1]">filières</span>
        </h2>

        <div className="space-y-5">
          {POLES.map((pole) => {
            const filieres = filieresOfPole(pole.slug);
            const isOpen = expandedPole === pole.slug;
            return (
              <div key={pole.slug} className="bg-white border-2 overflow-hidden transition-all relative" style={{ borderColor: pole.accent }}>
                {/* Desktop logo — fixed on the left, spans full card height */}
                <div className="hidden md:flex absolute left-0 inset-y-0 w-56 lg:w-72 items-center justify-center p-8 bg-white">
                  <img
                    src={poleLogo(pole.slug) ?? ""}
                    alt={pole.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Mobile logo */}
                <div className="md:hidden flex items-center justify-center h-32 p-6 bg-white">
                  <img
                    src={poleLogo(pole.slug) ?? ""}
                    alt={pole.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="md:pl-56 lg:pl-72 flex flex-col">
                    <button
                      onClick={() => setExpandedPole(isOpen ? null : pole.slug)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group hover:bg-[var(--bg-warm)] transition"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg md:text-xl text-[var(--text-primary)]">{pole.name}</h3>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1">
                          <span className="text-xs text-[var(--text-muted)] font-mono">{filieres.length} filière{filieres.length > 1 ? "s" : ""}</span>
                          {pole.plateforme && (
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--cmc-teal)]">{pole.plateforme}</span>
                          )}
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-[var(--text-muted)] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px]" : "max-h-0"}`}>
                      <div className="px-6 pb-5 pt-2 border-t border-[var(--border-light)]">
                        <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{pole.description}</p>
                        <div className="space-y-2">
                          {filieres.map((f) => (
                            <Link
                              key={f.slug}
                              href={`/programs/${f.pole}/${f.slug}`}
                              className="flex items-start justify-between gap-2 px-3 py-2.5 rounded-none hover:bg-[var(--bg-warm)] group transition"
                            >
                              <div className="flex-1 min-w-0">
                                <span className="text-sm text-[var(--text-primary)] group-hover:text-[var(--cmc-teal)] transition-colors font-medium">
                                  {f.name}
                                </span>
                                {f.specialites && f.specialites.length > 0 && (
                                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                                    {f.specialites.map((s) => (
                                      <span key={s} className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--panel-warm)] px-1.5 py-0.5 rounded-none">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0 mt-0.5">
                                <span className="bg-[var(--cmc-teal-subtle)] text-[var(--cmc-teal-dark)] px-2 py-0.5 text-[10px] font-mono">{f.niveau}</span>
                                <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--cmc-teal)] transition-colors" />
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link href={`/programs/${pole.slug}`} className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--cmc-teal)] font-semibold hover:underline">
                          Voir le pôle <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
              </div>
            );
          })}
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
              href="/admissions"
              className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-8 py-4 rounded-none font-medium text-sm transition active:scale-95"
            >
              S&apos;inscrire maintenant <ArrowRight className="h-4 w-4" />
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

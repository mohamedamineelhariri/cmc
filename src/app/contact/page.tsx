"use client";

import React from "react";
import LayoutWrapper from "@/app/layout-wrapper";
import { Phone, Mail, MapPin, Clock, ExternalLink, MessageSquare, Home, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Link from "next/link";

const CHANNELS = [
  { icon: Phone, label: "Téléphone", detail: "05 212 020 99", detail2: "06 454 723 17" },
  { icon: MapPin, label: "Adresse", detail: "Agropole — Route de Marrakech", detail2: "Béni Mellal, Maroc", meta: "Accès bus : Ligne n° 25" },
  { icon: Clock, label: "Horaires", detail: "Lun–Ven : 08h00 – 18h00", detail2: "Sam : 08h00 – 13h00" },
];

const USEFUL_LINKS = [
  { label: "Site officiel CMC", href: "https://cmc.ac.ma" },
  { label: "Page CMC Béni Mellal", href: "https://cmc.ac.ma/fr/cmc-beni-mellal-khenifra" },
  { label: "Portail MyWay (inscription)", href: "https://myway.ac.ma" },
  { label: "Chaîne WhatsApp officielle", href: "https://ice.lol/tLGoNo" },
];

export default function ContactPage() {
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
              Nous contacter
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Retrouvez toutes les informations pour nous joindre, nous rendre visite, ou poser vos questions
              via notre assistant virtuel.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Contact</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#infos" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Coordonnées
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#carte" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Plan d&apos;accès
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#chat" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Chat E-CMC
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
              <div className="text-3xl md:text-4xl font-bold font-serif">{CHANNELS.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Canaux de contact</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">50</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">DH frais de dossier</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">24/7</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Chat E-CMC</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">64</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Filières</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coordonnées + Chat + Map */}
      <section id="infos" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Contact</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-10">
          Coordonnées &amp; accès
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left — Contact infos */}
          <div className="space-y-5">
            {CHANNELS.map((c) => (
              <div key={c.label} className="bg-white border-2 border-[var(--border-warm)] p-6 flex items-start gap-4 transition hover:shadow-sm">
                <div className="h-11 w-11 bg-[var(--cmc-teal-subtle)] flex items-center justify-center border border-[var(--cmc-teal)]/10 shrink-0">
                  <c.icon className="h-5 w-5 text-[var(--cmc-teal)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--text-primary)]">{c.label}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{c.detail}</p>
                  {c.detail2 && <p className="text-sm text-[var(--text-secondary)]">{c.detail2}</p>}
                  {c.meta && <p className="text-xs text-[var(--text-muted)] mt-1">{c.meta}</p>}
                </div>
              </div>
            ))}

            {/* Liens utiles */}
            <div className="bg-white border-2 border-[var(--border-warm)] p-6">
              <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-4">Liens utiles</h3>
              <div className="space-y-2">
                {USEFUL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 bg-[var(--bg-warm)] border border-[var(--border-warm)] text-sm text-[var(--text-primary)] hover:border-[var(--cmc-teal)]/30 transition group"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--cmc-teal)] transition" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Chat CTA + Map */}
          <div className="space-y-5">
            <div id="chat" className="bg-[var(--cmc-teal)] text-white p-8">
              <div className="h-12 w-12 bg-white/20 flex items-center justify-center mb-5">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Besoin d&apos;une réponse rapide ?</h3>
              <p className="text-[var(--cmc-teal-light)] text-sm mb-6 leading-relaxed">
                Notre assistant virtuel E-CMC est disponible 24h/24 pour répondre à vos questions
                sur les formations, l&apos;admission, les filières et la vie à la CMC.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 bg-white text-[var(--cmc-teal)] px-6 py-3 font-medium text-sm hover:bg-white/90 transition"
              >
                Ouvrir le Chat E-CMC
              </Link>
            </div>

            <div id="carte" className="bg-white border-2 border-[var(--border-warm)]">
              <div className="p-5 pb-3">
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">Plan d&apos;accès</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Agropole — Route de Marrakech, Béni Mellal</p>
              </div>
              <div className="h-[260px] bg-[var(--panel-warm)]">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-6.447%2C32.295%2C-6.433%2C32.305&amp;layer=mapnik"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  title="Carte CMC Béni Mellal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32acc1] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="pointer-events-none absolute -top-28 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="mx-auto px-6 lg:px-10 text-center relative" style={{ maxWidth: "var(--max-width)" }}>
          <Reveal as="span" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/25 bg-white/10 text-[11px] font-mono uppercase tracking-[0.18em] text-white mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Rejoignez la CMC
          </Reveal>
          <Reveal as="h2" variant="scale" className="font-serif font-extrabold tracking-tight leading-[1.02] text-white text-4xl md:text-6xl max-w-3xl mx-auto">
            Prêt à construire votre avenir&nbsp;?
          </Reveal>
          <Reveal as="p" delay={120} className="text-white/80 max-w-xl mx-auto mt-6 mb-10 text-base md:text-lg leading-relaxed">
            Rejoignez la CMC Béni Mellal-Khénifra et bénéficiez d&apos;une formation professionnelle de qualité.
          </Reveal>
          <Reveal delay={220} className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="group inline-flex items-center gap-2 bg-white text-[#1b6f7d] hover:bg-white/90 px-7 py-4 rounded-none font-semibold text-sm transition-colors active:scale-95">
              S&apos;inscrire maintenant <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/programs" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-7 py-4 rounded-none font-medium text-sm hover:bg-white/20 transition active:scale-95">
              Voir les formations
            </Link>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl h-px bg-white/20" />
      </section>
    </LayoutWrapper>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import LayoutWrapper from "@/app/layout-wrapper";
import { Calendar, ArrowRight, Home } from "lucide-react";
import { NEWS, NEWS_CATEGORIES } from "@/data/news";

const CALENDAR = [
  { event: "Vacances 1er trimestre", dates: "7 – 14 décembre 2025", days: 8 },
  { event: "Vacances mi-année", dates: "25 janv – 1 fév 2026", days: 8 },
  { event: "Vacances 2ème trimestre", dates: "15 – 22 mars 2026", days: 8 },
  { event: "Aid Al Fitr", dates: "29 ramadan – 2 chaoual 1447", days: 3 },
  { event: "Vacances 3ème trimestre", dates: "3 – 10 mai 2026", days: 8 },
  { event: "Aid Al Adha", dates: "9 – 11 dhul hijja 1447", days: 3 },
];

export default function NewsPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const items = filter ? NEWS.filter((n) => n.category === filter) : NEWS;

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
              Actualités et événements
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Événements, ateliers, partenariats et vie de campus — retour en images sur le quotidien de la CMC Béni Mellal-Khénifra.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Actualités</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#actus" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Actualités
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#calendrier" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Calendrier
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
              <div className="text-3xl md:text-4xl font-bold font-serif">{NEWS.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Articles</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{NEWS_CATEGORIES.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Catégories</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{NEWS.filter((n) => new Date(n.date) > new Date("2026-01-01")).length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Articles 2026</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{CALENDAR.length}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Vacances / fêtes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section id="actus" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Articles</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-2">
          Toutes les actualités
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-6 text-[15px]">
          Retrouvez les événements, ateliers et temps forts de la CMC Béni Mellal-Khénifra.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition cursor-pointer ${
              filter === null
                ? "bg-[var(--cmc-teal)] text-white border-[var(--cmc-teal)]"
                : "bg-white border-[var(--border-warm)] text-[var(--text-secondary)] hover:border-[var(--cmc-teal-light)]"
            }`}
          >
            Tout
          </button>
          {NEWS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition cursor-pointer ${
                filter === cat
                  ? "bg-[var(--cmc-teal)] text-white border-[var(--cmc-teal)]"
                  : "bg-white border-[var(--border-warm)] text-[var(--text-secondary)] hover:border-[var(--cmc-teal-light)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group bg-white border-2 border-[var(--border-warm)] overflow-hidden transition hover:shadow-md hover:-translate-y-0.5 flex flex-col"
            >
              <div className="h-52 overflow-hidden bg-[var(--panel-warm)] relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 text-[10px] font-mono uppercase tracking-wider px-2 py-1 bg-[var(--cmc-teal)] text-white">
                  {item.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">{item.dateLabel}</span>
                <h3 className="text-base font-serif font-semibold text-[var(--text-primary)] mt-1 mb-2 leading-snug group-hover:text-[var(--cmc-teal)] transition">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">{item.excerpt}</p>
                <span className="mt-auto pt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--cmc-teal)]">
                  Lire l&apos;article <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Calendrier */}
      <section id="calendrier" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Calendrier</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Calendrier des vacances 2025-2026
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
            Les périodes de vacances et jours fériés pour l&apos;année de formation à la CMC.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CALENDAR.map((item) => (
              <div key={item.event} className="flex items-start gap-3 bg-white border-2 border-[var(--border-warm)] p-5 transition hover:shadow-sm">
                <Calendar className="h-5 w-5 text-[var(--cmc-teal)] mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-[var(--text-primary)] block">{item.event}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{item.dates} ({item.days} jours)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cmc-navy)] text-white pb-24 md:pb-32">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Suivez l&apos;actualité en direct
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto text-[15px]">
            Rejoignez la chaîne WhatsApp officielle et suivez @cmc_officiel_ sur Instagram pour ne rien manquer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="https://ice.lol/tLGoNo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-8 py-4 rounded-none font-medium text-sm transition active:scale-95"
            >
              WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-none font-medium text-sm transition"
            >
              S&apos;inscrire
            </Link>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}

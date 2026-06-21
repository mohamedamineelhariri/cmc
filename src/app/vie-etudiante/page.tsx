"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  BedDouble, Wallet, HeartPulse, Dumbbell, BookOpen, Wrench, Users2,
  Rocket, Languages, Compass, Clapperboard, Coffee, Home, ArrowRight,
  ExternalLink, Sparkles,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import "leaflet/dist/leaflet.css";
import LayoutWrapper from "@/app/layout-wrapper";
import { SECTIONS } from "@/data/sections";

const FACILITIES = [
  { icon: BedDouble, title: "Internat — 414 lits et couverts", desc: "Maison des stagiaires moderne pour les résidents, avec cafétéria dédiée.", sectionId: "internat" },
  { icon: Dumbbell, title: "Complexe sportif", desc: "Terrain et espaces d'entraînement pour la pratique sportive.", sectionId: "terrain-foot" },
  { icon: Wrench, title: "Fab Lab", desc: "Prototypage et fabrication numérique : impression 3D, découpe laser.", sectionId: "fablab" },
  { icon: Users2, title: "Espace coworking", desc: "Travail collaboratif et projets entre stagiaires.", sectionId: "coworking" },
  { icon: Languages, title: "Centre de langues & soft skills", desc: "30 % du programme dédié aux compétences comportementales et linguistiques.", sectionId: "langues-softskills" },
  { icon: Rocket, title: "Incubateur", desc: "Accompagnement des startups et projets entrepreneuriaux des stagiaires.", sectionId: "incubateur" },
  { icon: Clapperboard, title: "Studio MOOC", desc: "Production de cours numériques et de contenus pédagogiques.", sectionId: "studio-mooc" },
  { icon: BookOpen, title: "Médiathèque", desc: "Ressources documentaires et numériques.", sectionId: "mediatheque" },
  { icon: Compass, title: "Centre d'Orientation Professionnelle", desc: "Information, orientation et accompagnement, pendant et après la formation.", sectionId: "cop" },
  { icon: Coffee, title: "Cafétéria", desc: "Espaces de restauration sur le campus.", sectionId: "cafeteria" },
];

const totalSections = SECTIONS.length;
const poleSections = SECTIONS.filter((s) => s.id.startsWith("pole-")).length;
const internatSection = SECTIONS.find((s) => s.id === "internat");
const capaciteLits = "414";

export default function VieEtudiantePage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    let mounted = true;

    (async () => {
      if (!mounted || !mapRef.current) return;
      if ((mapRef.current as any)._leaflet_id) return;
      const L = await import("leaflet");
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, {
        zoomControl: true,
      }).setView([32.3107, -6.4403], 16);

      L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
        attribution: "&copy; Google",
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        maxZoom: 20,
      }).addTo(map);

      SECTIONS.forEach((s) => {
        const marker = L.marker([s.lat, s.lng])
          .addTo(map)
          .bindPopup(
            `<div style="min-width:180px"><h4 style="margin:0 0 4px;font-size:14px">${s.icon} ${s.name}</h4><p style="margin:0;font-size:13px;color:#555">${s.desc}</p></div>`
          );
        markersRef.current.push(marker);
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    })();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const flyToMarker = useCallback((sectionId: string) => {
    const map = mapInstanceRef.current;
    const idx = SECTIONS.findIndex((s) => s.id === sectionId);
    if (map && idx !== -1) {
      const marker = markersRef.current[idx];
      if (marker) {
        document.getElementById("carte")?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          map.flyTo(marker.getLatLng(), 19, { duration: 0.6 });
          setTimeout(() => marker.openPopup(), 300);
        }, 400);
      }
    }
  }, []);

  return (
    <LayoutWrapper>
      {/* Hero */}
      <section className="bg-white">
        <div className="relative w-full h-[220px] md:h-[380px] bg-[var(--cmc-navy)] overflow-hidden">
          <img src="/campus/campus.webp" alt="Campus CMC Béni Mellal-Khénifra" className="w-full h-full object-cover" />
        </div>
        <div className="mx-auto px-6 lg:px-10 relative z-10" style={{ maxWidth: "var(--max-width)" }}>
          <div className="-mt-20 md:-mt-32 inline-block relative z-20">
            <div className="h-36 w-36 md:h-56 md:w-56 rounded-full bg-white border-[3px] border-[#32acc1] flex items-center justify-center shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
              <img src="/logo/logo.png" alt="Logo CMC Béni Mellal-Khénifra" className="h-[62%] w-[62%] object-contain" />
            </div>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] max-w-3xl leading-[1.1]">
              Vie étudiante
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Un campus moderne de 15 hectares pensé pour apprendre, vivre et entreprendre à la CMC Béni Mellal-Khénifra.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Vie étudiante</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#bourses" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Bourses &amp; AMO
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#carte" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Carte du campus
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#infrastructures" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Infrastructures
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
              <div className="text-3xl md:text-4xl font-bold font-serif">{totalSections}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Infrastructures &amp; services</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">15</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Hectares</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{capaciteLits}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Lits internat</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-serif">{poleSections}</div>
              <div className="text-sm text-white/70 mt-1 uppercase tracking-wider font-mono text-[11px]">Pôles applicatifs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bourses & AMO */}
      <section id="bourses" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Aides financières</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Bourses &amp; couverture médicale
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          L&apos;OFPPT octroie des bourses d&apos;études et une assurance maladie obligatoire à tous les stagiaires.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white border-2 border-[var(--border-warm)] p-7">
            <Wallet className="h-7 w-7 text-[var(--cmc-teal)] mb-4" />
            <div className="text-3xl font-serif font-bold text-[var(--text-primary)]">6 334 <span className="text-base font-sans text-[var(--text-secondary)]">DH/an</span></div>
            <p className="text-sm font-medium text-[var(--text-primary)] mt-1">Bourse complète</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">Pour les stagiaires dont les parents résident hors du périmètre urbain de l&apos;établissement. Versée en 3 tranches (1 900 + 1 900 + 2 533 DH).</p>
          </div>
          <div className="bg-white border-2 border-[var(--border-warm)] p-7">
            <Wallet className="h-7 w-7 text-[var(--cmc-teal)] mb-4" />
            <div className="text-3xl font-serif font-bold text-[var(--text-primary)]">3 167 <span className="text-base font-sans text-[var(--text-secondary)]">DH/an</span></div>
            <p className="text-sm font-medium text-[var(--text-primary)] mt-1">Demi-bourse</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">Pour les stagiaires résidant dans la même ville que l&apos;établissement. Versée en 3 tranches (950 + 950 + 1 266 DH).</p>
          </div>
          <div className="bg-white border-2 border-[var(--border-warm)] p-7">
            <HeartPulse className="h-7 w-7 text-[var(--cmc-teal)] mb-4" />
            <div className="text-3xl font-serif font-bold text-[var(--text-primary)]">AMO</div>
            <p className="text-sm font-medium text-[var(--text-primary)] mt-1">Assurance Maladie Obligatoire</p>
            <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">Une couverture médicale assurée à tous les stagiaires de l&apos;OFPPT pendant la formation.</p>
          </div>
        </div>
      </section>

      {/* Carte interactive du campus */}
      <section id="carte" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Plan du campus</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Carte interactive
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-6 text-[15px]">
            Explorez le campus interactif. Cliquez sur un marqueur pour voir les détails de chaque infrastructure.
          </p>
          <div className="relative bg-[var(--border-warm)] border-2 border-[var(--border-warm)]" style={{ height: "480px" }}>
            <div ref={mapRef} className="w-full h-full" />
            {!mapReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-warm)]">
                <span className="text-sm font-mono text-[var(--text-muted)]">Chargement de la carte...</span>
              </div>
            )}
            <span className="absolute bottom-3 right-3 bg-white/90 text-[10px] font-mono text-[var(--text-muted)] px-2 py-1 z-[1000]">
              📍 32.311&deg;N, -6.440&deg;W
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {SECTIONS.filter((_, i) => i < 6).map((s) => (
              <button
                key={s.id}
                onClick={() => flyToMarker(s.id)}
                className="bg-white border border-[var(--border-warm)] p-2.5 text-left transition hover:border-[var(--cmc-teal)]/30 cursor-pointer flex items-center gap-2"
              >
                <span className="text-base">{s.icon}</span>
                <span className="text-[11px] font-medium text-[var(--text-primary)] truncate">{s.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 text-right">
            <Link href="/campus" className="inline-flex items-center gap-1 text-xs font-mono text-[var(--cmc-teal)] hover:underline">
              Voir tous les points sur la carte <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Infrastructures & services */}
      <section id="infrastructures" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Infrastructures</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Infrastructures &amp; chaînes d&apos;innovation
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          Des espaces modernes dédiés à la formation, à l&apos;innovation et à la vie quotidienne des stagiaires.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACILITIES.map((f) => (
            <button
              key={f.title}
              onClick={() => flyToMarker(f.sectionId)}
              className="group bg-white border-2 border-[var(--border-warm)] p-6 text-left transition hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--cmc-teal)]/30 cursor-pointer active:scale-[0.98]"
            >
              <div className="h-11 w-11 bg-[var(--cmc-teal-subtle)] flex items-center justify-center mb-4 border border-[var(--cmc-teal)]/10">
                <f.icon className="h-5 w-5 text-[var(--cmc-teal)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--cmc-teal)] transition-colors">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{f.desc}</p>
            </button>
          ))}
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
            Une question sur la vie au campus&nbsp;?
          </Reveal>
          <Reveal as="p" delay={120} className="text-white/80 max-w-xl mx-auto mt-6 mb-10 text-base md:text-lg leading-relaxed">
            L&apos;assistant E-CMC répond sur l&apos;internat, les bourses, le sport et plus encore.
          </Reveal>
          <Reveal delay={220} className="flex flex-wrap justify-center gap-4">
            <Link href={`/chat?q=${encodeURIComponent("Comment fonctionnent l'internat et la bourse à la CMC ?")}`} className="group inline-flex items-center gap-2 bg-white text-[#1b6f7d] hover:bg-white/90 px-7 py-4 rounded-none font-semibold text-sm transition-colors active:scale-95">
              Poser une question <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/admissions" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white px-7 py-4 rounded-none font-medium text-sm hover:bg-white/20 transition active:scale-95">
              S&apos;inscrire
            </Link>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-6xl h-px bg-white/20" />
      </section>
    </LayoutWrapper>
  );
}

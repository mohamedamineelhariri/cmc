"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Home, ArrowRight, ExternalLink, Maximize2 } from "lucide-react";
import "leaflet/dist/leaflet.css";
import LayoutWrapper from "@/app/layout-wrapper";
import { SECTIONS } from "@/data/sections";

export default function CampusPage() {
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

  const totalSections = SECTIONS.length;
  const poleSections = SECTIONS.filter((s) => s.id.startsWith("pole-")).length;
  const internatSection = SECTIONS.find((s) => s.id === "internat");
  const capaciteLits = "414";

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
              Vie du campus
            </h1>
            <p className="mt-4 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              Découvrez les infrastructures, les services et les espaces de la CMC Béni Mellal-Khénifra
              située à l&apos;Agropole, Route de Marrakech.
            </p>
            <div className="mt-6 flex items-center gap-2.5 text-base md:text-lg text-[var(--text-secondary)]">
              <Link href="/" className="inline-flex hover:text-[var(--cmc-teal)] transition-colors"><Home className="h-5 w-5" /></Link>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium">Vie du campus</span>
            </div>
            <nav className="mt-6 border-y border-[var(--border-warm)]">
              <ul className="flex flex-wrap items-center text-base md:text-[17px]">
                <li className="flex items-center">
                  <a href="#carte" className="inline-block py-4 border-b-2 -mb-px border-[var(--cmc-teal)] text-[var(--text-primary)] font-medium transition-colors">
                    Carte interactive
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#infrastructures" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Infrastructures
                  </a>
                </li>
                <li className="flex items-center ml-6">
                  <a href="#chiffres" className="inline-block py-4 border-b-2 -mb-px border-transparent hover:border-[var(--cmc-teal)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    Chiffres
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

      {/* Carte interactive */}
      <section id="carte" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
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
      </section>

      {/* Infrastructures & services */}
      <section id="infrastructures" className="bg-[var(--bg-warm)] border-y border-[var(--border-warm)]">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Infrastructures</span>
          <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
            Infrastructures &amp; services
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
            Découvrez les {totalSections} infrastructures et services disponibles sur le campus. Cliquez sur une carte pour centrer la vue.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => flyToMarker(s.id)}
                className="group bg-white border-2 border-[var(--border-warm)] p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--cmc-teal)]/30 cursor-pointer active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">{s.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif font-medium text-sm text-[var(--text-primary)] group-hover:text-[var(--cmc-teal)] transition-colors truncate">
                      {s.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed line-clamp-2">
                      {s.desc}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-light)]">
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
                      </span>
                      <a
                        href={`https://www.google.com/maps?q=${s.lat},${s.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--cmc-teal)] hover:underline shrink-0"
                      >
                        Maps <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Campus en chiffres */}
      <section id="chiffres" className="mx-auto px-6 lg:px-10 py-16 md:py-20" style={{ maxWidth: "var(--max-width)" }}>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--cmc-teal)]">// Chiffres clés</span>
        <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[var(--text-primary)] mt-3 mb-4">
          Le campus en chiffres
        </h2>
        <p className="text-[var(--text-secondary)] max-w-2xl mb-10 text-[15px]">
          Un campus moderne de 15 hectares au cœur de l&apos;Agropole de Béni Mellal.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { value: "15", unit: "ha", label: "Superficie totale" },
            { value: totalSections.toString(), unit: "", label: "Infrastructures" },
            { value: capaciteLits, unit: "lits", label: "Capacité internat" },
            { value: poleSections.toString(), unit: "pôles", label: "Plateformes applicatives" },
            { value: "64", unit: "filières", label: "Offre de formation" },
            { value: "10", unit: "pôles", label: "Secteurs métiers" },
          ].map((item) => (
            <div key={item.label} className="bg-white border-2 border-[var(--border-warm)] p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold font-serif text-[var(--cmc-teal)]">
                {item.value}
                {item.unit && <span className="text-base font-mono text-[var(--text-muted)] ml-1">{item.unit}</span>}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mt-2">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white border-2 border-[var(--cmc-teal)]/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Maximize2 className="h-5 w-5 text-[var(--cmc-teal)] shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">Localisation</span>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Agropole, Route de Marrakech (N8) — Béni Mellal</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps?q=32.3107,-6.4403"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-6 py-3 rounded-none text-sm font-medium transition shrink-0"
          >
            Voir sur Google Maps <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--cmc-navy)] text-white pb-24 md:pb-32">
        <div className="mx-auto px-6 lg:px-10 py-16 md:py-20 text-center" style={{ maxWidth: "var(--max-width)" }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Prêt à nous rejoindre&nbsp;?
          </h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto text-[15px]">
            Rejoignez la CMC Béni Mellal-Khénifra et bénéficiez d&apos;un campus moderne au service de votre réussite.
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

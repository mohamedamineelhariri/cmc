"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { ArrowLeft, X, ExternalLink, GripHorizontal } from "lucide-react";
import { SECTIONS } from "@/data/sections";

interface CampusMapViewProps {
  standalone?: boolean;
  onClose?: () => void;
  focusMarkerId?: string;
}

export default function CampusMapView({ standalone, onClose, focusMarkerId }: CampusMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const mapReadyRef = useRef(false);

  const [mapRatio, setMapRatio] = useState(0.55);

  const focusMarker = useCallback((sectionId: string) => {
    const marker = markersRef.current[sectionId];
    const map = mapInstanceRef.current;
    if (marker && map) {
      map.flyTo(marker.getLatLng(), 19, { duration: 0.6 });
      setTimeout(() => marker.openPopup(), 300);
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    let mounted = true;

    (async () => {
      if (!mounted || !mapRef.current) return;
      const L = await import("leaflet");

      const map = L.map(mapRef.current, { zoomControl: true }).setView(
        [32.3107, -6.4403],
        17
      );

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
        markersRef.current[s.id] = marker;
      });

      mapInstanceRef.current = map;
      mapReadyRef.current = true;
    })();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!focusMarkerId) return;
    const check = setInterval(() => {
      if (mapReadyRef.current && markersRef.current[focusMarkerId]) {
        focusMarker(focusMarkerId);
        clearInterval(check);
      }
    }, 100);
    return () => clearInterval(check);
  }, [focusMarkerId, focusMarker]);

  const handleDividerDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      setMapRatio(Math.max(0.2, Math.min(0.8, y / rect.height)));
    };
    const handleUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      const map = mapInstanceRef.current;
      if (map) map.invalidateSize();
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const map = mapInstanceRef.current;
      if (map) map.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [mapRatio]);

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-[var(--bg-warm)]">
      {standalone && (
        <header className="bg-[var(--text-primary)] text-white px-6 py-6 md:py-8 text-center relative shrink-0">
          <div className="absolute top-4 left-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-mono uppercase tracking-widest transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au Chat
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-medium">
            Plan du Campus
          </h1>
          <p className="text-white/80 text-sm mt-1">
            CMC Béni Mellal-Khénifra — Agropole, Route de Marrakech
          </p>
          <span className="inline-block mt-3 bg-white/10 px-3 py-1 rounded-full text-xs font-mono">
            📍 32.311&deg;N, -6.440&deg;W
          </span>
        </header>
      )}

      {!standalone && (
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--border-warm)] bg-white/50 shrink-0">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-secondary)]">
            // PLAN DU CAMPUS &middot; {SECTIONS.length} POINTS
          </span>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[var(--border-light)] rounded-none text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex flex-col min-h-0" style={{ flex: `${mapRatio} 1 0%` }}>
        <div ref={mapRef} className="w-full flex-1 bg-[var(--border-warm)]" />
      </div>

      <div
        onMouseDown={handleDividerDown}
        className="h-1.5 shrink-0 cursor-row-resize bg-[var(--border-warm)] hover:bg-[var(--cmc-teal)]/30 active:bg-[var(--cmc-teal)]/50 transition-colors flex items-center justify-center relative"
      >
        <span className="absolute bg-[var(--border-warm)] rounded-full px-2 py-0.5 text-[8px] font-mono text-[var(--text-muted)]">
          <GripHorizontal className="h-3 w-3" />
        </span>
      </div>

      <div className="overflow-y-auto min-h-0" style={{ flex: `${1 - mapRatio} 1 0%` }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--text-secondary)]">
              // INFRASTRUCTURES &amp; SERVICES
              <span className="ml-2 text-[var(--cmc-teal)] font-semibold">({SECTIONS.length})</span>
            </h2>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">
              Cliquez sur une carte pour zoomer
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => focusMarker(s.id)}
                className="group bg-white border border-[var(--border-warm)] rounded-none p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--cmc-teal)]/30 cursor-pointer active:scale-[0.98]"
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
      </div>
    </div>
  );
}

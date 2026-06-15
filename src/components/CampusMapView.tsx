"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, X, MapPin, ExternalLink } from "lucide-react";

interface Section {
  id: string;
  name: string;
  desc: string;
  lat: number;
  lng: number;
  icon: string;
}

const SECTIONS: Section[] = [
  { id: "entrance", name: "Entrée principale", desc: "Accès principal au campus CMC Béni Mellal-Khénifra.", lat: 32.310387, lng: -6.440954, icon: "🚪" },
  { id: "administration", name: "Administration", desc: "Bâtiment administratif de la Cité des Métiers.", lat: 32.310586, lng: -6.440878, icon: "🏛️" },
  { id: "studio-mooc", name: "Studio MOOC", desc: "Production de cours numériques et contenus pédagogiques en ligne.", lat: 32.310766, lng: -6.440863, icon: "🎬" },
  { id: "pole-gc-dia-aig", name: "Pôle GC, Digital & IA, Agri. Précision", desc: "Plateforme Génie Civil, Digital & IA, Agriculture de Précision.", lat: 32.310516, lng: -6.440420, icon: "🏭" },
  { id: "pole-artisana", name: "Pôle Artisanat", desc: "Formations aux métiers de l'artisanat.", lat: 32.310700, lng: -6.439937, icon: "🔨" },
  { id: "pole-transport", name: "Pôle Transport", desc: "Pistes de conduite et formations Transport & Logistique.", lat: 32.310918, lng: -6.439496, icon: "🚛" },
  { id: "pole-mecanique", name: "Pôle Mécanique", desc: "Plateforme mécanique et maintenance industrielle.", lat: 32.311376, lng: -6.438892, icon: "⚙️" },
  { id: "pole-agro-industrie", name: "Pôle Agro-Industrie", desc: "Formations aux métiers de l'agro-industrie.", lat: 32.311735, lng: -6.438253, icon: "🏭" },
  { id: "pole-agriculture", name: "Pôle Agriculture", desc: "Formations agricoles et techniques culturales.", lat: 32.312094, lng: -6.438606, icon: "🌱" },
  { id: "pole-btp", name: "Pôle BTP", desc: "Maison intelligente et formations BTP.", lat: 32.311293, lng: -6.439480, icon: "🏗️" },
  { id: "ferme-pedagogique", name: "Ferme pédagogique", desc: "Ferme appliquée pour les formations agricoles.", lat: 32.312392, lng: -6.438574, icon: "🧑‍🌾" },
  { id: "hotel-pedagogique", name: "Hôtel pédagogique", desc: "Hôtel appliqué pour les formations Management Hôtelier.", lat: 32.311310, lng: -6.441534, icon: "🏨" },
  { id: "pole-thr", name: "Pôle THR", desc: "Tourisme, Hôtellerie & Restauration.", lat: 32.311140, lng: -6.441218, icon: "🍽️" },
  { id: "terrain-foot", name: "Terrain de foot", desc: "Terrain sportif et espaces d'entraînement.", lat: 32.311767, lng: -6.440332, icon: "⚽" },
  { id: "cafeteria-internat", name: "Cafétéria internat", desc: "Restauration pour les résidents de l'internat.", lat: 32.312255, lng: -6.440176, icon: "☕" },
  { id: "cafeteria", name: "Cafétéria", desc: "Espace de restauration principal.", lat: 32.311828, lng: -6.441037, icon: "☕" },
  { id: "internat", name: "Internat", desc: "Maison des stagiaires — 414 lits.", lat: 32.312254, lng: -6.439657, icon: "🛏️" },
  { id: "fablab", name: "Fab Lab", desc: "Fabrication numérique : impression 3D, découpe laser.", lat: 32.311690, lng: -6.440796, icon: "🔧" },
  { id: "langues-softskills", name: "Langues & Soft Skills", desc: "Centre de langues et compétences comportementales.", lat: 32.311169, lng: -6.440507, icon: "🗣️" },
  { id: "coworking", name: "Espace Coworking", desc: "Travail collaboratif pour les stagiaires.", lat: 32.311563, lng: -6.440673, icon: "💻" },
  { id: "incubateur", name: "Incubateur", desc: "Accompagnement de startups et projets entrepreneuriaux.", lat: 32.311432, lng: -6.440896, icon: "🚀" },
  { id: "cop", name: "COP", desc: "Centre d'Orientation Professionnelle.", lat: 32.310845, lng: -6.440661, icon: "🧭" },
  { id: "mediatheque", name: "Médiathèque", desc: "Ressources documentaires et numériques.", lat: 32.311017, lng: -6.440634, icon: "📚" },
  { id: "parking-pro", name: "Parking professionnel", desc: "Parking réservé au personnel.", lat: 32.309903, lng: -6.440403, icon: "🅿️" },
  { id: "parking-public", name: "Parking public", desc: "Parking visiteurs et public.", lat: 32.310676, lng: -6.441261, icon: "🅿️" },
  { id: "bus-terminus", name: "Terminus Bus n° 25", desc: "Arrêt terminus de la ligne 25.", lat: 32.310212, lng: -6.441241, icon: "🚌" },
  { id: "bus-depart", name: "Départ Bus n° 25", desc: "Arrêt départ ligne 25 vers le centre-ville.", lat: 32.310080, lng: -6.441484, icon: "🚌" },
  { id: "salle-conference", name: "Salle de conférence", desc: "Conférences et événements académiques.", lat: 32.310987, lng: -6.440103, icon: "🎤" },
  { id: "amphitheatre", name: "Amphithéâtre", desc: "Grand amphithéâtre pour cours et séminaires.", lat: 32.310928, lng: -6.440925, icon: "🎭" },
  { id: "cours-soir", name: "Salles cours du soir", desc: "Salles dédiées aux formations du soir.", lat: 32.311068, lng: -6.440741, icon: "📖" },
];

interface CampusMapViewProps {
  standalone?: boolean;
  onClose?: () => void;
}

export default function CampusMapView({ standalone, onClose }: CampusMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});

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

    const initMap = () => {
      if (!mounted || !mapRef.current) return;
      const L = (window as any).L;
      const map = L.map(mapRef.current, { zoomControl: true }).setView(
        [32.3107, -6.4403],
        17
      );

      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri",
        maxZoom: 19,
      }).addTo(map);

      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", {
        attribution: "&copy; Esri",
        maxZoom: 19,
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
    };

    if ((window as any).L) {
      initMap();
    } else {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.body.appendChild(script);
    }

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-[var(--bg-warm)]">
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
            className="p-1.5 hover:bg-[var(--border-light)] rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div
        ref={mapRef}
        className="w-full bg-[var(--border-warm)]"
        style={standalone ? { height: "520px" } : { flex: "1 1 0%", minHeight: "300px" }}
      />

      <div className="overflow-y-auto shrink-0 border-t border-[var(--border-warm)] bg-[var(--bg-warm)]">
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
                className="group bg-white border border-[var(--border-warm)] rounded-xl p-4 text-left transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[var(--cmc-teal)]/30 cursor-pointer active:scale-[0.98]"
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

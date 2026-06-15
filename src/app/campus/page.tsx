"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    id: "entrance",
    name: "Entrée principale & Accueil",
    desc: "Point d'entrée du campus. Accès par la Route de Marrakech (N8). Bus n° 25. Centre d'orientation et accueil des visiteurs.",
    lat: 32.2998, lng: -6.4370,
    icon: "🚪",
  },
  {
    id: "internat",
    name: "Maison des stagiaires (Internat)",
    desc: "Capacité de 414 lits et couverts. Hébergement résidentiel pour les stagiaires.",
    lat: 32.3010, lng: -6.4362,
    icon: "🛏️",
  },
  {
    id: "cafeteria",
    name: "Cafétéria",
    desc: "Espace de restauration pour les stagiaires et le personnel.",
    lat: 32.3008, lng: -6.4375,
    icon: "☕",
  },
  {
    id: "sport",
    name: "Complexe sportif",
    desc: "Terrain et espaces d'entraînement pour les activités sportives.",
    lat: 32.3016, lng: -6.4368,
    icon: "⚽",
  },
  {
    id: "coworking",
    name: "Espace de Coworking",
    desc: "Espace de travail collaboratif et de partage pour les stagiaires.",
    lat: 32.3003, lng: -6.4380,
    icon: "💻",
  },
  {
    id: "langues",
    name: "Centre de Langues & Soft Skills",
    desc: "Formation linguistique (anglais, français) et développement des compétences comportementales.",
    lat: 32.3006, lng: -6.4385,
    icon: "🗣️",
  },
  {
    id: "fablab",
    name: "Fab Lab",
    desc: "Atelier de fabrication numérique : impression 3D, découpe laser, prototypage.",
    lat: 32.3000, lng: -6.4390,
    icon: "🔧",
  },
  {
    id: "digital-factory",
    name: "Digital Factory",
    desc: "Usine numérique pour les formations du pôle Digital & IA.",
    lat: 32.2996, lng: -6.4388,
    icon: "🏭",
  },
  {
    id: "mooc",
    name: "Studio MOOC",
    desc: "Production de cours numériques et de contenus pédagogiques en ligne.",
    lat: 32.3001, lng: -6.4378,
    icon: "🎬",
  },
  {
    id: "incubateur",
    name: "Incubateur",
    desc: "Accompagnement de startups et de projets entrepreneuriaux des stagiaires.",
    lat: 32.2994, lng: -6.4375,
    icon: "🚀",
  },
  {
    id: "mediatheque",
    name: "Médiathèque",
    desc: "Ressources documentaires et numériques à disposition des stagiaires.",
    lat: 32.3005, lng: -6.4370,
    icon: "📚",
  },
  {
    id: "conferences",
    name: "Centre de Conférences",
    desc: "Plateforme pour les échanges académiques, conférences et événements professionnels.",
    lat: 32.2999, lng: -6.4365,
    icon: "🎤",
  },
  {
    id: "orientation",
    name: "Centre d'Orientation Professionnelle",
    desc: "Information, orientation et accompagnement des jeunes (avant, pendant et après la formation).",
    lat: 32.3002, lng: -6.4360,
    icon: "🧭",
  },
  {
    id: "industrie",
    name: "Pôle Industrie — Usine pédagogique",
    desc: "Plateforme applicative pour les filières industrielles (DEEA, QHSE, Électromécanique).",
    lat: 32.2993, lng: -6.4360,
    icon: "⚙️",
  },
  {
    id: "btp",
    name: "Pôle BTP — Maison intelligente",
    desc: "Plateforme pour les filières BTP : Génie Civil, Bâtiment, Géomètre Topographe.",
    lat: 32.2988, lng: -6.4368,
    icon: "🏗️",
  },
  {
    id: "transports",
    name: "Pôle Transport — Pistes de conduite",
    desc: "Plateforme applicative avec pistes de conduite pour les filières Transport & Logistique.",
    lat: 32.2983, lng: -6.4375,
    icon: "🚛",
  },
  {
    id: "tourisme",
    name: "Pôle Tourisme — Hôtel & Restaurant pédagogiques",
    desc: "Hôtel et restaurant pédagogiques pour les filières Management Hôtelier, Arts Culinaires, etc.",
    lat: 32.2990, lng: -6.4385,
    icon: "🍽️",
  },
  {
    id: "agriculture",
    name: "Pôle Agriculture — Ferme pédagogique",
    desc: "Plateforme agricole pour les filières Agriculture de Précision, Techniques Agricoles, etc.",
    lat: 32.2978, lng: -6.4360,
    icon: "🌾",
  },
  {
    id: "commerce",
    name: "Pôle Gestion — Entreprise virtuelle",
    desc: "Plateforme de simulation d'entreprise pour Gestion des Entreprises, Assistant Administratif.",
    lat: 32.2995, lng: -6.4355,
    icon: "📊",
  },
  {
    id: "bus",
    name: "Arrêt Bus n° 25",
    desc: "Arrêt de bus sur la Route de Marrakech (N8) desservant le campus.",
    lat: 32.3006, lng: -6.4350,
    icon: "🚌",
  },
];

export default function CampusPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;
    let mounted = true;

    const initMap = () => {
      if (!mounted || !mapRef.current) return;
      const L = (window as any).L;
      const map = L.map(mapRef.current, { zoomControl: true }).setView(
        [32.2996, -6.4373],
        17
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      SECTIONS.forEach((s) => {
        L.marker([s.lat, s.lng])
          .addTo(map)
          .bindPopup(
            `<div style="min-width:180px"><h4 style="margin:0 0 4px">${s.icon} ${s.name}</h4><p style="margin:0;font-size:13px;color:#555">${s.desc}</p></div>`
          );
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
    <div className="min-h-screen bg-[var(--bg-warm)] text-[var(--text-primary)]">
      <header className="bg-[var(--text-primary)] text-white px-6 py-8 md:py-10 text-center relative">
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
          📍 32.299&deg;N, -6.437&deg;W (Agropole)
        </span>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div
          ref={mapRef}
          className="w-full h-[400px] md:h-[520px] rounded-xl shadow-md mb-6 bg-[var(--border-warm)]"
        />

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg text-sm text-amber-800 mb-8">
          <strong>&#9888; Coordonnées de la zone.</strong> Le centre de
          l&apos;Agropole (32.29884, -6.43654) provient du portail
          zonesindustrielles.gov.ma. La CMC (15 ha) se situe dans cette zone.
          Les positions des bâtiments sont estimées — un relevé GPS sur place
          est nécessaire pour les coordonnées exactes.
        </div>

        <h2 className="text-xl font-serif font-medium mb-6 pb-3 border-b-2 border-[var(--cmc-navy)]">
          &#127963; Infrastructures &amp; Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--border-warm)] hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="h-40 bg-[var(--panel-warm)] flex items-center justify-center text-4xl opacity-70 relative">
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
                  {s.icon} {s.name}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-serif font-medium text-base mb-1">
                  {s.icon} {s.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  {s.desc}
                </p>
                <div className="text-xs text-[var(--text-muted)] font-mono mb-2">
                  📍 {s.lat.toFixed(4)}, {s.lng.toFixed(4)}
                </div>
                <a
                  href={`https://www.google.com/maps?q=${s.lat},${s.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--cmc-teal)] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Voir sur Google Maps &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

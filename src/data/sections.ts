export interface Section {
  id: string;
  name: string;
  desc: string;
  lat: number;
  lng: number;
  icon: string;
}

export const SECTIONS: Section[] = [
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
  { id: "internat", name: "Internat", desc: "Maison des stagiaires — 414 lits et couverts.", lat: 32.312254, lng: -6.439657, icon: "🛏️" },
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

function clean(s: string): string {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[,.;:!?&()"]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchLocation(text: string): string | null {
  const lower = clean(text);
  let bestMatch: string | null = null;
  let bestLen = 0;
  for (const s of SECTIONS) {
    const nameLower = clean(s.name);
    const escaped = nameLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`\\b${escaped}\\b`);
    if (re.test(lower) && nameLower.length > bestLen) {
      bestMatch = s.id;
      bestLen = nameLower.length;
    }
  }
  return bestMatch;
}

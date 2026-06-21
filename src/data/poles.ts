// Structured CMC Béni Mellal-Khénifra catalog (2026-2027).
// Powers the mega-menu, the per-pôle pages, and the filière detail pages.
// Source: Brochure_Poche_CMC_Beni_Mellal.pdf (page 2) — offre officielle 2026-2027.

export type Niveau = "TS" | "T" | "FQ" | "Q" | "S";

export const NIVEAU_LABEL: Record<Niveau, string> = {
  TS: "Technicien Spécialisé",
  T: "Technicien",
  FQ: "Formation Qualifiante",
  Q: "Qualification",
  S: "Spécialisation",
};

// Official OFPPT registration fees per level (source: ofppt.ma/nos-formations).
export const NIVEAU_PRIX: Record<Niveau, string> = {
  TS: "950 DH",
  T: "800 DH",
  FQ: "400–950 DH",
  Q: "550 DH",
  S: "400 DH",
};

export const NIVEAU_ACCESS: Record<Niveau, string> = {
  TS: "Baccalauréat (ou Licence / diplôme TS). Sélection sur les notes du Bac.",
  T: "Niveau 2e année du Baccalauréat (ou diplôme de Qualification). Test psychotechnique.",
  FQ: "Variable selon la filière. Admission sur test et/ou entretien. Formation certifiante de courte durée.",
  Q: "Niveau 3e année du collège (ou diplôme de Spécialisation). Test psychotechnique.",
  S: "Niveau 1ʳᵉ année du collège (6ᵉ année primaire). Accessible sans diplôme, sélection sur test.",
};

export interface Filiere {
  slug: string;
  name: string;
  pole: string;
  niveau: Niveau;
  places: number | null;
  duree: string;
  objectif: string;
  specialites?: string[];
}

// Economic indicator shown in the "secteur au Maroc" band — sourced from the
// official pôle brochures in cmc_pdfs/ (e.g. Agriculture.pdf, page 2).
export interface SectorStat {
  value: string; // e.g. "+300 000", "14–20%"
  label: string; // e.g. "Emplois créés durant les 10 dernières années"
  icon?: "trending-up" | "target" | "building-2" | "users" | "gauge";
}

export interface Pole {
  slug: string;
  name: string;
  short: string;
  emoji: string;
  accent: string;
  tagline: string;
  description: string;
  plateforme: string;
  debouches: string[];
  // ── Enrichment extracted from each pôle's official brochure PDF (cmc_pdfs/) ──
  // All optional: sections render only for pôles whose PDF has been processed.
  sectorTitle?: string; // e.g. "Le secteur de l'Agriculture au Maroc"
  sectorStats?: SectorStat[]; // economic indicators band
  skills?: string[]; // compétences recherchées par les employeurs
}

export const POLES: Pole[] = [
  {
    slug: "agriculture",
    name: "Agriculture",
    short: "Agriculture",
    emoji: "🌱",
    accent: "#5ca032",
    tagline: "Cultiver l'avenir agricole de la région",
    description:
      "Le pôle Agriculture forme aux métiers d'une agriculture moderne et durable : agriculture de précision, gestion d'exploitation et techniques culturales. Les stagiaires s'exercent sur une véritable ferme pédagogique et s'initient aux technologies de pointe comme le pilotage de drones.",
    plateforme: "Ferme pédagogique",
    debouches: [
      "Technicien en agriculture de précision",
      "Technicien en gestion et techniques agricoles",
      "Conduite d'exploitation agricole",
      "Conseiller agricole",
    ],
    sectorTitle: "Le secteur de l'Agriculture au Maroc",
    sectorStats: [
      { value: "+300 000", label: "Emplois créés durant les 10 dernières années", icon: "users" },
      { value: "350 000", label: "Emplois — objectif à l'horizon 2030", icon: "target" },
      { value: "+300 000", label: "Entreprises opérant dans le secteur", icon: "building-2" },
      { value: "14–20 %", label: "Part dans le PIB national", icon: "trending-up" },
    ],
    skills: [
      "Capacités d'analyse et de synthèse",
      "Sens des responsabilités",
      "Sens de l'organisation",
      "Sens du relationnel et esprit d'équipe",
      "Capacités d'anticipation et de prévention des risques",
    ],
  },
  {
    slug: "agro-industrie",
    name: "Agro-industrie",
    short: "Agro-industrie",
    emoji: "🏭",
    accent: "#395829",
    tagline: "Valoriser les produits du terroir",
    description:
      "Premier sous-secteur industriel de la région, l'agro-industrie est au cœur de l'économie de Béni Mellal-Khénifra. Le pôle forme à la transformation et à la valorisation des produits agricoles, dont les plantes aromatiques et médicinales (PAM).",
    plateforme: "Atelier agroalimentaire",
    debouches: [
      "Technicien en transformation agroalimentaire",
      "Valorisation des plantes aromatiques et médicinales",
      "Contrôle qualité agroalimentaire",
    ],
    sectorTitle: "Le secteur de l'Agro-industrie au Maroc",
    sectorStats: [
      { value: "7 %", label: "Part dans le PIB national", icon: "trending-up" },
      { value: "23 %", label: "Part dans le PIB industriel", icon: "gauge" },
      { value: "~2 000", label: "Entreprises du secteur", icon: "building-2" },
      { value: "206 000", label: "Emplois directs", icon: "users" },
      { value: "191 Mrd DH", label: "Chiffre d'affaires (2024)", icon: "trending-up" },
      { value: "43,2 Mrd DH", label: "Exportations (2024)", icon: "building-2" },
    ],
    skills: [
      "Rigueur et respect des normes d'hygiène et de sécurité",
      "Maîtrise des processus de transformation agroalimentaire",
      "Capacités d'analyse et de contrôle qualité",
      "Sens de l'organisation et de la traçabilité",
      "Esprit d'initiative et d'innovation",
    ],
  },
  {
    slug: "artisanat",
    name: "Artisanat",
    short: "Artisanat",
    emoji: "🧵",
    accent: "#916828",
    tagline: "Le savoir-faire marocain, transmis et modernisé",
    description:
      "Le pôle Artisanat (industrie traditionnelle) préserve et transmet les métiers d'art marocains : couture traditionnelle, tissage, tapisserie et menuiserie d'art, tout en ouvrant ces savoir-faire vers l'entrepreneuriat.",
    plateforme: "Ateliers d'artisanat",
    debouches: [
      "Couturier(ère) / haute couture",
      "Bijoutier-joaillier",
      "Menuisier d'art / sculpteur sur bois",
      "Tisserand / tapissier",
      "Maroquinier",
      "Créateur d'entreprise artisanale",
    ],
    sectorTitle: "Le secteur de l'Artisanat au Maroc",
    sectorStats: [
      // Source: Artisanat.pdf, page 2. NB: la brochure imprime « 76,40 / 38,3
      // MILLIONS DHS » mais il s'agit des chiffres en milliards (Mrd) — les
      // exportations à 792 M DHS dépasseraient sinon le chiffre d'affaires total.
      { value: "76,40 Mrd DH", label: "Chiffre d'affaires du secteur", icon: "trending-up" },
      { value: "38,3 Mrd DH", label: "Valeur ajoutée", icon: "gauge" },
      { value: "1,14 M", label: "Emplois directs", icon: "users" },
      { value: "+2,4 M", label: "Emplois en incluant l'artisanat de service", icon: "users" },
      { value: "792,15 M DH", label: "Exportations", icon: "building-2" },
      { value: "7 %", label: "Part dans le PIB national", icon: "trending-up" },
    ],
    skills: [
      "Sens de l'organisation et de la responsabilité",
      "Créativité",
      "Sens de l'esthétique",
      "Sens du détail",
      "Penchant pour le travail manuel",
      "Esprit d'initiative et d'entrepreneuriat",
    ],
  },
  {
    slug: "art-industrie-graphique",
    name: "Arts et Industries Graphiques",
    short: "Arts graphiques",
    emoji: "🎨",
    accent: "#dac0d8",
    tagline: "De la création à l'impression",
    description:
      "Le pôle Art et industrie graphique forme aux métiers de la chaîne graphique : conception, infographie et prépresse, à la croisée de la création visuelle et de la production imprimée.",
    plateforme: "Studio prépresse & infographie",
    debouches: [
      "Infographiste",
      "Opérateur prépresse",
      "Maquettiste / PAO",
      "Opérateur en impression numérique",
      "Contrôleur qualité supports & emballage",
    ],
    sectorTitle: "Le secteur des Arts et Industries Graphiques au Maroc",
    sectorStats: [
      { value: "43 Mrd DH", label: "Chiffre d'affaires (ICC)", icon: "trending-up" },
      { value: "116 000", label: "Emplois dans les ICC", icon: "users" },
      { value: "2,4 %", label: "Part dans le PIB", icon: "gauge" },
      { value: "18 %", label: "Croissance annuelle (ICC)", icon: "trending-up" },
    ],
    skills: [
      "Créativité et sens esthétique développés",
      "Maîtrise des logiciels de conception graphique",
      "Précision et rigueur dans les finitions",
      "Connaissance des techniques d'impression",
      "Gestion des couleurs et des supports",
    ],
  },
  {
    slug: "btp",
    name: "BTP",
    short: "BTP",
    emoji: "🏗️",
    accent: "#f6b825",
    tagline: "Bâtir les infrastructures de demain",
    description:
      "Le pôle Bâtiment et Travaux Publics forme aux métiers de la construction : génie civil, conduite de travaux et topographie. Les stagiaires s'exercent notamment dans une « maison intelligente » (smart house).",
    plateforme: "Maison intelligente",
    debouches: [
      "Technicien en génie civil",
      "Conducteur de travaux",
      "Géomètre topographe",
      "Métreur",
      "Menuisier aluminium et bois",
    ],
    sectorTitle: "Le secteur du BTP au Maroc",
    sectorStats: [
      // Source: BTP.pdf, page 2 (bande « Découvrez le secteur du BTP au Maroc »).
      { value: "~5 000", label: "Entreprises du secteur, dont une vingtaine de grande taille", icon: "building-2" },
      { value: "≈ 1 M", label: "Personnes employées — plus de 10 % de la population active", icon: "users" },
      { value: "80 %", label: "Part des ouvriers et manœuvres dans les effectifs", icon: "gauge" },
      { value: "50 %", label: "Des embauches exigent un diplôme", icon: "target" },
    ],
    skills: [
      "Rigueur et respect des normes de sécurité",
      "Capacité à lire et interpréter des plans techniques",
      "Sens de l'organisation et de la planification",
      "Travail en équipe sur chantier",
      "Adaptabilité aux conditions de terrain",
    ],
  },
  {
    slug: "digital-ia",
    name: "Digital & Intelligence Artificielle",
    short: "Digital & IA",
    emoji: "💻",
    accent: "#ee6e21",
    tagline: "Coder, connecter, innover",
    description:
      "Le pôle Digital & IA forme aux métiers du numérique à fort potentiel d'emploi : développement web et mobile, infrastructure digitale, communication digitale et intelligence artificielle. Les stagiaires travaillent dans une Digital Factory.",
    plateforme: "Digital Factory",
    debouches: [
      "Développeur web et mobile",
      "Développeur d'applications",
      "UI / UX designer",
      "Administrateur d'infrastructure digitale",
      "Community manager / web marketeur",
      "Installateur fibre optique",
      "Métiers de la data et de l'IA",
    ],
    sectorTitle: "Le secteur du Digital et de l'IA au Maroc",
    sectorStats: [
      { value: "6,8 %", label: "Part dans le PIB national", icon: "trending-up" },
      { value: "7 Mrd USD", label: "Marché du digital et des télécoms", icon: "trending-up" },
      { value: "240 000", label: "Emplois numériques visés d'ici 2030", icon: "target" },
      { value: "700+", label: "Startups tech marocaines", icon: "building-2" },
      { value: "100 Mrd DH", label: "PIB additionnel visé d'ici 2030", icon: "gauge" },
    ],
    skills: [
      "Motivation et esprit d'initiative",
      "Curiosité et passion pour les nouvelles technologies",
      "Capacités d'analyse et de synthèse",
      "Travail en équipe",
      "Bonne aptitude à la communication",
      "Empathie",
      "Patience et rigueur",
    ],
  },
  {
    slug: "gestion-commerce",
    name: "Gestion & Commerce",
    short: "Gestion & Commerce",
    emoji: "📊",
    accent: "#632674",
    tagline: "Gérer, vendre, entreprendre",
    description:
      "Le pôle Gestion & Commerce forme à l'administration et à la gestion d'entreprise. Les stagiaires s'entraînent dans une entreprise virtuelle reproduisant les situations réelles du monde professionnel.",
    plateforme: "Entreprise virtuelle",
    debouches: [
      "Office manager / gestionnaire d'entreprise",
      "Chargé de commerce et marketing",
      "Comptable / gestionnaire financier",
      "Assistant RH",
      "Assistant administratif",
      "Chargé d'e-commerce / back office",
      "Créateur d'entreprise",
    ],
    sectorTitle: "Le secteur de la Gestion et du Commerce au Maroc",
    sectorStats: [
      // Source: Gestion_Commerce.pdf, page 2 (bande secteur).
      { value: "57 %", label: "Contribution au PIB national — 1ᵉʳ contributeur", icon: "trending-up" },
      { value: "5 M", label: "Actifs employés — 40 % de la population active du Royaume", icon: "users" },
      { value: "2ᵉ", label: "Pourvoyeur d'emplois au niveau national", icon: "target" },
      { value: "3 %", label: "Croissance du secteur des services (2018)", icon: "gauge" },
    ],
    skills: [
      "Sens de l'organisation et de la rigueur",
      "Aptitude à la communication et au relationnel",
      "Esprit d'analyse et de synthèse",
      "Maîtrise des outils bureautiques et digitaux",
      "Capacité à travailler en équipe",
      "Sens de l'initiative et de l'entrepreneuriat",
    ],
  },
  {
    slug: "industrie",
    name: "Industrie",
    short: "Industrie",
    emoji: "⚙️",
    accent: "#1065a7",
    tagline: "La maîtrise des systèmes industriels",
    description:
      "Le pôle Industrie forme aux métiers de la maintenance et de l'électromécanique, du diagnostic automobile et de la qualité-hygiène-sécurité-environnement (QHSE). Les stagiaires s'exercent dans une usine pédagogique (teaching factory).",
    plateforme: "Usine pédagogique",
    debouches: [
      "Électromécanicien",
      "Technicien en diagnostic et électronique automobile",
      "Technicien maintenance des véhicules hybrides et électriques",
      "Responsable QHSE",
    ],
    sectorTitle: "Le secteur de l'Industrie au Maroc",
    sectorStats: [
      { value: "898 Mrd DH", label: "Chiffre d'affaires (2024)", icon: "trending-up" },
      { value: "240 Mrd DH", label: "Valeur ajoutée", icon: "gauge" },
      { value: "1 038 000", label: "Emplois directs", icon: "users" },
      { value: "90 Mrd DH", label: "Investissements (2024)", icon: "trending-up" },
      { value: "~17 %", label: "Part dans le PIB national", icon: "trending-up" },
    ],
    skills: [
      "Rigueur technique et précision",
      "Capacité d'analyse et de résolution de problèmes",
      "Respect des normes de sécurité et de qualité",
      "Travail en équipe pluridisciplinaire",
      "Adaptabilité aux évolutions technologiques",
    ],
  },
  {
    slug: "tourisme-hotellerie",
    name: "Tourisme, Hôtellerie & Restauration",
    short: "Tourisme & Hôtellerie",
    emoji: "🍽️",
    accent: "#16b1a9",
    tagline: "L'art de recevoir et de faire découvrir",
    description:
      "Le pôle Tourisme & Hôtellerie (THR) forme aux métiers de l'accueil, de la restauration et de la gestion touristique. Les stagiaires s'exercent dans un hôtel et un restaurant pédagogiques, au service de l'excellence.",
    plateforme: "Hôtel & restaurant pédagogiques",
    debouches: [
      "Manager touristique / organisateur d'événements",
      "Manager hôtelier / majordome",
      "Chef / commis de cuisine (arts culinaires)",
      "Pâtissier-chocolatier",
      "Chef de rang / maître d'hôtel",
      "Yield manager",
    ],
    sectorTitle: "Le secteur du Tourisme, de l'Hôtellerie et de la Restauration au Maroc",
    sectorStats: [
      // Source: THR.pdf, page 2 (bande secteur). Chiffres « emplois directs ».
      { value: "+600 000", label: "Emplois directs créés durant les 10 dernières années", icon: "users" },
      { value: "+800 000", label: "Emplois directs — objectif à l'horizon 2024", icon: "target" },
      { value: "+500 000", label: "Entreprises opérant dans le secteur", icon: "building-2" },
      { value: "11 %", label: "Part dans le PIB national", icon: "trending-up" },
    ],
    skills: [
      "Rigueur et organisation",
      "Qualité du service",
      "Maîtrise des langues étrangères",
      "Technicité et savoir-faire",
      "Compétences en IT et digital",
      "Sens de l'innovation",
      "Ponctualité",
    ],
  },
  {
    slug: "transport-logistique",
    name: "Transport & Logistique",
    short: "Transport & Logistique",
    emoji: "🚛",
    accent: "#254481",
    tagline: "Faire circuler l'économie",
    description:
      "Le pôle Transport & Logistique forme aux métiers de la chaîne logistique et de la conduite professionnelle, avec des pistes de conduite dédiées sur le campus.",
    plateforme: "Pistes de conduite",
    debouches: [
      "Technicien en logistique",
      "Responsable d'exploitation transport & logistique",
      "Agent magasinier",
      "Moniteur d'auto-école",
    ],
    sectorTitle: "Le secteur du Transport et de la Logistique au Maroc",
    sectorStats: [
      { value: "~10 %", label: "Part dans le PIB national", icon: "trending-up" },
      { value: "480 000", label: "Emplois directs", icon: "users" },
      { value: "241 M tonnes", label: "Trafic portuaire (2024)", icon: "building-2" },
      { value: "53ᵉ", label: "Rang mondial — Indice LPI 2024", icon: "target" },
      { value: "1 800 km", label: "Réseau autoroutier", icon: "gauge" },
    ],
    skills: [
      "Sens de l'organisation et de la planification",
      "Rigueur et respect des procédures de sécurité",
      "Capacité à gérer les flux et les délais",
      "Sens du service client et du relationnel",
      "Réactivité et capacité d'adaptation",
    ],
  },
];

// Catalogue officiel extrait de la Brochure_Poche_CMC_Beni_Mellal.pdf (page 2).
// FQ (Formation Qualifiante) et Q (Qualification) sont distincts dans le système OFPPT.
export const FILIERES: Filiere[] = [
  // ── Agriculture ─────────────────────────────────────────────────────────────
  { slug: "management-agricole", name: "Management Agricole", pole: "agriculture", niveau: "TS", places: null, duree: "2 ans", objectif: "Gérer et développer des entreprises et coopératives agricoles avec une approche commerciale (agrobusiness).", specialites: ["Gestion d'Entreprises et de Coopératives Agricoles", "Commercialisation des Produits Agricoles (Agrobusiness)"] },
  { slug: "techniques-agricoles", name: "Techniques Agricoles", pole: "agriculture", niveau: "TS", places: null, duree: "2 ans", objectif: "Maîtriser les techniques de production végétale, la gestion des sols et des systèmes d'irrigation, et l'agriculture biologique.", specialites: ["Production Végétale", "Gestion des Sols et Systèmes d'Irrigation", "Agriculture Biologique"] },
  { slug: "agriculture-precision", name: "Agriculture de Précision", pole: "agriculture", niveau: "TS", places: null, duree: "2 ans", objectif: "Utiliser les technologies de pointe (drones, capteurs, GPS) pour optimiser les pratiques agricoles." },
  { slug: "operateur-agricole", name: "Opérateur Agricole", pole: "agriculture", niveau: "Q", places: null, duree: "1 an", objectif: "Réaliser les opérations d'irrigation fertigation et de production biologique en milieu agricole.", specialites: ["Irrigation Fertigation", "Production Biologique"] },
  { slug: "pompage-solaire", name: "Pompage Solaire", pole: "agriculture", niveau: "FQ", places: null, duree: "1 an", objectif: "Installer et maintenir des systèmes de pompage alimentés par énergie solaire." },
  { slug: "embellissement-espaces-verts", name: "Embellissement et Entretien des Espaces Verts", pole: "agriculture", niveau: "FQ", places: null, duree: "1 an", objectif: "Aménager et entretenir les espaces verts, jardins et aménagements paysagers." },
  { slug: "production-agricole-t", name: "Production Agricole", pole: "agriculture", niveau: "T", places: null, duree: "2 ans", objectif: "Participer au déroulement et au fonctionnement quotidien de l'exploitation agricole : travaux culturaux, entretien des cultures et récoltes." },
  { slug: "production-agricole-fq", name: "Production Agricole", pole: "agriculture", niveau: "FQ", places: null, duree: "1 an", objectif: "Acquérir les compétences pratiques pour les opérations de production agricole : semis, plantation, irrigation, fertilisation et récolte." },
  { slug: "oleiculture-oleotechnie", name: "Oléiculture et Oléotechnie", pole: "agriculture", niveau: "TS", places: null, duree: "2 ans", objectif: "Maîtriser les techniques de production oléicole et de transformation des olives : de la conduite du verger à l'extraction et au conditionnement de l'huile d'olive." },
  { slug: "conseiller-agricole", name: "Conseiller Agricole", pole: "agriculture", niveau: "FQ", places: null, duree: "1 an", objectif: "Conseiller et accompagner les agriculteurs dans l'amélioration de leurs pratiques culturales, la gestion de leur exploitation et l'accès aux marchés." },

  // ── Agro-industrie ──────────────────────────────────────────────────────────
  { slug: "transformation-pam", name: "Transformation et Valorisation des Plantes Aromatiques et Médicinales", pole: "agro-industrie", niveau: "TS", places: null, duree: "2 ans", objectif: "Transformer, conditionner et valoriser les plantes aromatiques et médicinales." },
  { slug: "transformation-produits-terroir", name: "Transformation et Valorisation des Produits du Terroir", pole: "agro-industrie", niveau: "FQ", places: null, duree: "1 an", objectif: "Transformer et valoriser les produits du terroir dans le respect des normes qualité." },

  // ── Artisanat ───────────────────────────────────────────────────────────────
  // Métiers diplômants extraits d'Artisanat.pdf (page 2) ; "Tapis" provient de l'offre Béni Mellal.
  { slug: "haute-couture", name: "Haute Couture", pole: "artisanat", niveau: "TS", places: null, duree: "2 ans", objectif: "Confectionner des vêtements traditionnels et modernes à la coupe complexe en étoffes de haute qualité, et piloter la réalisation du modèle : coupe, choix des fournisseurs et finitions." },
  { slug: "bijouterie-joaillerie", name: "Bijouterie – Joaillerie", pole: "artisanat", niveau: "TS", places: null, duree: "2 ans", objectif: "Concevoir et fabriquer des bijoux en matériaux précieux : dessin (2D/3D), traçage, façonnage, sertissage, assemblage et finition, avec établissement de devis et contrôle qualité." },
  { slug: "menuiserie-art", name: "Menuiserie d'Art", pole: "artisanat", niveau: "T", places: null, duree: "2 ans", objectif: "Concevoir et fabriquer des ouvrages de menuiserie d'art en bois." },
  { slug: "tapisserie", name: "Tapisserie", pole: "artisanat", niveau: "T", places: null, duree: "2 ans", objectif: "Réaliser des travaux de tapisserie d'ameublement et de décoration." },
  { slug: "maroquinerie", name: "Maroquinerie", pole: "artisanat", niveau: "T", places: null, duree: "2 ans", objectif: "Concevoir et fabriquer des articles en cuir, et gérer l'ordre de fabrication — de l'achat de la matière première à la livraison du produit fini." },
  { slug: "tissage-traditionnel", name: "Tissage Traditionnel", pole: "artisanat", niveau: "Q", places: null, duree: "1 an", objectif: "Maîtriser les techniques de tissage traditionnel marocain." },
  { slug: "couture-traditionnelle", name: "Couture Traditionnelle", pole: "artisanat", niveau: "Q", places: null, duree: "1 an", objectif: "Maîtriser les techniques de couture traditionnelle marocaine." },
  { slug: "sculpture-sur-bois", name: "Sculpture sur Bois", pole: "artisanat", niveau: "Q", places: null, duree: "1 an", objectif: "Concevoir, tracer et sculpter à la main motifs et ornements décoratifs sur bois (meubles, panneaux), de la conception des gabarits à la finition." },
  { slug: "tapis", name: "Tapis", pole: "artisanat", niveau: "Q", places: null, duree: "1 an", objectif: "Concevoir et réaliser des tapis selon les savoir-faire traditionnels." },

  // ── Arts et Industries Graphiques ────────────────────────────────────────────
  // Métiers extraits d'Arts_Graphiques.pdf (page 2) — niveau Technicien Spécialisé.
  { slug: "infographie-prepresse", name: "Infographie Prépresse", pole: "art-industrie-graphique", niveau: "TS", places: null, duree: "2 ans", objectif: "Réaliser les produits de prépresse destinés à l'impression et à l'édition : création d'images 2D/3D (print, web, jeux vidéo) en PAO, maquette, mise en page et production des plaques d'impression." },
  { slug: "production-graphique", name: "Production Graphique", pole: "art-industrie-graphique", niveau: "TS", places: null, duree: "2 ans", objectif: "Conduire la production graphique imprimée : impression numérique (traitement des fichiers, contrôle du flux, qualité d'impression et rendu des couleurs) et contrôle qualité des supports d'impression et d'emballage.", specialites: ["Impression Digitale", "Supports d'Impression et d'Emballage"] },

  // ── BTP ─────────────────────────────────────────────────────────────────────
  // Métiers extraits de BTP.pdf (page 2).
  { slug: "genie-civil", name: "Génie Civil", pole: "btp", niveau: "TS", places: null, duree: "2 ans", objectif: "Concevoir et optimiser les projets de construction et d'ouvrages d'art : méthodes et procédés techniques, contrôle qualité en laboratoire et conduite des travaux publics.", specialites: ["Méthodes en BTP", "Laboratoire BTP", "Travaux Publics"] },
  { slug: "geometre-topographe", name: "Géomètre Topographe", pole: "btp", niveau: "TS", places: null, duree: "2 ans", objectif: "Déterminer, aménager et gérer la propriété foncière et immobilière (individuelle ou collective), réaliser les levés topographiques et estimer la valeur des biens." },
  { slug: "batiment", name: "Bâtiment", pole: "btp", niveau: "T", places: null, duree: "2 ans", objectif: "Élaborer les plans architecturaux et techniques d'un projet (projeteur) et évaluer les quantités et le prix de revient d'une construction (métreur).", specialites: ["Projeteur en Bâtiment", "Métreur"] },
  { slug: "menuiserie-aluminium-bois", name: "Menuiserie Aluminium et Bois", pole: "btp", niveau: "Q", places: null, duree: "1 an", objectif: "Réaliser des ouvrages de menuiserie en bois (intérieur et extérieur), poser la quincaillerie, et assembler et poser les cadres en aluminium sur les chantiers de construction." },
  { slug: "gestion-projets-btp", name: "Gestion de Projets BTP", pole: "btp", niveau: "FQ", places: null, duree: "1 an", objectif: "Optimiser et planifier le processus de réalisation des travaux BTP d'une entreprise afin d'améliorer sa compétitivité." },

  // ── Digital & IA ────────────────────────────────────────────────────────────
  // Métiers extraits de Digital_IA.pdf (page 2). « ...Open Source » provient de l'offre Béni Mellal.
  { slug: "developpement-digital", name: "Développement Digital", pole: "digital-ia", niveau: "TS", places: null, duree: "2 ans", objectif: "Développer des applications web full stack et des applications mobiles.", specialites: ["Web Full Stack", "Applications Mobiles"] },
  { slug: "digital-design", name: "Digital Design", pole: "digital-ia", niveau: "TS", places: null, duree: "2 ans", objectif: "Concevoir l'interface et l'expérience des produits digitaux : architecture de la navigation, parcours utilisateur, qualité des contenus et émotion (UI/UX).", specialites: ["UI Designer", "UX Designer"] },
  { slug: "infrastructure-digitale", name: "Infrastructure Digitale", pole: "digital-ia", niveau: "TS", places: null, duree: "2 ans", objectif: "Administrer et sécuriser les infrastructures IT : cybersécurité, cloud, systèmes et réseaux.", specialites: ["Cyber Sécurité", "Cloud Computing", "Systèmes et Réseaux"] },
  { slug: "cycle-decouverte-numerique", name: "Cycle de Découverte du Numérique", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "S'initier aux usages et aux métiers du numérique à travers un parcours de découverte." },
  { slug: "developpement-applications-python", name: "Développement d'Applications – Python", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "Développer des applications et services en Python (back-end, data, automatisation)." },
  { slug: "testeur-solutions-digitales", name: "Testeur de Solutions Digitales", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "Tester et valider la qualité et la fiabilité des applications et solutions numériques." },
  { slug: "community-manager", name: "Community Manager", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "Animer les réseaux sociaux et gérer la présence digitale d'une marque." },
  { slug: "web-marketer", name: "Web Marketer", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "Mettre en œuvre la stratégie marketing en ligne et le référencement (SEO/SEA)." },
  { slug: "installateur-fibre-optique", name: "Installateur Fibre Optique", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "Déployer la fibre optique de l'opérateur jusqu'au client : installation, pose, raccordement, fusionnement et tests." },
  { slug: "developpement-applications-web-mobiles", name: "Développement d'Applications Web et Mobiles (Open Source)", pole: "digital-ia", niveau: "FQ", places: null, duree: "1 an", objectif: "Concevoir et développer des applications web et mobiles avec les technologies open source." },

  // ── Gestion & Commerce ──────────────────────────────────────────────────────
  // Métiers extraits de Gestion_Commerce.pdf (page 2).
  { slug: "gestion-entreprises", name: "Gestion des Entreprises", pole: "gestion-commerce", niveau: "TS", places: null, duree: "2 ans", objectif: "Gérer les fonctions clés de l'entreprise : office management, commerce et marketing, comptabilité et finance, ressources humaines.", specialites: ["Office Manager", "Commerce et Marketing", "Comptabilité et Finance", "Ressources Humaines"] },
  { slug: "assistant-administratif", name: "Assistant Administratif", pole: "gestion-commerce", niveau: "T", places: null, duree: "2 ans", objectif: "Assister la gestion administrative dans les domaines de la comptabilité, du commerce et de la gestion.", specialites: ["Comptabilité", "Commerce", "Gestion"] },
  { slug: "charge-clientele-back-office", name: "Chargé de Clientèle en Back Office", pole: "gestion-commerce", niveau: "FQ", places: null, duree: "1 an", objectif: "Assurer le suivi et la gestion administrative du service commercial : opérations avant, pendant et après-vente, offres, argumentaires et relation client." },
  { slug: "e-commerce", name: "E-Commerce", pole: "gestion-commerce", niveau: "FQ", places: null, duree: "1 an", objectif: "Développer les ventes en ligne d'une enseigne : site e-commerce, réseaux sociaux et marketplaces, à la croisée du web, du marketing et de la vente." },
  { slug: "gestion-petits-commerces", name: "Gestion des \"Petits\" Commerces", pole: "gestion-commerce", niveau: "FQ", places: null, duree: "1 an", objectif: "Gérer un point de vente : conseil client, assortiment, renouvellement et commandes de marchandises, et suivi des stocks." },
  { slug: "commerce", name: "Commerce", pole: "gestion-commerce", niveau: "TS", places: null, duree: "2 ans", objectif: "Développer les ventes, fidéliser la clientèle et gérer les opérations commerciales au sein d'une entreprise ou d'un point de vente." },
  { slug: "finance-comptabilite", name: "Finance et Comptabilité", pole: "gestion-commerce", niveau: "TS", places: null, duree: "2 ans", objectif: "Tenir la comptabilité, établir les états de synthèse, gérer la paie et les déclarations fiscales et sociales, et participer au contrôle de gestion." },


  // ── Industrie ───────────────────────────────────────────────────────────────
  { slug: "diagnostic-electronique-embarquee", name: "Diagnostic et Electronique Embarquée Automobile", pole: "industrie", niveau: "TS", places: null, duree: "2 ans", objectif: "Diagnostiquer et réparer les systèmes électroniques embarqués des véhicules." },
  { slug: "electromecanique-engins-motorises", name: "Electromécanique des Engins Motorisés", pole: "industrie", niveau: "T", places: null, duree: "2 ans", objectif: "Entretenir et réparer les engins motorisés dans les domaines automobile et machinisme agricole.", specialites: ["Automobile", "Machinisme Agricole"] },
  { slug: "mecanicien-service-rapide", name: "Mécanicien Service Rapide Automobile", pole: "industrie", niveau: "FQ", places: null, duree: "1 an", objectif: "Réaliser les opérations d'entretien rapide de l'automobile." },
  { slug: "maintenance-vehicules-hybrides", name: "Maintenance des Véhicules Hybrides/Electriques", pole: "industrie", niveau: "FQ", places: null, duree: "1 an", objectif: "Entretenir et réparer les véhicules hybrides et électriques." },
  { slug: "qhse", name: "Qualité-Hygiène-Sécurité-Environnement", pole: "industrie", niveau: "TS", places: null, duree: "2 ans", objectif: "Mettre en œuvre et piloter les systèmes de management QHSE en entreprise." },

  // ── Tourisme, Hôtellerie & Restauration ─────────────────────────────────────
  // Métiers extraits de THR.pdf (page 2).
  { slug: "management-touristique", name: "Management Touristique", pole: "tourisme-hotellerie", niveau: "TS", places: null, duree: "2 ans", objectif: "Concevoir et organiser des événements (réceptions, séminaires, congrès, festivals) et piloter la gestion durable d'une destination touristique.", specialites: ["Organisateur d'Événements", "Management des Destinations Durables"] },
  { slug: "management-hotelier", name: "Management Hôtelier", pole: "tourisme-hotellerie", niveau: "TS", places: null, duree: "2 ans", objectif: "Encadrer les services d'hébergement et de réception, le service de majordome et la gestion d'instituts de bien-être et de beauté.", specialites: ["Hébergement et Réception", "Majordome", "Responsable d'Instituts de Bien-être et de Beauté"] },
  { slug: "arts-culinaires", name: "Arts Culinaires", pole: "tourisme-hotellerie", niveau: "T", places: null, duree: "2 ans", objectif: "Préparer et dresser des plats selon les standards de la cuisine marocaine et gastronomique, et de la pâtisserie-chocolaterie.", specialites: ["Cuisine Marocaine", "Cuisine Gastronomique", "Pâtisserie-Chocolaterie"] },
  { slug: "services-restaurant", name: "Services de Restaurant \"Arts de Table\"", pole: "tourisme-hotellerie", niveau: "T", places: null, duree: "2 ans", objectif: "Assurer le bon fonctionnement du service en salle et l'art de la table, sous la responsabilité du maître d'hôtel." },
  { slug: "yield-manager", name: "Yield Manager", pole: "tourisme-hotellerie", niveau: "FQ", places: null, duree: "1 an", objectif: "Élaborer des stratégies tarifaires variables (yield management) pour optimiser le revenu : hôtellerie, restauration, location de voitures, thalassothérapie, golf, etc." },
  { slug: "patisserie", name: "Pâtisserie", pole: "tourisme-hotellerie", niveau: "FQ", places: null, duree: "1 an", objectif: "Maîtriser les techniques de pâtisserie et de chocolaterie : préparation, cuisson, décoration et présentation des produits de pâtisserie." },

  // ── Transport & Logistique ──────────────────────────────────────────────────
  { slug: "exploitation-transport-logistique", name: "Exploitation Transport & Logistique", pole: "transport-logistique", niveau: "TS", places: null, duree: "2 ans", objectif: "Gérer les opérations de transport et de logistique en entreprise.", specialites: ["Logistique", "Transport"] },
  { slug: "moniteur-auto-ecole", name: "Moniteur Auto-Ecole", pole: "transport-logistique", niveau: "T", places: null, duree: "1 an", objectif: "Enseigner la conduite et la sécurité routière." },
  { slug: "logistique", name: "Logistique", pole: "transport-logistique", niveau: "T", places: null, duree: "2 ans", objectif: "Gérer les flux de marchandises et les opérations logistiques." },
  { slug: "agent-controle-technique", name: "Agent Visiteur du Contrôle Technique Automobile", pole: "transport-logistique", niveau: "FQ", places: null, duree: "1 an", objectif: "Réaliser les visites techniques réglementaires des véhicules." },
  { slug: "agent-magasinier", name: "Agent Magasinier", pole: "transport-logistique", niveau: "FQ", places: null, duree: "1 an", objectif: "Réceptionner, stocker et préparer les marchandises en entrepôt." },
  { slug: "operateur-logistique", name: "Opérateur Logistique", pole: "transport-logistique", niveau: "FQ", places: null, duree: "1 an", objectif: "Exécuter les opérations de manutention, de stockage et de préparation de commandes." },
  { slug: "conducteur-routier-marchandises", name: "Conducteur Routier de Marchandises", pole: "transport-logistique", niveau: "FQ", places: null, duree: "1 an", objectif: "Conduire et exploiter un véhicule de transport de marchandises en toute sécurité." },
  { slug: "conducteur-routier-voyageurs", name: "Conducteur Routier de Voyageurs", pole: "transport-logistique", niveau: "FQ", places: null, duree: "1 an", objectif: "Assurer le transport de voyageurs dans le respect de la sécurité." },
];

// Official pôle logos (square, transparent PNGs in /public/logo).
export const POLE_LOGOS: Record<string, string> = {
  "agriculture": "/logo/agro-logo.png",
  "agro-industrie": "/logo/agro_industry-logo.png",
  "artisanat": "/logo/artisana-logo.png",
  "art-industrie-graphique": "/logo/Aig-logo.png",
  "btp": "/logo/Btp-logo.png",
  "digital-ia": "/logo/Dia-logo.png",
  "gestion-commerce": "/logo/GC-logo.png",
  "industrie": "/logo/Industri-logo.png",
  "tourisme-hotellerie": "/logo/Thr-logo.png",
  "transport-logistique": "/logo/logistique-logo.png",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
export function getPole(slug: string): Pole | undefined {
  return POLES.find((p) => p.slug === slug);
}

export function poleLogo(slug: string): string | undefined {
  return POLE_LOGOS[slug];
}

export function filieresOfPole(poleSlug: string): Filiere[] {
  return FILIERES.filter((f) => f.pole === poleSlug);
}

export function getFiliere(slug: string): Filiere | undefined {
  return FILIERES.find((f) => f.slug === slug);
}

export const TOTAL_PLACES_2627 = FILIERES.reduce((sum, f) => sum + (f.places ?? 0), 0);

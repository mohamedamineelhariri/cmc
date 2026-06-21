// Actualités CMC Béni Mellal-Khénifra — événements réels publiés par le compte
// officiel @cmc_officiel_ (Instagram). Images = visuels d'origine (public/news).
// Triées du plus récent au plus ancien.

export interface NewsItem {
  slug: string;
  date: string; // ISO yyyy-mm-dd (sort key)
  dateLabel: string; // affichage FR
  category: string;
  title: string;
  excerpt: string;
  content?: string; // full article (falls back to excerpt)
  images?: string[]; // gallery from Instagram
  image: string; // /news/<slug>.jpg
  url?: string; // post Instagram source
}

export const NEWS: NewsItem[] = [
  {
    slug: "gaming-expo-2026",
    date: "2026-05-20",
    dateLabel: "20 mai 2026",
    category: "Événement",
    title: "Morocco Gaming Expo 2026",
    excerpt:
      "La CMC participe à la 3ᵉ édition du Morocco Gaming Expo, du 20 au 24 mai au Sofitel Jardin des Roses de Rabat — gaming, e-sport et métiers du digital.",
    image: "/news/gaming-expo-2026.jpg",
    url: "https://www.instagram.com/p/DYhD1SZlvIg/",
  },
  {
    slug: "siam-2026",
    date: "2026-04-20",
    dateLabel: "20 avril 2026",
    category: "Événement",
    title: "SIAM 2026 — Salon International de l'Agriculture",
    excerpt:
      "Les CMC au 18ᵉ Salon International de l'Agriculture au Maroc à Meknès (stand A48), autour des métiers de l'agriculture et de l'agro-industrie.",
    image: "/news/siam-2026.jpg",
    url: "https://www.instagram.com/p/DXY79KIilFc/",
  },
  {
    slug: "forum-international-etudiant",
    date: "2026-04-03",
    dateLabel: "3 avril 2026",
    category: "Orientation",
    title: "Forum International de l'Étudiant",
    excerpt:
      "Retour en images sur la participation de la CMC au Forum International de l'Étudiant, les 3 et 4 avril à Béni Mellal.",
    image: "/news/forum-international-etudiant.jpg",
    url: "https://www.instagram.com/p/DW9HzCNihKW/",
  },
  {
    slug: "mediatheque-litterature",
    date: "2026-03-26",
    dateLabel: "26 mars 2026",
    category: "Vie de campus",
    title: "Rencontre littéraire à la médiathèque",
    excerpt:
      "Une séance de discussion littéraire pour encourager la lecture, l'analyse critique et l'ouverture culturelle des stagiaires.",
    image: "/news/mediatheque-litterature.jpg",
    url: "https://www.instagram.com/p/DWrO9zijYcT/",
  },
  {
    slug: "visite-chantier-btp",
    date: "2026-02-17",
    dateLabel: "17 février 2026",
    category: "Pôle BTP",
    title: "Visite pédagogique au Centre Hospitalier de Béni Mellal",
    excerpt:
      "Les groupes BOP et GCOTP sur le chantier du CHR de Béni Mellal : organisation, HSE, coordination et systèmes constructifs.",
    image: "/news/visite-chantier-btp.jpg",
    url: "https://www.instagram.com/p/DVJK07Njxm2/",
  },
  {
    slug: "forum-jeunes-2026",
    date: "2026-02-13",
    dateLabel: "13 février 2026",
    category: "Orientation",
    title: "Forum d'information et d'orientation des jeunes",
    excerpt:
      "Près de 3 000 visiteurs à la Salle Omnisports de Béni Mellal : filières, conditions d'accès et débouchés présentés par nos conseillers.",
    image: "/news/forum-jeunes-2026.jpg",
    url: "https://www.instagram.com/p/DVGs4_il5Cd/",
  },
  {
    slug: "hackathon-ramadan-ia",
    date: "2026-02-10",
    dateLabel: "10 février 2026",
    category: "Événement",
    title: "Hackathon « Ramadan IA »",
    excerpt:
      "La CMC au hackathon national « Ramadan IA » du Ministère de la Transition Numérique, pour promouvoir l'IA au service de l'intérêt général.",
    image: "/news/hackathon-ramadan-ia.jpg",
    url: "https://www.instagram.com/p/DWB7ou9jmzg/",
  },
  {
    slug: "fablab-textile",
    date: "2026-01-21",
    dateLabel: "21 janvier 2026",
    category: "Fab Lab",
    title: "Atelier DIY — impression sur textile",
    excerpt:
      "Au Fab Lab, les stagiaires du pôle Arts et Industries Graphiques explorent l'impression 3D sur textile (TPU, Tinkercad, Inkscape).",
    image: "/news/fablab-textile.jpg",
    url: "https://www.instagram.com/p/DUYdRuwDHA0/",
  },
  {
    slug: "dapp-cloture",
    date: "2026-01-20",
    dateLabel: "20 janvier 2026",
    category: "Entrepreneuriat",
    title: "Clôture du programme DAPP — 300 000 DH",
    excerpt:
      "Six projets lauréats primés de 50 000 DH chacun, avec l'ANAPEC, l'AQJ et la Fondation Swisscontact.",
    image: "/news/dapp-cloture.jpg",
    url: "https://www.instagram.com/p/DTu7-c6kevm/",
  },
  {
    slug: "prototyping-sdgs",
    date: "2025-12-11",
    dateLabel: "11 décembre 2025",
    category: "Innovation",
    title: "Workshop « Prototyping for SDGs »",
    excerpt:
      "Le club Youth5.0 initie les stagiaires aux Objectifs de Développement Durable à travers le prototypage de cubes ODD.",
    image: "/news/prototyping-sdgs.jpg",
    url: "https://www.instagram.com/p/DSIQyK8jNxx/",
  },
  {
    slug: "peer-learning-aig",
    date: "2025-11-27",
    dateLabel: "27 novembre 2025",
    category: "Pédagogie",
    title: "Peer Learning animé par le pôle AIG",
    excerpt:
      "Un atelier de design visuel et de présentation professionnelle réunissant des stagiaires de plusieurs pôles.",
    image: "/news/peer-learning-aig.jpg",
    url: "https://www.instagram.com/p/DRjkcpqCE6M/",
  },
  {
    slug: "bootcamp-nova-um6p",
    date: "2025-09-29",
    dateLabel: "29 septembre 2025",
    category: "Entrepreneuriat",
    title: "Bootcamp Nova Digital Hubs × UM6P",
    excerpt:
      "Formation entrepreneuriale gratuite avec l'UM6P et TechnoServe autour de la plateforme Nova Digital Hubs.",
    image: "/news/bootcamp-nova-um6p.jpg",
    url: "https://www.instagram.com/p/DPLr-mPgEP5/",
  },
  {
    slug: "visite-shbm-um6p",
    date: "2025-09-26",
    dateLabel: "26 septembre 2025",
    category: "Partenariat",
    title: "Visite de l'École Hôtelière SHBM (UM6P) & Swisscontact",
    excerpt:
      "Échanges autour des méthodes pédagogiques, avec un focus sur le pôle Tourisme, Hôtellerie et Restauration.",
    image: "/news/visite-shbm-um6p.jpg",
    url: "https://www.instagram.com/p/DPEdyXsjDzq/",
  },
  {
    slug: "career-week",
    date: "2025-09-11",
    dateLabel: "11 septembre 2025",
    category: "Orientation",
    title: "Career Week — « Career Compass »",
    excerpt:
      "Salariat, entrepreneuriat ou poursuite d'études : l'ANAPEC, le CRI et le service d'orientation éclairent les choix de carrière.",
    image: "/news/career-week.jpg",
    url: "https://www.instagram.com/p/DPBXVHVAJ96/",
  },
  {
    slug: "ore-cloture-2025",
    date: "2025-06-12",
    dateLabel: "12 juin 2025",
    category: "Entrepreneuriat",
    title: "Clôture des Odyssées Régionales de l'Entrepreneuriat",
    excerpt:
      "468 projets accompagnés et plus de 1 000 porteurs mobilisés, en partenariat avec le CRI et l'Université Sultan Moulay Slimane.",
    image: "/news/ore-cloture-2025.jpg",
    url: "https://www.instagram.com/p/DLUd9hJIf1R/",
  },
  {
    slug: "fourche-fourchette",
    date: "2025-05-23",
    dateLabel: "23 mai 2025",
    category: "Pédagogie",
    title: "Journée « De la Fourche à la Fourchette »",
    excerpt:
      "Une collaboration Agriculture × Arts culinaires autour des produits locaux et de la valorisation gastronomique.",
    image: "/news/fourche-fourchette.jpg",
    url: "https://www.instagram.com/p/DLC-AV4v-mT/",
  },
  {
    slug: "impact-day",
    date: "2025-05-15",
    dateLabel: "15 mai 2025",
    category: "Événement",
    title: "Impact Day — 1ʳᵉ édition",
    excerpt:
      "« Les clés du succès pour votre projet professionnel » : ateliers de coaching, témoignages et performances artistiques.",
    image: "/news/impact-day.jpg",
    url: "https://www.instagram.com/p/DKcZf-gNa2Q/",
  },
  {
    slug: "business-plan-aqj",
    date: "2025-04-16",
    dateLabel: "16 avril 2025",
    category: "Entrepreneuriat",
    title: "Formation Business Plan avec l'AQJ",
    excerpt:
      "Structurer ses idées en projets viables et préparer la présentation aux investisseurs de la région.",
    image: "/news/business-plan-aqj.jpg",
    url: "https://www.instagram.com/p/DIg9psvPQNj/",
  },
  {
    slug: "atelier-infographie",
    date: "2025-03-17",
    dateLabel: "17 mars 2025",
    category: "Pédagogie",
    title: "Atelier inter-pôles d'infographie",
    excerpt:
      "Les pôles AIG, Gestion & Commerce et DIA explorent ensemble de nouvelles techniques artistiques.",
    image: "/news/atelier-infographie.jpg",
    url: "https://www.instagram.com/p/DHTZPgoK1Gg/",
  },
  {
    slug: "fablab-modelisation-3d",
    date: "2025-03-17",
    dateLabel: "17 mars 2025",
    category: "Fab Lab",
    title: "Workshop modélisation 3D & prototypage",
    excerpt:
      "Des outils de modélisation numérique au service du BTP, de l'artisanat, de l'infographie et de l'industrie.",
    image: "/news/fablab-modelisation-3d.jpg",
    url: "https://www.instagram.com/p/DHTZNeLNNq0/",
  },
  {
    slug: "visite-cfff-football",
    date: "2025-03-11",
    dateLabel: "11 mars 2025",
    category: "Partenariat",
    title: "Visite du Centre Fédéral de Formation du Football",
    excerpt:
      "Découverte des pôles et structures, et perspectives de partenariat avec le CFFF de la FRMF.",
    image: "/news/visite-cfff-football.jpg",
    url: "https://www.instagram.com/p/DHERC8WBda1/",
  },
  {
    slug: "concours-couvertures",
    date: "2025-03-11",
    dateLabel: "11 mars 2025",
    category: "Vie de campus",
    title: "Concours « Revisitez la couverture de nos manuels »",
    excerpt:
      "La médiathèque récompense la créativité : 1ᵉʳ prix à Anas Mouhcine, stagiaire du pôle Arts et Industries Graphiques.",
    image: "/news/concours-couvertures.jpg",
    url: "https://www.instagram.com/p/DHD8dWEogH_/",
  },
  {
    slug: "microsoft-tech-day",
    date: "2025-02-14",
    dateLabel: "14 février 2025",
    category: "Événement",
    title: "Microsoft Tech Day",
    excerpt:
      "Le club YUTH5.0 organise une journée Azure, IA, GitHub Copilot et Microsoft Fabric animée par des experts Microsoft.",
    image: "/news/microsoft-tech-day.jpg",
    url: "https://www.instagram.com/p/DGgHE-bP_Lp/",
  },
  {
    slug: "forum-regional-etudiant",
    date: "2025-02-19",
    dateLabel: "19 février 2025",
    category: "Orientation",
    title: "Forum Régional de l'Étudiant",
    excerpt:
      "Participation de la CMC aux Forums Régionaux de l'Étudiant de Béni Mellal et Tanger.",
    image: "/news/forum-regional-etudiant.jpg",
    url: "https://www.instagram.com/p/DGQeEL0KwNH/",
  },
  {
    slug: "ore-bootcamp-2024",
    date: "2024-12-19",
    dateLabel: "19 décembre 2024",
    category: "Entrepreneuriat",
    title: "Bootcamp ORE 2024",
    excerpt:
      "26 équipes finalistes et 46 porteurs sélectionnés parmi 1 000 candidats pour trois jours intensifs d'entrepreneuriat.",
    image: "/news/ore-bootcamp-2024.jpg",
    url: "https://www.instagram.com/p/DDxBD-ZpiUn/",
  },
  {
    slug: "abc-3d-prototyping",
    date: "2024-11-20",
    dateLabel: "20 novembre 2024",
    category: "Innovation",
    title: "Atelier « ABC 3D Prototyping »",
    excerpt:
      "Initiation au prototypage et impression 3D en direct, avec le Fab Lab et ASSAM Jewelry.",
    image: "/news/abc-3d-prototyping.jpg",
    url: "https://www.instagram.com/p/DDJ2uzMtU6c/",
  },
  {
    slug: "conference-artisanat",
    date: "2024-10-31",
    dateLabel: "31 octobre 2024",
    category: "Pôle Artisanat",
    title: "Conférence « L'Entrepreneuriat au cœur de l'Artisanat »",
    excerpt:
      "Témoignages de réussite et écosystème entrepreneurial pour les stagiaires du pôle Artisanat.",
    image: "/news/conference-artisanat.jpg",
    url: "https://www.instagram.com/p/DCY89lEqKo2/",
  },
  {
    slug: "formation-olivier",
    date: "2024-10-16",
    dateLabel: "16 octobre 2024",
    category: "Pôle Agriculture",
    title: "Fertilisation de l'olivier — Al Moutmir (OCP/UM6P)",
    excerpt:
      "Avec ZINE CÉRÉALES et le programme Al Moutmir, une journée sur la fertilisation raisonnée pour le pôle Agriculture.",
    image: "/news/formation-olivier.jpg",
    url: "https://www.instagram.com/p/DByo088PHNa/",
  },
  {
    slug: "cooperatives-feminines",
    date: "2024-10-17",
    dateLabel: "17 octobre 2024",
    category: "Partenariat",
    title: "Accueil de 39 coopératives féminines",
    excerpt:
      "Des présidentes de coopératives (artisanat, agriculture, tourisme) en visite, autour de la formation continue.",
    image: "/news/cooperatives-feminines.jpg",
    url: "https://www.instagram.com/p/DBqe7d0Ki4j/",
  },
  {
    slug: "drones-agriculture",
    date: "2024-10-10",
    dateLabel: "10 octobre 2024",
    category: "Pôle Agriculture",
    title: "Pilotage de drones avec AGRI-EDGE",
    excerpt:
      "Les stagiaires du pôle Agriculture s'initient au pilotage de drones pour une agriculture de précision.",
    image: "/news/drones-agriculture.jpg",
    url: "https://www.instagram.com/p/DBjEuaospzY/",
  },
  {
    slug: "bank-al-maghrib",
    date: "2024-10-16",
    dateLabel: "16 octobre 2024",
    category: "Pôle Gestion & Commerce",
    title: "Formation avec Bank Al-Maghrib",
    excerpt:
      "Entrepreneuriat, moyens de paiement et études de cas réels pour les stagiaires du pôle Gestion & Commerce.",
    image: "/news/bank-al-maghrib.jpg",
    url: "https://www.instagram.com/p/DBgNjfKqse-/",
  },
  {
    slug: "journees-accueil-2024",
    date: "2024-07-03",
    dateLabel: "3 juillet 2024",
    category: "Rentrée",
    title: "Journées d'accueil des nouveaux stagiaires",
    excerpt:
      "Découverte des espaces, des structures et des pôles-métiers pour la première rentrée 2024-2025.",
    image: "/news/journees-accueil-2024.jpg",
    url: "https://www.instagram.com/p/C9uoAB5tBr-/",
  },
];

export const NEWS_CATEGORIES = Array.from(new Set(NEWS.map((n) => n.category)));

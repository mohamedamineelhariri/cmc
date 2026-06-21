import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const FOOTER_LINKS: Record<string, { href: string; label: string; external?: boolean }[]> = {
  Institution: [
    { href: "/about", label: "À propos de la CMC" },
    { href: "/campus", label: "Le campus" },
    { href: "/vie-etudiante", label: "Vie étudiante" },
    { href: "/partenariats", label: "Partenariats" },
  ],
  Formations: [
    { href: "/programs", label: "Nos formations" },
    { href: "/admissions", label: "Admission & inscription" },
    { href: "/news", label: "Actualités" },
    { href: "/chat", label: "Assistant E-CMC" },
  ],
  Ressources: [
    { href: "/contact", label: "Contact" },
    { href: "https://myway.ac.ma", label: "MyWay (OFPPT)", external: true },
    { href: "https://cmc.ac.ma", label: "Site national CMC", external: true },
    { href: "https://www.ofppt.ma", label: "OFPPT", external: true },
  ],
};

const SOCIALS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "YouTube", href: "#", icon: "youtube" },
];

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case "instagram":
      return <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.6 4 4 5.6 4 7.6V16.4C4 18.4 5.6 20 7.6 20H16.4C18.4 20 20 18.4 20 16.4V7.6C20 5.6 18.4 4 16.4 4H7.6ZM17.25 7.5C16.84 7.5 16.5 7.17 16.5 6.75C16.5 6.34 16.84 6 17.25 6C17.66 6 18 6.34 18 6.75C18 7.17 17.66 7.5 17.25 7.5ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"/>;
    case "facebook":
      return <path d="M18 2H15C13.67 2 12.4 2.53 11.46 3.46C10.53 4.4 10 5.67 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73 14.1 6.47 14.29 6.29C14.47 6.1 14.73 6 15 6H18V2Z"/>;
    case "linkedin":
      return <path d="M19 3C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19ZM8.5 10.5H6.5V17.5H8.5V10.5ZM7.5 9C8.33 9 9 8.33 9 7.5C9 6.67 8.33 6 7.5 6C6.67 6 6 6.67 6 7.5C6 8.33 6.67 9 7.5 9ZM17.5 13.5C17.5 11.84 16.16 10.5 14.5 10.5C13.77 10.5 13.08 10.77 12.5 11.21V10.5H10.5V17.5H12.5V14.5C12.5 13.67 13.17 13 14 13C14.83 13 15.5 13.67 15.5 14.5V17.5H17.5V13.5Z"/>;
    case "youtube":
      return <path d="M19.6 4.1C20.4 4.3 21 5 21.2 5.8C21.6 7.2 21.6 10 21.6 10C21.6 10 21.6 12.8 21.2 14.2C21 15 20.4 15.7 19.6 15.9C18.2 16.3 12 16.3 12 16.3C12 16.3 5.8 16.3 4.4 15.9C3.6 15.7 3 15 2.8 14.2C2.4 12.8 2.4 10 2.4 10C2.4 10 2.4 7.2 2.8 5.8C3 5 3.6 4.3 4.4 4.1C5.8 3.7 12 3.7 12 3.7C12 3.7 18.2 3.7 19.6 4.1ZM10 12.7L14.7 10L10 7.3V12.7Z"/>;
    default:
      return <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"/>;

  }
}

export default function Footer() {
  return (
    <footer className="bg-[#32acc1] text-white relative overflow-hidden">
      {/* subtle pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="px-6 lg:px-16 xl:px-24 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-10">
          {/* Brand + contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-none bg-white flex items-center justify-center p-1.5 shrink-0">
                <img src="/logo/logo.png" alt="CMC Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm block leading-tight">CMC Béni Mellal-Khénifra</span>
                <span className="text-[9px] font-mono text-white/60 uppercase tracking-[0.2em]">OFPPT</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-6 max-w-sm">
              Cité des Métiers et des Compétences de la région Béni Mellal-Khénifra — la formation professionnelle de nouvelle génération.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-none border border-white/25 flex items-center justify-center text-white/80 hover:bg-white hover:text-[#32acc1] hover:border-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <SocialIcon name={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/60 mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm text-white/75 hover:text-white transition-colors"
                      >
                        {link.label} <ArrowUpRight className="h-3 w-3 text-white/50 group-hover:text-white transition-colors" />
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-white/75 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="px-6 lg:px-16 xl:px-24 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/60 font-mono">
            &copy; {new Date().getFullYear()} CMC Béni Mellal-Khénifra — OFPPT. Tous droits réservés.
          </p>
          <p className="text-xs text-white/50 font-mono">
            Propulsé par le Digital &amp; IA Hub
          </p>
        </div>
      </div>
    </footer>
  );
}

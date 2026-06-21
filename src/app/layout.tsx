import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMC Béni Mellal-Khénifra — Cité des Métiers et des Compétences | OFPPT",
  description: "Cité des Métiers et des Compétences de la région Béni Mellal-Khénifra — Formation professionnelle de nouvelle génération. Découvrez nos formations, admissions, et actualités.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-warm)] font-sans">
        {children}
      </body>
    </html>
  );
}

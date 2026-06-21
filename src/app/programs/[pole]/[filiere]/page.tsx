import { FILIERES } from "@/data/poles";
import FiliereClient from "./FiliereClient";

export function generateStaticParams() {
  return FILIERES.map((f) => ({ pole: f.pole, filiere: f.slug }));
}

export default async function Page({ params }: { params: Promise<{ pole: string; filiere: string }> }) {
  const { filiere } = await params;
  return <FiliereClient slug={filiere} />;
}

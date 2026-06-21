import { POLES } from "@/data/poles";
import PoleClient from "./PoleClient";

export function generateStaticParams() {
  return POLES.map((p) => ({ pole: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ pole: string }> }) {
  const { pole } = await params;
  return <PoleClient slug={pole} />;
}

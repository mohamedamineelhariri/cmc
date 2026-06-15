"use client";

import CampusMapView from "@/components/CampusMapView";

export default function CampusPage() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[var(--bg-warm)]">
      <CampusMapView standalone />
    </div>
  );
}

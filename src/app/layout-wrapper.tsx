"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
        {children}
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}

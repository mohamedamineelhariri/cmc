"use client";

import React, { useState } from "react";
import Link from "next/link";
import LayoutWrapper from "@/app/layout-wrapper";
import { ArrowLeft, ArrowUpRight, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsItem } from "@/data/news";
import { INSTA_CONTENT } from "@/data/instagram_content";

export default function NewsDetail({ item }: { item: NewsItem }) {
  const insta = INSTA_CONTENT[item.slug];
  const body = insta?.content ?? item.content ?? item.excerpt;
  const images = insta?.images ?? (item.image ? [item.image] : []);
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <LayoutWrapper>
      <section className="mx-auto px-6 lg:px-10 py-16 md:py-24" style={{ maxWidth: "var(--max-width)" }}>
        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cmc-teal)] hover:gap-2.5 transition-all mb-8">
          <ArrowLeft className="h-4 w-4" /> Retour aux actualités
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[1024/1277] overflow-hidden border border-[var(--border-warm)] shadow-lg bg-[var(--panel-warm)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[imgIdx]} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/90 text-[var(--cmc-teal)] backdrop-blur-sm">
                {item.category}
              </span>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[var(--text-secondary)] transition shadow"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setImgIdx((imgIdx + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[var(--text-secondary)] transition shadow"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none]">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`shrink-0 w-16 h-16 border-2 overflow-hidden transition ${i === imgIdx ? "border-[var(--cmc-teal)] opacity-100" : "border-transparent opacity-60 hover:opacity-80"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {item.dateLabel}</span>
              <span className="inline-flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> {item.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight leading-[1.02] text-[var(--text-primary)] mb-6">
              {item.title}
            </h1>

            <div className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {body}
            </div>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-[var(--cmc-teal)] hover:bg-[var(--cmc-teal-dark)] text-white px-6 py-3 rounded-none text-sm font-semibold transition active:scale-95"
              >
                Voir le post original <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
}

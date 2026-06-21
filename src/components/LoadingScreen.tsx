"use client";

import { useEffect, useState } from "react";

const LOGOS = [
  { src: "/logo/c.png", alt: "C" },
  { src: "/logo/m.png", alt: "M" },
  { src: "/logo/c (2).png", alt: "C" },
  { src: "/logo/cmc.png", alt: "CMC" },
];

export default function LoadingScreen() {
  const [state, setState] = useState<"init" | "show" | "split" | "roll" | "hide" | "gone">("init");
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setState("show"), 100);
    const t2 = setTimeout(() => setState("split"), 1200);
    const t3 = setTimeout(() => {
      setState("roll");
      setActiveIdx(0);
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % 4;
        setActiveIdx(i);
      }, 800);
      const t4 = setTimeout(() => {
        clearInterval(interval);
        setState("hide");
      }, 4000);
      const t5 = setTimeout(() => setState("gone"), 4700);
      return () => { clearInterval(interval); clearTimeout(t4); clearTimeout(t5); };
    }, 2300);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (state === "gone") return null;

  const visible = state !== "init";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700"
      style={{
        backdropFilter: state === "hide" ? "blur(0px)" : visible ? "blur(10px)" : "blur(0px)",
        WebkitBackdropFilter: state === "hide" ? "blur(0px)" : visible ? "blur(10px)" : "blur(0px)",
        backgroundColor: state === "hide"
          ? "rgba(255,255,255,0)"
          : "rgba(255,255,255,0.92)",
        opacity: state === "init" ? 0 : state === "hide" ? 0 : 1,
        pointerEvents: visible ? "auto" : "none",
        transitionDuration: state === "hide" ? "800ms" : "500ms",
      }}
    >
      <div className="relative flex items-center justify-center gap-6" style={{ width: 320, height: 140 }}>
        {LOGOS.map((logo, i) => {
          const isUp = i < 2;
          const yOffset = isUp ? -36 : 36;
          let transform = "scale(0)";
          if (state === "show") transform = "scale(1)";
          if (state === "split") transform = `translateY(${yOffset}px) scale(1)`;
          if (state === "roll" || state === "hide") transform = `translateY(${yOffset}px) scale(${activeIdx === i ? 1.2 : 0.85})`;
          return (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="w-14 h-14 object-contain absolute transition-all duration-500 ease-out"
              style={{
                left: `${48 + i * 72}px`,
                opacity: state === "roll" && activeIdx !== i ? 0.2 : 1,
                transform,
                filter: activeIdx === i && state === "roll" ? "drop-shadow(0 0 12px #32acc1)" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

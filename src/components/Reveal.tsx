"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Reveal — scroll-triggered entrance animation primitive.
 *
 * Dependency-free (no framer-motion): uses IntersectionObserver to fade/slide
 * children in as they enter the viewport, giving the homepage a high-end
 * "scroll story" feel. Renders as a plain element (default <div>) with inline
 * transition styles, so it can replace an existing wrapper without extra DOM
 * nesting. Pass `as={Link}`/`as="li"` etc. and any extra props are forwarded.
 *
 * Respects `prefers-reduced-motion`: when set, content shows instantly.
 */

type Variant = "up" | "fade" | "scale" | "left" | "right";

const OFFSETS: Record<Variant, string> = {
  up: "translateY(30px)",
  fade: "none",
  scale: "scale(0.94)",
  left: "translateX(-36px)",
  right: "translateX(36px)",
};

interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: Variant;
  /** delay in ms — use for staggering siblings */
  delay?: number;
  duration?: number;
  /** re-hide and re-animate when scrolled back out of view */
  once?: boolean;
  /** intersection threshold 0..1 */
  amount?: number;
  /** IntersectionObserver rootMargin — widen to trigger off-screen (e.g. bleeding carousel cards) */
  rootMargin?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration = 750,
  once = true,
  amount = 0.18,
  rootMargin = "0px 0px -8% 0px",
  className = "",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: amount, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, amount, rootMargin]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : OFFSETS[variant],
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

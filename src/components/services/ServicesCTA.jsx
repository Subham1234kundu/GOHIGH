"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapReveal";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

export default function ServicesCTA() {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const { isSmooth, status } = useSmoothScroll();

  useEffect(() => {
    if (status === "pending") return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchLayout =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1024px)").matches;

    if (prefersReduced) return;

    const scroller = isSmooth
      ? root.closest("[data-scroll-container]") || undefined
      : undefined;

    const ctx = gsap.context(() => {
      const lines = panelRef.current?.querySelectorAll(".services-cta-line");

      gsap.set(panelRef.current, {
        scale: 0.94,
        autoAlpha: 0,
        transformOrigin: "50% 80%",
      });
      gsap.set(lines, { autoAlpha: 0, yPercent: 115, rotate: 2 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", force3D: true },
        scrollTrigger: touchLayout
          ? {
              trigger: root,
              start: "top 82%",
              once: true,
            }
          : {
              trigger: root,
              start: "top top",
              end: "+=80%",
              scrub: 0.65,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              ...(scroller ? { scroller } : {}),
            },
      });

      tl.to(panelRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.7,
        ease: "back.out(1.5)",
      }).to(
        lines,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotate: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: "back.out(1.7)",
        },
        "-=0.38"
      );
    }, root);

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [isSmooth, status]);

  return (
    <section
      ref={rootRef}
      className="services-cta-band"
      data-scroll
      data-scroll-section
    >
      <div ref={panelRef} className="services-cta-panel">
        <h2>
          <span className="services-cta-line">Let&apos;s talk</span>
          <span className="services-cta-line">about your</span>
          <span className="services-cta-line">project.</span>
        </h2>
      </div>
    </section>
  );
}

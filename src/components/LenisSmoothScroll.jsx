"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ensureGsap } from "@/lib/gsapReveal";

/**
 * Window-level smooth scroll for the home page.
 * Uses Lenis (not Locomotive) so CSS sticky / ThreeHero scroll scrub keep working.
 * Disabled on mobile and reduced-motion.
 */
export default function LenisSmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileOrTablet = window.matchMedia("(max-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobileOrTablet || reduced) return;

    const { gsap, ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      lerp: 0.14,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.15,
    });

    lenis.on("scroll", ({ scroll }) => {
      ScrollTrigger.update();
      // Same bridge ThreeHero / Navbar already listen for under Locomotive
      window.dispatchEvent(
        new CustomEvent("loco-scroll", { detail: { y: scroll ?? 0 } })
      );
    });

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return children;
}

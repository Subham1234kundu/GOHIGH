"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsap() {
  if (typeof window === "undefined") return { gsap, ScrollTrigger };

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

/** Debounced ScrollTrigger.refresh */
let refreshTimer = null;
export function refreshScroll() {
  if (typeof window === "undefined") return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

/**
 * Scroll reveal — GPU transforms, plays once.
 * Modes: "rise" | "soft" | "card" | "line"
 */
function resolveScroller(explicit) {
  if (explicit) return explicit;
  if (typeof document === "undefined") return undefined;
  if (!document.documentElement.classList.contains("has-scroll-smooth")) {
    return undefined;
  }
  return document.querySelector("[data-scroll-container]") || undefined;
}

export function reveal(targets, {
  trigger,
  y = 40,
  x = 0,
  scale = 1,
  duration = 0.85,
  stagger = 0.08,
  delay = 0,
  start = "top 88%",
  ease = "power3.out",
  mode = "rise",
  scroller,
} = {}) {
  const els = gsap.utils.toArray(targets).filter(Boolean);
  if (!els.length) return null;

  const from = {
    autoAlpha: 0,
    force3D: true,
    ...(mode === "soft" ? { y: 20 } : {}),
    ...(mode === "rise" ? { y } : {}),
    ...(mode === "card" ? { y: y || 44, scale: scale === 1 ? 0.96 : scale } : {}),
    ...(mode === "line" ? { y: y || 48 } : {}),
    ...(x ? { x } : {}),
  };

  gsap.set(els, from);

  const resolvedScroller = resolveScroller(scroller);

  return gsap.to(els, {
    autoAlpha: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration,
    stagger: typeof stagger === "number"
      ? { each: stagger, from: "start" }
      : stagger,
    delay,
    ease,
    force3D: true,
    overwrite: "auto",
    immediateRender: false,
    scrollTrigger: {
      trigger: trigger || els[0],
      start,
      toggleActions: "play none none none",
      once: true,
      ...(resolvedScroller ? { scroller: resolvedScroller } : {}),
      // If already past start when created (common after layout settle), play now
      onRefresh(self) {
        if (self.progress > 0 || self.isActive) {
          self.animation?.progress(1);
        }
      },
    },
  });
}

/** Sequenced scroll timeline for a section block */
export function revealTimeline(trigger, {
  start = "top 88%",
  scroller,
} = {}) {
  const { gsap } = ensureGsap();
  const resolvedScroller = resolveScroller(scroller);
  return gsap.timeline({
    defaults: { ease: "power3.out", force3D: true },
    scrollTrigger: {
      trigger,
      start,
      once: true,
      toggleActions: "play none none none",
      ...(resolvedScroller ? { scroller: resolvedScroller } : {}),
    },
  });
}

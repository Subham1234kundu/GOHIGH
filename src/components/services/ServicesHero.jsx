"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapReveal";

const HEADLINE = "Engineering digital systems that scale";

export default function ServicesHero() {
  const rootRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const words = headlineRef.current?.querySelectorAll(".hero-word");

    if (prefersReduced) {
      gsap.set(words, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(words, {
        autoAlpha: 0,
        yPercent: 115,
        rotate: 2,
        scale: 0.96,
        transformOrigin: "left bottom",
      });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(words, {
        autoAlpha: 1,
        yPercent: 0,
        rotate: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.07,
        ease: "back.out(1.35)",
        force3D: true,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="services-hero"
      data-scroll
      data-scroll-section
    >
      <h1 ref={headlineRef} className="services-hero-title">
        {HEADLINE.split(" ").map((word, i) => (
          <span key={`${word}-${i}`} className="hero-word-wrap">
            <span className="hero-word">{word}</span>
            {i < HEADLINE.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </h1>

      <div className="services-hero-orb" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

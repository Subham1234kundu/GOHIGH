"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapReveal";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    text: "Map constraints, users, and success metrics before a line of code.",
  },
  {
    n: "02",
    title: "Architect",
    text: "Design systems that scale — stack, data flow, and delivery model.",
  },
  {
    n: "03",
    title: "Build",
    text: "Ship in tight loops with clear demos, reviews, and ownership.",
  },
  {
    n: "04",
    title: "Scale",
    text: "Harden, observe, and iterate so the product compounds in production.",
  },
];

export default function ProcessStrip() {
  const rootRef = useRef(null);
  const { isSmooth, status } = useSmoothScroll();

  useEffect(() => {
    if (status === "pending") return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const scroller = isSmooth
      ? root.closest("[data-scroll-container]") || undefined
      : undefined;

    const ctx = gsap.context(() => {
      const content = root.querySelectorAll(
        ".process-step h3, .process-step > p"
      );
      const arrows = root.querySelectorAll(".process-step-arrow");
      const nums = root.querySelectorAll(".process-step-num");

      gsap.set(content, { autoAlpha: 0, y: 24 });
      gsap.set(arrows, { autoAlpha: 0, x: -16 });
      gsap.set(nums, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
          ...(scroller ? { scroller } : {}),
        },
      });

      tl.to(nums, {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.12,
      })
        .to(
          arrows,
          { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.14 },
          "-=0.25"
        )
        .to(
          content,
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12 },
          "-=0.45"
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
      className="services-process"
      data-scroll
      data-scroll-section
    >
      <div className="services-process-inner">
        {/* COPY: optional process band — refine step titles/copy */}
        <p className="services-eyebrow">How we work</p>
        <h2 className="services-process-title">A clear path from brief to production</h2>

        <div className="services-process-grid">
          {STEPS.map((step) => (
            <div key={step.n} className="process-step">
              <div className="process-step-head">
                <span className="process-step-num">{step.n}</span>
                <span className="process-step-arrow" aria-hidden>
                  <i className="process-step-arrow-line" />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

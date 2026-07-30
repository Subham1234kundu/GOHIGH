"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Code2,
  Cloud,
  Cpu,
  TrendingUp,
} from "lucide-react";
import { ensureGsap } from "@/lib/gsapReveal";
import { media } from "@/lib/media";

const services = [
  {
    id: 1,
    title: "Software",
    body: "Product-grade applications and internal platforms — architected for clarity, speed, and long-term ownership. We build systems that scale with your operations. We'll show you how",
    link: "custom engineering",
    after: " can help improve delivery speed and support lasting growth.",
    Icon: Code2,
  },
  {
    id: 2,
    title: "AI",
    body: "Practical intelligence wired into real workflows — agents, pipelines, and decision layers that remove busywork. We'll show you how",
    link: "automation systems",
    after: " can help improve visibility and support an increase in output.",
    Icon: Cpu,
  },
  {
    id: 3,
    title: "Cloud",
    body: "Reliable environments that deploy cleanly, scale under load, and stay observable when things break. We'll show you how",
    link: "DevOps infrastructure",
    after: " can help improve reliability and support confident scaling.",
    Icon: Cloud,
  },
  {
    id: 4,
    title: "Growth",
    body: "Creative production and acquisition loops engineered as systems — measurable, repeatable, and ready to compound. We'll show you how",
    link: "growth systems",
    after: " can help improve visibility and support an increase in traffic.",
    Icon: TrendingUp,
  },
];

/** Visual order top → bottom: 04 → 01 (01 at bottom) */
const railOrder = [...services].map((s, i) => ({ ...s, stepIndex: i })).reverse();

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const screenRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const screen = screenRef.current;
    if (!track || !screen) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(screen, { clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(screen, { yPercent: 100, force3D: true });

      gsap.to(screen, {
        yPercent: 0,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: track,
          start: "top bottom",
          end: "top top",
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            services.length - 1,
            Math.floor(self.progress * services.length)
          );
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
    }, track);

    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const { gsap } = ensureGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const head = el.querySelector(".edge-svc-heading");
    const body = el.querySelector(".edge-svc-body");

    gsap.fromTo(
      [head, body].filter(Boolean),
      { y: 36, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.32,
        stagger: 0.04,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  }, [active]);

  const scrollToStep = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.offsetHeight - window.innerHeight;
    const top = window.scrollY + track.getBoundingClientRect().top;
    const y = top + (total * (index + 0.12)) / services.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = services[active];
  const Icon = current.Icon;
  const progress = (active + 1) / services.length;

  return (
    <section
      id="services"
      ref={trackRef}
      className="svc-page"
      style={{ "--svc-track-height": `${(1 + services.length * 0.48) * 100}svh` }}
    >
      <div className="svc-page-viewport">
        <div ref={screenRef} className="svc-page-screen">
          <div className="svc-page-inner">
            <div className="edge-svc-frame">
              <div className="edge-svc-left">
                <div
                  className={`edge-svc-progress-arrow${
                    active === services.length - 1 ? " is-complete" : ""
                  }`}
                  aria-hidden
                  style={{ "--arrow-progress": progress }}
                >
                  {/* Block letters run bottom → top with the arrow */}
                  <p className="edge-svc-wordmark" aria-hidden="true">
                    {"GOHIGH".split("").map((ch, i) => {
                      // column: first char at top — light from tip downward as fill rises
                      const lit = progress >= (6 - i - 0.65) / 6;
                      return (
                        <span
                          key={`${ch}-${i}`}
                          className={`edge-svc-wordmark-ch${lit ? " is-lit" : ""}`}
                        >
                          {ch}
                        </span>
                      );
                    })}
                  </p>
                  <svg
                    className="edge-svc-progress-svg"
                    viewBox="0 0 24 320"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <line
                      className="edge-svc-arrow-track"
                      x1="12"
                      y1="300"
                      x2="12"
                      y2="28"
                    />
                    <line
                      className="edge-svc-arrow-fill"
                      x1="12"
                      y1="300"
                      x2="12"
                      y2="28"
                      pathLength="1"
                    />
                    <path
                      className="edge-svc-arrow-head"
                      d="M6 32 L12 18 L18 32"
                    />
                    <path
                      className="edge-svc-arrow-head-fill"
                      d="M6 32 L12 18 L18 32"
                    />
                  </svg>
                </div>

                <nav className="edge-svc-nums" aria-label="Service steps">
                  {railOrder.map((s) => {
                    const n = String(s.stepIndex + 1).padStart(2, "0");
                    const i = s.stepIndex;
                    const cls =
                      i === active
                        ? "is-active"
                        : i < active
                          ? "is-past"
                          : "is-far";
                    return (
                      <button
                        key={s.id}
                        type="button"
                        className={`edge-svc-num ${cls}`}
                        onClick={() => scrollToStep(i)}
                        aria-label={`Step ${n}, ${s.title}`}
                        aria-current={i === active ? "true" : undefined}
                      >
                        <span className="edge-svc-num-label">{n}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="edge-svc-center">
                <div ref={copyRef} className="edge-svc-content">
                  <div className="edge-svc-heading">
                    <Image
                      src={media("logo")}
                      alt="GoHigh"
                      width={220}
                      height={56}
                      className="edge-svc-brand-logo"
                      unoptimized
                      priority
                    />
                    <h2 className="edge-svc-title">
                      {current.title}
                      <span className="edge-svc-icon" aria-hidden>
                        <Icon strokeWidth={1.75} className="edge-svc-icon-svg" />
                      </span>
                    </h2>
                  </div>
                  <p className="edge-svc-body">
                    {current.body}{" "}
                    <Link href="/services" className="edge-svc-a">
                      {current.link}
                    </Link>{" "}
                    {current.after}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

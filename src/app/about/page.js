"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ensureGsap } from "@/lib/gsapReveal";
import { media } from "@/lib/media";

const PRINCIPLES = [
  {
    number: "01",
    title: "Scale by design",
    text: "Architecture should create room for ambition. We make the decisions today that keep products fast, resilient, and adaptable tomorrow.",
  },
  {
    number: "02",
    title: "Clarity over theatre",
    text: "No black boxes and no inflated complexity. Our partners see the work, the trade-offs, and the path forward at every stage.",
  },
  {
    number: "03",
    title: "Ownership, end to end",
    text: "We think beyond delivery. From the first system map to production telemetry, we stay accountable for the outcome.",
  },
];

export default function AboutPage() {
  const rootRef = useRef(null);
  const techImageRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const heroItems = root.querySelectorAll("[data-about-hero]");
      gsap.fromTo(
        heroItems,
        { autoAlpha: 0, y: 55 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.11,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      root.querySelectorAll("[data-about-reveal]").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      if (techImageRef.current) {
        gsap.fromTo(
          techImageRef.current,
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: techImageRef.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      }
    }, root);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="about-page">
      <section className="about-hero">
        <div className="about-hero-orb" aria-hidden="true">
          <i />
        </div>

        <div className="about-hero-copy">
          <h1 data-about-hero>
            Built for the systems
            <span>behind tomorrow.</span>
          </h1>
          <p className="about-hero-intro" data-about-hero>
            We partner with ambitious teams to turn complex ideas into dependable
            digital products—engineered with precision and built to keep moving.
          </p>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="about-section-label" data-about-reveal>
          <span>01</span>
          <p>What drives us</p>
        </div>
        <div className="about-manifesto-copy" data-about-reveal>
          <p>
            Technology should not just work.
            <br />
            It should <em>move a business forward.</em>
          </p>
          <div className="about-manifesto-note">
            <span />
            <p>
              GoHigh brings senior engineering thinking, product instinct, and
              disciplined execution into one focused team.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-image" data-about-reveal>
          <img
            src={media("aboutTeam")}
            alt="The GoHigh engineering team collaborating"
            loading="lazy"
            decoding="async"
          />
          <div className="about-story-stamp" aria-hidden="true">
            <span>GO</span>
            <span>HIGH</span>
          </div>
        </div>
        <div className="about-story-copy" data-about-reveal>
          <div className="about-section-label">
            <span>02</span>
            <p>How we think</p>
          </div>
          <h2>Small enough to care. Experienced enough to carry the weight.</h2>
          <p>
            Our team works close to the problem and closer to the people it affects.
            That means fewer handoffs, faster decisions, and engineering that stays
            connected to the real objective.
          </p>
          <p>
            We do not separate strategy from delivery. The people shaping the system
            are the people building it.
          </p>
        </div>
      </section>

      <section className="about-principles">
        <div className="about-principles-head" data-about-reveal>
          <div className="about-section-label">
            <span>03</span>
            <p>Our principles</p>
          </div>
          <h2>Standards that show up in the work.</h2>
        </div>

        <div className="about-principles-list">
          {PRINCIPLES.map((principle) => (
            <article key={principle.number} data-about-reveal>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-tech">
        <img
          ref={techImageRef}
          src={media("aboutTech")}
          alt="Technology infrastructure"
          loading="lazy"
          decoding="async"
        />
        <div className="about-tech-overlay" />
        <div className="about-tech-copy" data-about-reveal>
          <span>Built with intent</span>
          <h2>
            Surgical execution.
            <br />
            <em>Measurable impact.</em>
          </h2>
        </div>
      </section>

      <section className="about-contact">
        <div className="about-contact-meta" data-about-reveal>
          <span>Have a complex challenge?</span>
          <span>We should talk.</span>
        </div>
        <div className="about-contact-row" data-about-reveal>
          <h2>Let&apos;s build what&apos;s next.</h2>
          <Link
            href="/contact"
            className="about-contact-cta"
            aria-label="Start a project with GoHigh"
          >
            <svg
              className="about-contact-cta-ring"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="about-contact-cta-path"
                  d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                />
              </defs>
              <text>
                <textPath href="#about-contact-cta-path" startOffset="1%">
                  START A PROJECT · LET&apos;S BUILD · START A PROJECT · LET&apos;S BUILD ·
                </textPath>
              </text>
            </svg>
            <span className="about-contact-cta-copy">
              <small>Have an idea?</small>
              <strong>Let&apos;s talk</strong>
            </span>
            <i aria-hidden="true">↗</i>
          </Link>
        </div>
      </section>
    </main>
  );
}

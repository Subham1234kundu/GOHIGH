"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Braces,
  Cloud,
  Cpu,
  LineChart,
} from "lucide-react";
import { ensureGsap } from "@/lib/gsapReveal";

const SERVICES = [
  {
    index: "01",
    short: "SOFTWARE",
    title: "Custom Software",
    role: "PRODUCT DESIGN & DEVELOPMENT",
    description:
      "Product-grade applications and internal platforms, architected for speed, clarity, and long-term ownership.",
    tags: ["Next.js", "Node", "TypeScript", "PostgreSQL"],
    Icon: Braces,
    theme: "navy",
    visual: "software",
    photo: "/Image/customSoftware.png",
    photoAlt: "Custom software engineering and product development",
  },
  {
    index: "02",
    short: "INTELLIGENCE",
    title: "AI Systems",
    role: "AUTOMATION & AGENT WORKFLOWS",
    description:
      "Practical intelligence embedded into real operations to remove repetitive work and accelerate decisions.",
    tags: ["OpenAI", "Python", "Agents", "Vector DB"],
    Icon: Cpu,
    theme: "light",
    visual: "ai",
    photo: "/Image/aiSystem.png",
    photoAlt: "AI systems and intelligent automation",
  },
  {
    index: "03",
    short: "INFRASTRUCTURE",
    title: "Cloud & DevOps",
    role: "CLOUD ARCHITECTURE & DELIVERY",
    description:
      "Reliable environments that deploy cleanly, scale under load, and remain observable when it matters.",
    tags: ["AWS", "Docker", "Terraform", "CI/CD"],
    Icon: Cloud,
    theme: "cyan",
    visual: "cloud",
    photo: "/Image/cloud.png",
    photoAlt: "Cloud and DevOps infrastructure",
  },
  {
    index: "04",
    short: "GROWTH",
    title: "Growth Systems",
    role: "CREATIVE, DATA & ACQUISITION",
    description:
      "Creative production and acquisition loops engineered as measurable systems that are ready to compound.",
    tags: ["Creative", "Analytics", "CRM", "Automation"],
    Icon: LineChart,
    theme: "navy",
    visual: "growth",
    photo: "/Image/growth.png",
    photoAlt: "Mountain peaks representing compounding growth",
  },
];

function SystemVisual({ type, index, title, Icon, photo, photoAlt }) {
  if (photo) {
    return (
      <div className={`showcase-visual visual-${type} is-photo`}>
        <Image
          src={photo}
          alt={photoAlt || title}
          fill
          sizes="(max-width: 1024px) calc(100vw - 2rem), 62vw"
          className="showcase-visual-photo"
        />
      </div>
    );
  }

  return (
    <div className={`showcase-visual visual-${type}`}>
      <div className="visual-topline">
        <span>GOHIGH / {index}</span>
        <span>ENGINEERED SYSTEM</span>
      </div>

      <div className="visual-heading">
        <Icon aria-hidden="true" strokeWidth={1.35} />
        <strong>{title}</strong>
      </div>

      {type === "software" && (
        <div className="software-ui">
          <aside>
            <i />
            <i />
            <i />
            <i />
          </aside>
          <div className="software-main">
            <div className="ui-bar" />
            <div className="ui-grid">
              <span />
              <span />
              <span />
            </div>
            <div className="ui-chart">
              <b />
              <b />
              <b />
              <b />
              <b />
              <b />
            </div>
          </div>
        </div>
      )}

      {type === "ai" && (
        <div className="ai-orbit" aria-hidden="true">
          <div className="ai-core">
            <Cpu strokeWidth={1.2} />
          </div>
          <span className="orbit orbit-a" />
          <span className="orbit orbit-b" />
          <span className="orbit orbit-c" />
          <i className="node node-a" />
          <i className="node node-b" />
          <i className="node node-c" />
        </div>
      )}

      {type === "cloud" && (
        <div className="cloud-map" aria-hidden="true">
          <span className="cloud-node node-main">
            <Cloud strokeWidth={1.2} />
          </span>
          <span className="cloud-node node-small one">API</span>
          <span className="cloud-node node-small two">DB</span>
          <span className="cloud-node node-small three">CI</span>
          <span className="cloud-node node-small four">OBS</span>
          <i className="cloud-line line-one" />
          <i className="cloud-line line-two" />
          <i className="cloud-line line-three" />
          <i className="cloud-line line-four" />
        </div>
      )}

      <span className="visual-watermark">GOHIGH</span>
    </div>
  );
}

const clamp01 = (value) => Math.min(1, Math.max(0, value));

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const slabsRef = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const cards = slabsRef.current.filter(Boolean);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      cards.forEach((card, index) => {
        card.style.transform = index === 0 ? "translate3d(0, 0, 0)" : "";
        card.style.opacity = index === 0 ? "1" : "";
        card.style.zIndex = String(index + 1);
      });
      return () => {
        cards.forEach((card) => {
          card.style.transform = "";
          card.style.opacity = "";
          card.style.zIndex = "";
        });
      };
    }

    const transitions = Math.max(1, cards.length - 1);

    // Cards finish arriving before the panel unsticks, so the last one is fully readable.
    const RUNWAY = 0.8;

    // Each visual rises into place; the one behind it shrinks in width and height.
    const paintStack = (progress) => {
      const travelled = clamp01(progress / RUNWAY) * transitions;

      cards.forEach((card, index) => {
        const entering = index === 0 ? 1 : clamp01(travelled - (index - 1));
        const covered = clamp01(travelled - index);
        const y = (1 - entering) * 104 - covered * 5;
        const scaleX = 1 - covered * 0.16;
        const scaleY = 1 - covered * 0.1;

        card.style.transform = `translate3d(0, ${y}%, 0) scale(${scaleX}, ${scaleY})`;
        card.style.zIndex = String(index + 1);
        card.style.opacity = String(1 - covered * 0.45);
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(stage, { yPercent: 100, force3D: true });
      paintStack(0);

      gsap.to(stage, {
        yPercent: 0,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "top top-=55%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.create({
        trigger: track,
        start: "top top-=55%",
        end: "bottom bottom",
        scrub: 0.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          paintStack(self.progress);

          const next = Math.min(
            cards.length - 1,
            Math.floor(clamp01(self.progress / RUNWAY) * transitions + 0.28)
          );
          setActive((current) => (current === next ? current : next));
        },
      });
    }, track);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 180);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
      cards.forEach((card) => {
        card.style.transform = "";
        card.style.zIndex = "";
        card.style.opacity = "";
      });
    };
  }, []);

  const scrollToService = (index) => {
    const track = trackRef.current;
    if (!track) return;

    const transitions = Math.max(1, SERVICES.length - 1);
    const trackTop = window.scrollY + track.getBoundingClientRect().top;
    const distance = track.offsetHeight - window.innerHeight;
    const overlay = window.innerHeight * 0.55;

    window.scrollTo({
      top: trackTop + overlay + (distance - overlay) * (index / transitions),
      behavior: "smooth",
    });
  };

  const service = SERVICES[active];

  return (
    <section
      ref={trackRef}
      className="services-showcase service-story-track"
      style={{ "--story-height": `${SERVICES.length * 75 + 155}svh` }}
      aria-label="GoHigh services"
    >
      <article
        ref={stageRef}
        className="service-story-stage service-story-minimal"
        aria-labelledby={`showcase-${service.index}`}
      >
        <div className="showcase-panel-bar is-single">
          <span>OUR SERVICES</span>
        </div>

        <div className="service-story-layout">
          <div className="showcase-media service-story-media">
            <div className="service-story-visual-stack">
              {SERVICES.map((item, index) => (
                <div
                  key={item.index}
                  ref={(node) => {
                    slabsRef.current[index] = node;
                  }}
                  className="service-story-visual-card"
                  aria-hidden={index !== active}
                >
                  <SystemVisual {...item} />
                </div>
              ))}
            </div>

            <div className="service-story-caption">
              <span>{service.short}</span>
            </div>
          </div>

          <div className="service-story-side">
            <div className="service-story-list">
              {SERVICES.map((item, index) => (
                <div
                  key={item.index}
                  className={`service-story-row${
                    index === active ? " is-active" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => scrollToService(index)}
                    aria-current={index === active ? "step" : undefined}
                    aria-controls={`showcase-detail-${item.index}`}
                  >
                    <span>{item.index}</span>
                    <h2 id={`showcase-${item.index}`}>{item.title}</h2>
                  </button>

                  <div
                    id={`showcase-detail-${item.index}`}
                    className="service-story-row-detail"
                  >
                    <p className="showcase-role">{item.role}</p>
                    <p className="showcase-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

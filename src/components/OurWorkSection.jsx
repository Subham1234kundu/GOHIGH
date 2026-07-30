"use client";

import React, { useRef, useEffect } from "react";
import { ensureGsap, reveal } from "@/lib/gsapReveal";
import { media } from "@/lib/media";

const projectsRow1 = [
  { id: 1, title: "Product Design", author: "@gohigh", img: media("focus") },
  { id: 2, title: "Brand & Marketing", author: "@gohigh", img: media("work") },
  { id: 3, title: "Gamified Experiences", author: "@gohigh", img: media("image3") },
  { id: 4, title: "3D Mockups", author: "@gohigh", img: media("tab") },
  { id: 5, title: "Growth Systems", author: "@gohigh", img: media("footer") },
];

const projectsRow2 = [
  { id: 6, title: "AI Automation", author: "@gohigh", img: media("work") },
  { id: 7, title: "Cloud & DevOps", author: "@gohigh", img: media("tab") },
  { id: 8, title: "Digital Platforms", author: "@gohigh", img: media("focus") },
  { id: 9, title: "Brand Systems", author: "@gohigh", img: media("image3") },
  { id: 10, title: "Scalable Products", author: "@gohigh", img: media("footer") },
];

const ProjectCard = ({ project }) => (
  <div
    className="work-project-card"
    style={{
      minWidth: "280px",
      marginRight: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      flexShrink: 0,
    }}
  >
    <div
      className="work-project-image"
      style={{
        width: "100%",
        height: "160px",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#111",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <img
        src={project.img}
        alt={project.title}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "#333",
          flexShrink: 0,
        }}
      />
      <div>
        <h4
          style={{
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            margin: "0 0 2px 0",
          }}
        >
          {project.title}
        </h4>
        <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>
          {project.author}
        </p>
      </div>
    </div>
  </div>
);

const OurWorkSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const trackLeftRef = useRef(null);
  const trackRightRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      reveal(headerRef.current?.children, {
        trigger: sectionRef.current,
        mode: "line",
        y: 36,
        stagger: 0.1,
        duration: 0.9,
        start: "top 90%",
      });

      if (prefersReduced) {
        trackLeftRef.current?.classList.add("paused");
        trackRightRef.current?.classList.add("paused");
        return;
      }

      // Pause CSS marquees off-screen — avoids GSAP transform conflicts with FAQ
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          trackLeftRef.current?.classList.remove("paused");
          trackRightRef.current?.classList.remove("paused");
        },
        onEnterBack: () => {
          trackLeftRef.current?.classList.remove("paused");
          trackRightRef.current?.classList.remove("paused");
        },
        onLeave: () => {
          trackLeftRef.current?.classList.add("paused");
          trackRightRef.current?.classList.add("paused");
        },
        onLeaveBack: () => {
          trackLeftRef.current?.classList.add("paused");
          trackRightRef.current?.classList.add("paused");
        },
      });
    }, sectionRef);

    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="our-work-section"
      style={{
        background: "#000000",
        padding: "120px 0",
        overflow: "hidden",
        fontFamily: "var(--font-montserrat), sans-serif",
        isolation: "isolate",
        contain: "layout paint",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 700px",
      }}
    >
      <div
        ref={headerRef}
        className="our-work-header"
        style={{
          textAlign: "center",
          marginBottom: "80px",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#00ffff",
            marginBottom: "16px",
            fontWeight: 600,
          }}
        >
          Our Work
        </div>
        <h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400,
            color: "#ffffff",
            margin: "0 auto",
            lineHeight: 1.2,
            letterSpacing: "-0.5px",
            maxWidth: "800px",
          }}
        >
          Where Intelligent Ideas Become Scalable Digital Systems
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <div ref={trackLeftRef} className="work-marquee work-marquee-left">
            {[...projectsRow1, ...projectsRow1].map((project, i) => (
              <ProjectCard key={`r1-${i}`} project={project} />
            ))}
          </div>
        </div>

        <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <div ref={trackRightRef} className="work-marquee work-marquee-right">
            {[...projectsRow2, ...projectsRow2].map((project, i) => (
              <ProjectCard key={`r2-${i}`} project={project} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.work-marquee) {
          display: flex;
          width: max-content;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        :global(.work-marquee-left) {
          animation: work-scroll-left 36s linear infinite;
        }

        :global(.work-marquee-right) {
          animation: work-scroll-right 36s linear infinite;
        }

        :global(.work-marquee.paused) {
          animation-play-state: paused;
        }

        @keyframes work-scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes work-scroll-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 0 !important;
          }
          .our-work-header {
            margin-bottom: 52px !important;
          }
          h2 {
            font-size: 28px !important;
          }
          :global(.work-project-card) {
            min-width: min(78vw, 260px) !important;
            margin-right: 16px !important;
          }
          :global(.work-project-image) {
            height: clamp(140px, 44vw, 170px) !important;
          }
          :global(.work-marquee-left),
          :global(.work-marquee-right) {
            animation-duration: 48s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.work-marquee-left),
          :global(.work-marquee-right) {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OurWorkSection;

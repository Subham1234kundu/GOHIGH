"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsapReveal";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

/**
 * Single service pillar — animations scoped per instance via refs.
 * Props: index, title, description, bullets, image, imageAlt, tags, reverse
 */
export default function ServicePillar({
  index,
  title,
  description,
  bullets = [],
  image,
  imageAlt = "Service demo",
  tags = [],
  reverse = false,
}) {
  const sectionRef = useRef(null);
  const indexRef = useRef(null);
  const textRef = useRef(null);
  const bulletsRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageInnerRef = useRef(null);
  const tagsRef = useRef(null);
  const { isSmooth, status } = useSmoothScroll();

  useEffect(() => {
    if (status === "pending") return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;

    if (prefersReduced) {
      gsap.set(
        [
          indexRef.current,
          textRef.current,
          bulletsRef.current?.children,
          imageWrapRef.current,
          tagsRef.current,
        ],
        { clearProps: "all", autoAlpha: 1 }
      );
      return;
    }

    const scroller = isSmooth
      ? section.closest("[data-scroll-container]") || undefined
      : undefined;

    const ctx = gsap.context(() => {
      const bulletEls = bulletsRef.current
        ? Array.from(bulletsRef.current.children)
        : [];

      gsap.set(indexRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(textRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(bulletEls, { autoAlpha: 0, y: 18 });
      gsap.set(tagsRef.current, { autoAlpha: 0, y: 12 });
      gsap.set(imageWrapRef.current, { autoAlpha: 0 });
      gsap.set(imageInnerRef.current, { scale: 1.1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
          ...(scroller ? { scroller } : {}),
        },
      });

      tl.to(indexRef.current, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(
          textRef.current,
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.25"
        )
        .to(
          bulletEls,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .to(
          tagsRef.current,
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.25"
        )
        .to(
          imageWrapRef.current,
          { autoAlpha: 1, duration: 0.7 },
          "-=0.7"
        )
        .to(
          imageInnerRef.current,
          { scale: 1, duration: 1.15, ease: "power2.out" },
          "-=0.7"
        );

      // Subtle parallax on image — scrubbed; skipped on mobile
      if (!isMobile && imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: reverse ? 8 : -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            ...(scroller ? { scroller } : {}),
          },
        });
      }
    }, section);

    const refreshTimer = setTimeout(() => {
      if (status === "smooth" || status === "native") {
        ScrollTrigger.refresh();
      }
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isSmooth, status, reverse]);

  const marker = String(index).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className={`service-pillar${reverse ? " is-reversed" : ""}`}
      data-scroll
      data-scroll-section
      aria-labelledby={`service-${marker}-title`}
    >
      <div className="service-pillar-inner">
        <div className="service-pillar-copy">
          <span ref={indexRef} className="service-pillar-index" aria-hidden>
            {marker}
          </span>

          <div ref={textRef}>
            {/* COPY: replace title + description with final service copy */}
            <h2 id={`service-${marker}-title`} className="service-pillar-title">
              {title}
            </h2>
            <p className="service-pillar-desc">{description}</p>
          </div>

          <ul ref={bulletsRef} className="service-pillar-bullets">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {tags.length > 0 && (
            <div ref={tagsRef} className="service-pillar-tags">
              {tags.map((tag) => (
                <span key={tag} className="service-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="service-pillar-media">
          {/* IMAGE: replace placehold.co URL with real product screenshot */}
          <div ref={imageWrapRef} className="service-pillar-frame">
            <div ref={imageInnerRef} className="service-pillar-img-inner">
              <img
                src={image}
                alt={imageAlt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

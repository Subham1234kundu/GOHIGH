"use client";

import React, { useEffect, useRef } from "react";

const stats = [
  { value: 97, suffix: "%", label: "Client Retention", decimals: 0 },
  { value: 150, suffix: "+", label: "Projects Delivered", decimals: 0 },
  { value: 40, suffix: "+", label: "Platforms Managed", decimals: 0 },
  { value: 99.9, suffix: "%", label: "System Uptime", decimals: 1 },
];

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let animated = false;
    let rafId = 0;

    const animateCounters = () => {
      if (animated) return;
      animated = true;
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);

        valueRefs.current.forEach((el, i) => {
          if (!el) return;
          const { value, decimals } = stats[i];
          const current = value * eased;
          el.textContent =
            decimals > 0 ? current.toFixed(decimals) : String(Math.floor(current));
        });

        if (t < 1) rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        color: "#1a2a3a",
        padding: "72px 40px 48px",
        fontFamily: "var(--font-montserrat), sans-serif",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#3aabd4",
              margin: "0 0 10px",
              fontWeight: 600,
            }}
          >
            Proven Results
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 400,
              color: "#1a2a3a",
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: "-0.5px",
            }}
          >
            The impact we&apos;ve created
          </h2>
        </div>

        <div
          className="impact-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="impact-stat"
              style={{
                textAlign: "center",
                padding: "8px 20px",
                borderRight:
                  i < stats.length - 1 ? "1px solid rgba(26,42,58,0.08)" : "none",
              }}
            >
              <div style={{ lineHeight: 1, marginBottom: "10px" }}>
                <span
                  ref={(el) => {
                    valueRefs.current[i] = el;
                  }}
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 52px)",
                    fontWeight: 700,
                    color: "#1a2a3a",
                    letterSpacing: "-1.5px",
                  }}
                >
                  0
                </span>
                <span
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 300,
                    color: "#3aabd4",
                    marginLeft: "1px",
                  }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "rgba(26,42,58,0.45)",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .impact-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            row-gap: 36px !important;
          }
          .impact-stat {
            border-right: none !important;
          }
          .impact-stat:nth-child(odd) {
            border-right: 1px solid rgba(26, 42, 58, 0.08) !important;
          }
        }
        @media (max-width: 520px) {
          section {
            padding: 56px 20px 40px !important;
          }
          .impact-stat {
            padding: 8px 12px !important;
          }
          .impact-stats {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 28px !important;
          }
        }
        @media (max-width: 360px) {
          .impact-stats {
            grid-template-columns: 1fr !important;
          }
          .impact-stat {
            padding: 18px 8px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(26, 42, 58, 0.08);
          }
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;

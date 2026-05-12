"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImpactSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { value: '97', suffix: '%', label: 'Higher Client Retention' },
    { value: '150', suffix: '+', label: 'Projects Successfully Delivered' },
    { value: '40', suffix: '+', label: 'Platforms Optimized & Managed' },
    { value: '99.9', suffix: '%', label: 'Uptime Across Client Systems' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Stats stagger animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.from(statItems, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        // Counter animation for stat values
        statItems.forEach((item) => {
          const valueEl = item.querySelector('.stat-value');
          if (valueEl) {
            const endVal = parseFloat(valueEl.dataset.value);
            const obj = { val: 0 };
            gsap.to(obj, {
              val: endVal,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              onUpdate: () => {
                valueEl.textContent = endVal % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val);
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#ffffff',
        color: '#1a2a3a',
        padding: '80px 40px 20px 40px',
        fontFamily: 'var(--font-montserrat), sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(58,171,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Heading */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase',
            color: '#3aabd4', marginBottom: '12px', fontWeight: 600,
          }}>
            Proven Results
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400,
            color: '#1a2a3a', margin: 0, lineHeight: 1.15,
            letterSpacing: '-0.5px',
          }}>
            The impact we've created
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                textAlign: 'center',
                padding: '40px 24px',
                position: 'relative',
                borderRight: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                transition: 'transform 0.3s ease, background 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = '#fcfcfc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <span
                  className="stat-value"
                  data-value={stat.value}
                  style={{
                    fontSize: 'clamp(42px, 5vw, 64px)',
                    fontWeight: 700,
                    color: '#1a2a3a',
                    lineHeight: 1,
                    letterSpacing: '-2px',
                  }}
                >
                  0
                </span>
                <span style={{
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 300,
                  color: '#3aabd4',
                  marginLeft: '2px',
                }}>
                  {stat.suffix}
                </span>
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'rgba(26,42,58,0.5)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                lineHeight: 1.6,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.06);
          }
          .stat-item:nth-child(2n) {
            border-right: none !important;
          }
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          section {
            padding: 60px 20px 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;

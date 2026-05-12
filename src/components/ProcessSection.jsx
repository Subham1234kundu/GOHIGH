"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const bentoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom',
        },
      });

      // Top Cards animation
      const topCards = cardsRef.current?.querySelectorAll('.process-card');
      if (topCards) {
        gsap.from(topCards, {
          y: 50,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top bottom',
          },
        });
      }

      // Bento Grid animation
      const bentoItems = bentoRef.current?.querySelectorAll('.bento-item');
      if (bentoItems) {
        gsap.from(bentoItems, {
          y: 50,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bentoRef.current,
            start: 'top bottom',
          },
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
        padding: '20px 40px 100px 40px',
        fontFamily: 'var(--font-montserrat), sans-serif',
        color: '#1a2a3a',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header Section */}
        <div ref={headingRef} style={{ marginBottom: '60px' }}>
          <div style={{
            fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase',
            color: '#1a2a3a', marginBottom: '16px', fontWeight: 600,
          }}>
            Our Process
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400,
            color: '#1a2a3a', margin: '0 0 16px 0', lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            A Scalable Growth System <br/>Built For Modern Businesses
          </h2>
          <div style={{
            fontSize: '24px', fontWeight: 300, color: 'rgba(26,42,58,0.4)',
          }}>
            From Strategy And Automation To Execution And Scale
          </div>
        </div>

        {/* Top 3 Cards */}
        <div ref={cardsRef} className="process-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px',
        }}>
          {/* Card 1 */}
          <div className="process-card" style={{
            background: '#fafbfc',
            borderRadius: '16px',
            padding: '40px 32px',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column',
            transition: 'all 0.4s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#00ffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
          }}
          >
            <div style={{ width: '48px', height: '48px', marginBottom: '40px' }}>
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#1a2a3a" strokeOpacity="0.2" strokeWidth="1.5" />
                <path d="M12 16L28 16L20 28L12 16Z" stroke="#1a2a3a" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Discover & Strategize</h3>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px' }}>( 01 )</span>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(26,42,58,0.6)', lineHeight: 1.6, margin: 0 }}>
              We analyze your business, workflows, and growth bottlenecks to build a scalable digital roadmap tailored for long-term success.
            </p>
          </div>

          {/* Card 2 (Highlighted) */}
          <div className="process-card" style={{
            background: '#00ffff',
            borderRadius: '16px',
            padding: '40px 32px',
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(0,255,255,0.15)',
            transition: 'all 0.4s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,255,255,0.15)';
          }}
          >
            <div style={{ width: '48px', height: '48px', marginBottom: '40px' }}>
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#374151" strokeOpacity="0.2" strokeWidth="1.5" />
                <rect x="14" y="12" width="12" height="16" rx="6" stroke="#374151" strokeWidth="2" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#374151', margin: 0 }}>Build & Automate</h3>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151', letterSpacing: '2px' }}>( 02 )</span>
            </div>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              From AI automation and software systems to DevOps infrastructure and digital workflows, we build intelligent systems designed to scale.
            </p>
          </div>

          {/* Card 3 */}
          <div className="process-card" style={{
            background: '#fafbfc',
            borderRadius: '16px',
            padding: '40px 32px',
            border: '1px solid rgba(0,0,0,0.05)',
            display: 'flex', flexDirection: 'column',
            transition: 'all 0.4s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
            e.currentTarget.style.borderColor = '#00ffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
          }}
          >
            <div style={{ width: '48px', height: '48px', marginBottom: '40px' }}>
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#1a2a3a" strokeOpacity="0.2" strokeWidth="1.5" />
                <path d="M12 24L20 16L28 24" stroke="#1a2a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 28L20 24L24 28" stroke="#1a2a3a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Optimize & Scale</h3>
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px' }}>( 03 )</span>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(26,42,58,0.6)', lineHeight: 1.6, margin: 0 }}>
              We continuously optimize performance, automate operations, and improve scalability to help your business grow faster and smarter.
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div ref={bentoRef} className="bento-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '24px',
          minHeight: '600px',
        }}>
          {/* Column 1: Tall Card */}
          <div className="bento-item" style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#1a2a3a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '40px 32px',
          }}>
            <Image 
              src="/Image/GoHighFocous.png" 
              alt="AI-Powered Growth" 
              fill 
              style={{ objectFit: 'cover', opacity: 0.8 }} 
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(13,27,42,1) 0%, rgba(13,27,42,0) 60%)',
            }} />
            
            <div style={{ position: 'relative', zIndex: 1, color: '#ffffff' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px', lineHeight: 1.2 }}>
                AI-Powered Growth Systems
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', lineHeight: 1.6 }}>
                Intelligent automation and scalable digital infrastructure built for modern business growth.
              </p>
              <button style={{
                background: '#ffffff',
                color: '#1a2a3a',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '40px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Explore Solutions
              </button>
            </div>
          </div>

          {/* Column 2 */}
          <div className="bento-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Image Card */}
            <div className="bento-item" style={{
              flex: 1,
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '280px',
            }}>
              <Image 
                src="/Image/GoHighwork.png" 
                alt="Work" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
            {/* Bottom Text Card */}
            <div className="bento-item" style={{
              flex: 1,
              borderRadius: '16px',
              background: '#0d1b2a',
              color: '#ffffff',
              padding: '40px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.5, margin: 0, color: 'rgba(255,255,255,0.9)' }}>
                “Smart systems. Seamless execution. Scalable growth built for the future.”
              </p>
              <div style={{ marginTop: '30px' }}>
                <button style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '12px 24px',
                  borderRadius: '40px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#1a2a3a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                >
                  Build With GoHigh
                </button>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="bento-col" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Top Image/Text Card */}
            <div className="bento-item" style={{
              flex: 1,
              borderRadius: '16px',
              background: '#000000',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '32px',
            }}>
              <Image 
                src="/Image/GoHighimage3.png" 
                alt="Strategy" 
                fill 
                style={{ objectFit: 'cover', opacity: 0.6 }} 
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
              }} />
              <p style={{ fontSize: '15px', fontWeight: 400, lineHeight: 1.5, margin: 0, position: 'relative', zIndex: 1 }}>
                “Modern businesses need connected systems, not disconnected tools.”
              </p>
            </div>
            {/* Bottom Card */}
            <div className="bento-item" style={{
              flex: 1,
              borderRadius: '16px',
              background: '#f0f4f8',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '60%' }}>
                <Image 
                  src="/Image/GoHighTab.png" 
                  alt="Cloud" 
                  fill 
                  style={{ objectFit: 'contain', padding: '20px' }} 
                />
              </div>
              <div style={{ position: 'relative', zIndex: 1, marginTop: '100px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1a2a3a', marginBottom: '8px' }}>
                  Cloud • DevOps • Automation
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(26,42,58,0.6)', margin: 0, lineHeight: 1.5 }}>
                  Secure, scalable, and performance-driven infrastructure for high-growth businesses.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          section {
            padding: 60px 20px !important;
          }
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .bento-item {
            min-height: 400px !important;
          }
          .bento-col {
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;

"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ensureGsap, reveal } from '@/lib/gsapReveal';
import { media } from '@/lib/media';

const CTASection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      reveal(contentRef.current?.children, {
        trigger: sectionRef.current,
        mode: 'line',
        y: 36,
        stagger: 0.12,
        duration: 0.9,
        start: 'top 90%',
      });
    }, sectionRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="cta-section" style={{
      width: '100%',
      minHeight: '450px',
      padding: '80px 0',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#ffffff',
      fontFamily: 'var(--font-montserrat), sans-serif',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: '#000'
      }}>
        <img 
          src={media("footer")} 
          alt="CTA Background"
          loading="lazy"
          decoding="async"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
          }} 
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }} />
      </div>

      <div ref={contentRef} className="cta-content" style={{ maxWidth: '800px', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: 'clamp(26px, 4vw, 36px)',
          fontWeight: 600,
          color: '#00ffff',
          marginBottom: '10px',
          lineHeight: 1.1,
          textTransform: 'uppercase',
          letterSpacing: '-0.2px'
        }}>
          Trusted by Businesses to Deliver 99% On-Time, Impactful Software
        </h2>
        
        <p style={{
          fontSize: '15px',
          color: '#cccccc',
          marginBottom: '20px',
          lineHeight: 1.5,
          maxWidth: '550px',
          margin: '0 auto 20px auto'
        }}>
          Share a few details and Gohigh’s team will recommend next steps tailored to your organization.
        </p>

        <Link href="/contact" className="cta-button" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#00ffff',
          color: '#1a2a3a',
          padding: '14px 32px',
          fontSize: '14px',
          fontWeight: 700,
          border: '1px solid #00ffff',
          borderRadius: '0',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          boxShadow: '0 0 15px rgba(0,255,255,0.4)',
          textDecoration: 'none',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.color = '#00ffff';
          e.currentTarget.style.border = '1px solid #ffffff';
          e.currentTarget.style.boxShadow = '0 0 25px rgba(255,255,255,0.6)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#00ffff';
          e.currentTarget.style.color = '#1a2a3a';
          e.currentTarget.style.border = '1px solid #00ffff';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,255,0.4)';
        }}
        >
          Book Strategy Call
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            min-height: 380px !important;
            padding: 64px 0 !important;
          }
          .cta-content {
            padding: 0 20px !important;
          }
          h2 {
            font-size: clamp(22px, 7vw, 30px) !important;
          }
          p {
            font-size: 14px !important;
          }
          .cta-button {
            width: min(100%, 260px);
            min-height: 48px;
          }
        }
        @media (max-height: 520px) and (orientation: landscape) {
          section {
            min-height: 100svh !important;
            padding: 48px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;

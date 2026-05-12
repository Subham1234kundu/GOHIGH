"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsRow1 = [
  { id: 1, title: 'Product Design', author: '@heyvlad', img: 'https://picsum.photos/seed/p1/400/250' },
  { id: 2, title: 'Brand & Marketing', author: '@sammy.verkissen', img: 'https://picsum.photos/seed/p2/400/250' },
  { id: 3, title: 'Gamified Experiences', author: '@rluzmotion', img: 'https://picsum.photos/seed/p3/400/250' },
  { id: 4, title: '3D Mockups', author: '@tanyadizone', img: 'https://picsum.photos/seed/p4/400/250' },
  { id: 5, title: '3D Logos', author: '@samborek', img: 'https://picsum.photos/seed/p5/400/250' },
];

const projectsRow2 = [
  { id: 6, title: 'Animated Characters', author: '@heyvlad', img: 'https://picsum.photos/seed/p6/400/250' },
  { id: 7, title: 'Industrial & Manufacturing', author: '@lionti', img: 'https://picsum.photos/seed/p7/400/250' },
  { id: 8, title: '3D Icons', author: '@adriandaniluk', img: 'https://picsum.photos/seed/p8/400/250' },
  { id: 9, title: 'Brand & Marketing', author: '@vladkolokolnikov', img: 'https://picsum.photos/seed/p9/400/250' },
  { id: 10, title: 'Gamified Experiences', author: '@vladkolokolnikov', img: 'https://picsum.photos/seed/p10/400/250' },
];

const ProjectCard = ({ project }) => (
  <div style={{
    minWidth: '280px',
    marginRight: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <div style={{
      width: '100%',
      height: '160px',
      borderRadius: '16px',
      overflow: 'hidden',
      background: '#111',
      position: 'relative',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      <img
        src={project.img}
        alt={project.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }}
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333', flexShrink: 0 }} />
      <div>
        <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: 600, margin: '0 0 2px 0' }}>{project.title}</h4>
        <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>{project.author}</p>
      </div>
    </div>
  </div>
);

const OurWorkSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: '#000000',
      padding: '120px 0',
      overflow: 'hidden',
      fontFamily: 'var(--font-montserrat), sans-serif',
    }}>
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '80px', padding: '0 20px' }}>
        <div style={{
          fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase',
          color: '#00ffff', marginBottom: '16px', fontWeight: 600,
        }}>
          Our Work
        </div>
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400,
          color: '#ffffff', margin: '0 auto', lineHeight: 1.2,
          letterSpacing: '-0.5px', maxWidth: '800px'
        }}>
          Where Intelligent Ideas Become Scalable Digital Systems
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* Row 1 - Scrolling Left */}
        <div className="marquee-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div className="marquee-track left">
            {[...projectsRow1, ...projectsRow1].map((project, i) => (
              <ProjectCard key={`r1-${i}`} project={project} />
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="marquee-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div className="marquee-track right">
            {[...projectsRow2, ...projectsRow2].map((project, i) => (
              <ProjectCard key={`r2-${i}`} project={project} />
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
        }
        
        .marquee-track.left {
          animation: scroll-left 30s linear infinite;
        }

        .marquee-track.right {
          animation: scroll-right 30s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 0 !important;
          }
          h2 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OurWorkSection;

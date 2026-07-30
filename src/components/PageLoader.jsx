"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { media } from '@/lib/media';

const PageLoader = () => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const frame = requestAnimationFrame(() => setLoading(false));
      return () => cancelAnimationFrame(frame);
    }

    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      y: 16,
      opacity: 0,
      scale: 0.94,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Check for page load
    const handleLoad = () => {
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => setLoading(false)
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (!loading) return null;

  return (
    <div 
      ref={loaderRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#ffffff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'var(--font-montserrat), sans-serif'
      }}
    >
      <div style={{ position: 'relative', width: 'min(380px, calc(100vw - 40px))', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div ref={logoRef}>
          <Image
            src={media("logo")}
            alt="goHigh Logo"
            width={320}
            height={80}
            style={{ width: 'min(320px, calc(100vw - 64px))', height: 'auto', objectFit: 'contain' }}
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;

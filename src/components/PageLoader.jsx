"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const PageLoader = () => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial entrance
    tl.from(logoRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from(progressRef.current, {
      width: 0,
      duration: 1.5,
      ease: 'power2.inOut'
    }, "-=0.5");

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
      <div style={{ position: 'relative', width: '300px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div ref={logoRef}>
          <Image
            src="/Image/goHighLogo.png"
            alt="goHigh Logo"
            width={200}
            height={50}
            style={{ width: 'auto', height: '50px', objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Minimal Progress Bar */}
      <div style={{ 
        width: '150px', 
        height: '2px', 
        background: '#f0f0f0', 
        marginTop: '20px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div 
          ref={progressRef}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            height: '100%', 
            background: '#00c8c8', 
            width: '100%' 
          }} 
        />
      </div>
      
      <div style={{ 
        marginTop: '12px', 
        fontSize: '10px', 
        letterSpacing: '2px', 
        textTransform: 'uppercase', 
        color: '#999',
        fontWeight: 600
      }}>
        Initializing Systems
      </div>
    </div>
  );
};

export default PageLoader;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Visual state for background/padding
      setScrolled(currentScrollY > 50);

      // GSAP Hide/Show logic
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // Scrolling Down - Hide
        gsap.to(navRef.current, { 
          yPercent: -100, 
          duration: 0.5, 
          ease: "power3.inOut" 
        });
      } else {
        // Scrolling Up - Show
        gsap.to(navRef.current, { 
          yPercent: 0, 
          duration: 0.5, 
          ease: "power3.out" 
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-8 ${scrolled ? 'py-1 bg-transparent' : 'pt-0 pb-2 bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center group">
          <Link href="/" className="transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/Image/goHighLogo.png"
              alt="goHigh Logo"
              width={400}
              height={100}
              className="h-33 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-12 mb-6 items-center">
          {[
            { name: 'About us', href: '/about' },
            { name: 'Services', href: '/#services' },
            { name: 'Contact', href: '/contact' }
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{ color: '#1a2a3a' }}
              className="relative font-inter text-[13px] font-semibold tracking-[1.5px] uppercase transition-colors duration-300 hover:text-sky-500 group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}


        </div>
      </div>
    </nav>
  );
};

export default Navbar;

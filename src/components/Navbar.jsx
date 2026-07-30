"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { media } from '@/lib/media';

const NAV_LINKS = [
  { name: 'About us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef(null);
  const toggleRef = useRef(null);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);
  const ticking = useRef(false);

  useEffect(() => {
    // Reset hide state on route change
    hidden.current = false;
    lastScrollY.current = 0;
    if (barRef.current) {
      gsap.set(barRef.current, { yPercent: 0 });
    }

    const applyScroll = (currentScrollY) => {
      ticking.current = false;

      const goingDown = currentScrollY > lastScrollY.current && currentScrollY > 120;
      if (goingDown && !hidden.current) {
        hidden.current = true;
        gsap.to(barRef.current, {
          yPercent: -100,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: "auto",
        });
      } else if (!goingDown && hidden.current) {
        hidden.current = false;
        gsap.to(barRef.current, {
          yPercent: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => applyScroll(window.scrollY));
    };

    const handleLocoScroll = (e) => {
      if (ticking.current) return;
      ticking.current = true;
      const y = e.detail?.y ?? 0;
      requestAnimationFrame(() => applyScroll(y));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('loco-scroll', handleLocoScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('loco-scroll', handleLocoScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      hidden.current = false;
      gsap.to(barRef.current, { yPercent: 0, duration: 0.3, overwrite: "auto" });
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <nav className={`site-navbar${menuOpen ? " is-open" : ""}`}>
      <div ref={barRef} className="site-navbar-bar">
        <div className="site-navbar-inner">
          <div className="site-navbar-brand">
            <Link href="/" className="site-navbar-logo">
              <Image
                src={media("logo")}
                alt="goHigh Logo"
                width={400}
                height={100}
                className="site-navbar-logo-image"
                priority
                unoptimized
              />
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="site-navbar-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <div className="site-navbar-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={pathname === link.href ? "is-active" : ""}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        id="site-navigation"
        className="site-navbar-panel"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={pathname === link.href ? "is-active" : ""}
            tabIndex={menuOpen ? undefined : -1}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

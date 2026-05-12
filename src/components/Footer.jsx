"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      padding: '100px 40px 60px',
      fontFamily: 'var(--font-montserrat), sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Massive Logo Section - Centered */}
        <div style={{ 
          marginBottom: '60px', 
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <h2 style={{
            fontSize: '269px',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #1a2a3a 30%, #00ffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-15px',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 0.8,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            paddingBottom: '20px',
            textAlign: 'center'
          }}>
            GOHIGH
          </h2>
        </div>

        {/* Footer Bottom Content */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '20px',
        }}>
          {/* Left Side - Socials Only */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ transition: 'all 0.3s' }} className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ transition: 'all 0.3s' }} className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ transition: 'all 0.3s' }} className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#9ca3af">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Single Line Links */}
          <div style={{ 
            display: 'flex', 
            gap: '30px', 
            alignItems: 'center' 
          }}>
            <Link href="/privacy" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>Terms</Link>
            <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>
              GoHigh@2026
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .social-icon:hover svg {
          fill: #1a2a3a;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;

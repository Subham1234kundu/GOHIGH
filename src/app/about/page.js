"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
 import CTASection from '@/components/CTASection';

const AboutPage = () => {
  return (
    <main style={{ background: '#ffffff', color: '#1a2a3a', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '200px 20px 120px 20px', 
        textAlign: 'center',
        background: '#fafafa',
        borderBottom: '1px solid #eeeeee'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 64px)', 
            fontWeight: 400, 
            lineHeight: 1.1, 
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            color: '#1a2a3a'
          }}>
            Engineering <span style={{ color: '#00c8c8' }}>Quality</span> <br/> At The Highest Level
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2vw, 20px)', 
            color: '#666', 
            lineHeight: 1.6,
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Gohigh is a global engineering partner focused on solving the most complex challenges for modern organizations.
          </p>
        </div>
      </section>

      {/* Image & Text Grid */}
      <section style={{ padding: '120px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#00c8c8', marginBottom: '24px', fontWeight: 600 }}>
              Our Approach
            </h2>
            <h3 style={{ fontSize: '32px', fontWeight: 400, marginBottom: '32px', lineHeight: 1.3 }}>
              We build systems that are as robust as they are elegant.
            </h3>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.6, marginBottom: '24px' }}>
              Our philosophy is rooted in technical excellence and absolute transparency. We don't just deliver software; we engineer competitive advantages.
            </p>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.6 }}>
              By combining deep architectural expertise with rapid execution, we help our partners scale their impact without sacrificing stability.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src="/Image/about_team.png" 
              alt="Engineering Team" 
              style={{ width: '100%', height: 'auto', borderRadius: '0', boxShadow: '20px 20px 0px #00c8c8' }} 
            />
          </div>
        </div>
      </section>

      {/* Full Width Image Section */}
      <section style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src="/Image/about_tech.png" 
          alt="Technology" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'rgba(26, 42, 58, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <div style={{ maxWidth: '800px', textAlign: 'center', color: '#ffffff', padding: '0 20px' }}>
            <h4 style={{ fontSize: '40px', fontWeight: 400, lineHeight: 1.2 }}>
              Driving Innovation Through <span style={{ color: '#00ffff' }}>Surgical</span> Execution.
            </h4>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '120px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            {[
              { title: "Scale First", desc: "Every system is designed to handle tomorrow's growth from day one." },
              { title: "Absolute Trust", desc: "We maintain 100% transparency through every stage of the project lifecycle." },
              { title: "Local Presence", desc: "Operating from our hub in Kolkata with a global perspective." }
            ].map((value, i) => (
              <div key={i} style={{ padding: '40px', background: '#ffffff', border: '1px solid #eeeeee' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#1a2a3a', marginBottom: '16px' }}>{value.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default AboutPage;

"use client";

import React from 'react';
import Navbar from '@/components/Navbar';

const ContactPage = () => {
  return (
    <main style={{ background: '#ffffff', color: '#1a2a3a', minHeight: '100vh' }}>
      <Navbar />

      <section style={{ padding: '180px 20px 100px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '100px' }}>
          
          {/* Text Section */}
          <div>
            <h1 style={{ 
              fontSize: '14px', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              color: '#00c8c8', 
              marginBottom: '24px',
              fontWeight: 600
            }}>
              Contact Us
            </h1>
            <h2 style={{ 
              fontSize: 'clamp(40px, 6vw, 56px)', 
              fontWeight: 400, 
              lineHeight: 1.1, 
              marginBottom: '32px',
              letterSpacing: '-1px'
            }}>
              Let's build something <span style={{ color: '#00c8c8' }}>unbreakable</span>.
            </h2>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.6, marginBottom: '48px' }}>
              Have a complex challenge? Our engineers are ready to dive in. Reach out to discuss your project or schedule a technical discovery session.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>Email Us</div>
                <div style={{ fontSize: '20px', fontWeight: 500 }}>hello@goightechnology.com</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>Our Location</div>
                <div style={{ fontSize: '20px', fontWeight: 500 }}>Kolkata, West Bengal, 70009, India</div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div style={{ background: '#fafafa', padding: '60px', border: '1px solid #eeeeee' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, color: '#333' }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    borderBottom: '1px solid #cccccc', 
                    padding: '12px 0', 
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#00c8c8'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#cccccc'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, color: '#333' }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@organization.com" 
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    borderBottom: '1px solid #cccccc', 
                    padding: '12px 0', 
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#00c8c8'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#cccccc'}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600, color: '#333' }}>Message</label>
                <textarea 
                  placeholder="Tell us about your project..." 
                  rows="4"
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    borderBottom: '1px solid #cccccc', 
                    padding: '12px 0', 
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#00c8c8'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#cccccc'}
                />
              </div>

              <button style={{
                background: '#1a2a3a',
                color: '#ffffff',
                padding: '20px',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginTop: '16px',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#00c8c8'}
              onMouseOut={(e) => e.currentTarget.style.background = '#1a2a3a'}
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer-like spacer */}
      <div style={{ height: '100px' }} />
    </main>
  );
};

export default ContactPage;

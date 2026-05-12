"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "How do I get started with GoHigh?",
    answer: "Getting started is easy. Simply reach out to our team via the contact form, and we'll schedule a discovery call to understand your needs and how our Growth Engine can accelerate your business."
  },
  {
    question: "Is my data secure with your systems?",
    answer: "Security is our top priority. We use industry-standard encryption and follow best practices in cloud security to ensure that your data and your customers' data are always protected."
  },
  {
    question: "Can I integrate GoHigh with my existing tools?",
    answer: "Yes, our systems are built with flexibility in mind. We provide robust APIs and pre-built integrations for many popular CRM, marketing, and data platforms."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer tiered support levels, ranging from standard email support to dedicated account managers and 24/7 technical assistance for enterprise clients."
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      borderBottom: '1px solid #eeeeee',
      background: '#ffffff'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          outline: 'none'
        }}
      >
        <span style={{
          fontSize: '18px',
          fontWeight: 500,
          color: '#1a1a1a',
          fontFamily: 'inherit'
        }}>
          {question}
        </span>
        <span style={{
          fontSize: '24px',
          color: '#888',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
        }}>
          +
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? '200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-out, padding 0.3s ease',
        paddingBottom: isOpen ? '24px' : '0'
      }}>
        <p style={{
          margin: 0,
          color: '#666',
          lineHeight: '1.6',
          fontSize: '16px'
        }}>
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header > *', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: '#ffffff',
      padding: '120px 20px',
      fontFamily: 'var(--font-montserrat), sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div className="faq-header" style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#00c8c8',
            marginBottom: '16px',
            fontWeight: 600
          }}>
            Frequently Asked Questions
          </h2>
          <h3 style={{
            fontSize: 'clamp(32px, 4vw, 40px)',
            fontWeight: 400,
            color: '#1a1a1a',
            marginBottom: '20px',
            lineHeight: 1.2
          }}>
            Questions
          </h3>
          <p style={{
            color: '#666',
            fontSize: '18px',
            lineHeight: 1.6,
            maxWidth: '600px'
          }}>
            From setup to security, here's everything you need to know before getting started.
          </p>
        </div>

        <div style={{ borderTop: '1px solid #eeeeee' }}>
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 80px 20px !important;
          }
          h3 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;

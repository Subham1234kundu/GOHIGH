"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ensureGsap, refreshScroll } from "@/lib/gsapReveal";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

const faqData = [
  {
    question: "How do I get started with GoHigh?",
    answer:
      "Getting started is easy. Simply reach out to our team via the contact form, and we'll schedule a discovery call to understand your needs and how our Growth Engine can accelerate your business.",
  },
  {
    question: "Is my data secure with your systems?",
    answer:
      "Security is our top priority. We use industry-standard encryption and follow best practices in cloud security to ensure that your data and your customers' data are always protected.",
  },
  {
    question: "Can I integrate GoHigh with my existing tools?",
    answer:
      "Yes, our systems are built with flexibility in mind. We provide robust APIs and pre-built integrations for many popular CRM, marketing, and data platforms.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer tiered support levels, ranging from standard email support to dedicated account managers and 24/7 technical assistance for enterprise clients.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope, but most automation and software projects move from discovery to first delivery in 4–12 weeks. We share a clear roadmap and milestones before any build begins.",
  },
  {
    question: "Do you work with startups or only enterprises?",
    answer:
      "Both. We partner with early-stage teams that need scalable foundations, and with established businesses ready to modernize systems, automate workflows, and grow with confidence.",
  },
  {
    question: "What makes GoHigh different from other agencies?",
    answer:
      "We don't ship disconnected tools. We design connected growth systems — AI, software, DevOps, and creative execution — engineered to work together and scale with your business.",
  },
  {
    question: "Can you maintain and optimize systems after launch?",
    answer:
      "Yes. Post-launch we monitor performance, refine automations, and continuously optimize infrastructure so your systems stay fast, secure, and aligned with your growth goals.",
  },
  {
    question: "How do pricing and engagement models work?",
    answer:
      "We offer project-based builds and ongoing retainers. After a short discovery call, we recommend the model that fits your goals, timeline, and budget — with transparent scope and no surprises.",
  },
];

const Chevron = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    style={{
      flexShrink: 0,
      marginTop: "4px",
      transition: "transform 0.3s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path
      d="M2 5L7 10L12 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FAQItem = ({ question, answer, isOpen, onToggle, tone }) => (
  <div
    className="faq-item"
    data-open={isOpen ? "true" : "false"}
    style={{
      borderBottom: `1px solid ${tone.line}`,
    }}
  >
    <button
      className="faq-btn"
      onClick={onToggle}
      aria-expanded={isOpen}
      style={{
        width: "100%",
        paddingTop: isOpen ? "20px" : "14px",
        paddingBottom: isOpen ? "20px" : "14px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        outline: "none",
        color: tone.text,
        fontFamily: "inherit",
      }}
    >
      <span
        className="faq-q"
        style={{
          display: "block",
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: "-0.1px",
        }}
      >
        {question}
      </span>
      <Chevron open={isOpen} />
    </button>

    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.35s ease",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <p
          className="faq-answer"
          style={{
            margin: "0 0 14px",
            paddingRight: "28px",
            color: tone.muted,
            lineHeight: 1.6,
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  </div>
);

const TONES = {
  light: {
    bg: "#ffffff",
    text: "#1a1a1a",
    muted: "#666666",
    line: "#eeeeee",
    padding: "120px 40px",
    font: "var(--font-montserrat), sans-serif",
    maxWidth: "1200px",
    titleWeight: 400,
    titleTracking: "-1.5px",
    titleSize: "clamp(48px, 7vw, 72px)",
    embedded: false,
  },
  services: {
    bg: "transparent",
    text: "#1a1a1a",
    muted: "rgba(26,26,26,0.55)",
    line: "rgba(26,26,26,0.12)",
    padding: "clamp(4.5rem, 10vh, 7rem) clamp(1.5rem, 5vw, 4.5rem)",
    font: "var(--font-space-grotesk), var(--font-montserrat), sans-serif",
    maxWidth: "1400px",
    titleWeight: 700,
    titleTracking: "-0.045em",
    titleSize: "clamp(2.75rem, 6vw, 4.5rem)",
    embedded: true,
  },
};

/**
 * Reusable FAQ accordion.
 * @param {"light"|"services"} variant — light for home, services for edge-styled page
 */
const FAQSection = ({ variant = "light" }) => {
  const tone = TONES[variant] || TONES.light;
  const embedded = tone.embedded;
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const { isSmooth, status } = useSmoothScroll();

  useEffect(() => {
    // Wait for Locomotive (when present) before binding ScrollTriggers
    if (status === "pending") return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const scroller = isSmooth
      ? section.closest("[data-scroll-container]") || undefined
      : undefined;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(section.querySelectorAll(".faq-item"));
      if (!items.length) return;

      const GAP_OPEN = 20;

      items.forEach((item) => {
        const btn = item.querySelector(".faq-btn");
        if (!btn) return;

        if (item.getAttribute("data-open") === "true") {
          gsap.set(item, { clearProps: "transform,opacity,visibility" });
          gsap.set(btn, {
            paddingTop: GAP_OPEN,
            paddingBottom: GAP_OPEN,
          });
          return;
        }

        gsap.fromTo(
          item,
          { y: 80, autoAlpha: 0.15, force3D: true },
          {
            y: 0,
            autoAlpha: 1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "top 70%",
              scrub: 1,
              ...(scroller ? { scroller } : {}),
            },
          }
        );
      });
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [isSmooth, status]);

  useEffect(() => {
    refreshScroll();
  }, [openIndex]);

  return (
    <section
      ref={sectionRef}
      data-scroll={embedded ? true : undefined}
      data-scroll-section={embedded ? true : undefined}
      className={embedded ? "services-faq" : undefined}
      style={{
        background: tone.bg,
        padding: tone.padding,
        fontFamily: tone.font,
        color: tone.text,
        isolation: "isolate",
        position: "relative",
        zIndex: 1,
        borderTop: embedded ? `1px solid ${tone.line}` : undefined,
        borderBottom: embedded ? `1px solid ${tone.line}` : undefined,
      }}
    >
      <div
        className="faq-layout"
        style={{
          maxWidth: tone.maxWidth,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(260px, 0.9fr) 1.2fr",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <div className="faq-left">
          <h2
            style={{
              fontSize: tone.titleSize,
              fontWeight: tone.titleWeight,
              color: tone.text,
              margin: "0 0 16px",
              lineHeight: 1,
              letterSpacing: tone.titleTracking,
            }}
          >
            FAQ
          </h2>
          <p
            style={{
              margin: 0,
              color: tone.muted,
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: 1.55,
              fontWeight: 400,
              maxWidth: "380px",
            }}
          >
            Got questions about our systems & growth engine? We&apos;ve answered
            the most common ones right here for you.
          </p>
        </div>

        <div
          ref={listRef}
          className="faq-list"
          style={{ borderTop: `1px solid ${tone.line}` }}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              tone={tone}
              onToggle={() =>
                setOpenIndex((prev) => (prev === index ? -1 : index))
              }
            />
          ))}
        </div>
      </div>

      <div
        style={{
          maxWidth: tone.maxWidth,
          margin: "64px auto 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          href="/contact"
          className={embedded ? "services-btn" : undefined}
          style={
            embedded
              ? undefined
              : {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0a0a0a",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                }
          }
        >
          Ask Us Anything
        </Link>
      </div>

      <style jsx>{`
        :global(.faq-btn:focus-visible) {
          outline: 2px solid #3aabd4 !important;
          outline-offset: 4px;
          border-radius: 2px;
        }
        @media (max-width: 900px) {
          .faq-layout {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          section:not(.services-faq) {
            padding: 80px 24px !important;
          }
        }
        @media (max-width: 520px) {
          section:not(.services-faq) {
            padding: 64px 20px !important;
          }
          :global(.faq-answer) {
            padding-right: 4px !important;
            font-size: 15px !important;
          }
          :global(.faq-q) {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection;

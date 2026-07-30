"use client";

import { useEffect, useRef, useState } from "react";
import { SmoothScrollContext } from "@/context/SmoothScrollContext";
import { ensureGsap } from "@/lib/gsapReveal";

const MOBILE_MQ = "(max-width: 768px)";
const REDUCED_MQ = "(prefers-reduced-motion: reduce)";

/**
 * Locomotive Scroll wrapper synced with GSAP ScrollTrigger via scrollerProxy.
 * Smooth scrolling is disabled on mobile / reduced-motion for performance.
 *
 * status: "pending" | "smooth" | "native"
 * Child scroll animations should wait until status !== "pending".
 */
export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const locoRef = useRef(null);
  const [status, setStatus] = useState(() => {
    if (typeof window === "undefined") return "pending";
    if (
      window.matchMedia(MOBILE_MQ).matches ||
      window.matchMedia(REDUCED_MQ).matches
    ) {
      return "native";
    }
    return "pending";
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    const mobile = window.matchMedia(MOBILE_MQ).matches;
    const reduced = window.matchMedia(REDUCED_MQ).matches;

    if (mobile || reduced) {
      setStatus("native");
      return;
    }

    let destroyed = false;
    let locoScroll = null;
    let onRefresh = null;
    let onResize = null;

    const boot = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      await import("locomotive-scroll/dist/locomotive-scroll.css");

      if (destroyed || !containerRef.current) return;

      const { ScrollTrigger } = ensureGsap();

      locoScroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 0.95,
        lerp: 0.08,
        class: "is-inview",
        smartphone: { smooth: false },
        tablet: { smooth: false, breakpoint: 1024 },
      });

      locoRef.current = locoScroll;

      locoScroll.on("scroll", (args) => {
        if (destroyed) return;
        ScrollTrigger.update();
        window.dispatchEvent(
          new CustomEvent("loco-scroll", {
            detail: { y: args?.scroll?.y ?? 0 },
          })
        );
      });

      const getY = () =>
        locoScroll?.scroll?.instance?.scroll?.y ?? 0;

      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          if (!locoScroll?.scroll) {
            return 0;
          }
          if (arguments.length) {
            locoScroll.scrollTo(value, {
              duration: 0,
              disableLerp: true,
            });
            return;
          }
          return getY();
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: containerRef.current?.style?.transform
          ? "transform"
          : "fixed",
      });

      ScrollTrigger.defaults({ scroller: containerRef.current });

      onRefresh = () => {
        if (!destroyed) locoScroll?.update();
      };
      ScrollTrigger.addEventListener("refresh", onRefresh);

      onResize = () => {
        if (destroyed) return;
        locoScroll?.update();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      requestAnimationFrame(() => {
        if (destroyed) return;
        locoScroll?.update();
        ScrollTrigger.refresh();
        setStatus("smooth");
      });
    };

    boot();

    return () => {
      destroyed = true;
      const { ScrollTrigger } = ensureGsap();
      const scrollerEl = el;

      if (onRefresh) ScrollTrigger.removeEventListener("refresh", onRefresh);
      if (onResize) window.removeEventListener("resize", onResize);

      // Kill triggers that used this scroller before destroying loco
      ScrollTrigger.getAll().forEach((st) => {
        const triggerScroller = st.scroller;
        if (
          triggerScroller === scrollerEl ||
          st.vars?.scroller === scrollerEl
        ) {
          st.kill();
        }
      });

      ScrollTrigger.defaults({ scroller: window });

      if (locoScroll) {
        try {
          locoScroll.destroy();
        } catch {
          /* ignore destroy races during HMR */
        }
        locoScroll = null;
      }
      locoRef.current = null;
      setStatus("pending");

      // Let remaining page triggers remeasure against window
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  const isSmooth = status === "smooth";

  return (
    <SmoothScrollContext.Provider
      value={{ scroll: locoRef, containerRef, isSmooth, status }}
    >
      <div ref={containerRef} data-scroll-container className="smooth-scroll-root">
        {children}
      </div>
    </SmoothScrollContext.Provider>
  );
}

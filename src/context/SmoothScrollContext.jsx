"use client";

import { createContext, useContext } from "react";

export const SmoothScrollContext = createContext({
  scroll: null,
  containerRef: null,
  isSmooth: false,
  // "native" outside SmoothScroll so scroll animations don't wait forever
  status: "native",
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

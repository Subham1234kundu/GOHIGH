"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

/** Hide layout footer when the page embeds Footer inside Locomotive (services). */
export default function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/services")) return null;
  return <Footer />;
}

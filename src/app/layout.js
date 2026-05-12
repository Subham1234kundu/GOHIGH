import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "GoHigh Engineering",
  description: "Engineering the unexpected with AI, DevOps, and Automation.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${montserrat.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <PageLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

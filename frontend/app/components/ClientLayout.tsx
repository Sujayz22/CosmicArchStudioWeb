'use client';

import React, { useEffect } from 'react';
import { Inter, Playfair_Display } from "next/font/google";
import LoadingOverlay from "./LoadingOverlay";
import { LoadingProvider, useLoading } from "../context/LoadingContext";
import Lenis from 'lenis';
import Footer from './Footer';
import CTA from './CTA';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

function Content({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();
  
  if (isLoading) {
    return null;
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      {children}
      <CTA />
      <Footer />
    </>
  );
}

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <body className={`${inter.variable} ${playfair.variable} font-sans bg-dark text-light`}>
      <LoadingProvider>
        <LoadingOverlay />
        <Content>
          {children}
        </Content>
      </LoadingProvider>
    </body>
  );
};

export default ClientLayout; 
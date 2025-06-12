'use client';

import React from 'react';
import Link from 'next/link';
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <AnimatePresence>
      <motion.footer
        ref={ref}
        initial={isMobile ? {} : { opacity: 0, y: 50 }}
        animate={isMobile ? {} : inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        exit={isMobile ? {} : { opacity: 0, y: 50 }}
        transition={
          isMobile
            ? {}
            : {
                duration: 0.8,
                ease: 'easeOut',
                opacity: { duration: 0.6 },
                y: { duration: 0.8 },
              }
        }
        className="bg-primary text-white rounded-[2.5rem] mx-4 mb-4 md:mx-8 md:mb-12"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-custom py-10 md:py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Services Column */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-wider text-neutral-300 flex md:items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Services
              </h3>
              <ul className="space-y-4 text-center md:text-left md:px-4">
                <li>
                  <Link href="/services/architectural-design" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Architectural Design
                  </Link>
                </li>
                <li>
                  <Link href="/services/interior-design" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Interior Design
                  </Link>
                </li>
                <li>
                  <Link href="/services/renovation" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Renovation
                  </Link>
                </li>
                <li>
                  <Link href="/services/space-planning" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Space Planning
                  </Link>
                </li>
                <li>
                  <Link href="/services/consulting" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Consulting
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sitemap Column */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-wider text-neutral-300 flex md:items-center justify-center md:justify-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Quick Links
              </h3>
              <ul className="space-y-4 text-center md:text-left md:px-4">
                <li>
                  <Link href="/" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-2xl font-medium hover:text-secondary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-2xl font-medium hover:text-secondary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-xl">Cosmic</span>
              <span className="font-sans font-light text-xl">Arch Studio</span>
              <span className="font-sans font-light text-xl">© {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-neutral-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </motion.div>
      </motion.footer>
    </AnimatePresence>
  );
};

export default Footer;
'use client';

import React from 'react';
import Link from 'next/link';
import { MorphingText } from '@/components/magicui/morphing-text';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const texts = ["CosmicArch", "Studio.", "Design", "Elevated."];
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Set to false to enable exit animation
  });

  return (
    <AnimatePresence>
      <motion.footer
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-primary text-white rounded-[2.5rem] mx-4 mb-4 md:mx-8 md:mb-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="container-custom py-10 md:py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Morphing Text */}
            <div className="text-center lg:text-left">
              <MorphingText
                texts={texts}
                className="text-5xl md:text-8xl lg:text-9xl font-bold text-secondary !justify-start"
              />
            </div>

            {/* Right Column: Quick Links */}
            <div className="space-y-6 lg:right">
              <h3 className="text-sm uppercase tracking-wider text-neutral-300 flex items-center justify-center lg:center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                QUICK LINKS
              </h3>
              <ul className="space-y-3 text-center lg:text-center text-xl">
                <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-secondary transition-colors">About</Link></li>
                <li><Link href="/projects" className="hover:text-secondary transition-colors">Projects</Link></li>
                <li><Link href="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
                <li><Link href="/reviews" className="hover:text-secondary transition-colors">Reviews</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
            <div className="font-medium text-gray-300">
              Cosmic Arch Studio © {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-6">
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
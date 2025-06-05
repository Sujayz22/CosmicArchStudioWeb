'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import CTA from '../components/CTA';
import { TextAnimate } from '@/components/magicui/text-animate';

const ContactPage = () => {
  return (
    <main className=" bg-neutral-light">
      <Navbar />
      <div className="pt-20 ">
        {/* Hero Section */}
        <div className="container-custom py-16 md:py-24">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary rounded-full animate-pulse" />
            <TextAnimate
              as="h1"
              className="text-4xl md:text-5xl lg:text-8xl font-bold font-playfair text-primary"
              animation="blurInUp"
              by="word"
              delay={0.3}
              duration={1.2}
            >
              Get in touch
            </TextAnimate>
            <div className="w-8 h-8 bg-secondary rounded-full animate-pulse" />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-2xl text-neutral-600 max-w-2xl mt-6"
          >
            For any inquiries or to explore your vision further, we invite you to contact our professional team using the details provided below.
          </motion.p>
        </div>
      </div>
    </main>
  );
};

export default ContactPage; 
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";


const Hero = () => {
  return (
    <section className="min-h-screen bg-neutral-light relative">
      <div className="container-custom pt-16 pb-12 sm:pt-25">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 md:space-y-8">
              <TypingAnimation duration={70} startOnView className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium leading-[1.1] text-black">
                Building Your Dreams, Brick by Beautiful Brick.
              </TypingAnimation>
            
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay:0.9 }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-sm text-primary">Available for work</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-base md:text-2xl text-neutral/80 max-w-xl"
            >
              Cosmic Arch Studio delivers expert home improvements, creating beautiful and functional spaces with quality craftsmanship.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9}}
            >
              <InteractiveHoverButton
                className="mt-6 px-6 py-3 text-lg"
              >
                <a href="/contact">Book a consultation</a>
              </InteractiveHoverButton>
            </motion.div>
           
          </div>

          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/hero-image.png"
              alt="Modern kitchen interior with dark walls and wooden elements"
              fill
              className="object-cover"
              priority
            />
            
            {/* Review Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9,}}
              className="absolute bottom-6 right-6 bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-xl max-w-xs shadow-lg"
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm md:text-base text-gray-900">
                "Cosmic Arch Studio has been a game-changer for my home. Their ability to blend functionality with exquisite design is unparalleled."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Link from 'next/link';
import { fetchFromStrapi } from '../utils/strapi';
import { HeroSkeleton } from '@/components/ui/skeleton';

interface HeroData {
  data: {
    description: string;
    heroImage: {
      id: number;
      name: string;
      alternativeText: string | null;
      url: string;
    };
    imageText: string;
  }
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFromStrapi('/herosection', {
          populate: ['heroImage']
        }) as HeroData;
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !heroData) {
    return <HeroSkeleton />;
  }

  const { description, heroImage, imageText } = heroData.data;

  return (
    <section className="min-h-screen bg-neutral-light relative">
      <div className="container-custom pt-4 md:pt-16 pb-12 sm:pt-25">
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
              {description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9}}
            ><Link href="/contact">
              <InteractiveHoverButton
                className="mt-6 px-6 py-3 text-lg"
              >
                Book a consultation
              </InteractiveHoverButton></Link>
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
              src={`${heroImage.url}`}
              alt={heroImage.alternativeText || 'Hero image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
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
              <p className="text-sm md:text-base text-gray-900">
                {imageText}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 
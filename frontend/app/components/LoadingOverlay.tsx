'use client';

import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext';
import { usePathname } from 'next/navigation';

const LoadingOverlay = () => {
  const { isLoading, setIsLoading } = useLoading();
  const pathname = usePathname();
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only show on homepage and if hasn't been shown before
    if (pathname === '/' && !hasShown) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasShown(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [pathname, setIsLoading, hasShown]);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: "100vh"
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.16, 1, 0.3, 1),
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      y: "-100vh",
      transition: {
        duration: 0.9,
        ease: cubicBezier(0.16, 1, 0.3, 1)
      }
    }
  };

  const textVariants = {
    hidden: { 
      y: 50,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && pathname === '/' && !hasShown && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="text-center">
            <motion.div
              className="text-4xl md:text-6xl font-display font-bold text-white"
              variants={textVariants}
            >
              Cosmic
            </motion.div>
            <motion.div
              className="text-2xl md:text-4xl font-sans font-light text-white/90 mt-2"
              variants={textVariants}
            >
              Arch Studio
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay; 
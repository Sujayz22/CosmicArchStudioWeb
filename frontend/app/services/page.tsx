'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBath } from 'react-icons/fa';
import { MdOutlineDesignServices } from "react-icons/md";
import { GiWoodenChair } from "react-icons/gi";
import { CgDesignmodo, CgWorkAlt } from "react-icons/cg";
import { FaShop } from 'react-icons/fa6';
import { RiLandscapeAiLine } from "react-icons/ri";
import Image from 'next/image';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import { getServices, Service } from '../actions/getServices';
import { ServiceCardSkeleton } from '@/components/ui/skeleton';

// Map of icon names to components
const iconMap: { [key: string]: React.ElementType } = {
  FaHome,
  FaShop,
  RiLandscapeAiLine,
  GiWoodenChair,
  MdOutlineDesignServices,
  CgWorkAlt,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          console.error('Invalid services data:', data);
          setError('Invalid data received from server');
        }
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  return (
    <main className="min-h-screen bg-dark">
      <ScrollToTop />
      <Navbar />
      <div className="pt-20 mb-8">
        <section className="container-custom py-16">
          {/* Header - Always visible */}
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-center px-3 rounded-full py-1 bg-yellow-400 mb-4">Our Services.</h1>
            <p className="text-center text-xl text-neutral-600 max-w-2xl">
              Discover our comprehensive range of design and construction services, tailored to bring your vision to life.
            </p>
          </div>

          {/* Content Section */}
          {loading ? (
            // Show skeleton loading for service cards only
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            // Show error message
            <div className="flex justify-center items-center min-h-[60vh]">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : !services.length ? (
            // Show no services message
            <div className="flex justify-center items-center min-h-[60vh]">
              <p className="text-neutral-600 text-lg">No services available at the moment.</p>
            </div>
          ) : (
            // Show actual service cards
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = service.icon ? iconMap[service.icon] : null;
                return (
                  <motion.div
                    key={service.id}
                    className="group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col">
                      {Icon && <Icon className="text-4xl text-primary mb-4" />}
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-neutral-600 flex-grow">{service.description}</p>
                      <div className="mt-4 flex items-center text-primary font-semibold">
                        Learn more
                        <svg
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
            style={{ overscrollBehavior: 'contain' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 md:h-96 flex-shrink-0">
                {selectedService.image?.url && (
                  <Image
                    src={`${selectedService.image.url}`}
                    alt={selectedService.title}
                    fill
                    className="object-cover rounded-t-3xl"
                  />
                )}
                <button
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors z-10"
                  onClick={() => setSelectedService(null)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto flex-1 scrollbar-hide">
                <div className="flex items-center gap-4 mb-6">
                  {selectedService.icon && iconMap[selectedService.icon] && (
                    <div className="text-4xl text-primary">
                      {React.createElement(iconMap[selectedService.icon])}
                    </div>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold">{selectedService.title}</h2>
                </div>
                <p className="text-neutral-600 mb-8">{selectedService.longDescription}</p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.feature?.map((feature) => (
                      <li key={feature.id} className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 
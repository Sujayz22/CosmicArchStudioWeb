'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuButtonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const mobileDropdownVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    }
  };

  const serviceItems = [
    {
      title: "Architectural Design",
      icon: "🏛️",
      description: "Create stunning architectural designs"
    },
    {
      title: "Space Planning",
      icon: "📐",
      description: "Optimize your space utilization"
    },
    {
      title: "Residential Interiors",
      icon: "🏠",
      description: "Transform your living spaces"
    },
    {
      title: "Commercial Interiors",
      icon: "🏢",
      description: "Design for business environments"
    },
    {
      title: "Elevation Design",
      icon: "🎨",
      description: "Beautiful facade designs"
    }
  ];

  return (
    <>
      <nav className="fixed w-full z-50 bg-neutral-light/95 backdrop-blur-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-medium text-primary flex items-center gap-2">
              <img 
                src="/logocosmic.webp" 
                alt="Cosmic Arch Studio Logo" 
                className="h-10 w-auto"
              />
              <div className="hidden md:block">
                <span className="font-display font-bold">Cosmic</span>{" "}
                <span className="font-sans font-light">Arch Studio</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center">
              <div className="bg-white/50 rounded-full px-2 py-1.5 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-1">
                  <Link href="/" className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                    Home
                  </Link>
                  <Link href="/about" className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                    About
                  </Link>
                  <div 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown('services')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link href="/services" className="text-neutral hover:text-primary px-4 py-2 rounded-full">
                      Services
                    </Link>
                    <AnimatePresence>
                      {activeDropdown === 'services' && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={dropdownVariants}
                          className="absolute top-full left-0 mt-2 p-4 bg-white rounded-2xl min-w-[320px] shadow-lg grid grid-cols-1 gap-2"
                        >
                          {serviceItems.map((item, index) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link 
                                href={`/services/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-light transition-colors group"
                              >
                                <span className="text-xl">{item.icon}</span>
                                <div>
                                  <div className="font-medium text-neutral group-hover:text-primary transition-colors">{item.title}</div>
                                  <div className="text-sm text-neutral/60 group-hover:text-neutral/80 transition-colors">{item.description}</div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Link href="/projects" className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                    Projects
                  </Link>
                  <Link href="/gallery" className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                    Gallery
                  </Link>
                  <Link href="/reviews" className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                    Reviews
                  </Link>
                  <Link href="/contact" className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden w-10 h-10 flex items-center justify-center text-neutral hover:text-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={menuButtonVariants}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24"
                  className="text-current"
                >
                  {isOpen ? (
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M6 6L18 18M6 18L18 6"
                    />
                  ) : (
                    <>
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </>
                  )}
                </svg>
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-neutral-light z-40 md:hidden"
          >
            <div className="flex flex-col items-start p-6 pt-24">
              <Link 
                href="/about" 
                className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="w-full">
                <button 
                  className="w-full text-left text-neutral hover:text-primary py-4 hover: rounded-xl px-4 flex items-center justify-between transition-colors"
                  onClick={() => setMobileActiveDropdown(mobileActiveDropdown === 'services' ? null : 'services')}
                >
                  <span>Services</span>
                  <motion.span
                    animate={{ rotate: mobileActiveDropdown === 'services' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-l"
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === 'services' && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={mobileDropdownVariants}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {serviceItems.map((item) => (
                          <Link
                            key={item.title}
                            href={`/services/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block p-3 rounded-xl hover:bg-secondary transition-colors group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">{item.icon}</span>
                              <div>
                                <div className="font-medium text-neutral group-hover:text-primary transition-colors">{item.title}</div>
                                <div className="text-sm text-neutral/60 group-hover:text-neutral/80 transition-colors">{item.description}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link 
                href="/our-work" 
                className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Our work
              </Link>
              <Link 
                href="/faqs" 
                className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>
              <Link 
                href="/contact" 
                className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 
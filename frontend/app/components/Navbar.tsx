'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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



  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('scrollToServices'));
    } else {
      sessionStorage.setItem('scrollToServices', 'true');
      router.push('/');
    }
  };

  return (
    <>
      <nav className="fixed w-full z-[50] bg-neutral-light/95 backdrop-blur-sm" style={{position:'fixed',top:0,left:0,right:0}}>
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
                    <button
                      type="button"
                      onClick={handleServicesClick}
                      className="text-neutral hover:text-primary px-4 py-2 rounded-full hover:bg-secondary transition-colors bg-transparent border-none cursor-pointer"
                    >
                      Services
                    </button>
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
              <Link href="/" className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <button
                type="button"
                onClick={e => { handleServicesClick(e); setIsOpen(false); }}
                className="w-full text-left text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors bg-transparent border-none cursor-pointer"
              >
                Services
              </button>
              <Link href="/projects" className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors" onClick={() => setIsOpen(false)}>
                Projects
              </Link>
              <Link href="/gallery" className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors" onClick={() => setIsOpen(false)}>
                Gallery
              </Link>
              <Link href="/reviews" className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors" onClick={() => setIsOpen(false)}>
                Reviews
              </Link>
              <Link href="/contact" className="w-full text-neutral hover:text-primary py-4 hover:bg-secondary rounded-xl px-4 transition-colors" onClick={() => setIsOpen(false)}>
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
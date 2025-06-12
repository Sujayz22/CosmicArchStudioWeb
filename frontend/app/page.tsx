'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Marquee } from '../components/magicui/marquee';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FaHome, FaBath } from 'react-icons/fa';
import { MdOutlineDesignServices } from "react-icons/md";
import { GiWoodenChair } from "react-icons/gi";
import { CgDesignmodo, CgWorkAlt, CgProfile } from "react-icons/cg";
import { FaShop } from 'react-icons/fa6';
import { RiLandscapeAiLine } from "react-icons/ri";
import Link from 'next/link';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { fetchAPI } from '@/lib/api';
import type { Project } from '@/lib/api';
import ScrollToTop from './components/ScrollToTop';
import FAQ from './components/FAQ';

const services = [
  {
    icon: FaHome,
    title: 'Residential Interior & Exterior Design',
    description: 'Transform your home inside and out with our expert residential design services.'
  },
  {
    icon: FaShop,
    title: 'Commercial Interior & Exterior Design',
    description: 'Enhance your business space with functional and stylish commercial design solutions.'
  },
  {
    icon: RiLandscapeAiLine,
    title: 'Landscape Design',
    description: 'Create beautiful, functional outdoor spaces with our landscape design expertise.'
  },
  {
    icon: GiWoodenChair,
    title: 'Furniture Design',
    description: 'Custom furniture pieces designed to fit your style and space perfectly.'
  },
  {
    icon: MdOutlineDesignServices,
    title: 'Design Consultation',
    description: 'Get expert advice and creative direction for your next design project.'
  },
  {
    icon: CgWorkAlt,
    title: 'Execution',
    description: 'This is where your vision takes tangible form. We meticulously translate designs into physical reality, ensuring every detail is precisely built to specification and brought to life with unwavering quality.'
  },
];

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [projectCards, setProjectCards] = useState<Project[]>([]);
  const [marqueeImages, setMarqueeImages] = useState<string[]>([]);
  const [stats, setStats] = useState<{ number: number; title: string; description: string; symbol: boolean }[]>([]);
  const [reviews, setReviews] = useState<{ name: string; type: string; review: string; rating: number; profilepic: { url: string } | null }[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchAPI<{ data: Project[] }>('projects?populate=*');
        setProjectCards(response.data.slice(0, 3));
      } catch (err) {
        setProjectCards([]);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const response = await fetchAPI<{ data: { images: any[] } }>('marquee?populate=images');
        if (response.data && response.data.images) {
          setMarqueeImages(response.data.images.map((img: any) => img.url));
        }
      } catch (err) {
        setMarqueeImages([]);
      }
    };
    fetchMarquee();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetchAPI<{ data: any[] }>('stats');
        if (response.data && Array.isArray(response.data)) {
          setStats(response.data.map((stat: any) => ({
            number: stat.number,
            title: stat.title,
            description: stat.description ?? '',
            symbol: stat.symbol ?? false
          })));
        } else if (response.data && typeof response.data === 'object') {
          setStats([
            {
              number: (response.data as any).number,
              title: (response.data as any).title,
              description: (response.data as any).description,
              symbol: (response.data as any).symbol ?? false
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setStats([]);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchAPI<{ data: any[] }>('reviews?populate=*');
        console.log('Reviews API Response:', response.data);
        if (response.data) {
          setReviews(response.data.map(review => ({
            name: review.name,
            type: review.type,
            review: review.review,
            rating: review.rating,
            profilepic: review.profilepic ? {
              url: review.profilepic.formats?.thumbnail?.url || review.profilepic.url
            } : null
          })));
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    
    const scrollToServices = () => {
    if (servicesRef.current) {
      const offset = 80;
      const top = servicesRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const scrollToCTA = () => {
    if (ctaRef.current) {
      const offset = 80;
      const top = ctaRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (typeof window !== 'undefined') {
    // Session-based scroll
    if (sessionStorage.getItem('scrollToServices')) {
      sessionStorage.removeItem('scrollToServices');
      setTimeout(scrollToServices, 300);
    }

    if (sessionStorage.getItem('scrollToCTA')) {
      sessionStorage.removeItem('scrollToCTA');
      setTimeout(scrollToCTA, 300);
    }

    // Custom events
    window.addEventListener('scrollToServices', scrollToServices);
    window.addEventListener('scrollToCTA', scrollToCTA);

    return () => {
      window.removeEventListener('scrollToServices', scrollToServices);
      window.removeEventListener('scrollToCTA', scrollToCTA);
    };
  }
}, []);

  return (
    <main className="min-h-screen bg-dark">
      <ScrollToTop />
      <Navbar />
      <div className="pt-20">
        <Hero />
        {/* About Section and Marquee Gallery */}
        <section className="container-custom py-16">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8 md:gap-0">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-secondary text-black rounded-full font-bold text-s mb-4">About us</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">The Design <br />Alchemists</h1>
              <button className="flex items-center gap-4 py-3 rounded-full font-medium text-black group">
                <Link href="/about" className="relative inline-block">
                  Know more
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/20 transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform duration-300 group-hover:rotate-45"
                  >
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
           </div>
            <div className="flex-2 md:pl-12">
              <p className="text-lg bg-primary p-4 rounded-lg text-white max-w-2xl md:mt-8">
                Welcome to Cosmic Arch Studio, your trusted home improvement experts, dedicated to transforming homes with precision and care. With years of experience in building kitchens, bathrooms, garages, and more, we take pride in delivering top-quality craftsmanship and a seamless customer experience. Our mission is to bring your vision to life while ensuring clear communication and expert guidance at every step. Let's create a home you'll love!
              </p>
            </div>
          </div>
          <div className="sm:overflow-visible overflow-hidden">
            <Marquee
              className="group relative flex w-full overflow-hidden [--duration:60s] px-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-neutral-100 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-neutral-100 after:to-transparent"
              repeat={2}
              pauseOnHover={false}
            >
              {marqueeImages.map((src, i) => (
                <div key={i} className="min-w-[280px] sm:min-w-[320px] h-[300px] sm:h-[400px] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center shadow mx-2">
                  <img
                    src={src}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </Marquee>
          </div>

          {/* Stats Section */}
          <div className="w-full bg-neutral-200 rounded-2xl mt-16 py-14 px-2 flex flex-col items-center">
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 justify-between text-center">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <span className="block text-5xl md:text-6xl font-light mb-3 font-sans">
                    <NumberTicker value={stat.number} startValue={0} className="text-5xl md:text-6xl font-sans" />
                    {stat.symbol ? '%' : '+'}
                  </span>
                  <div className="font-semibold text-lg mb-1 ">{stat.title}</div>
                  <div className="text-base text-neutral-500">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section ref={servicesRef} id="services-section" className="container-custom py-16">
          <div className="rounded-3xl bg-[#495f43] text-white p-10">
            <div className="flex flex-col items-center">
              <span className="inline-block px-3 py-1 bg-yellow-400 text-black rounded-full font-bold text-s mb-4">
                Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">What we do</h2>
              <p className="mb-8 text-lg text-white/80 text-center">
                Find out which one of our services fit the needs of your project
              </p>
            </div>
            {/* Services Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    className="group flex flex-col items-start bg-[#e6e9e3] rounded-2xl p-8 shadow transition-all duration-500 ease-in-out max-w-sm w-full mx-auto hover:-translate-y-2 hover:scale-95"
                  >
                    <Icon className="text-5xl text-[#495f43] mb-4 transition-all duration-500 ease-in-out group-hover:-translate-y-1 group-hover:scale-90" />
                    <div className="text-black text-xl font-bold text-left mb-2 transition-all duration-500 ease-in-out">
                      {service.title}
                    </div>
                    <div className="text-[#495f43] text-left text-base mt-1 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2 transition-all duration-500 ease-in-out overflow-hidden">
                      {service.description}
                    </div>
                  </div>
                );
              })}
            </div>
            <div ref={ctaRef}  className="flex justify-center mt-12">
              <Link href="/contact" className="flex items-center gap-4 py-3 rounded-full font-semibold text-white group scroll-smooth">
                <span className="relative inline-block text-xl">
                  Enquire Now
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform duration-300 group-hover:rotate-45"
                  >
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="container-custom py-16 bg-neutral-200 rounded-3xl">
          <div className=" flex flex-col items-center">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-black rounded-full font-bold text-s mb-4">
              Our Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">Our beautifully crafted work</h2>
            <p className="text-center text-lg text-neutral-600 max-w-2xl mx-auto">
              See how we've transformed homes with our expert craftsmanship and attention to detail.
            </p>
          </div>
          <div className="relative" style={{ height: `${projectCards.length * 100}vh` }}>
            {projectCards.map((card, idx) => (
              <div
                key={card.slug}
                className="sticky top-0 flex justify-center items-center transition-all duration-500"
                style={{ zIndex: idx + 1, height: '100vh' }}
              >
                <Link
                  href={`/projects/${card.slug}`}
                  aria-label={`View project: ${card.Title}`}
                  className="group w-full max-w-5xl flex justify-center items-center cursor-view-project"
                >
                  <div
                    className={`relative rounded-3xl shadow-lg w-full max-w-5xl h-[60vh] flex flex-col md:flex-row gap-16 items-center justify-center p-10 ${idx % 2 === 0 ? 'bg-primary text-white' : 'bg-secondary text-black'} cursor-pointer transition-transform duration-200`}
                  >
                    <Image src={card.coverImage.url} alt={card.client} width={400} height={400} className="rounded-2xl object-cover w-[400px] h-[400px]" />
                    <div className="flex-1 flex flex-col gap-4 justify-center">
                      <h3 className={`text-3xl font-bold mb-2 ${idx % 2 === 0 ? 'text-white' : 'text-black'}`}>{card.Title}</h3>
                      <p className={`mb-2 text-base md:text-lg ${idx % 2 === 0 ? 'text-white/90' : 'text-black/80'}`}>{card.description.split(' ').slice(0, 30).join(' ')}...</p>
                      <div className="flex gap-2 mb-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${idx % 2 === 0 ? 'bg-white text-primary' : 'bg-black text-white'}`}>{card.category}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${idx % 2 === 0 ? 'bg-white text-primary' : 'bg-black text-white'}`}>{card.type}</span>
                      </div>
                      <blockquote className={`italic border-l-4 pl-4 mb-2 ${idx % 2 === 0 ? 'text-white/80 border-white/50' : 'text-black/70 border-black/30'}`}>{card.review}</blockquote>
                      <div className="flex items-center gap-3 mt-2">
                        <Image src={card.coverImage.url} alt={card.client} width={32} height={32} className={`rounded-full object-cover border-2 ${idx % 2 === 0 ? 'border-white' : 'border-black'} aspect-square`} />
                        <span className={`font-semibold text-sm ${idx % 2 === 0 ? 'text-white' : 'text-black'}`}>{card.client}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/projects" passHref legacyBehavior>
              <a className="flex items-center gap-4 py-3 rounded-full font-semibold text-black group">
                <span className="relative inline-block text-xl">
                  View all Projects
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary group-hover:bg-secondary/80 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:rotate-45">
                    <path d="M7 13L13 7M13 7H7M13 7V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </Link>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="container-custom py-16 w-full">
          <div className="flex flex-col items-center mb-10">
            <span className="inline-block px-3 py-1 bg-yellow-400 text-black rounded-full font-bold text-s mb-4">Reviews</span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-2">Hear from our clients</h2>
            <p className="text-center text-lg text-neutral-600 max-w-2xl mx-auto">
              Hear from our happy clients about their experience working with Cosmic Arch Studio and the quality of our craftsmanship.
            </p>
          </div>
          {/* First Marquee Row */}
          <div className="sm:overflow-visible overflow-hidden">
            <Marquee
              className="w-full my-16 overflow-hidden"
              pauseOnHover={true}
              fullWidth={true}
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className={`w-[280px] sm:w-[400px] min-w-[280px] sm:min-w-[400px] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col justify-between h-[240px] sm:h-[280px] border border-neutral-100/50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f3f4f6]'} hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div>
                    <div className="flex items-center mb-3">
                      {[...Array(review.rating)].map((_, idx) => (
                        <svg key={idx} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-base text-gray-800 mb-4 line-clamp-4">
                      {review.review}
                    </p>
                  </div>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                    {review.profilepic ? (
                      <Image
                        src={review.profilepic.url}
                        alt={`${review.name}'s profile`}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-white mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <CgProfile className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-900">
                        {review.name}
                      </span>
                      <span className="text-xs text-gray-500">{review.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
          {/* Second Marquee Row (opposite direction) */}
          <div className="sm:overflow-visible overflow-hidden">
            <Marquee
              className="w-full my-8 overflow-hidden"
              pauseOnHover={true}
              reverse={true}
              fullWidth={true}
            >
              {[...reviews].reverse().map((review, i) => (
                <div
                  key={i}
                  className={`w-[280px] sm:w-[400px] min-w-[280px] sm:min-w-[400px] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col justify-between h-[240px] sm:h-[280px] border border-neutral-100/50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f3f4f6]'} hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div>
                    <div className="flex items-center mb-3">
                      {[...Array(review.rating)].map((_, idx) => (
                        <svg key={idx} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-base text-gray-800 mb-4 line-clamp-4">
                      {review.review}
                    </p>
                  </div>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                    {review.profilepic ? (
                      <Image
                        src={review.profilepic.url}
                        alt={`${review.name}'s profile`}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-white mr-4"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                        <CgProfile className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-900">
                        {review.name}
                      </span>
                      <span className="text-xs text-gray-500">{review.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        <FAQ />
      </div>
    </main>
  );
} 
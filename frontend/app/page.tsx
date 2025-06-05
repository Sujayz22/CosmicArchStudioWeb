'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { Marquee } from '../components/magicui/marquee';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { FaHome, FaBath } from 'react-icons/fa';
import { MdOutlineDesignServices } from "react-icons/md";
import { GiWoodenChair } from "react-icons/gi";
import { CgDesignmodo, CgWorkAlt } from "react-icons/cg";
import { FaShop } from 'react-icons/fa6';
import { RiLandscapeAiLine } from "react-icons/ri";
import Link from 'next/link';
import { NumberTicker } from '@/components/magicui/number-ticker';

const images = [
  'https://images.pexels.com/photos/3623785/pexels-photo-3623785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/17240676/pexels-photo-17240676/free-photo-of-modern-design-of-kitchen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/31837904/pexels-photo-31837904/free-photo-of-luxurious-modern-living-room-with-large-windows.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/18038083/pexels-photo-18038083/free-photo-of-sofa-and-armchairs-on-rug-in-living-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/13813464/pexels-photo-13813464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];



const projectCards = [
  {
    id: 1,
    image: '/img(1).png',
    title: "Modern kitchen transformation",
    description:
      "This kitchen transformation brought sleek, modern design and enhanced functionality to our client's home. We installed custom cabinetry, high-quality worktops, and state-of-the-art appliances, creating a stylish yet practical space perfect for cooking and entertaining. With attention to every detail, we delivered a kitchen that balances aesthetics and usability.",
    testimonial:
      "Cosmic Arch Studio completely transformed our kitchen, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn't be happier with the result.",
    client: "Rachel Morgan",
  },
  {
    id: 2,
    image: '/img(2).png',
    title: "External garden path build",
    description:
      "Our team designed and built a durable, visually appealing garden path to enhance the client's outdoor space. Using premium materials and careful craftsmanship, we achieved both beauty and value, transforming the garden into a more functional and aesthetic retreat.",
    testimonial:
      "The team at Cosmic Arch Studio did an amazing job on our garden path. It's sturdy, looks fantastic, and has completely transformed our outdoor space. They listened to our vision and delivered exactly what we wanted—highly recommended!",
    client: "Michael Turner",
  },
  {
    id: 3,
    image: '/img(3).png',
    title: "Contemporary living room makeover",
    description:
      "We revitalized this living room with a contemporary design, featuring custom shelving, modern lighting, and a harmonious color palette. The result is a welcoming space perfect for relaxation and entertaining guests.",
    testimonial:
      "The living room makeover exceeded our expectations. The new design is both stylish and comfortable, and the attention to detail was impressive. The team was a pleasure to work with from start to finish!",
    client: "Samantha Lee",
  },
];

const faqItems = [
  {
    question: "What area are you based in?",
    answer:
      "We primarily serve London and surrounding areas, but depending on the project, we may be able to travel further. Get in touch to discuss your location and project needs.",
  },
  {
    question: "How long does a typical project take?",
    answer: "",
  },
  {
    question: "Do you offer free quotes?",
    answer: "",
  },
  {
    question: "Will I need planning permission for my project?",
    answer: "",
  },
  {
    question: "Do you provide a guarantee for your work?",
    answer: "",
  },
  {
    question: "Can I stay in my home while the work is being done?",
    answer: "",
  },
  {
    question: "How do I get started with a project?",
    answer: "",
  },
];

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

  return (
    <main className="min-h-screen bg-dark">
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
                <span className="relative inline-block">
                  Know more
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
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
              {images.map((src, i) => (
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
          <div className="w-full bg-neutral-100 rounded-2xl mt-16 py-14 px-2 flex flex-col items-center">
            <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 justify-between text-center">
              <div>
                <span className="block text-5xl md:text-6xl font-light mb-3 font-sans">
                  <NumberTicker value={500} startValue={0} className="text-5xl md:text-6xl font-sans" />+
                </span>
                <div className="font-semibold text-lg mb-1 ">Design hours invested</div>
                <div className="text-base text-neutral-500">Dedicated to perfecting every detail</div>
              </div>
              <div>
                <span className="block text-5xl md:text-6xl font-light mb-3 font-sans">
                  <NumberTicker value={25} startValue={0} className="text-5xl md:text-6xl font-sans" />
                </span>
                <div className="font-semibold text-lg mb-1">Consultations delivered</div>
                <div className="text-base text-neutral-500">Helping clients bring their vision to life</div>
              </div>
              <div>
                <span className="block text-5xl md:text-6xl font-light mb-3 font-sans">
                  <NumberTicker value={100} startValue={0} className="text-5xl md:text-6xl font-sans" />%
                </span>
                <div className="font-semibold text-lg mb-1">Locally sourced materials</div>
                <div className="text-base text-neutral-500">Supporting our community and sustainability</div>
              </div>
              <div>
                <span className="block text-5xl md:text-6xl font-light mb-3 font-sans">
                  <NumberTicker value={100} startValue={0} className="text-5xl md:text-6xl font-sans" />%
                </span>
                <div className="font-semibold text-lg mb-1">Client satisfaction</div>
                <div className="text-base text-neutral-500">All of our clients are satisfied with our work and service</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="container-custom py-16">
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
            <div className="flex justify-center mt-12">
              <button className="flex items-center gap-4 py-3 rounded-full font-semibold text-white group">
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
              </button>
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
                key={card.id}
                className="sticky top-0 flex justify-center items-center transition-all duration-500"
                style={{ zIndex: idx + 1, height: '100vh' }}
              >
                <Link
                  href={`/projects/${card.id}`}
                  aria-label={`View project: ${card.title}`}
                  className="group w-full max-w-5xl flex justify-center items-center cursor-view-project"
                >
                  <div
                    className={`relative rounded-3xl shadow-lg w-full max-w-5xl h-[60vh] flex flex-col md:flex-row gap-16 items-center justify-center p-10 ${idx % 2 === 0 ? 'bg-primary text-white' : 'bg-secondary text-black'} cursor-pointer transition-transform duration-200`}
                  >
                    <Image src={card.image} alt={card.title} width={400} height={400} className="rounded-2xl object-cover w-[400px] h-[400px]" />
                    <div className="flex-1 flex flex-col gap-4 justify-center">
                      <h3 className={`text-3xl font-bold mb-2 ${idx % 2 === 0 ? 'text-white' : 'text-black'}`}>{card.title}</h3>
                      <p className={`mb-2 text-base md:text-lg ${idx % 2 === 0 ? 'text-white/90' : 'text-black/80'}`}>{card.description}</p>
                      <div className="flex gap-2 mb-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${idx % 2 === 0 ? 'bg-white text-primary' : 'bg-black text-white'}`}>Kitchen</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${idx % 2 === 0 ? 'bg-white text-primary' : 'bg-black text-white'}`}>4 weeks</span>
                      </div>
                      <blockquote className={`italic border-l-4 pl-4 mb-2 ${idx % 2 === 0 ? 'text-white/80 border-white/50' : 'text-black/70 border-black/30'}`}>
                        {card.testimonial}
                      </blockquote>
                      <div className="flex items-center gap-3 mt-2">
                        <Image src={card.image} alt={card.client} width={32} height={32} className={`rounded-full object-cover border-2 ${idx % 2 === 0 ? 'border-white' : 'border-black'}`} />
                        <span className={`font-semibold text-sm ${idx % 2 === 0 ? 'text-white' : 'text-black'}`}>{card.client}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button className="flex items-center gap-4 py-3 rounded-full font-semibold text-black group">
              <span className="relative inline-block text-xl">
                View all Projects
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
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
            </button>
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
              {[1,2,3,4,5,6,7,8].map((i) => (
                <div
                  key={i}
                  className={`w-[280px] sm:w-[400px] min-w-[280px] sm:min-w-[400px] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col justify-between h-[240px] sm:h-[280px] border border-neutral-100/50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f3f4f6]'} hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <svg key={idx} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-base text-gray-800 mb-4 line-clamp-4">
                      {[
                        "Excellent service from start to finish. The team was professional, communicative, and the results exceeded my expectations. My new room looks amazing!",
                        "I couldn't be happier with my loft conversion. The attention to detail and quality of work were outstanding. Cosmic Arch Studio made the whole process smooth and stress-free!",
                        "Cosmic Arch Studio transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!",
                        "From the first consultation to the final touches, Cosmic Arch Studio delivered on every promise. Our home extension is exactly what we wanted—spacious, modern, and beautifully finished!",
                        "Cosmic Arch Studio did an incredible job on our kitchen. The craftsmanship was top-notch, and the team was professional from start to finish. Highly recommend!",
                        "Fantastic workmanship! The team renovated our bathroom with precision and care. It now feels like a luxury space. Would definitely use Cosmic Arch Studio again.",
                        "Cosmic Arch Studio transformed our old garage into a modern workspace. The process was seamless and the results are fantastic!",
                        "Great experience working with Cosmic Arch Studio. The team was attentive, skilled, and delivered high-quality results on time."
                      ][i-1]}
                    </p>
                  </div>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                    <img src={`https://randomuser.me/api/portraits/${i%2===0?'women':'men'}/${10+i}.jpg`} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white mr-4" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-900">
                        {[
                          "James Richardson",
                          "Sophie Williams",
                          "Daniel Foster",
                          "Charlotte Harris",
                          "Emily Carter",
                          "Oliver Bennett",
                          "Charlotte Harris",
                          "Daniel Foster"
                        ][i-1]}
                      </span>
                      <span className="text-xs text-gray-500">Verified Client</span>
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
              {[5,6,7,8,1,2,3,4].map((i) => (
                <div
                  key={i}
                  className={`w-[280px] sm:w-[400px] min-w-[280px] sm:min-w-[400px] rounded-2xl shadow-xl p-4 sm:p-8 flex flex-col justify-between h-[240px] sm:h-[280px] border border-neutral-100/50 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f3f4f6]'} hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <svg key={idx} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-base text-gray-800 mb-4 line-clamp-4">
                      {[
                        "Excellent service from start to finish. The team was professional, communicative, and the results exceeded my expectations. My new room looks amazing!",
                        "I couldn't be happier with my loft conversion. The attention to detail and quality of work were outstanding. Cosmic Arch Studio made the whole process smooth and stress-free!",
                        "Cosmic Arch Studio transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!",
                        "From the first consultation to the final touches, Cosmic Arch Studio delivered on every promise. Our home extension is exactly what we wanted—spacious, modern, and beautifully finished!",
                        "Cosmic Arch Studio did an incredible job on our kitchen. The craftsmanship was top-notch, and the team was professional from start to finish. Highly recommend!",
                        "Fantastic workmanship! The team renovated our bathroom with precision and care. It now feels like a luxury space. Would definitely use Cosmic Arch Studio again.",
                        "Cosmic Arch Studio transformed our old garage into a modern workspace. The process was seamless and the results are fantastic!",
                        "Great experience working with Cosmic Arch Studio. The team was attentive, skilled, and delivered high-quality results on time."
                      ][i-1]}
                    </p>
                  </div>
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                    <img src={`https://randomuser.me/api/portraits/${i%2===0?'women':'men'}/${10+i}.jpg`} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white mr-4" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-900">
                        {[
                          "James Richardson",
                          "Sophie Williams",
                          "Daniel Foster",
                          "Charlotte Harris",
                          "Emily Carter",
                          "Oliver Bennett",
                          "Charlotte Harris",
                          "Daniel Foster"
                        ][i-1]}
                      </span>
                      <span className="text-xs text-gray-500">Verified Client</span>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-custom py-16">
          <div className="bg-[#566c54] rounded-[3rem] p-0 md:p-0 flex flex-col md:flex-row items-stretch overflow-hidden">
            {/* Left Column */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-24 md:pl-16 md:pr-8 text-white">
            <div className="mb-6 inline-flex items-center">
                <div className="bg-[#FFD740] h-10 rounded-full px-6 flex items-center">
                  <span className="font-bold text-black text-lg">FAQs</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Answering your questions</h2>
              <p className="mb-8 text-lg text-white/80 max-w-md">Got more questions? Send us your enquiry below</p>
              <button className="flex items-center gap-3 bg-yellow-400 text-black font-semibold px-7 py-3 rounded-full text-lg w-fit shadow hover:bg-yellow-300 transition group">
                Get in touch
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary group-hover:bg-primary/80 transition-colors">
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
              </button>
            </div>
            {/* Right Column: Accordion */}
            <div className="flex-1 flex items-center justify-center bg-transparent px-4 md:px-12 py-12">
              <Accordion type="single" collapsible className="w-full max-w-xl space-y-4" defaultValue="0">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={i.toString()} className="rounded-2xl bg-white/90 shadow border-none overflow-hidden transition-all">
                    <AccordionTrigger className="flex items-center justify-between w-full px-6 py-5 text-lg md:text-xl font-semibold text-[#222] hover:no-underline group transition-all">
                      <span className="text-left flex-1">{item.question}</span>
                      <span
                        className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#e6e9e3] text-[#495f43] text-2xl transition-transform duration-300 group-data-[state=open]:rotate-45"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2 text-base text-[#495f43] bg-[#f7f8f6] transition-all">
                      {item.answer ? item.answer : <span className="italic text-[#8a9a87]">Please contact us for more details.</span>}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 
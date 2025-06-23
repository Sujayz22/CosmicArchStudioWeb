'use client';

import React, { useEffect, useState } from 'react';
import { BentoGrid } from '@/components/magicui/bento-grid';
import { LuUserCheck, LuRepeat, LuBadgeCheck, LuTrophy, LuHandshake, LuShieldCheck, LuSquare, LuFilter } from 'react-icons/lu';
import { getTeamMembers, TeamMember } from '../actions/getTeamMembers';
import { TeamMemberCardSkeleton } from '@/components/ui/skeleton';
import ScrollToTop from '../components/ScrollToTop';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Animation refs
  const { ref: mainContentRef, inView: mainContentInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: visionRef, inView: visionInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error("Failed to fetch team members", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const shouldShowTeamSection = !loading && teamMembers.some(member => member.showMember);

  return (
    <main className="bg-[#F5F6F4] min-h-screen pt-24">
      <ScrollToTop />
      <div className="container-custom flex flex-col items-center py-8 md:py-16 px-2">
        {/* Header */}
        <div className="mb-10 md:mb-20">
          <span className="bg-secondary px-4 md:px-8 py-2 rounded-xl text-3xl md:text-6xl font-bold text-black shadow-sm tracking-tight">About us.</span>
        </div>

        {/* Mobile View */}
        <div
          className="sm:hidden w-full max-w-6xl flex flex-col gap-4"
        >
          {/* Top Text Block */}
          <div className="bg-primary rounded-2xl p-4 text-white text-sm font-medium leading-snug">
            At Cosmic arch studio, we believe architecture is more than just buildings—it's the art of shaping how people experience space. Our studio blends innovative design with functional elegance, creating environments that are purposeful, inspiring, and enduring.
          </div>

          {/* Main Image + Overlay Text */}
          <div className="relative rounded-2xl overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Interior" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white px-4 py-3 text-sm font-medium">
              Our goal is to create spaces that breathe, structures that belong, and forms that feel not just seen, but sensed.
            </div>
          </div>

          {/* Studio Name & Slogan */}
          <div className="bg-[#5B7C6B] rounded-2xl p-4 text-white">
            <div className="text-2xl font-bold mb-1">Cosmic Arch Studio</div>
            <div className="text-[#C2D6C6] text-base font-semibold">Purpose-Driven Design, Always.</div>
          </div>

          {/* Zero Design Repeats Card */}
          <div className="bg-secondary rounded-2xl p-4">
            <div className="text-black text-lg font-bold mb-2">Zero Design Repeats</div>
            <div className="text-neutral-500 text-sm">Each project, a new story.</div>
          </div>

          {/* Happy Clients Card */}
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center">
            <div className="text-black text-3xl font-bold">5+</div>
            <div className="text-black text-xs font-medium">Happy Clients</div>
          </div>

          {/* End-to-End Project Involvement Card */}
          <div className="bg-white rounded-2xl p-4 flex flex-col items-center">
            <div className="text-[#3B4B3B] text-sm text-center font-semibold">End-to-End Project Involvement</div>
          </div>

          {/* Second Image */}
          <div className="relative rounded-2xl overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1669555051308-8c3e5daab9df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Interior 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 text-sm font-medium px-4">
              <span>Innovative Spaces, Timeless Designs</span>
            </div>
          </div>

          {/* Bottom Text Block */}
          <div className="bg-white rounded-2xl p-4 text-primary text-sm font-medium shadow-inner">
            Specializing in architecture and interior design, we approach every project holistically—from the foundation to the final finishes. Whether residential, commercial, or mixed-use, our work reflects a deep commitment to context, sustainability, and the unique vision of each client.<br />With a team of passionate designers, architects, and collaborators, we turn ideas into timeless spaces that tell a story.
          </div>
        </div>

        {/* Desktop View */}
        <motion.div
          ref={mainContentRef}
          initial={{ opacity: 0, y: 50 }}
          animate={mainContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hidden sm:block w-full max-w-6xl"
        >
          <BentoGrid className="w-full max-w-6xl grid-rows-6 bg-primary rounded-3xl p-10 shadow-2xl">
            {/* Top Text Block */}
            <div className="col-span-3 row-span-1 text-white text-2xl font-medium leading-snug flex items-center px-4" style={{gridColumn: '1/4', gridRow: '1/2'}}>
              At Cosmic arch studio, we believe architecture is more than just buildings—it's the art of shaping how people experience space. Our studio blends innovative design with functional elegance, creating environments that are purposeful, inspiring, and enduring.
            </div>
            {/* Main Image + Overlay Text */}
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden flex items-end" style={{gridColumn: '1/3', gridRow: '2/4'}}>
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Interior" className="absolute inset-0 w-full h-full object-cover" />
              <div className="relative z-10 bg-black/50 text-white px-5 py-3 rounded-b-2xl w-full text-2xl font-medium leading-tight flex items-center min-h-[64px]">Our goal is to create spaces that breathe, structures that belong, and forms that feel not just seen, but sensed.</div>
            </div>
            {/* Studio Name & Slogan */}
            <div className="col-span-1 row-span-2 flex flex-col justify-center items-start bg-[#5B7C6B] rounded-2xl p-7" style={{gridColumn: '3/4', gridRow: '2/4'}}>
              <div className="text-white text-5xl font-bold mb-1">Cosmic Arch Studio</div>
              <div className="text-[#C2D6C6] text-2xl font-semibold leading-tight">Purpose-Driven Design, Always.</div>
            </div>
            {/* Zero Design Repeats Card */}
            <div className="col-span-1 row-span-2 bg-secondary rounded-2xl flex flex-col justify-center items-start p-6" style={{gridColumn: '1/2', gridRow: '4/6'}}>
              <div className="text-black text-4xl font-bold mb-4 leading-none">Zero Design Repeats</div>
              <div className="text-neutral-500 text-2xl font-medium">Each project, a new story.</div>
            </div>
            {/* Happy Clients Card */}
            <div className="col-span-1 row-span-1 bg-white rounded-2xl flex flex-col justify-center items-center p-6" style={{gridColumn: '2/3', gridRow: '4/5'}}>
              <div className="text-black text-7xl font-bold leading-none">5+</div>
              <div className="text-black text-2xl font-medium">Happy Clients</div>
            </div>
            {/* End-to-End Project Involvement Card */}
            <div className="col-span-1 row-span-1 bg-white rounded-2xl flex flex-col justify-center items-center p-6" style={{gridColumn: '2/3', gridRow: '5/6'}}>
              <div className="text-[#3B4B3B] text-2xl text-center font-semibold">End-to-End Project Involvement</div>
            </div>
            {/* Second Image */}
            <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden flex flex-col justify-end h-[400px] relative" style={{gridColumn: '3/4', gridRow: '4/6'}}>
              <img src="https://images.unsplash.com/photo-1669555051308-8c3e5daab9df?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Interior 2" className="w-full h-full object-cover flex-1" />
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 text-5xl font-medium leading-tight px-4">
                <span>Innovative Spaces, Timeless Designs</span>
              </div>
            </div>
            {/* Bottom Text Block */}
            <div className="col-span-3 row-span-1 bg-white rounded-2xl p-5 text-primary text-xl font-medium shadow-inner leading-snug flex items-center" style={{gridColumn: '1/4', gridRow: '6/7'}}>
              Specializing in architecture and interior design, we approach every project holistically—from the foundation to the final finishes. Whether residential, commercial, or mixed-use, our work reflects a deep commitment to context, sustainability, and the unique vision of each client.<br />With a team of passionate designers, architects, and collaborators, we turn ideas into timeless spaces that tell a story.
            </div>
          </BentoGrid>
        </motion.div>

        {/* Our Vision Section */}
        <motion.section
          ref={visionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={visionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full flex justify-center mt-8 md:mt-16"
        >
          <div className="bg-[#FFD366] rounded-2xl md:rounded-3xl px-4 md:px-8 py-6 md:py-10 max-w-4xl w-full flex flex-col gap-4 md:gap-6 shadow-md">
            <div className="flex justify-center mb-2">
              <span className="bg-[#4B654C] text-white text-base md:text-xl px-4 md:px-6 py-1 rounded-lg font-semibold">Our Vision</span>
            </div>
            <div className="flex items-start gap-2 md:gap-3">
              <span className="block w-1 md:w-2 h-12 md:h-20 rounded bg-primary mt-1"></span>
              <span className="font-bold text-base md:text-2xl text-black">To craft architecture that resonates with context, elevates everyday experiences, and stands timeless — rooted in purpose, shaped by light, and guided by emotion.</span>
            </div>
            <div className="text-neutral-600 text-sm md:text-lg mt-2">
              We envision a world where design is not decoration, but a dialogue — between people, place, and possibility.<br/>
              At Cosmic Arch Studio, our goal is to create spaces that breathe, structures that belong, and forms that feel — not just seen, but sensed.
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          ref={valuesRef}
          initial={{ opacity: 0, y: 50 }}
          animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full flex justify-center mt-8 md:mt-16"
        >
          <div className="bg-neutral-200 rounded-2xl md:rounded-3xl px-4 md:px-8 py-6 md:py-10 max-w-6xl w-full flex flex-col gap-6 md:gap-8 shadow-md">
            <div className="flex justify-center mb-2">
              <span className="bg-secondary text-black text-xl md:text-3xl px-4 md:px-6 py-1 rounded-lg font-bold">Our Values</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
              <ValueCard icon={<LuUserCheck className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Client-Centric" desc="We place your needs, lifestyle, and vision at the heart of every design decision — always." />
              <ValueCard icon={<LuRepeat className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Flexibility" desc="We adapt to your evolving needs and project requirements with agility and creativity." />
              <ValueCard icon={<LuBadgeCheck className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Design Integrity" desc="We uphold the highest standards of honesty and authenticity in every design." />
              <ValueCard icon={<LuTrophy className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Quality" desc="We deliver excellence in every detail, ensuring lasting value and satisfaction." />
              <ValueCard icon={<LuHandshake className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Collaboration" desc="We believe in the power of teamwork and open communication." />
              <ValueCard icon={<LuShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Design Integrity" desc="We uphold the highest standards of honesty and authenticity in every design." />
              <ValueCard icon={<LuSquare className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Transparency" desc="We are open and honest in our process, pricing, and communication." />
              <ValueCard icon={<LuFilter className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />} title="Refinement" desc="We continuously improve and perfect our work for the best results." />
            </div>
          </div>
        </motion.section>

        {/* Our Team Section */}
        {shouldShowTeamSection && (
          <motion.section
            ref={teamRef}
            initial={{ opacity: 0, y: 50 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full flex flex-col items-center mt-8 md:mt-24"
          >
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-bold py-2 text-neutral-800">Our Team</h2>
              <p className="mt-4 text-lg md:text-xl text-neutral-600 px-4 max-w-2xl">
                Driven by curiosity, shaped by experience — we design with intention and integrity.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-6xl">
              {loading
                ? (
                  [...Array(3)].map((_, index) => <TeamMemberCardSkeleton key={index} />)
                )
                : (
                  teamMembers.filter(member => member.showMember).map((member) => (
                    <TeamMemberCard key={member.id} name={member.name} designation={member.designation} imageUrl={member.image.url} />
                  ))
                )
              }
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}

// ValueCard component for hover-expand effect
function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-neutral-300 rounded-lg md:rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow-sm transition-all duration-300 group cursor-pointer">
      <div className="flex items-center gap-2 md:gap-3 mb-1">
        {icon}
        <span className="font-bold text-lg md:text-2xl text-neutral-800">{title}</span>
      </div>
      <div className="text-neutral-500 text-sm md:text-lg max-h-0 overflow-hidden opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-300">
        {desc}
      </div>
    </div>
  );
}

function TeamMemberCard({ name, designation, imageUrl }: { name: string, designation: string, imageUrl: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-lg group w-full max-w-xs">
      <img src={imageUrl} alt={`Portrait of ${name}`} className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute bottom-4 left-4 right-4 p-0">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 text-center">
           <h3 className="text-xl font-bold text-white">{name}</h3>
           <p className="text-secondary text-base font-semibold">{designation}</p>
        </div>
      </div>
    </div>
  );
}

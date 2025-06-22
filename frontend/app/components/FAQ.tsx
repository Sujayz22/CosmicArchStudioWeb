'use client';

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { fetchAPI } from '@/lib/api';
import type { FAQ } from '@/lib/api';
import Link from 'next/link';
import { FAQSkeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetchAPI<{ data: FAQ[] }>('faqs');
        setFaqs(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <section className="container-custom py-16">
        <FAQSkeleton />
      </section>
    );
  }

  if (error) {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="container-custom py-16"
      >
        <div className="bg-[#566c54] rounded-[3rem] p-0 md:p-0 flex flex-col md:flex-row items-stretch overflow-hidden">
          <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-24 md:pl-16 md:pr-8 text-white">
            <div className="text-2xl font-semibold text-red-300">Error: {error}</div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="container-custom py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-[#566c54] rounded-[3rem] p-0 md:p-0 flex flex-col md:flex-row items-stretch overflow-hidden"
      >
        {/* Left Column */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-24 md:pl-16 md:pr-8 text-white">
          <div className="mb-6 inline-flex items-center">
            <div className="bg-[#FFD740] h-10 rounded-full px-6 flex items-center">
              <span className="font-bold text-black text-lg">FAQs</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Answering your questions</h2>
          <p className="mb-8 text-lg text-white/80 max-w-md">Got more questions? Send us your enquiry below</p>
          <Link href="/contact" className="flex items-center gap-3 bg-yellow-400 text-black font-semibold px-7 py-3 rounded-full text-lg w-fit shadow hover:bg-yellow-300 transition group">
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
          </Link>
        </div>
        {/* Right Column: Accordion */}
        <div className="flex-1 flex items-center justify-center bg-transparent px-4 md:px-12 py-12">
          <Accordion type="single" collapsible className="w-full max-w-xl space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.id} value={i.toString()} className="rounded-2xl bg-white/90 shadow border-none overflow-hidden transition-all">
                <AccordionTrigger className="flex items-center justify-between w-full px-6 py-5 text-lg md:text-xl font-semibold text-[#222] hover:no-underline group transition-all">
                  <span className="text-left flex-1">{faq.question}</span>
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
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.div>
    </section>
  );
} 
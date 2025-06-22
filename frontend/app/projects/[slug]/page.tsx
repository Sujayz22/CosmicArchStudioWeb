'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import type { Project } from '@/lib/api';
import Carousel from '../../../components/ui/carousel';
import MoreProjects from '../../../components/MoreProjects';
import { ProjectDetailSkeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const { ref: imageRef, inView: imageInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: detailsRef, inView: detailsInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: descriptionRef, inView: descriptionInView } = useInView({ threshold: 0.1, triggerOnce: false });
  const { ref: reviewRef, inView: reviewInView } = useInView({ threshold: 0.1, triggerOnce: false });

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetchAPI<{ data: Project[] }>(`projects?filters[slug][$eq]=${params.slug}&populate=*`);
        if (response.data && response.data.length > 0) {
          setProject(response.data[0]);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.slug]);

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    // Use setTimeout to ensure the scroll happens after the component is fully rendered
    const timer = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timer);
  }, [params.slug]);

  // Also scroll to top when loading completes
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        scrollToTop();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Force scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      scrollToTop();
    };

    // Add event listener for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Scroll to top when project data is loaded
  useEffect(() => {
    if (project && !loading) {
      const timer = setTimeout(() => {
        scrollToTop();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [project, loading]);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-light pb-16 px-4 sm:px-6 lg:px-2 flex flex-col items-center">
        <ProjectDetailSkeleton />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="text-2xl font-semibold text-center text-red-500">Error: {error || 'Project not found'}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-light pb-16 px-4 sm:px-6 lg:px-2 flex flex-col items-center">
      {/* Scroll anchor */}
      <div ref={topRef} id="top" />
      
      <div className="w-full max-w-6xl">
        {/* Title */}
        <h1 className="mt-32 text-6xl md:text-7xl font-bold mb-8 flex items-center gap-2 text-left">
          <span>{project.Title}<span className="text-yellow-400">.</span></span>
        </h1>
        {/* Image */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: 50 }}
          animate={imageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-12"
        >
          <Image
            src={project.coverImage.url}
            alt={project.Title}
            width={1200}
            height={600}
            className="object-cover w-full h-[450px] md:h-[750px] rounded-[2rem]"
          />
        </motion.div>
        {/* Details Box */}
        <motion.div
          ref={detailsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={detailsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="bg-[#4b6b4a] rounded-[2rem] p-10 md:p-14 text-white grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 text-lg w-full mx-auto"
        >
          <div className="space-y-6">
            <div>
              <div className="text-white/70 text-lg">Client:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.client}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Location:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.location}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Services:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.services}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Size:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.size}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="text-white/70 text-lg">Duration:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.duration}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Theme:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.theme}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Category:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.category}</div>
            </div>
            <div>
              <div className="text-white/70 text-lg">Type:</div>
              <div className="font-bold text-2xl md:text-2xl leading-tight">{project.type}</div>
            </div>
          </div>
        </motion.div>
        {/* Project Description Section */}
        <motion.section
          ref={descriptionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={descriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-5xl mt-12 bg-transparent"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-left">Project Description</h2>
          <p className="text-lg md:text-xl text-gray-800 mb-6">
            {project.description}
            The features are:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl text-gray-800">
            {project.features.map((feature, index) => (
              <li key={index}>
                <b>{feature.title}:</b> {feature.description}
              </li>
            ))}
          </ul>
        </motion.section>
        {/* Client Review Section */}
        <motion.section
          ref={reviewRef}
          initial={{ opacity: 0, y: 50 }}
          animate={reviewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full flex flex-col items-center mt-16"
        >
          <div className="w-full max-w-3xl bg-yellow-200 rounded-lg p-6 md:p-8 flex flex-col gap-4 shadow-md">
            <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-900 text-lg md:text-xl">
              {project.review}
            </blockquote>
            <div className="flex items-center gap-3 mt-2">
              {project.clientImage && (
                <Image
                  src={project.clientImage.url}
                  alt={project.client}
                  width={32}
                  height={32}
                  className="rounded-full border border-gray-300"
                />
              )}
              <span className="font-semibold text-gray-900">{project.client}</span>
            </div>
          </div>
        </motion.section>
        {/* Showcase Section */}
        <section className="w-full flex flex-col items-center mt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <span>Showcase<span className="text-yellow-400">.</span></span>
          </h2>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <Carousel
                slides={project.showcase.map(image => ({
                  title: '',
                  button: '',
                  src: image.url
                }))}
              />
            </div>
          </div>
        </section>
        <MoreProjects />
      </div>
    </main>
  );
}
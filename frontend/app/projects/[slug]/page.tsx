'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAPI } from '@/lib/api';
import type { Project } from '@/lib/api';
import Carousel from '../../../components/ui/carousel';
import MoreProjects from '../../../components/MoreProjects';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="text-2xl font-semibold text-center">Loading project...</div>
        </div>
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
    <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <h1 className="mt-32 text-6xl md:text-7xl font-bold mb-8 flex items-center gap-2 text-left">
          <span>{project.Title}<span className="text-yellow-400">.</span></span>
        </h1>
        {/* Image */}
        <div className="mb-12">
          <Image
            src={project.coverImage.url}
            alt={project.Title}
            width={1200}
            height={600}
            className="object-cover w-full h-[450px] md:h-[750px] rounded-[2rem]"
          />
        </div>
        {/* Details Box */}
        <div className="bg-[#4b6b4a] rounded-[2rem] p-10 md:p-14 text-white grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 text-lg w-full mx-auto">
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
        </div>
        {/* Project Description Section */}
        <section className="w-full max-w-5xl mt-12 bg-transparent">
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
        </section>
        {/* Client Review Section */}
        <section className="w-full flex flex-col items-center mt-16">
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
        </section>
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
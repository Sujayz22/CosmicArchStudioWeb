'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAPI } from '@/lib/api';
import type { Project } from '@/lib/api';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Commercial', value: 'Commercial' },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchAPI<{ data: Project[] }>('projects?populate=*');
        setProjects(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedTab === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedTab);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="text-2xl font-semibold text-center">Loading projects...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="text-2xl font-semibold text-center text-red-500">Error: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-light pb-16 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mt-32 mb-6 flex flex-col items-center">
          <span className="bg-secondary px-8 py-2 rounded-[2rem] text-6xl font-bold text-black shadow-sm tracking-tight"><h1 className="text-6xl md:text-7xl font-extrabold text-neutral-900 text-center inline-block">
            Projects<span className="text-neutral-900">.</span>
          </h1></span>
          {/* Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="flex bg-[#E5E5E5] rounded-xl px-2 py-2 gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value)}
                  className={`px-5 py-1.5 rounded-md font-medium transition-colors text-base
                    ${selectedTab === tab.value
                      ? 'bg-[#4B6B4A] text-white shadow'
                      : 'bg-transparent text-black hover:bg-[#d1d5db]'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-2">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Project Image */}
              <div className="relative h-[300px] w-full overflow-hidden">
                <Image
                  src={project.coverImage.url}
                  alt={project.Title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
                    {project.category}
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-black">
                    {project.type}
                  </span>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{project.Title}</h3>
                <p className="mb-4 text-gray-600 line-clamp-2">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

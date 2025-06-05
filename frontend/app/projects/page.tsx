'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    slug: 'nivara-villa',
    image: '/img(1).png',
    title: 'Nivara Villa',
    tags: ['Residential', 'Individual House'],
    client: 'John Arnold',
    location: 'Chennai',
    services: 'Full Interior and Exterior Design',
    duration: '5 Months',
    theme: 'Modern Minimalism',
    category: 'Residential',
    type: 'Individual House',
    size: '3000 sq ft.',
  },
  {
    slug: 'urban-oasis',
    image: '/img(2).png',
    title: 'Urban Oasis',
    tags: ['Commercial', 'Office Space'],
    client: 'Tech Corp',
    location: 'Bangalore',
    services: 'Interior Design and Furnishing',
    duration: '3 Months',
    theme: 'Contemporary',
    category: 'Commercial',
    type: 'Office Space',
    size: '5000 sq ft.',
  },
  {
    slug: 'heritage-home',
    image: '/img(3).png',
    title: 'Heritage Home',
    tags: ['Residential', 'Villa'],
    client: 'Emily Clark',
    location: 'Pune',
    services: 'Restoration and Interior Design',
    duration: '8 Months',
    theme: 'Classic Heritage',
    category: 'Residential',
    type: 'Villa',
    size: '4500 sq ft.',
  },
  {
    slug: 'green-retreat',
    image: '/img(4).png',
    title: 'Green Retreat',
    tags: ['Residential', 'Eco-Friendly'],
    client: 'Eco Living',
    location: 'Goa',
    services: 'Sustainable Design and Landscaping',
    duration: '6 Months',
    theme: 'Eco-Friendly',
    category: 'Residential',
    type: 'Eco-Friendly House',
    size: '3500 sq ft.',
  },
];

const TABS = [
  { label: 'All', value: 'All' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Commercial', value: 'Commercial' },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects =
    activeTab === 'All'
      ? projects
      : projects.filter((project) => project.tags.includes(activeTab));

  return (
    <main className="min-h-screen bg-neutral-light py-12">
      <div className="flex flex-col items-center">
        {/* Header */}
        <div className="mb-8 mt-24">
          <span className="inline-block bg-yellow-300 px-8 py-4 rounded-xl">
            <span className="text-5xl md:text-6xl font-bold text-black">Projects.</span>
          </span>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-10 ">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-gray-200 text-black'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {filteredProjects.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500 text-lg py-12">No projects found.</div>
          ) : (
            filteredProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-transform duration-300 hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={500}
                    className="object-cover w-full h-[400px]"
                  />
                  {/* Overlay */}
                  <div className="absolute bottom-0 left-0 w-full  bg-black/60 p-4">
                    <div className="text-white text-lg font-semibold mb-2 drop-shadow">{project.title}</div>
                    <div className="flex gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-white/80 text-gray-800 text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";
import type { Project } from "@/lib/api";
import { usePathname } from "next/navigation";

export default function MoreProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetchAPI<{ data: Project[] }>('projects?populate=*');
        if (response.data) {
          // Filter out the current project
          const filteredProjects = response.data.filter(project => project.slug !== currentSlug);
          // Take only the first 4 projects
          setProjects(filteredProjects.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentSlug]);

  if (loading) {
    return (
      <section className="w-full py-12 mt-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-neutral-900 text-center">
          More Projects<span className="text-yellow-400">.</span>
        </h2>
        <div className="text-lg">Loading projects...</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 mt-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-neutral-900 text-center">
        More Projects<span className="text-yellow-400">.</span>
      </h2>
      <div className="flex flex-wrap gap-10 justify-center">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="relative w-96 h-[28rem] rounded-3xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105"
          >
            <Image
              src={project.coverImage.url}
              alt={project.Title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/60 p-4">
              <div className="text-2xl font-semibold text-white drop-shadow-md">{project.Title}</div>
              <div className="text-sm text-white mt-2 flex gap-2 drop-shadow-md">
                <span>{project.type}</span>
                <span>•</span>
                <span>{project.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 
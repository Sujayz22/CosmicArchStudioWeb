import { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import type { Project } from '@/lib/api';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await fetchAPI<{ data: Project[] }>(`projects?filters[slug][$eq]=${params.slug}&populate=*`);
    const project = response.data[0];
    
    if (!project) {
      return {
        title: 'Project Not Found',
      };
    }

    return {
      title: project.Title,
      description: `${project.Title} - ${project.type} in ${project.location}`,
    };
  } catch (error) {
    return {
      title: 'Project Not Found',
    };
  }
} 
import { fetchFromStrapi } from '../utils/strapi';

export interface Service {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: {
    id: number;
    name: string;
    url: string;
    alternativeText: string | null;
    caption: string | null;
  };
  feature: Array<{
    id: number;
    title: string;
  }>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getServices(): Promise<Service[]> {
  try {
    console.log('Fetching services...');
    const response = await fetchFromStrapi('/services', {
      populate: ['image', 'feature'],
    });

    if (!response.data) {
      console.error('No data in response:', response);
      throw new Error('No data received from Strapi');
    }

    // Transform the data to match our interface
    const services = response.data.map((service: any) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      longDescription: service.longDescription,
      icon: service.icon,
      image: {
        id: service.image.id,
        name: service.image.name,
        url: service.image.url,
        alternativeText: service.image.alternativeText,
        caption: service.image.caption,
      },
      feature: service.feature,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      publishedAt: service.publishedAt,
    }));

    console.log('Services fetched successfully:', services);
    return services;
  } catch (error) {
    console.error('Error in getServices:', error);
    throw error;
  }
} 
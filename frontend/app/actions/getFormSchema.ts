'use server';

import { fetchFromStrapi } from '../utils/strapi';

interface ProjectType {
  id: number;
  attributes: {
    name: string;
  }
}

export async function getFormSchema(): Promise<ProjectType[]> {
  try {
    console.log('Starting to fetch form schema...');
    
    // Get the schema from the project-types endpoint
    const response = await fetchFromStrapi('/project-types');
    
    console.log('Full Strapi Response:', JSON.stringify(response, null, 2));
    
    if (!response?.data) {
      console.error('No data in response:', response);
      throw new Error('No data received from Strapi');
    }

    console.log('Response data:', JSON.stringify(response.data, null, 2));

    // Return the data in the expected format
    return response.data.map((item: any) => ({
      id: item.id,
      attributes: {
        name: item.attributes.name
      }
    }));
  } catch (error) {
    console.error('Detailed error in getFormSchema:', error);
    throw new Error('Failed to fetch form schema');
  }
} 
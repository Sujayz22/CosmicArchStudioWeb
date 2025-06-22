'use server';

import { fetchFromStrapi } from '../utils/strapi';

interface ClientFormType {
  type: string[];
}

export async function getClientFormSchema(): Promise<ClientFormType> {
  try {
    
    
    // Get the schema from the content-type-builder endpoint
    const response = await fetchFromStrapi('/content-type-builder/content-types/api::clientform.clientform', {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_ADMIN_API_TOKEN}`
      }
    });
    
    
    
    if (!response?.data) {
      console.error('No data in response:', response);
      throw new Error('No data received from Strapi');
    }

    // Find the type field which is an enumeration
    const typeField = response.data.schema.attributes.type;
    
    if (!typeField || typeField.type !== 'enumeration') {
      throw new Error('Type field not found or is not an enumeration');
    }

    return {
      type: typeField.enum
    };
  } catch (error) {
    console.error('Detailed error in getClientFormSchema:', error);
    throw new Error('Failed to fetch clientform schema');
  }
} 
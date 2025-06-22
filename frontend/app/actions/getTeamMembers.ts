'use server';

import { fetchAPI } from "@/lib/api";

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  showMember: boolean;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetchAPI<{ data: TeamMember[] }>('teams?populate=*');
    
    if (!response.data) {
      console.warn('No team members data found in API response');
      return [];
    }
    
    // The raw response data matches the expected structure, so no transformation is needed.
    return response.data;

  } catch (error) {
    console.error('Failed to fetch team members:', error);
    // In case of an error, return an empty array. The page will handle showing a message.
    return [];
  }
} 
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://calm-addition-271c24a97d.strapiapp.com';

// Get the frontend host (the domain making the request)
const getFrontendHost = () => {
  if (typeof window !== 'undefined') {
    return window.location.host;
  }
  // Fallback for server-side rendering
  return 'cosmic-arch-studio-web.vercel.app';
};

const FRONTEND_HOST = getFrontendHost();

// Debug log to verify environment variable
console.log('🔧 API URL being used:', API_URL);
console.log('🔧 Frontend Host being used:', FRONTEND_HOST);

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_URL}/api/${endpoint}`;
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
        'Host': FRONTEND_HOST,
      },
    });
    
    if (!res.ok) {
      console.error(`API call failed for ${url}:`, {
        status: res.status,
        statusText: res.statusText,
        url: res.url,
      });
      throw new Error(`API call failed: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Gallery {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  collection: ImageData[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface GalleryResponse {
  data: Gallery[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface FAQResponse {
  data: FAQ[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface Project {
  id: number;
  Title: string;
  type: string;
  slug: string;
  coverImage: ImageData;
  showcase: ImageData[];
  review: string;
  description: string;
  size: string;
  theme: string;
  duration: string;
  location: string;
  category: 'Residential' | 'Commercial';
  client: string;
  features: KeyFeature[];
  services: string;
  clientImage?: ImageData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProjectResponse {
  data: Project[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

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

export interface ServiceResponse {
  data: Service[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
} 
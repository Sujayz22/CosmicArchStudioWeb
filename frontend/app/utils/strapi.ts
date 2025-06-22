import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Debug log to verify environment variable
console.log('🔧 Strapi URL being used:', STRAPI_URL);

export async function fetchFromStrapi(path: string, urlParamsObject = {}) {
  try {
    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true
    });
    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;
    
    
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add API token for content-type-builder endpoints
    if (path.startsWith('/content-type-builder') && STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(requestUrl, { headers });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Strapi error response:', {
        status: response.status,
        statusText: response.statusText,
        url: requestUrl,
        error: errorData
      });
      throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export async function postToStrapi(path: string, data: any) {
  try {
    const requestUrl = `${STRAPI_URL}/api${path}`;
    
    console.log('Posting to:', requestUrl);
    console.log('With data:', data);
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add API token if available
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }
    
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Strapi error response:', {
        status: response.status,
        statusText: response.statusText,
        url: requestUrl,
        error: errorData
      });
      throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    console.log('Strapi response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error posting to Strapi:', error);
    throw error;
  }
} 
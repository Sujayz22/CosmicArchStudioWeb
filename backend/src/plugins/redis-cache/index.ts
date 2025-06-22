import redisService from '../../services/redis';

// Cache configuration
const CACHE_DURATION = parseInt(process.env.REDIS_CACHE_DURATION || '300'); // 5 minutes in seconds

// Helper function to generate cache key
const generateCacheKey = (ctx: any): string => {
  const { url, query } = ctx.request;
  return `strapi:${url}:${JSON.stringify(query)}`;
};

// Helper function to check if route should be cached
const shouldCacheRoute = (url: string): boolean => {
  // Skip caching for admin routes
  if (url.startsWith('/admin')) {
    return false;
  }
  
  // Skip caching for authentication routes
  if (url.startsWith('/auth')) {
    return false;
  }
  
  // Skip caching for upload routes
  if (url.startsWith('/upload')) {
    return false;
  }
  
  return true;
};

const redisCacheMiddleware = async (ctx: any, next: () => Promise<void>) => {
  // Skip caching for non-GET requests
  if (ctx.request.method !== 'GET') {
    return await next();
  }

  // Check if route should be cached
  if (!shouldCacheRoute(ctx.request.url)) {
    return await next();
  }

  const cacheKey = generateCacheKey(ctx);

  try {
    // Try to get data from cache
    const cachedData = await redisService.get(cacheKey);
    if (cachedData) {
      ctx.body = JSON.parse(cachedData);
      ctx.set('X-Cache', 'HIT');
      return;
    }

    // If not in cache, proceed with the request
    await next();

    // Cache the response if it was successful
    if (ctx.status === 200 && ctx.body) {
      await redisService.set(cacheKey, JSON.stringify(ctx.body), CACHE_DURATION);
      ctx.set('X-Cache', 'MISS');
    }
  } catch (error) {
    console.error('Redis cache error:', error);
    // If Redis fails, proceed with the request
    await next();
  }
};

export default ({ strapi }: { strapi: any }) => ({
  register() {
    // Register the middleware
    strapi.server.use(redisCacheMiddleware);
  },

  bootstrap() {
    console.log('Redis cache plugin loaded');
  },
}); 
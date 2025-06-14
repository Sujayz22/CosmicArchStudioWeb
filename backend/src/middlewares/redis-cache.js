const Redis = require('ioredis');

// Initialize Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

// Cache configuration
const CACHE_DURATION = 300; // 5 minutes in seconds

// Helper function to generate cache key
const generateCacheKey = (ctx) => {
  const { url, query } = ctx.request;
  return `strapi:${url}:${JSON.stringify(query)}`;
};

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Skip caching for non-GET requests
    if (ctx.request.method !== 'GET') {
      return await next();
    }

    // Skip caching for admin routes
    if (ctx.request.url.startsWith('/admin')) {
      return await next();
    }

    const cacheKey = generateCacheKey(ctx);

    try {
      // Try to get data from cache
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        ctx.body = JSON.parse(cachedData);
        return;
      }

      // If not in cache, proceed with the request
      await next();

      // Cache the response if it was successful
      if (ctx.status === 200) {
        await redis.set(cacheKey, JSON.stringify(ctx.body), 'EX', CACHE_DURATION);
      }
    } catch (error) {
      console.error('Redis cache error:', error);
      // If Redis fails, proceed with the request
      await next();
    }
  };
}; 
import cacheInvalidationService from '../../../services/cache-invalidation';
import redisService from '../../../services/redis';

export default ({ strapi }: { strapi: any }) => ({
  /**
   * Get cache statistics
   */
  async getStats(ctx: any) {
    try {
      const stats = await cacheInvalidationService.getCacheStats();
      ctx.body = {
        success: true,
        data: stats,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        error: 'Failed to get cache statistics',
      };
    }
  },

  /**
   * Invalidate all cache
   */
  async invalidateAll(ctx: any) {
    try {
      await cacheInvalidationService.invalidateAll();
      ctx.body = {
        success: true,
        message: 'All cache invalidated successfully',
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        error: 'Failed to invalidate all cache',
      };
    }
  },

  /**
   * Invalidate cache for specific content type
   */
  async invalidateContentType(ctx: any) {
    try {
      const { contentType } = ctx.params;
      await cacheInvalidationService.invalidateContentType(contentType);
      ctx.body = {
        success: true,
        message: `Cache invalidated for content type: ${contentType}`,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        error: 'Failed to invalidate content type cache',
      };
    }
  },

  /**
   * Invalidate cache for specific entry
   */
  async invalidateEntry(ctx: any) {
    try {
      const { contentType, id } = ctx.params;
      await cacheInvalidationService.invalidateEntry(contentType, id);
      ctx.body = {
        success: true,
        message: `Cache invalidated for entry: ${contentType}/${id}`,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        error: 'Failed to invalidate entry cache',
      };
    }
  },

  /**
   * Get Redis connection status
   */
  async getStatus(ctx: any) {
    try {
      const isReady = redisService.isReady();
      ctx.body = {
        success: true,
        data: {
          connected: isReady,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        error: 'Failed to get Redis status',
      };
    }
  },
}); 
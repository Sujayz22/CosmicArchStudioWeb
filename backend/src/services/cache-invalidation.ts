import redisService from './redis';

class CacheInvalidationService {
  /**
   * Invalidate cache for specific content type
   */
  async invalidateContentType(contentType: string): Promise<void> {
    try {
      const pattern = `strapi:/api/${contentType}*`;
      await redisService.flush(pattern);
      console.log(`Cache invalidated for content type: ${contentType}`);
    } catch (error) {
      console.error(`Error invalidating cache for ${contentType}:`, error);
    }
  }

  /**
   * Invalidate cache for specific entry
   */
  async invalidateEntry(contentType: string, id: string | number): Promise<void> {
    try {
      const patterns = [
        `strapi:/api/${contentType}*`,
        `strapi:/api/${contentType}/${id}*`,
      ];
      
      for (const pattern of patterns) {
        await redisService.flush(pattern);
      }
      
      console.log(`Cache invalidated for entry: ${contentType}/${id}`);
    } catch (error) {
      console.error(`Error invalidating cache for entry ${contentType}/${id}:`, error);
    }
  }

  /**
   * Invalidate all cache
   */
  async invalidateAll(): Promise<void> {
    try {
      await redisService.flush();
      console.log('All cache invalidated');
    } catch (error) {
      console.error('Error invalidating all cache:', error);
    }
  }

  /**
   * Invalidate cache for specific URL pattern
   */
  async invalidateUrlPattern(pattern: string): Promise<void> {
    try {
      const redisPattern = `strapi:${pattern}*`;
      await redisService.flush(redisPattern);
      console.log(`Cache invalidated for URL pattern: ${pattern}`);
    } catch (error) {
      console.error(`Error invalidating cache for URL pattern ${pattern}:`, error);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{
    totalKeys: number;
    memoryUsage: string;
    hitRate: number;
  }> {
    try {
      const keys = await redisService.keys('strapi:*');
      const info = await redisService.info('memory');
      
      // Parse memory usage from Redis info
      const memoryMatch = info.match(/used_memory_human:(\S+)/);
      const memoryUsage = memoryMatch ? memoryMatch[1] : '0B';
      
      return {
        totalKeys: keys.length,
        memoryUsage,
        hitRate: 0, // This would need to be tracked separately
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return {
        totalKeys: 0,
        memoryUsage: '0B',
        hitRate: 0,
      };
    }
  }
}

export default new CacheInvalidationService(); 
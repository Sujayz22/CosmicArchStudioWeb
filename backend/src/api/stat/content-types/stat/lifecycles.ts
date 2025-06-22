import cacheInvalidationService from '../../../../services/cache-invalidation';

export default {
  afterCreate(event: any) {
    // Invalidate cache for Stat content type
    cacheInvalidationService.invalidateContentType('stats');
  },

  afterUpdate(event: any) {
    // Invalidate cache for specific Stat entry and the list
    const { result } = event;
    cacheInvalidationService.invalidateEntry('stats', result.id);
    cacheInvalidationService.invalidateContentType('stats');
  },

  afterDelete(event: any) {
    // Invalidate cache for Stat content type
    cacheInvalidationService.invalidateContentType('stats');
  },
}; 
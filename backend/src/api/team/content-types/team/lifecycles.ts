import cacheInvalidationService from '../../../../services/cache-invalidation';

export default {
  afterCreate(event: any) {
    // Invalidate cache for Team content type
    cacheInvalidationService.invalidateContentType('teams');
  },

  afterUpdate(event: any) {
    // Invalidate cache for specific Team entry and the list
    const { result } = event;
    cacheInvalidationService.invalidateEntry('teams', result.id);
    cacheInvalidationService.invalidateContentType('teams');
  },

  afterDelete(event: any) {
    // Invalidate cache for Team content type
    cacheInvalidationService.invalidateContentType('teams');
  },
}; 
import cacheInvalidationService from '../../../../services/cache-invalidation';

export default {
  afterCreate(event: any) {
    // Invalidate cache for FAQ content type
    cacheInvalidationService.invalidateContentType('faqs');
  },

  afterUpdate(event: any) {
    // Invalidate cache for specific FAQ entry and the list
    const { result } = event;
    cacheInvalidationService.invalidateEntry('faqs', result.id);
    cacheInvalidationService.invalidateContentType('faqs');
  },

  afterDelete(event: any) {
    // Invalidate cache for FAQ content type
    cacheInvalidationService.invalidateContentType('faqs');
  },
}; 
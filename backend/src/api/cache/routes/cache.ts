export default {
  routes: [
    {
      method: 'GET',
      path: '/cache/stats',
      handler: 'cache.getStats',
      config: {
        auth: {
          scope: ['admin::is-authenticated'],
        },
      },
    },
    {
      method: 'POST',
      path: '/cache/invalidate-all',
      handler: 'cache.invalidateAll',
      config: {
        auth: {
          scope: ['admin::is-authenticated'],
        },
      },
    },
    {
      method: 'POST',
      path: '/cache/invalidate/:contentType',
      handler: 'cache.invalidateContentType',
      config: {
        auth: {
          scope: ['admin::is-authenticated'],
        },
      },
    },
    {
      method: 'POST',
      path: '/cache/invalidate/:contentType/:id',
      handler: 'cache.invalidateEntry',
      config: {
        auth: {
          scope: ['admin::is-authenticated'],
        },
      },
    },
    {
      method: 'GET',
      path: '/cache/status',
      handler: 'cache.getStatus',
      config: {
        auth: {
          scope: ['admin::is-authenticated'],
        },
      },
    },
  ],
}; 
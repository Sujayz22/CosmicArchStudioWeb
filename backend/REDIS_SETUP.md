# Redis Cache Setup

This Strapi backend has been configured with Redis caching to improve performance using a custom plugin. Here's how to set it up:

## Prerequisites

1. Redis server running locally or remotely
2. Node.js 18+ 
3. Strapi 5.x

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
REDIS_CACHE_DURATION=300

# Other required Strapi variables
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_SSL=false

JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
API_TOKEN_SALT=your-api-token-salt
APP_KEYS=your-app-keys
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start Redis server (if running locally):
   ```bash
   # On macOS with Homebrew
   brew services start redis
   
   # On Ubuntu/Debian
   sudo systemctl start redis
   
   # On Windows with WSL
   sudo service redis-server start
   ```

3. Start the Strapi development server:
   ```bash
   npm run develop
   ```

## Features

### Automatic Caching
- GET requests are automatically cached for 5 minutes (configurable)
- Admin routes are excluded from caching
- Authentication and upload routes are excluded from caching
- Cache headers are added to responses (`X-Cache: HIT/MISS`)

### Cache Invalidation
- Automatic cache invalidation when content is created, updated, or deleted
- Manual cache invalidation through admin API endpoints
- Pattern-based cache clearing

### Admin API Endpoints

The following endpoints are available for cache management (require admin authentication):

- `GET /api/cache/stats` - Get cache statistics
- `POST /api/cache/invalidate-all` - Invalidate all cache
- `POST /api/cache/invalidate/:contentType` - Invalidate cache for specific content type
- `POST /api/cache/invalidate/:contentType/:id` - Invalidate cache for specific entry
- `GET /api/cache/status` - Get Redis connection status

### Content Types with Auto-Invalidation

The following content types automatically invalidate their cache when modified:
- FAQs (`/api/faqs`)
- Stats (`/api/stats`)
- Teams (`/api/teams`)

## Architecture

### Plugin-Based Implementation
The Redis cache is implemented as a Strapi plugin located at `src/plugins/redis-cache/`. This approach:
- Automatically registers the middleware with Strapi
- Provides better integration with the Strapi lifecycle
- Avoids middleware configuration issues

### Services
- `src/services/redis.ts` - Redis connection and operations
- `src/services/cache-invalidation.ts` - Cache invalidation logic

### API
- `src/api/cache/` - Admin endpoints for cache management

## Configuration

### Cache Duration
Set the `REDIS_CACHE_DURATION` environment variable to change the default cache duration (in seconds).

### Redis Connection
Configure Redis connection settings through environment variables:
- `REDIS_HOST` - Redis server host (default: localhost)
- `REDIS_PORT` - Redis server port (default: 6379)
- `REDIS_PASSWORD` - Redis server password (optional)

## Monitoring

### Cache Headers
Responses include cache headers:
- `X-Cache: HIT` - Response served from cache
- `X-Cache: MISS` - Response generated and cached

### Logs
Redis connection status and cache operations are logged to the console.

## Troubleshooting

### Redis Connection Issues
1. Ensure Redis server is running
2. Check Redis host and port configuration
3. Verify Redis password if authentication is enabled
4. Check firewall settings if connecting to remote Redis

### Cache Not Working
1. Verify Redis connection in logs
2. Check if routes are being excluded from caching
3. Ensure content types have proper lifecycle hooks
4. Verify plugin is loading correctly in console logs

### Performance Issues
1. Monitor cache hit rates
2. Adjust cache duration based on content update frequency
3. Consider Redis memory usage and eviction policies
4. Use cache statistics endpoint to monitor performance

## Production Considerations

1. **Redis Persistence**: Configure Redis persistence for data durability
2. **Memory Management**: Set appropriate memory limits and eviction policies
3. **Security**: Use strong passwords and network security
4. **Monitoring**: Implement Redis monitoring and alerting
5. **Backup**: Regular Redis data backups
6. **Scaling**: Consider Redis clustering for high availability

## Docker Setup

If using Docker, add Redis service to your `docker-compose.yml`:

```yaml
version: '3'
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  strapi:
    # ... your Strapi service configuration
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - redis

volumes:
  redis_data:
``` 
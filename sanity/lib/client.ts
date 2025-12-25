import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, validateSanityConfig } from '../env';

// Validate config before creating client
const isConfigValid = validateSanityConfig();

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

// Cache configuration
const CACHE_CONFIG = {
  // Static content that rarely changes (features, base info)
  static: {
    revalidate: process.env.NODE_ENV === 'development' ? 60 : 86400, // 1 day in production
  },
  // Dynamic content that changes more frequently (projects, blogs, works)
  dynamic: {
    revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600, // 1 hour in production
  },
  // Frequently changing content
  frequent: {
    revalidate: process.env.NODE_ENV === 'development' ? 10 : 300, // 5 minutes in production
  },
};

// Helper function for fetching data with enhanced caching
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
  revalidate,
  cache = 'dynamic',
}: {
  query: string;
  params?: any;
  tags?: string[];
  revalidate?: number | false;
  cache?: 'static' | 'dynamic' | 'frequent' | false;
}) {
  // Early return if config is invalid to prevent build crashes
  if (!isConfigValid) {
    console.warn('[Sanity] Skipping fetch due to invalid configuration');
    return [] as QueryResponse;
  }

  try {
    // Determine cache strategy
    let cacheOptions: { revalidate?: number | false; tags?: string[] } = {};

    if (cache === false) {
      // No caching - always fetch fresh
      cacheOptions = { revalidate: 0 };
    } else if (revalidate !== undefined) {
      // Custom revalidate time
      cacheOptions = { revalidate, tags };
    } else {
      // Use predefined cache strategy
      const strategy = CACHE_CONFIG[cache];
      cacheOptions = { revalidate: strategy.revalidate, tags };
    }

    return await client.fetch<QueryResponse>(query, params, {
      next: cacheOptions,
    });
  } catch (error) {
    console.error('[Sanity] Fetch error:', error);
    return [] as QueryResponse;
  }
}

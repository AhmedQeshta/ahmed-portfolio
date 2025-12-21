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

// Helper function for fetching data
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: any;
  tags?: string[];
}) {
  // Early return if config is invalid to prevent build crashes
  if (!isConfigValid) {
    console.warn('[Sanity] Skipping fetch due to invalid configuration');
    return [] as QueryResponse;
  }

  try {
    return await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
        tags,
      },
    });
  } catch (error) {
    console.error('[Sanity] Fetch error:', error);
    return [] as QueryResponse;
  }
}

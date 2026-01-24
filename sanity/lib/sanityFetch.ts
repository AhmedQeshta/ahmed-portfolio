import 'server-only';

import { unstable_cache } from 'next/cache';
import { client } from './client';
import { type QueryParams } from 'next-sanity';

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
  revalidate = 300,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}) {
  if (revalidate === 0) {
    return await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: 0,
        tags,
      },
    });
  }

  return unstable_cache(
    async (query, params) => {
      // Logic for fetching from sanity
      return await client.fetch<QueryResponse>(query, params);
    },
    // Cache key based on query and params
    [query, JSON.stringify(params)],
    {
      revalidate: typeof revalidate === 'number' ? revalidate : undefined,
      tags,
    },
  )(query, params);
}

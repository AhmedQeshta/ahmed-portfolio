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

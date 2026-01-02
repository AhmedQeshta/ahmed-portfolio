import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from '../env';

// Server-only admin client for mutations
// This client requires SANITY_API_TOKEN with write permissions
export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Validate that token exists
if (!process.env.SANITY_API_TOKEN) {
  console.warn(
    '[Sanity Admin Client] SANITY_API_TOKEN is not set. Admin operations will fail.',
  );
}


import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import { SanityImageValue } from '@/features/shard/types/common';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageValue) {
  return builder.image(source);
}

// Helper function for common image transformations
export function getImageUrl(
  source: SanityImageValue,
  width?: number,
  height?: number,
  quality?: number,
) {
  let imageBuilder = urlFor(source);

  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  if (quality) imageBuilder = imageBuilder.quality(quality);

  return imageBuilder.url();
}

// Helper function to construct Sanity image URL from reference
export function getSanityImageUrl(ref: string | undefined): string | undefined {
  if (!ref) return undefined;

  const projectId = process.env.SANITY_PROJECT_ID || '0ew1aiai'; // Fallback to default
  const dataset = process.env.SANITY_DATASET || 'ahmed-qeshta-portfolio'; // Fallback to default

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref
    .replace('image-', '')
    .replace('-jpg', '.jpg')
    .replace('-png', '.png')
    .replace('-webp', '.webp')
    .replace('-jpeg', '.jpeg')
    .replace('-gif', '.gif')}`;
}

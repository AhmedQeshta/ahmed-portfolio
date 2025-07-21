import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function for common image transformations
export function getImageUrl(source: any, width?: number, height?: number, quality?: number) {
  let imageBuilder = urlFor(source);

  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);
  if (quality) imageBuilder = imageBuilder.quality(quality);

  return imageBuilder.url();
}

// Helper function to construct Sanity image URL from reference
export function getSanityImageUrl(ref: string | undefined): string | undefined {
  if (!ref) return undefined;

  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref
    .replace('image-', '')
    .replace('-jpg', '.jpg')
    .replace('-png', '.png')
    .replace('-webp', '.webp')
    .replace('-jpeg', '.jpeg')
    .replace('-gif', '.gif')}`;
}

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

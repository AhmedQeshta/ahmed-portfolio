import { getImageUrl, getBlurDataURL, getImageDimensions } from '@/sanity/lib/image';

/**
 * Get optimized image dimensions and URLs for PortableText image components
 * Prevents layout shifts and provides responsive image loading
 */
export function getDimensions(value: any) {
  // Get image dimensions to prevent layout shift
  const dimensions = getImageDimensions(value);
  const defaultWidth = 800;
  const defaultHeight = 600;

  // Calculate responsive dimensions
  const width = dimensions?.width || defaultWidth;
  const height = dimensions?.height || defaultHeight;
  const aspectRatio = width / height;

  // Generate responsive image URLs
  const imageUrl = getImageUrl(
    value,
    defaultWidth,
    Math.round(defaultWidth / aspectRatio),
    90,
    'auto',
  );
  const blurDataURL = getBlurDataURL(value);

  return {
    width,
    height,
    aspectRatio,
    imageUrl,
    blurDataURL,
  };
}

import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Enhanced helper function for optimized image transformations
export function getImageUrl(
  source: any,
  width?: number,
  height?: number,
  quality?: number,
  format?: 'webp' | 'auto',
) {
  if (!source) return '';

  let imageBuilder = urlFor(source);

  // Apply dimensions with aspect ratio preservation
  if (width) imageBuilder = imageBuilder.width(width);
  if (height) imageBuilder = imageBuilder.height(height);

  // Optimize quality (default to 85 for better balance)
  const optimizedQuality = quality || 85;
  imageBuilder = imageBuilder.quality(optimizedQuality);

  // Enable modern formats for better compression
  if (format) {
    if (format === 'auto') {
      // Auto-detect best format based on browser support
      imageBuilder = imageBuilder.format('webp').auto('format');
    } else {
      imageBuilder = imageBuilder.format(format);
    }
  } else {
    // Default to WebP with fallback
    imageBuilder = imageBuilder.format('webp').auto('format');
  }

  // Additional optimizations
  imageBuilder = imageBuilder
    .fit('clip') // Prevent upscaling
    .dpr(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1); // Responsive to device pixel ratio

  return imageBuilder.url();
}

// Optimized function for responsive images with srcset generation
export function getResponsiveImageData(
  source: any,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920],
  quality: number = 85,
  format: 'webp' | 'auto' = 'auto',
) {
  if (!source) return { src: '', srcSet: '', sizes: '' };

  const srcSet = sizes
    .map((size) => `${getImageUrl(source, size, undefined, quality, format)} ${size}w`)
    .join(', ');

  return {
    src: getImageUrl(source, sizes[0], undefined, quality, format),
    srcSet,
    sizes: `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`,
  };
}

// Generate blur placeholder for better UX
export function getBlurDataURL(source: any): string {
  if (!source) return '';

  return urlFor(source).width(20).height(20).quality(20).blur(50).format('webp').url();
}

// Helper function to construct Sanity image URL from reference (legacy support)
export function getSanityImageUrl(ref: string | undefined): string | undefined {
  if (!ref) return undefined;

  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!projectId || !dataset) {
    throw new Error(
      'Missing required environment variables: SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET',
    );
  }

  // Clean and normalize the reference
  const cleanRef = ref.replace('image-', '').replace(/-(jpg|png|webp|jpeg|gif|avif)$/, '.$1');

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${cleanRef}`;
}

// Get image dimensions to prevent layout shift
export function getImageDimensions(source: any): { width: number; height: number } | null {
  if (!source?.asset?.metadata?.dimensions) return null;

  return {
    width: source.asset.metadata.dimensions.width,
    height: source.asset.metadata.dimensions.height,
  };
}

// Get aspect ratio for consistent layouts
export function getImageAspectRatio(source: any): number | null {
  const dimensions = getImageDimensions(source);
  if (!dimensions) return null;

  return dimensions.width / dimensions.height;
}

// Helper for optimized hero images
export function getHeroImageUrl(source: any, width: number = 1920, height?: number): string {
  return getImageUrl(source, width, height, 90, 'auto');
}

// Helper for thumbnail images
export function getThumbnailUrl(source: any, size: number = 200): string {
  return getImageUrl(source, size, size, 80, 'webp');
}

// Helper for card images with consistent aspect ratio
export function getCardImageUrl(source: any, width: number = 400, height: number = 300): string {
  return getImageUrl(source, width, height, 85, 'webp');
}

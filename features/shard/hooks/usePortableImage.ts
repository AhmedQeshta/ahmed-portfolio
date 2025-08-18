import { getImageUrl } from '@/sanity/lib/image';
import { useState, useMemo } from 'react';
import {
  IPortableTextComponentsProps,
  SanityImageAsset,
  SanityImageValue,
} from '@/features/shard/types/common';

export default function usePortableImage({ value }: IPortableTextComponentsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Early return if no value or asset
  if (!value?.asset) {
    return {
      isLoading: false,
      hasError: true,
      imageSrc: '',
      handleLoad: () => {},
      handleError: () => {},
      isGif: false,
    };
  }

  // Check if the image is a GIF by examining the asset reference
  const isGif = useMemo(() => {
    const asset = value.asset as SanityImageAsset;
    return asset._ref.includes('-gif');
  }, [value.asset]);

  // For GIFs, we need to use the original URL without transformations
  const imageSrc = useMemo(() => {
    if (isGif) {
      // For GIFs, use the original URL without quality/format transformations
      return getImageUrl(value as SanityImageValue, 1200, 800);
    }
    // For other formats, use optimized settings
    return getImageUrl(value as SanityImageValue, 1200, 800, 90);
  }, [value, isGif]);

  const handleLoad = () => setIsLoading(false);

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return {
    isLoading,
    hasError,
    imageSrc,
    handleLoad,
    handleError,
    isGif,
  };
}

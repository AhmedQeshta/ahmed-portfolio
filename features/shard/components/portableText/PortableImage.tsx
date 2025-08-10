'use client';
import usePortableImage from '@/features/shard/hooks/usePortableImage';
import { IPortableTextComponentsProps } from '@/features/shard/types/common';
import Image from 'next/image';

export default function PortableImage({ value }: IPortableTextComponentsProps) {
  const { isLoading, hasError, imageSrc, handleLoad, handleError, isGif } = usePortableImage({
    value,
  });

  if (!value?.asset) return null;

  if (hasError) {
    return (
      <div className="my-6 sm:my-8 w-full">
        <div className="relative rounded-xl overflow-hidden border border-gray-700 mx-auto max-w-4xl bg-gray-800/50">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-sm">Failed to load image</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 sm:my-8 w-full">
      <div className="relative rounded-xl overflow-hidden border border-gray-700 mx-auto max-w-4xl">
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center z-10">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
              data-testid="loading-spinner"></div>
          </div>
        )}

        <Image
          src={imageSrc}
          alt={value.alt || 'Content image'}
          width={1200}
          height={800}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 85vw, (max-width: 1280px) 75vw, 1200px"
          priority={false}
          onLoad={handleLoad}
          onError={handleError}
          unoptimized={isGif} // Disable Next.js optimization for GIFs to preserve animation
        />

        {/* Caption */}
        {value.alt && (
          <div className="bg-gray-800/50 border-t border-gray-700">
            <p className="text-center text-xs sm:text-sm text-gray-400 p-2 sm:p-3">{value.alt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { IThumbnailNav } from '@/features/projects/types/project';
import { fileProcess } from '@/features/projects/utils/gallery';

const MAX_VISIBLE_THUMBNAILS = 10; // Limit visible thumbnails to reduce memory usage

export default function ThumbnailNav({
  gallery,
  selectedImageIndex,
  setSelectedImageIndex,
}: IThumbnailNav) {
  if (gallery.length <= 1) return null;

  // Only render visible thumbnails around the selected one
  const visibleThumbnails = useMemo(() => {
    if (gallery.length <= MAX_VISIBLE_THUMBNAILS) {
      return gallery.map((_, index) => index);
    }

    const start = Math.max(0, selectedImageIndex - Math.floor(MAX_VISIBLE_THUMBNAILS / 2));
    const end = Math.min(gallery.length, start + MAX_VISIBLE_THUMBNAILS);
    const indices: number[] = [];

    for (let i = start; i < end; i++) {
      indices.push(i);
    }

    // Ensure we always show MAX_VISIBLE_THUMBNAILS if possible
    if (indices.length < MAX_VISIBLE_THUMBNAILS && end === gallery.length) {
      const additional = MAX_VISIBLE_THUMBNAILS - indices.length;
      for (let i = Math.max(0, start - additional); i < start; i++) {
        indices.unshift(i);
      }
    }

    return indices;
  }, [gallery.length, selectedImageIndex]);

  return (
    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
      <div className="flex gap-3 bg-black/70 backdrop-blur-md rounded-xl p-3 max-w-md overflow-x-auto">
        {visibleThumbnails.map((index) => {
          const file = gallery[index];
          const { isVideo, src } = fileProcess(file);

          return (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                index === selectedImageIndex
                  ? 'border-white scale-110 shadow-lg'
                  : 'border-gray-600 hover:border-gray-400 hover:scale-105'
              }`}>
              {isVideo ? (
                <video
                  src={src}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="none"
                />
              ) : (
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              )}
              {index === selectedImageIndex && (
                <div className="absolute inset-0 bg-white/20 rounded-lg" />
              )}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 text-white px-2 py-0.5 rounded text-[10px]">
                    Video
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

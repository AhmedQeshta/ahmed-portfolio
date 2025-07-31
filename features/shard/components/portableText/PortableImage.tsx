'use client';
import { getImageUrl } from '@/sanity/lib/image';
import { IPortableTextComponents } from '@/features/shard/types/common';
import Image from 'next/image';
import useMobile from '@/features/shard/hooks/useMobile';

export default function PortableImage({ value }: IPortableTextComponents) {
  const isMobile = useMobile();

  if (isMobile || !value?.asset) return null;

  return (
    <div className="my-6 sm:my-8 w-full">
      <div className="relative rounded-xl overflow-hidden border border-gray-700 mx-auto max-w-4xl">
        <Image
          src={getImageUrl(value, 1200, 800, 90)}
          alt={value.alt || 'Content image'}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 85vw, (max-width: 1280px) 75vw, 1200px"
          priority={false}
        />
        {value.alt && (
          <div className="bg-gray-800/50 border-t border-gray-700">
            <p className="text-center text-xs sm:text-sm text-gray-400 p-2 sm:p-3">{value.alt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

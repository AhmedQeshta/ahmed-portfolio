import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import { IImageHeaderProps } from '@/features/shard/types/common';

export default function ImageHeader({ image, title }: IImageHeaderProps) {
  return image ? (
    <Image
      src={getImageUrl(image, 600, 400, 90)}
      alt={`Cover image for ${title}`}
      aria-label={`Cover image for ${title}`}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={false}
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 via-violet-500 to-pink-500 flex items-center justify-center">
      <div className="text-white text-5xl font-bold drop-shadow-lg">
        {title.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

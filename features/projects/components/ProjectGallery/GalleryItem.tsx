import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Image from 'next/image';
import { IGalleryItemProps } from '@/features/projects/types/project';

export default function GalleryItem({ image, title, index, openModal }: IGalleryItemProps) {
  return (
    <ScrollAnimation direction="down" delay={0.4 + index * 0.1}>
      <div
        className="group relative aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer"
        onClick={() => openModal(index)}>
        <Image
          src={image}
          alt={`${title} gallery image ${index + 1}`}
          aria-label={`${title} gallery image ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

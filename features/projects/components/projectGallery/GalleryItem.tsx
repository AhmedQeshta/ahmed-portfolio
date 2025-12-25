import Image from 'next/image';
import { IGalleryItemProps } from '@/features/projects/types/project';
import { fileProcess } from '@/features/projects/utils/gallery';

export default function GalleryItem({ file, title, index, openModal }: IGalleryItemProps) {
  const { isVideo, src } = fileProcess(file);
  return (
    <div
      className="group relative aspect-video rounded-lg overflow-hidden bg-gray-800 cursor-pointer"
      onClick={() => openModal(index)}>
      {isVideo ? (
        <video
          src={src}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          preload="metadata"
          playsInline
          muted
        />
      ) : (
        <Image
          src={src}
          alt={`${title} gallery image ${index + 1}`}
          aria-label={`${title} gallery image ${index + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 text-white px-3 py-1 rounded-md text-xs font-medium">
            Video
          </div>
        </div>
      )}
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
  );
}

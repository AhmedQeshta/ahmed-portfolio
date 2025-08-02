import Image from 'next/image';
import { IMainImageProps } from '@/features/projects/types/project';

export default function MainImage({ gallery, selectedImageIndex, title }: IMainImageProps) {
  return (
    <div className="flex items-center justify-center min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] max-h-[75vh] p-4 md:p-6">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={gallery[selectedImageIndex]}
          alt={`${title} gallery image ${selectedImageIndex + 1}`}
          width={1000}
          height={800}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
    </div>
  );
}

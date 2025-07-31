import Image from 'next/image';
import { IMainImageProps } from '@/features/projects/types/project';

export default function MainImage({ gallery, selectedImageIndex, title }: IMainImageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] md:min-h-[70vh] max-h-[80vh] p-8">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={gallery[selectedImageIndex]}
          alt={`${title} gallery image ${selectedImageIndex + 1}`}
          width={1200}
          height={800}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          priority
        />
      </div>
    </div>
  );
}

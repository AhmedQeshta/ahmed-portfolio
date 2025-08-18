import { IImageTitleProps } from '@/features/projects/types/project';

export default function ImageTitle({ title, selectedImageIndex, galleryLength }: IImageTitleProps) {
  if (galleryLength <= 1) return null;
  return (
    <div className="absolute bottom-6 left-6 right-6 z-20">
      <div className="bg-black/70 backdrop-blur-md rounded-lg px-6 py-4 mx-auto max-w-lg text-center">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-gray-300 text-sm mt-1">
          Image {selectedImageIndex + 1} of {galleryLength}
        </p>
      </div>
    </div>
  );
}

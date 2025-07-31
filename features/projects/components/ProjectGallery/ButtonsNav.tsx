import { ChevronRight, ChevronLeft } from 'lucide-react';
import { IButtonsNavProps } from '@/features/projects/types/project';

export default function ButtonsNav({ goToPrevious, goToNext, galleryLength }: IButtonsNavProps) {
  if (galleryLength <= 1) return null;
  return (
    <>
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full p-4 transition-all duration-200 hover:scale-110"
        aria-label="Previous image">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full p-4 transition-all duration-200 hover:scale-110"
        aria-label="Next image">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </>
  );
}

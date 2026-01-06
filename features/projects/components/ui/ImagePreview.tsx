'use client';

import Modal from '@/features/shard/components/ui/Modal';
import ButtonsNav from '@/features/projects/components/projectGallery/ButtonsNav';
import MainImage from '@/features/projects/components/projectGallery/MainImage';
import ImageTitle from '@/features/projects/components/projectGallery/ImageTitle';
import ThumbnailNav from '@/features/projects/components/projectGallery/ThumbnailNav';
import KeyboardHint from '@/features/projects/components/projectGallery/KeyboardHint';
import { IImagePreviewProps } from '@/features/projects/types/project';
import { fileProcess } from '@/features/projects/utils/gallery';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ImagePreview({
  selectedImageIndex,
  setSelectedImageIndex,
  closeModal,
  goToPrevious,
  goToNext,
  handleKeyPress,
  gallery,
  title,
}: IImagePreviewProps) {
  const { isDark } = useTheme();
  if (!gallery || gallery.length === 0 || selectedImageIndex === null) return null;

  const currentItem = gallery[selectedImageIndex];
  const { isVideo } = fileProcess(currentItem);

  return (
    <Modal isOpen={selectedImageIndex !== null} onClose={closeModal} maxWidth="2xl">
      <div
        className={`relative rounded-xl overflow-hidden ${isDark ? 'bg-black/95' : 'bg-white/95'}`}
        onKeyDown={handleKeyPress}
        tabIndex={0}>
        {/* Modal Header */}
        <div
          className={`absolute top-6 left-6 z-20 backdrop-blur-md rounded-lg px-4 py-2 ${
            isDark ? 'bg-black/70' : 'bg-white/70'
          }`}>
          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {selectedImageIndex + 1} of {gallery.length}
          </p>
        </div>

        {/* Navigation Buttons */}
        <ButtonsNav
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          galleryLength={gallery.length}
        />

        {/* Main Image Container */}
        <MainImage gallery={gallery} selectedImageIndex={selectedImageIndex} title={title} />

        {/* Image Title - Hidden for videos */}
        {!isVideo && (
          <ImageTitle
            title={title}
            selectedImageIndex={selectedImageIndex}
            galleryLength={gallery.length}
          />
        )}

        {/* Thumbnail Navigation - Hidden for videos */}
        {!isVideo && (
          <ThumbnailNav
            gallery={gallery}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
          />
        )}

        {/* Keyboard Hint */}
        <KeyboardHint length={gallery.length} />
      </div>
    </Modal>
  );
}

import Modal from '@/features/shard/components/ui/Modal';
import ButtonsNav from '@/features/projects/components/ProjectGallery/ButtonsNav';
import MainImage from '@/features/projects/components/ProjectGallery/MainImage';
import ImageTitle from '@/features/projects/components/ProjectGallery/ImageTitle';
import ThumbnailNav from '@/features/projects/components/ProjectGallery/ThumbnailNav';
import KeyboardHint from '@/features/projects/components/ProjectGallery/KeyboardHint';
import { IImagePreviewProps } from '@/features/projects/types/project';

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
  if (!gallery || gallery.length === 0 || selectedImageIndex === null) return null;
  return (
    <Modal isOpen={selectedImageIndex !== null} onClose={closeModal} maxWidth="2xl">
      <div
        className="relative bg-black/95 rounded-xl overflow-hidden"
        onKeyDown={handleKeyPress}
        tabIndex={0}>
        {/* Modal Header */}
        <div className="absolute top-6 left-6 z-20 bg-black/70 backdrop-blur-md rounded-lg px-4 py-2">
          <p className="text-white text-sm font-medium">
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

        {/* Image Title */}
        <ImageTitle
          title={title}
          selectedImageIndex={selectedImageIndex}
          galleryLength={gallery.length}
        />

        {/* Thumbnail Navigation */}
        <ThumbnailNav
          gallery={gallery}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
        />

        {/* Keyboard Hint */}
        <KeyboardHint length={gallery.length} />
      </div>
    </Modal>
  );
}

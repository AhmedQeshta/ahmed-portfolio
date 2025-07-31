'use client';

import { X } from 'lucide-react';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Modal from '@/features/shard/components/ui/Modal';
import { IProjectResponse } from '@/features/projects/types/project';
import useGalleryModal from '@/features/projects/hooks/useGalleryModal';
import KeyboardHint from '../ProjectGallery/KeyboardHint';
import ThumbnailNav from '../ProjectGallery/ThumbnailNav';
import ImageTitle from '../ProjectGallery/ImageTitle';
import MainImage from '../ProjectGallery/MainImage';
import ButtonsNav from '../ProjectGallery/ButtonsNav';
import Galleries from '../ProjectGallery/Galleries';

export default function ProjectGallery({ project }: IProjectResponse) {
  const { title, gallery } = project;
  if (!gallery || gallery.length == 0) return null;

  const {
    selectedImageIndex,
    setSelectedImageIndex,
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
    handleKeyPress,
  } = useGalleryModal(gallery);

  return (
    <>
      <ScrollAnimation direction="down" delay={0.1} className="space-y-4">
        <ScrollAnimation direction="down" delay={0.2}>
          <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
        </ScrollAnimation>
        <Galleries gallery={gallery} title={title} openModal={openModal} />
      </ScrollAnimation>

      {/* Image Preview Modal */}
      <Modal isOpen={selectedImageIndex !== null} onClose={closeModal} maxWidth="2xl">
        {selectedImageIndex !== null && (
          <div
            className="relative bg-black/95 rounded-xl overflow-hidden"
            onKeyDown={handleKeyPress}
            tabIndex={0}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 p-2 bg-black/70 hover:bg-black/90 backdrop-blur-md rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Close modal">
              <X className="w-5 h-5 text-white" />
            </button>

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
        )}
      </Modal>
    </>
  );
}

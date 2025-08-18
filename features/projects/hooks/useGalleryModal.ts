import { useState } from 'react';

export default function useGalleryModal(
  gallery: Array<string | { type: 'image' | 'video'; url: string }>,
) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedImageIndex(index);

  const closeModal = () => setSelectedImageIndex(null);

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : gallery.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex < gallery.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  return {
    selectedImageIndex,
    openModal,
    closeModal,
    goToPrevious,
    goToNext,
    handleKeyPress,
    setSelectedImageIndex,
  };
}

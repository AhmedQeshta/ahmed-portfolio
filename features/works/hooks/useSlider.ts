import { useEffect } from 'react';

export function useSlider() {
  useEffect(() => {
    const clonedSlides = document.querySelectorAll('.slick-cloned');
    clonedSlides.forEach((slide) => {
      const focusableElements = slide.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      focusableElements.forEach((element) => {
        (element as HTMLElement).tabIndex = -1;
      });
    });
  });
  return null;
}

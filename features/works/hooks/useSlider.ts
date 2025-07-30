import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { WorkExperienceResponse } from '@/sanity/lib/types';

export function useSlider(works: WorkExperienceResponse[]) {
  const sliderRef = useRef<Slider>(null);
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

  // Function to manage focus accessibility for slides
  const updateSlideFocus = () => {
    if (!sliderRef.current) return;

    const sliderElement = sliderRef.current.innerSlider?.list;
    if (!sliderElement) return;

    const slides = sliderElement.querySelectorAll('.slick-slide');

    slides.forEach((slide: Element) => {
      const isVisible = !slide.getAttribute('aria-hidden');
      const focusableElements = slide.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );

      focusableElements.forEach((element: Element) => {
        if (isVisible) {
          // Remove tabindex for visible slides to restore natural tab order
          if ((element as HTMLElement).getAttribute('data-original-tabindex')) {
            (element as HTMLElement).setAttribute(
              'tabindex',
              (element as HTMLElement).getAttribute('data-original-tabindex') || '0',
            );
            (element as HTMLElement).removeAttribute('data-original-tabindex');
          } else {
            (element as HTMLElement).removeAttribute('tabindex');
          }
        } else {
          // Store original tabindex and set to -1 for hidden slides
          const originalTabIndex = (element as HTMLElement).getAttribute('tabindex');
          if (originalTabIndex && originalTabIndex !== '-1') {
            (element as HTMLElement).setAttribute('data-original-tabindex', originalTabIndex);
          }
          (element as HTMLElement).setAttribute('tabindex', '-1');
        }
      });
    });
  };

  // Update focus when component mounts and slides change
  useEffect(() => {
    // Small delay to ensure slick has rendered
    const timer = setTimeout(updateSlideFocus, 100);
    return () => clearTimeout(timer);
  }, [works]);

  return { sliderRef, updateSlideFocus };
}

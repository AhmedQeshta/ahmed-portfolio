'use client';

import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Features/Card';
import { IWorkSlider } from '@/utils/types/work';

// Custom arrow components
function PrevArrow(props: any) {
  const { onClick, currentSlide } = props;
  // Don't show previous button at the beginning of the slider
  const isDisabled = currentSlide === 0;

  return (
    <button
      onClick={onClick}
      className={`custom-slider-arrow absolute left-0 md:-left-7 lg:-left-8 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
      aria-label="Previous slide"
      disabled={isDisabled}
      type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

function NextArrow(props: any) {
  const { onClick, currentSlide, slideCount } = props;
  // Don't show next button at the end of the slider
  const isDisabled = currentSlide === slideCount - 1;

  return (
    <button
      onClick={onClick}
      className={`custom-slider-arrow absolute right-0 md:-right-7 lg:-right-8 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
      aria-label="Next slide"
      disabled={isDisabled}
      type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

export default function WorkSlider({ works }: IWorkSlider) {
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

  const sliderSettings = {
    dots: true,
    infinite: works.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: true,
          centerMode: true,
          centerPadding: '30px',
        },
      },
    ],
  };

  return (
    <div className="relative px-10 md:px-12 lg:px-16 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16 pb-14">
      <div className="mx-2 md:mx-6">
        <Slider {...sliderSettings} className="overflow-visible">
          {works.map((work) => (
            <div key={work._id} className="px-2 md:px-3 lg:px-4">
              <Card work={work} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

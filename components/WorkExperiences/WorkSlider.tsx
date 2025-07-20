'use client';

import { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Features/Card';
import { IWorkSlider } from '@/utils/types/work';

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
    dots: false,
    infinite: works.length > 1,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '30px',
        },
      },
    ],
  };

  return (
    <div className="relative px-2 md:px-0 -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16">
      <Slider {...sliderSettings} className="overflow-visible">
        {works.map((work) => (
          <div key={work._id} className="px-2 md:px-3 lg:px-4">
            <Card work={work} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

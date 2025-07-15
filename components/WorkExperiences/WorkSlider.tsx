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
    responsive: [
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
        },
      },
    ],
  };

  return (
    <div className="relative px-4">
      <Slider {...sliderSettings}>
        {works.map((work) => (
          <div key={work._id} className="px-3">
            <Card work={work} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

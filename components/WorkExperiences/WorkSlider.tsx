'use client';

import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Features/Card';
import { IWorkSlider } from '@/utils/types/work';

export default function WorkSlider({ works, readMore = true }: IWorkSlider) {
  const router = useRouter();

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
          <div className="px-3">
            <Card work={work} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

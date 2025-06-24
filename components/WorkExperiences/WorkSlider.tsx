'use client';

import { getImageUrl } from '@/sanity/lib/image';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { durationOfWork } from '@/utils/date';
import { MapPin, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import { handleCardClick } from '@/utils/handleCardLInk';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getEmploymentTypeColor, getLocationTypeColor } from '@/utils/statusColor';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import Card from './Features/Card';

interface WorkSliderProps {
  works: WorkExperienceResponse[];
  readMore?: boolean;
}

export default function WorkSlider({ works, readMore = true }: WorkSliderProps) {
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

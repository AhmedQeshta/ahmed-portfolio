'use client';

import { getImageUrl } from '@/sanity/lib/image';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { durationOfWork } from '@/utils/durationOfWork';
import { createSlug } from '@/utils/slug';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface WorkSliderProps {
  works: WorkExperienceResponse[];
  readMore?: boolean;
}

export default function WorkSlider({ works, readMore = true }: WorkSliderProps) {
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
    // customPaging: () => (
    //   <div className="w-3 h-3 bg-white/30 rounded-full hover:bg-white/60 transition-all"></div>
    // ),
    // dotsClass: 'slick-dots !bottom-[-50px] !flex !justify-center !gap-2',
  };

  return (
    <div className="relative px-4">
      <Slider {...sliderSettings}>
        {works.map((work) => (
          <div key={work._id} className="px-4">
            <div className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-card-hover transition-all duration-300 h-full group">
              {/* Company Logo */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                {work.logo ? (
                  <Image
                    src={getImageUrl(work.logo, 64, 64, 90)}
                    alt={work.company}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-white text-2xl font-bold">{work.company.charAt(0)}</span>
                )}
              </div>

              {/* Job Title */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {work.title}
              </h3>

              {/* Company Name */}
              <p className="text-text-secondary mb-2 font-medium">{work.company}</p>

              {/* Location & Employment Type */}
              <div className="flex flex-wrap gap-2 mb-3">
                {work.location && (
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                    📍 {work.location}
                  </span>
                )}
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                  {work.locationType}
                </span>
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                  {work.employmentType}
                </span>
              </div>

              {/* Technologies */}
              <div className="mb-3">
                <p className="text-text-accent text-sm mb-2 font-medium">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {work.technologies.slice(0, 4).map((tech) => (
                    <div
                      key={tech._id}
                      className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-md">
                      <div className="relative w-4 h-4">
                        <Image
                          src={getImageUrl(tech.logo, 16, 16, 90)}
                          alt={tech.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs text-gray-300">{tech.name}</span>
                    </div>
                  ))}
                  {work.technologies.length > 4 && (
                    <span className="text-xs text-gray-400 px-2 py-1">
                      +{work.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Duration */}
              <p className="text-text-secondary text-sm mb-4 font-medium">
                🗓️ {durationOfWork(work.startDate, work.endDate ?? '', work.current)}
              </p>

              {/* Description */}
              {work.description && (
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">{work.description}</p>
              )}

              {/* Read More Button */}
              {readMore && (
                <Link
                  href={`/works/${work.slug}`}
                  className="inline-block px-4 py-2 gradient-button rounded-md text-sm font-medium hover:scale-105 transition-transform">
                  Read about position →
                </Link>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

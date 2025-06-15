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
          <ScrollAnimation key={work._id} direction="down" delay={0.1}>
            <div className="px-3">
              <div
                className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-card-hover transition-all duration-300 h-full group cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
                onClick={(e) => handleCardClick({ link: `/works/${work.slug}`, router, event: e })}>
                {/* Header with Logo and Company */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 p-2 group-hover:scale-110 transition-transform duration-300">
                    {work.logo ? (
                      <Image
                        src={getImageUrl(work.logo, 56, 56, 90)}
                        alt={work.company}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {work.company.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {work.title}
                    </h3>
                    <div className="flex items-center gap-1 text-text-accent font-medium">
                      <Briefcase className="w-3 h-3" />
                      <span className="text-sm">{work.company}</span>
                    </div>
                  </div>

                  {work.current && (
                    <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-1 rounded-lg text-xs font-medium">
                      Current
                    </span>
                  )}
                </div>

                {/* Employment and Location Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium border ${getEmploymentTypeColor(
                      work.employmentType,
                    )}`}>
                    {work.employmentType.replace('-', ' ')}
                  </span>
                  {work.locationType && (
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium border ${getLocationTypeColor(
                        work.locationType,
                      )}`}>
                      {work.locationType.replace('-', ' ')}
                    </span>
                  )}
                </div>

                {/* Duration and Location */}
                <div className="flex flex-col gap-2 mb-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{durationOfWork(work.startDate, work.endDate ?? '', work.current)}</span>
                  </div>
                  {work.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{work.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {work.description && (
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
                    {work.description}
                  </p>
                )}

                {/* Technologies */}
                {work.technologies && work.technologies.length > 0 && (
                  <div className="mb-4">
                    <p className="text-text-accent text-xs mb-2 font-medium">Technologies:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {work.technologies.slice(0, 3).map((tech) => (
                        <div
                          key={tech._id}
                          className="flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md transition-colors border border-white/5">
                          {tech.logo && (
                            <div className="relative w-3 h-3">
                              <Image
                                src={getImageUrl(tech.logo, 12, 12, 90)}
                                alt={tech.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <span className="text-xs text-gray-300">{tech.name}</span>
                        </div>
                      ))}
                      {work.technologies.length > 3 && (
                        <div className="text-xs text-gray-400 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                          +{work.technologies.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                {readMore && (
                  <div className="pt-3 border-t border-white/10">
                    <Link
                      href={`/works/${work.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-white transition-colors group/btn"
                      onClick={(e) => e.stopPropagation()}>
                      <span>View Experience</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </Slider>
    </div>
  );
}

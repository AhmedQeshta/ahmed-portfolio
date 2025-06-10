import { getImageUrl } from '@/sanity/lib/image';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { durationOfWork } from '@/utils/date';
import { ExternalLink, MapPin, Calendar, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface WorkCardProps {
  works: WorkExperienceResponse[];
}

export default function WorkCard({ works }: WorkCardProps) {
  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'part-time':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'freelance':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'contract':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'internship':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'remote':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'on-site':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'hybrid':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {works.map((work) => (
        <Link
          key={work._id}
          href={`/works/${work.slug}`}
          className="block bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-card-hover transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl">
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
                  <span className="text-white text-xl font-bold">{work.company.charAt(0)}</span>
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
              className={`px-2 py-1 rounded-lg text-xs font-medium border ${getEmploymentTypeColor(work.employmentType)}`}>
              {work.employmentType.replace('-', ' ')}
            </span>
            {work.locationType && (
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium border ${getLocationTypeColor(work.locationType)}`}>
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
                {work.technologies.slice(0, 4).map((tech) => (
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
                {work.technologies.length > 4 && (
                  <div className="text-xs text-gray-400 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                    +{work.technologies.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* View More Indicator */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-text-accent text-sm font-medium">View Details</span>
            <ExternalLink className="w-4 h-4 text-text-accent group-hover:text-white transition-colors" />
          </div>
        </Link>
      ))}
    </div>
  );
}

import { getImageUrl } from '@/sanity/lib/image';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { durationOfWork } from '@/utils/date';
import { ExternalLink, MapPin, Calendar, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TechnologiesHome from '@/components/ui/TechnologiesHome';
import { getEmploymentTypeColor, getLocationTypeColor } from '@/utils/statusColor';

interface WorkCardProps {
  works: WorkExperienceResponse[];
}

export default function WorkCard({ works }: WorkCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {works.map(
        ({
          _id,
          slug,
          logo,
          company,
          current,
          title,
          employmentType,
          locationType,
          startDate,
          endDate,
          location,
          description,
          technologies,
        }) => (
          <Link
            key={_id}
            href={`/works/${slug}`}
            className="block bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-card-hover transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl">
            {/* Header with Logo and Company */}
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white/5 flex-shrink-0 p-2 group-hover:scale-110 transition-transform duration-300">
                {logo ? (
                  <Image
                    src={getImageUrl(logo, 56, 56, 90)}
                    alt={company}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{company.charAt(0)}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {title}
                </h3>
                <div className="flex items-center gap-1 text-text-accent font-medium">
                  <Briefcase className="w-3 h-3" />
                  <span className="text-sm">{company}</span>
                </div>
              </div>

              {current && (
                <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-2 py-1 rounded-lg text-xs font-medium">
                  Current
                </span>
              )}
            </div>

            {/* Employment and Location Info */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium border ${getEmploymentTypeColor(
                  employmentType,
                )}`}>
                {employmentType.replace('-', ' ')}
              </span>
              {locationType && (
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium border ${getLocationTypeColor(
                    locationType,
                  )}`}>
                  {locationType.replace('-', ' ')}
                </span>
              )}
            </div>

            {/* Duration and Location */}
            <div className="flex flex-col gap-2 mb-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{durationOfWork(startDate, endDate ?? '', current)}</span>
              </div>
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
                {description}
              </p>
            )}

            {/* Technologies */}
            <TechnologiesHome technologies={technologies} link={`/works/${slug}`} />

            {/* View More Indicator */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-text-accent text-sm font-medium">View Details</span>
              <ExternalLink className="w-4 h-4 text-text-accent group-hover:text-white transition-colors" />
            </div>
          </Link>
        ),
      )}
    </div>
  );
}

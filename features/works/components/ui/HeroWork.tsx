'use client';

import { getEmploymentTypeColor, getLocationTypeColor } from '@/features/shard/utils/statusColor';
import { IWorkResponse } from '@/features/works/types/work';
import { Building, ExternalLink } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function HeroWork({ work }: IWorkResponse) {
  const { isDark } = useTheme();
  if (!work) return null;
  const { employmentType, current, locationType, title, companyUrl, company, description } = work;

  return (
    <div className="relative h-[50vh] overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isDark ? 'from-purple-600 to-blue-600' : 'from-purple-400 to-blue-400'
        }`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            isDark ? 'from-purple-900/30 to-blue-900/30' : 'from-purple-800/20 to-blue-800/20'
          }`}
        />
      </div>

      {/* Gradient Overlays */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isDark
            ? 'from-black via-black/50 to-transparent'
            : 'from-white via-white/50 to-transparent'
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          isDark
            ? 'from-black/30 via-transparent to-black/30'
            : 'from-white/30 via-transparent to-white/30'
        }`}
      />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span
              className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getEmploymentTypeColor(
                employmentType,
              )}`}>
              {employmentType.replace('-', ' ').toUpperCase()}
            </span>
            {current && (
              <span className="inline-block px-4 py-2 text-sm font-medium rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                CURRENT POSITION
              </span>
            )}
            {locationType && (
              <span
                className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getLocationTypeColor(
                  locationType,
                )}`}>
                {locationType.replace('-', ' ').toUpperCase()}
              </span>
            )}
          </div>

          {/* Title and Company */}
          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
            {title}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <Building size={28} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
            {companyUrl ? (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-2xl md:text-3xl transition-colors flex items-center gap-2 ${
                  isDark
                    ? 'text-purple-300 hover:text-purple-200'
                    : 'text-purple-700 hover:text-purple-600'
                }`}>
                {company}
                <ExternalLink size={24} />
              </a>
            ) : (
              <span
                className={`text-2xl md:text-3xl ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {company}
              </span>
            )}
          </div>
          {description && (
            <p
              className={`text-lg md:text-xl max-w-3xl leading-relaxed ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

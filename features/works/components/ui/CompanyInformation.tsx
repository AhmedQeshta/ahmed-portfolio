'use client';

import { getImageUrl } from '@/sanity/lib/image';
import { IWorkResponse } from '@/features/works/types/work';
import { Building, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function CompanyInformation({ work: { logo, company, companyUrl } }: IWorkResponse) {
  if (!logo) return null;
  const { isDark } = useTheme();

  return (
    <div
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8`}>
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
        <Building size={28} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
        Company
      </h2>
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white p-2 flex-shrink-0">
          <Image
            src={getImageUrl(logo, 80, 80, 90)}
            alt={company}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {company}
          </h3>
          {companyUrl && (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors flex items-center gap-2 ${
                isDark
                  ? 'text-purple-300 hover:text-purple-200'
                  : 'text-purple-600 hover:text-purple-700'
              }`}>
              Visit Company Website
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

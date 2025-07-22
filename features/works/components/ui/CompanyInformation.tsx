import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { getImageUrl } from '@/sanity/lib/image';
import { IWorkResponse } from '@/features/works/types/work';
import { Building, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function CompanyInformation({ work: { logo, company, companyUrl } }: IWorkResponse) {
  if (!logo) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
      <ScrollAnimation direction="down" delay={0.1}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Building size={28} className="text-purple-400" />
          Company
        </h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.2}>
        <div className="flex items-center gap-6">
          <ScrollAnimation direction="down" delay={0.3}>
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white p-2 flex-shrink-0">
              <Image
                src={getImageUrl(logo, 80, 80, 90)}
                alt={company}
                fill
                className="object-contain"
              />
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="down" delay={0.4}>
            <h3 className="text-xl font-bold text-white mb-2">{company}</h3>
            {companyUrl && (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-2">
                Visit Company Website
                <ExternalLink size={16} />
              </a>
            )}
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    </div>
  );
}

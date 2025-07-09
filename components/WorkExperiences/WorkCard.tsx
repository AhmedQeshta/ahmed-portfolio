import { getImageUrl } from '@/sanity/lib/image';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { durationOfWork } from '@/utils/date';
import { ExternalLink, MapPin, Calendar, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TechnologiesHome from '@/components/ui/TechnologiesHome';
import { getEmploymentTypeColor, getLocationTypeColor } from '@/utils/statusColor';
import Card from './Features/Card';

interface IWorkCard {
  works: WorkExperienceResponse[];
}

export default function WorkCard({ works }: IWorkCard) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {works.map((work) => (
        <Card key={work._id} work={work} />
      ))}
    </div>
  );
}

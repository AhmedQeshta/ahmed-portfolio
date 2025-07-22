import { WorkExperienceResponse } from '@/sanity/lib/types';
import { MapPin } from 'lucide-react';

interface LocationProps {
  work: WorkExperienceResponse;
}
export default function Location({ work: { locationType, location } }: LocationProps) {
  if (!location) return null;

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
        <MapPin size={24} className="text-green-400" />
        Location
      </h3>
      <div className="text-gray-300">
        <p className="font-medium">{location}</p>
        <p className="text-sm text-gray-400 capitalize mt-1">{locationType?.replace('-', ' ')}</p>
      </div>
    </div>
  );
}

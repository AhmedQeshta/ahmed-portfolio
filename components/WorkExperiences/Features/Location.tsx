import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { IWorkResponse } from '@/utils/types/work';
import { MapPin } from 'lucide-react';

export default function Location({ work: { locationType, location } }: IWorkResponse) {
  if (!location) return null;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <ScrollAnimation direction="down" delay={0.2}>
        <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
          <MapPin size={24} className="text-green-400" />
          Location
        </h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="text-gray-300">
          <p className="font-medium">{location}</p>
          {locationType && (
            <p className="text-sm text-gray-400 capitalize mt-1">
              {locationType.replace('-', ' ')}
            </p>
          )}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

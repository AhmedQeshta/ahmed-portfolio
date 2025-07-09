import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { Award } from 'lucide-react';

interface IAchievements {
  work: WorkExperienceResponse;
}
export default function Achievements({ work: { achievements } }: IAchievements) {
  if (!achievements || achievements.length == 0) return null;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.2}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Award size={28} className="text-yellow-400" />
          Key Achievements
        </h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <ul className="space-y-4">
          {achievements.map((achievement, index) => (
            <ScrollAnimation
              key={index}
              direction="down"
              delay={0.4 + index * 0.1}
              className="flex items-start gap-3 text-gray-300">
              <li className="flex items-start gap-3 text-gray-300">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{achievement}</span>
              </li>
            </ScrollAnimation>
          ))}
        </ul>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

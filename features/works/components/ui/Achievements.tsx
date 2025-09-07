'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IWorkResponse } from '@/features/works/types/work';
import { Award } from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Achievements({ work: { achievements } }: IWorkResponse) {
  if (!achievements || achievements.length == 0) return null;
  const { isDark } = useTheme();

  return (
    <ScrollAnimation
      direction="down"
      delay={0.2}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8`}>
      <ScrollAnimation direction="down" delay={0.2}>
        <h2
          className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
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
              className={`flex items-start gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
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

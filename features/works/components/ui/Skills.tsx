'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IWorkResponse } from '@/features/works/types/work';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Skills({ work: { skills } }: IWorkResponse) {
  if (!skills) return null;
  const { isDark } = useTheme();

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8`}>
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Skills & Responsibilities
        </h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div
          className={`leading-relaxed whitespace-pre-line ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
          {skills}
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

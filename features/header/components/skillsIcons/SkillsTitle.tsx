'use client';

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function SkillsTitle() {
  const { isDark } = useTheme();

  return (
    <ScrollAnimation direction="up" delay={0.1} className="text-center lg:text-left my-5">
      <h3
        className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent'} mb-2`}>
        Core Technologies
      </h3>
      <p className="text-gray-400">Technologies I work with</p>
    </ScrollAnimation>
  );
}

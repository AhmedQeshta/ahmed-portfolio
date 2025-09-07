'use client';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function HeadLine() {
  const { isDark } = useTheme();

  return (
    <ScrollAnimation direction="down" delay={0.2}>
      <div className="mb-6">
        <h3
          className={`text-xl sm:text-2xl font-bold  mb-3 leading-tight ${isDark ? 'text-white' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent '}`}>
          Let's Build Something
          <span className={`block ${isDark ? 'gradient-text' : 'text-purple-800'}`}>
            Extraordinary Together
          </span>
        </h3>
        <p className="text-text-secondary leading-relaxed">
          I'm passionate about creating digital experiences that make a difference. Whether you're
          looking to collaborate on a project or need a dedicated developer for your team, I'd love
          to hear from you.
        </p>
      </div>
    </ScrollAnimation>
  );
}

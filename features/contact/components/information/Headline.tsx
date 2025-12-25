'use client';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function HeadLine() {
  const { isDark } = useTheme();

  return (
    <div className="mb-6">
      <h3
        className={`text-xl sm:text-2xl font-bold  mb-3 leading-tight ${isDark ? 'text-white' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent '}`}>
        Let&apos;s Build Something
        <span className={`block ${isDark ? 'gradient-text' : 'text-purple-800'}`}>
          Extraordinary Together
        </span>
      </h3>
      <p className="text-text-secondary leading-relaxed">
        I&apos;m passionate about creating digital experiences that make a difference. Whether
        you&apos;re looking to collaborate on a project or need a dedicated developer for your team,
        I&apos;d love to hear from you.
      </p>
    </div>
  );
}

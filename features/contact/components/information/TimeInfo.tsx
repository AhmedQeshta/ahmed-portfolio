'use client';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function TimeInfo() {
  const { isDark } = useTheme();
  return (
    <ScrollAnimation direction="down" delay={0.4}>
      <div className="mt-auto">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-2 h-2 ${isDark ? 'bg-purple-400 ' : 'bg-purple-500 '} rounded-full animate-pulse`}
            />
            <span
              className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-500'}`}>
              Quick Response
            </span>
          </div>
          <p className="text-text-secondary text-sm">
            I typically respond within 24 hours. For urgent matters, feel free to call directly.
          </p>
        </div>
      </div>
    </ScrollAnimation>
  );
}

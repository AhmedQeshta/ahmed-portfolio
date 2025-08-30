'use client';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ContactHeader() {
  const { isDark } = useTheme();

  return (
    <div className="text-center mb-16 lg:mb-20">
      <ScrollAnimation direction="down" delay={0.1}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
          <div
            className={`w-2 h-2 ${isDark ? 'bg-purple-400' : 'bg-purple-600'} rounded-full animate-pulse`}
          />
          <span className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
            Get In Touch
          </span>
        </div>
      </ScrollAnimation>

      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span
            className={`${isDark ? 'gradient-text' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-300 bg-clip-text text-transparent '}`}>
            Let's Create
          </span>
          <br />
          <span
            className={`${isDark ? 'text-white' : 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent '}`}>
            Something Amazing
          </span>
        </h2>
      </ScrollAnimation>

      <ScrollAnimation direction="down" delay={0.3}>
        <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? Whether it's a new project, collaboration, or just a
          friendly chat about technology, I'm here to help.
        </p>
      </ScrollAnimation>
    </div>
  );
}

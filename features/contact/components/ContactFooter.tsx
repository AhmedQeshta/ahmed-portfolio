'use client';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ContactFooter() {
  const { isDark } = useTheme();
  return (
    <div className="mt-16 lg:mt-20 text-center">
      <ScrollAnimation direction="up" delay={0.6}>
        <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-8 sm:p-10">
          <h3
            className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent '} mb-4`}>
            Ready to Start Your Project?
          </h3>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            Let's discuss your ideas and turn them into reality. I'm always excited to work on new
            challenges and innovative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 gradient-button-primary rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Start a Conversation
            </a>
            <a
              href="/projects"
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 border ${isDark ? 'border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10' : 'border-black/20 hover:border-black/30 bg-black/5 hover:bg-black/10 '}  rounded-full font-semibold text-white transition-all duration-300 hover:scale-105`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              View My Work
            </a>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
}

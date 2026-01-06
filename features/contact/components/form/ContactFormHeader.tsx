'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ContactFormHeader() {
  const { isDark } = useTheme();
  return (
    <div className="mb-8">
      <h3
        className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-300 bg-clip-text text-transparent '} mb-3`}>
        Send Message
      </h3>
      <p className="text-text-secondary">
        Fill out the form below and I&apos;ll get back to you as soon as possible.
      </p>
    </div>
  );
}

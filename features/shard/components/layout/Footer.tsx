'use client';

import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Footer() {
  const { isDark } = useTheme();
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`absolute top-4 left-1/4 w-2 h-2  ${isDark ? 'bg-white/20 ' : 'bg-black/20 '} rounded-full animate-pulse`}
        />
        <div
          className={`absolute top-8 right-1/3 w-1.5 h-1.5 ${isDark ? 'bg-white/15 ' : 'bg-black/15 '} rounded-full animate-pulse delay-1000`}
        />
        <div
          className={`absolute bottom-6 left-1/2 w-1 h-1 ${isDark ? 'bg-white/25 ' : 'bg-black/25 '} rounded-full animate-pulse delay-500`}
        />
      </div>

      <div
        className={`relative z-10 py-12 border-t  ${isDark ? 'border-white/10' : 'border-black/10'} transition-all duration-1000 ease-out`}>
        <div className="mx-auto max-w-5xl px-4">
          {/* Main content container */}
          <div className="text-center space-y-6">
            {/* Decorative line */}
            <div className="flex items-center justify-center space-x-4">
              <div
                className={`h-px bg-gradient-to-r from-transparent ${isDark ? 'via-white/20' : 'via-black/20'}  to-transparent flex-1 max-w-32`}
              />
              <div
                className={`w-2 h-2  ${isDark ? 'bg-white/30' : 'bg-black/30'} rounded-full animate-pulse`}
              />
              <div
                className={`h-px bg-gradient-to-r from-transparent ${isDark ? 'via-white/20' : 'via-black/20'} to-transparent flex-1 max-w-32`}
              />
            </div>

            {/* Copyright text with enhanced styling */}
            <div className="group">
              <p
                className={`text-sm ${isDark ? 'gradient-text' : 'bg-gradient-to-r from-purple-900 via-pink-900 to-blue-900 bg-clip-text text-transparent '}  font-medium tracking-wide transition-all duration-300 group-hover:scale-105`}>
                © {new Date().getFullYear()}
                <span className={`${isDark ? 'mx-2 text-white/60' : 'mx-2 text-black/60'}`}>•</span>
                <span
                  className={`bg-gradient-to-r ${isDark ? 'from-white via-white/90 to-white/70' : 'from-black via-black/90 to-black/70'} bg-clip-text text-transparent font-semibold`}>
                  Ahmed Qeshta
                </span>
                <span className={`${isDark ? 'mx-2 text-white/60' : 'mx-2 text-black/60'}`}>•</span>
                All rights reserved.
              </p>
            </div>

            {/* Animated bottom accent */}
            <div className="flex justify-center">
              <div
                className={`w-16 h-0.5 bg-gradient-to-r from-transparent  ${isDark ? 'via-white/30 ' : 'via-black/30 '} to-transparent rounded-full animate-pulse`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent  ${isDark ? 'via-white/20' : 'via-black/20'} to-transparent`}
      />
    </footer>
  );
}

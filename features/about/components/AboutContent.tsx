'use client';

import { Sparkles } from 'lucide-react';
import { useAbout } from '@/features/about/hooks/useAbout';

export default function AboutContent() {
  const { sections, isDark } = useAbout();
  return (
    <div className="max-w-[1450px] mx-auto space-y-8">
      {/* Hero Header */}
      <div
        className={`relative overflow-hidden rounded-2xl p-8 md:p-12 ${
          isDark
            ? 'bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700'
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
        } backdrop-blur-sm`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`p-3 rounded-xl ${
                isDark
                  ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30'
                  : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'
              }`}>
              <Sparkles className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
              About Me
            </h1>
          </div>
          <p
            className={`text-xl md:text-2xl ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } leading-relaxed`}>
            Building innovative digital solutions with passion and precision
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={section.id}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
                isDark
                  ? 'bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-gray-700'
                  : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}>
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative p-6 md:p-8">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-lg ${
                      isDark
                        ? 'bg-gray-800 border border-gray-700 group-hover:border-gray-600'
                        : 'bg-gray-100 border border-gray-200 group-hover:border-gray-300'
                    } transition-all duration-300 group-hover:scale-110`}>
                    <Icon
                      className={`w-6 h-6 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      } transition-colors`}
                    />
                  </div>
                  <h2
                    className={`text-2xl md:text-3xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                    {section.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div
                  className={`prose prose-lg max-w-none ${isDark ? 'prose-invert' : 'prose-gray'}`}>
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

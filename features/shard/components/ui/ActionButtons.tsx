'use client';
import { cn } from '@/features/shard/utils/statusColor';
import ScrollAnimation from './ScrollAnimation';
import Link from 'next/link';
import { IActionButtons } from '@/features/shard/types/common';

export default function ActionButtons({ listLinks }: IActionButtons) {
  if (!listLinks) {
    return null;
  }

  return (
    <ScrollAnimation direction="up" delay={0.1} className="flex gap-4">
      <div className="flex flex-wrap gap-3" role="group" aria-label="Project actions">
        {listLinks.length > 0 &&
          listLinks.map(({ id, text, link, customStyle, icon }) => {
            if (!link || !text) return null;

            const isExternal = link.startsWith('http') || link.startsWith('mailto:');
            const linkText = isExternal ? `${text} (opens in new tab)` : text;

            return (
              <a
                key={id}
                href={link}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={linkText}
                title={linkText}
                className={`flex items-center gap-2 hover:text-blue-400 ${customStyle || 'space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-105'}`}>
                {icon && (
                  <span aria-hidden="true" className="w-4 h-4">
                    {icon}
                  </span>
                )}
                <span>{text}</span>
                {isExternal && (
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    focusable="false">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </a>
            );
          })}
      </div>
    </ScrollAnimation>
  );
}

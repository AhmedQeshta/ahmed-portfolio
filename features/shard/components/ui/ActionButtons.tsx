'use client';
import { cn } from '@/features/shard/utils/statusColor';
import ScrollAnimation from './ScrollAnimation';
import Link from 'next/link';
import { IActionButtons } from '@/features/shard/types/common';

export default function ActionButtons({ listLinks }: IActionButtons) {
  if (!listLinks) return null;

  // Helper function to determine if a link is external
  const isExternalLink = (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:');
  };

  return (
    <ScrollAnimation direction="down" delay={0.4} className="flex gap-4">
      {listLinks?.map(({ id, text, link, customStyle, icon }) => {
        // Only render if link exists and is not empty
        if (!link || link.trim() === '') {
          return null;
        }

        const isExternal = isExternalLink(link);

        return (
          <Link
            key={id}
            href={link}
            prefetch={!isExternal}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={cn(customStyle, 'flex items-center gap-2 hover:text-blue-400')}>
            {icon && icon}
            {text}
          </Link>
        );
      })}
    </ScrollAnimation>
  );
}

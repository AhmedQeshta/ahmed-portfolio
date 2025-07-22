'use client';
import { cn } from '@/features/shard/utils/statusColor';
import ScrollAnimation from './ScrollAnimation';
import Link from 'next/link';
import { IActionButtons } from '@/features/shard/types/common';

export default function ActionButtons({ listLinks }: IActionButtons) {
  if (!listLinks) return null;

  return (
    <ScrollAnimation direction="down" delay={0.4} className="flex gap-4">
      {listLinks.map(({ id, text, link, customStyle, icon }) => (
        <Link
          key={id}
          href={link ?? '/'}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(customStyle, 'flex items-center gap-2 hover:text-blue-400')}>
          {icon && icon}
          {text}
        </Link>
      ))}
    </ScrollAnimation>
  );
}

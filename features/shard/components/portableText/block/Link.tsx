'use client';

import { IMarkLinkProps } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Link({ children, value }: IMarkLinkProps) {
  const { isDark } = useTheme();
  if (!children) return null;
  return (
    <a
      href={value?.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline transition-colors ${
        isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
      }`}>
      {children}
    </a>
  );
}

'use client';

import { ILinkNavigation } from '@/features/shard/types/common';
import { ArrowLeft } from 'lucide-react';
import OptimizedLink from './OptimizedLink';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function NavigationHeader({ link, text }: ILinkNavigation) {
  const { isDark } = useTheme();

  return (
    <div className="relative z-10 p-6 pt-20 lg:pt-24" data-testid="navigation-header">
      <OptimizedLink
        href={link}
        className={`inline-flex items-center gap-2 transition-colors group ${
          isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        }`}>
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {text}
      </OptimizedLink>
    </div>
  );
}

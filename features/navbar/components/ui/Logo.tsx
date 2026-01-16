'use client';
import Image from 'next/image';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { useThemeToggle } from '@/features/theme/hooks/useThemeToggle';

import logoLight from '@/public/logo-light.png';
import logoDark from '@/public/logo-dark.png';

export default function Logo() {
  const { isDark } = useThemeToggle();
  return (
    <OptimizedLink href="/" className="flex-shrink-0">
      <div className="relative hover:scale-105 transition-transform duration-200">
        <Image
          src={isDark ? logoLight : logoDark}
          alt="Ahmed Qeshta"
          width={60}
          height={20}
          className="object-contain"
          priority
        />
      </div>
    </OptimizedLink>
  );
}

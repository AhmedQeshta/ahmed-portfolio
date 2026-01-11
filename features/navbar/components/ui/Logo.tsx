'use client';
import Image from 'next/image';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { useThemeToggle } from '@/features/theme/hooks/useThemeToggle';
import { Dot } from 'lucide-react';

export default function Logo() {
  const { isDark } = useThemeToggle();
  const color = isDark ? '#eeaef7' : '#590d63';
  const styleLogo = isDark
    ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent'
    : '#0f172af2';
  return (
    <OptimizedLink href="/" className="flex-shrink-0">
      <div className="relative hover:scale-105 transition-transform duration-200">
        <Image
          src="/logo.png"
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

'use client';
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
      <span
        className={`relative ${styleLogo}  font-bold uppercase text-xl sm:text-2xl hover:scale-105 transition-transform duration-200`}>
        Ahmed
        <span className="absolute -top-2 left-18">
          <Dot size={50} color={color} />
        </span>
      </span>
    </OptimizedLink>
  );
}

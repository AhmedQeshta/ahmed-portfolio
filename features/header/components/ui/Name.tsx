'use client';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Name({ name }: { name: string }) {
  const { isDark } = useTheme();

  return (
    <h1 className={`text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold text-text-primary`}>
      {name}
    </h1>
  );
}

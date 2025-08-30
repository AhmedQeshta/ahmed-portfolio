'use client';

import { IBaseInfo } from '@/features/contact/types/contact';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Availability({ baseInfo }: IBaseInfo) {
  const { availability } = baseInfo;

  const { isDark } = useTheme();

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
      <div
        className={`w-2 h-2 ${
          availability.toLowerCase() === 'available'
            ? isDark
              ? 'bg-green-400'
              : 'bg-green-600'
            : isDark
              ? 'bg-red-400'
              : 'bg-red-600'
        } rounded-full animate-pulse`}
      />
      <span
        className={`text-sm font-medium ${
          availability.toLowerCase() === 'available'
            ? isDark
              ? 'text-green-300'
              : 'text-green-500'
            : isDark
              ? 'text-red-300'
              : 'text-red-500'
        }`}>
        {availability.toUpperCase()}
      </span>
    </div>
  );
}

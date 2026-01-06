'use client';

import ButtonCopy from '@/features/shard/components/portableText/ButtonCopy';
import { ICodeBlock } from '@/features/shard/types/common';
import { getLanguageColor } from '@/features/shard/utils/statusColor';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function CodeBlock({ value }: ICodeBlock) {
  const { isDark } = useTheme();
  if (!value?.code) return null;

  const languageColors = getLanguageColor(value.language || '');

  return (
    <div
      className={`my-6 rounded-xl overflow-hidden relative group ${
        isDark ? 'border border-gray-700' : 'border border-gray-300'
      }`}>
      <div
        className={`px-4 py-2 text-sm border-b flex justify-between items-center ${
          isDark
            ? 'bg-gray-800/80 text-gray-300 border-gray-700'
            : 'bg-gray-100/80 text-gray-700 border-gray-300'
        }`}>
        <div className="flex items-center gap-3">
          <span className={`font-medium px-2 py-1 rounded-md text-xs border ${languageColors}`}>
            {value.language || 'Code'}
          </span>
        </div>
        <ButtonCopy value={value} />
      </div>
      <pre
        className={`p-3 sm:p-4 overflow-x-auto max-h-[40vh] sm:max-h-[600px] overflow-y-auto scrollbar-thin ${
          isDark
            ? 'bg-gray-900/80 scrollbar-thumb-gray-700 scrollbar-track-gray-900'
            : 'bg-gray-50/80 scrollbar-thumb-gray-400 scrollbar-track-gray-200'
        }`}>
        <code
          className={`text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap break-words ${
            isDark ? 'text-gray-100' : 'text-gray-800'
          }`}>
          {value.code}
        </code>
      </pre>
    </div>
  );
}

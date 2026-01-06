'use client';

import { Check, Copy } from 'lucide-react';
import { ICodeBlock } from '@/features/shard/types/common';

import useCopy from '@/features/shard/hooks/useCopy';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ButtonCopy({ value }: ICodeBlock) {
  const { copied, handleCopyCode } = useCopy({ value });
  const { isDark } = useTheme();

  if (!value?.code) return null;
  return (
    <button
      onClick={handleCopyCode}
      className={`flex items-center gap-2 px-3 py-1 rounded-md ${isDark ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-300/50 hover:bg-gray-300/70'}   transition-colors duration-200 text-xs font-medium cursor-pointer`}
      title={copied ? 'Copied!' : 'Copy code'}>
      {copied ? (
        <>
          <Check size={14} className="text-green-600" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}

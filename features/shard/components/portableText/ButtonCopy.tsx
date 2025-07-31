'use client';

import { Check, Copy } from 'lucide-react';
import { ICodeBlock } from '@/features/shard/types/common';

import useCopy from '@/features/shard/hooks/useCopy';

export default function ButtonCopy({ value }: ICodeBlock) {
  const { copied, handleCopyCode } = useCopy({ value });

  return (
    <button
      onClick={handleCopyCode}
      className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-200 text-xs font-medium cursor-pointer"
      title={copied ? 'Copied!' : 'Copy code'}>
      {copied ? (
        <>
          <Check size={14} className="text-green-400" />
          <span className="text-green-400">Copied!</span>
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

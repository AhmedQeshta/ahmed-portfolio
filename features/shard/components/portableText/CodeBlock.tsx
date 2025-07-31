'use client';

import { Copy, Check } from 'lucide-react';
import { ICodeBlock } from '@/features/shard/types/common';
import useCopy from '@/features/shard/hooks/useCopy';

export default function CodeBlock({ value }: ICodeBlock) {
  if (!value?.code) return null;

  const { copied, handleCopyCode } = useCopy({ value });

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-700 relative group">
      <div className="bg-gray-800/80 px-4 py-2 text-sm text-gray-300 border-b border-gray-700 flex justify-between items-center">
        <span className="font-medium">{value.language || 'Code'}</span>
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-200 text-xs font-medium"
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
      </div>
      <pre className="bg-gray-900/80 p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
          {value.code}
        </code>
      </pre>
    </div>
  );
}

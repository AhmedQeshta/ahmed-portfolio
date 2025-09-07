import { useState } from 'react';
import { ICodeBlock } from '@/features/shard/types/common';

export default function useCopy({ value }: ICodeBlock) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(value.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return { copied, handleCopyCode };
}

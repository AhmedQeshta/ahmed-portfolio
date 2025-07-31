import { useState } from 'react';

interface IUseCopy {
  value: {
    code: string;
  };
}

export default function useCopy({ value }: IUseCopy) {
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

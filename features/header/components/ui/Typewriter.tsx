'use client';
import { useTypewriter } from 'react-simple-typewriter';
import { ITypewriterProps } from '@/features/header/types/header';

export default function Typewriter({ title }: ITypewriterProps) {
  if (!title || title.length === 0) return null;

  const [text] = useTypewriter({
    words: Object.values(title),
    loop: true,
    delaySpeed: 1500,
  });
  return (
    <h2 className="text-xl min-h-10 h-10 sm:text-2xl lg:text-3xl font-semibold text-white/90 leading-tight">
      {text}
    </h2>
  );
}

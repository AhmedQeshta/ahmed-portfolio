'use client';
import { useTypewriter } from 'react-simple-typewriter';
import { ITypewriterProps } from '@/features/header/types/header';

export default function Typewriter({ titles }: ITypewriterProps) {
  if (!titles || titles.length === 0) return null;

  const [text] = useTypewriter({
    words: titles,
    loop: true,
    delaySpeed: 1500,
  });
  return (
    <>
      <h2 className="text-xl min-h-10 h-10 sm:text-2xl lg:text-3xl font-semibold text-white/90 leading-tight">
        {text}
      </h2>
      <div className="flex items-center gap-3">
        <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        <div className="h-1 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        <div className="h-1 w-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" />
      </div>
    </>
  );
}

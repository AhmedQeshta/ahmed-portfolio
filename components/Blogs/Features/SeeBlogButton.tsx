'use client';

import { ISeeBlogButton } from '@/utils/types/blog';
import { useRouter } from 'next/navigation';
import React from 'react';


export default function SeeBlogButton({ slug }: ISeeBlogButton) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/blogs/${slug}`);
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm text-white/80 hover:text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-md px-2 py-2 cursor-pointer transition-all duration-300">
      See blog
    </button>
  );
}

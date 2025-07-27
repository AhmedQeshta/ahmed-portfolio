'use client';

import { ILinkNavigation } from '@/features/shard/types/common';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function NavigationHeader({ link, text }: ILinkNavigation) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsNavigating(true);

    try {
      await router.push(link);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to regular link behavior
      window.location.href = link;
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <div className="relative z-10 p-6 pt-20 lg:pt-24" data-testid="navigation-header">
      <Link
        href={link}
        prefetch={true}
        onClick={handleNavigation}
        className={`inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group ${
          isNavigating ? 'opacity-50 cursor-not-allowed' : ''
        }`}>
        {isNavigating ? (
          <LoadingSpinner size="sm" className="text-white" />
        ) : (
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        )}
        {isNavigating ? 'Loading...' : text}
      </Link>
    </div>
  );
}

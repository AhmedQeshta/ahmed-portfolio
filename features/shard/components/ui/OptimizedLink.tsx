'use client';

import Link from 'next/link';
import { OptimizedLinkProps } from '@/features/shard/types/common';
import { MouseEvent } from 'react';

export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  scroll = true,
  replace = false,
  onClick,
  target,
  rel,
  download,
  ariaLabel,
  dataTestId,
}: OptimizedLinkProps) {
  const isExternal =
    href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');

  // Handle onClick for internal links - ensure it doesn't prevent navigation
  const handleInternalClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided (e.g., closeMobileMenu)
    if (onClick) {
      onClick();
    }
    // Critical: Don't call e.preventDefault() or e.stopPropagation()
    // Let Next.js Link handle the navigation - it will prevent default internally
    // and perform client-side navigation
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel}
        data-testid={dataTestId}>
        {children}
      </a>
    );
  }

  // Normalize href for Next.js Link
  // Hash links (/#section) and absolute paths (/page) are fine as-is
  // Relative paths (page) need to be prefixed with /
  const normalizedHref = href.startsWith('/') || href.startsWith('#') ? href : `/${href}`;

  return (
    <Link
      href={normalizedHref}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      className={className}
      onClick={handleInternalClick}
      aria-label={ariaLabel}
      data-testid={dataTestId}>
      {children}
    </Link>
  );
}

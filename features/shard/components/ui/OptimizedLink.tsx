'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type AnchorTarget = '_self' | '_blank' | '_parent' | '_top' | string;

interface OptimizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  onClick?: () => void;
  target?: AnchorTarget;
  rel?: string;
  download?: boolean | string;
  ariaLabel?: string;
  dataTestId?: string;
}

export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  scroll = true,
  replace = false,
  shallow = false,
  onClick,
  target,
  rel,
  download,
  ariaLabel,
  dataTestId,
}: OptimizedLinkProps) {
  const isExternal =
    href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');

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

  return (
    <Link
      href={href}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      className={className}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      data-testid={dataTestId}>
      {children}
    </Link>
  );
}

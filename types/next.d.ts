// This file overrides Next.js default types to fix compatibility issues
import { Metadata, ResolvingMetadata } from 'next';

declare module 'next' {
  export interface PageProps {
    params: { [key: string]: string };
    searchParams?: { [key: string]: string | string[] };
  }
}

// Re-export to ensure our declarations are used
export { Metadata, ResolvingMetadata };

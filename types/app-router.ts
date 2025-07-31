// This file creates a compatible type for use with app router pages
// Updated for Next.js 15 where params is a Promise that must be awaited

/**
 * Type for Next.js 15.3.2 with async params support
 * In Next.js 15, params is a Promise that must be awaited before accessing properties
 */
export type FixedPageProps = {
  params: Promise<Record<string, string>>;
  searchParams?: Record<string, string | string[] | undefined>;
};

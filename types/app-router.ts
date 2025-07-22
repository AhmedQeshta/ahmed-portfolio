// This file creates a compatible type for use with app router pages
// It redefines the PageProps type to not use Promise<any> for params

/**
 * Fix for Next.js 15.3.2 type error
 * "Type 'BlogPage' does not satisfy the constraint 'PageProps'."
 */
export type FixedPageProps = {
  params: Record<string, string>;
  searchParams?: Record<string, string | string[] | undefined>;
};

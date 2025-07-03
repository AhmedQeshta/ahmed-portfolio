import { FormEvent, useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

const searchSchema = z.string().trim().min(1, 'Search cannot be empty').max(100, 'Search too long');

export function useSearch(action: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    if (debouncedQuery === '') {
      setError(null);
      if (initialQuery !== '') {
        router.push(action);
      }
      return;
    }
    const result = searchSchema.safeParse(debouncedQuery);
    if (debouncedQuery !== initialQuery && result.success) {
      setError(null);
      router.push(`${action}?q=${debouncedQuery}`);
    } else if (!result.success && debouncedQuery !== initialQuery) {
      setError(result.error.errors[0].message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query === '') {
      setError(null);
      router.push(action);
      return;
    }
    const result = searchSchema.safeParse(query);
    if (result.success) {
      setError(null);
      router.push(`${action}?q=${query}`);
    } else {
      setError(result.error.errors[0].message);
    }
  };
  return { query, setQuery, handleSearch, error };
}

'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/features/shard/hooks/useDebounce';
import { searchSchema } from '@/features/filters/schema';

export function useSearch(action: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
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
      router.push(`${action}?q=${encodeURIComponent(debouncedQuery)}`);
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
      router.push(`${action}?q=${encodeURIComponent(query)}`);
    } else {
      setError(result.error.errors[0].message);
    }
  };

  // Handle the search input change
  const handleInputChange = (value: string) => {
    setQuery(value);
  };
  return { query, handleInputChange, handleSearch, error };
}

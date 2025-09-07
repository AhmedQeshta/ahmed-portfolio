import React, { useEffect, useState } from 'react';
import { BlogPostResponse, ProjectResponse } from '@/sanity/lib/types';
import { IUseFilter } from '@/features/filters/types/search';

export function useFilter<T extends ProjectResponse[] | BlogPostResponse[]>(
  data: T,
): IUseFilter<T> {
  const [filtered, setFiltered] = useState<T>([] as unknown as T);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setFiltered(data);
  }, [data]);

  const handleFilter = (category: string) => {
    const lowerQuery = category.toLowerCase();
    if (lowerQuery === 'all') {
      setFiltered(data);
      setActiveFilter('all');
    } else {
      const filter = data?.filter((item: ProjectResponse | BlogPostResponse) =>
        item.categories?.some((cat) => cat.name.toLowerCase().includes(lowerQuery)),
      ) as T;
      setFiltered(filter);
      setActiveFilter(category);
    }
  };

  return { filtered, handleFilter, activeFilter };
}

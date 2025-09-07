import { CategoryResponse } from '@/sanity/lib/types';

export interface ISearch {
  action: string;
  placeholder: string;
}
export interface IFilterHookProps<T> {
  filtered: T;
  handleFilter: (category: string) => void;
  activeFilter: string;
}

export interface IFilterProps {
  handleFilter: (category: string) => void;
  categories: CategoryResponse[];
  activeFilter: string;
}

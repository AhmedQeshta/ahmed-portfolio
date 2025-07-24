'use client';

import { useSearch } from '@/features/shard/hooks/useSearch';
import { XIcon } from 'lucide-react';
import DefaultInput from '@/features/contact/components/ui/DefaultInput';
import { ISearch } from '@/features/shard/types/common';

const Search = ({ action }: ISearch) => {
  const { query, setQuery, handleSearch } = useSearch(action);

  // Handle the search input change
  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full py-5">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <DefaultInput
            name="q"
            type="text"
            value={query}
            handleInputChange={handleInputChange}
            placeholder="Search blogs..."
            autoFocus={true}
            autoComplete="off"
            autoCorrect="off"
            style={{ WebkitAppearance: 'none' }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute text-2xl right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-400 focus:outline-none"
              aria-label="Clear search">
              <XIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

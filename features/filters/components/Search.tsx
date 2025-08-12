'use client';

import { XIcon } from 'lucide-react';

import { useSearch } from '@/features/filters/hooks/useSearch';
import DefaultInput from '@/features/shard/components/form/DefaultInput';
import { ISearch } from '@/features/filters//types/search';

const Search = ({ action, placeholder }: ISearch) => {
  const { query, handleInputChange, handleSearch } = useSearch(action);

  return (
    <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 w-full py-5">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <DefaultInput
            name="q"
            type="text"
            value={query}
            handleInputChange={handleInputChange}
            autoFocus={true}
            autoComplete="off"
            autoCorrect="off"
            style={{ WebkitAppearance: 'none' }}
            placeholder={placeholder}
          />
          {query && (
            <button
              type="button"
              onClick={() => handleInputChange('')}
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

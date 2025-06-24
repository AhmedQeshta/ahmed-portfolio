'use client';

import { useSearch } from '@/hooks/useSearch';
import { XIcon } from 'lucide-react';

interface SearchInterface {
  action: string;
}

const Search = ({ action }: SearchInterface) => {
  const { query, setQuery, handleSearch } = useSearch(action);

  return (
    <div className="mx-auto max-w-5xl px-4 py-5">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <input
            placeholder="Search blogs..."
            type="text"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none pr-10"
            autoFocus
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

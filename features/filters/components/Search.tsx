'use client';

import { XIcon } from 'lucide-react';

import { useSearch } from '@/features/filters/hooks/useSearch';
import DefaultInput from '@/features/shard/components/form/DefaultInput';
import { ISearch } from '@/features/filters/types/search';
import { useTheme } from '@/features/theme/hooks/useTheme';

const Search = ({ action, placeholder }: ISearch) => {
  const { isDark } = useTheme();
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
            customStyle={`${isDark ? 'bg-white/5 border-white/20' : 'text-purple-500 bg-purple-500/5 border-purple-500/20'}  hover:border-purple-400/50 focus:border-purple-400 focus:ring-purple-400/25 rounded-lg h-12 transition-all duration-300`}
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
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-bold">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;

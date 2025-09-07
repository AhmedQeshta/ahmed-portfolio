import { IFilterProps } from '@/features/filters/types/search';

const Filter = ({ handleFilter, categories, activeFilter }: IFilterProps) => {
  return (
    <div className="mb-8">
      {/* Filter Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <h3 className="text-text-primary font-semibold text-lg">Filter by Category</h3>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-card-bg text-text-secondary hover:bg-card-hover hover:text-text-primary'
          } backdrop-blur-sm`}
          type="button"
          onClick={() => handleFilter('all')}>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            All
          </span>
        </button>

        {categories.map(({ name }, index: number) => (
          <button
            key={`${name}-${index}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === name
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-card-bg text-text-secondary hover:bg-card-hover hover:text-text-primary'
            } backdrop-blur-sm`}
            type="button"
            onClick={() => handleFilter(name)}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              {name}
            </span>
          </button>
        ))}
      </div>

      {/* Filter Status */}
      <div className="mt-3 text-sm text-text-secondary">
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-text-accent rounded-full animate-pulse"></div>
          Showing:
          <span className="text-text-accent font-medium">
            {activeFilter === 'all' ? 'All Projects' : activeFilter}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Filter;

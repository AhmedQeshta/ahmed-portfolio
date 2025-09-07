import { IFilterProps } from '@/features/filters/types/search';
import FilterButton from './ui/FilterButton';

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
        <FilterButton name="all" activeFilter={activeFilter} handleFilter={handleFilter} />

        {categories.map(({ name }, index: number) => (
          <FilterButton
            key={`${name}-${index}`}
            name={name}
            activeFilter={activeFilter}
            handleFilter={handleFilter}
          />
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

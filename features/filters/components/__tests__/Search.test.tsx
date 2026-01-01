import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/features/shard/utils/test-utils';
import Search from '@/features/filters/components/Search';
import { IDefaultInput } from '@/features/contact/types/contact';

// Mock the useSearch hook
const mockHandleInputChange = jest.fn();
const mockHandleSearch = jest.fn();

jest.mock('@/features/filters/hooks/useSearch', () => ({
  useSearch: jest.fn(() => ({
    query: '',
    handleInputChange: mockHandleInputChange,
    handleSearch: mockHandleSearch,
    error: null,
  })),
}));

// Mock the DefaultInput component
jest.mock('@/features/shard/components/form/DefaultInput', () => {
  return function MockDefaultInput({
    name,
    value,
    handleInputChange,
    placeholder,
    autoFocus,
    autoComplete,
    autoCorrect,
    style,
  }: IDefaultInput) {
    return (
      <input
        data-testid="search-input"
        name={name}
        value={value}
        onChange={(e) => {
          // Support both direct setState functions and field-value pair functions
          if (typeof handleInputChange === 'function') {
            // Check if it's a setState function (only expects one parameter)
            if (handleInputChange.length <= 1) {
              handleInputChange(e.target.value);
            } else {
              // It's a field-value pair function (expects field name and value)
              handleInputChange(name, e.target.value);
            }
          }
        }}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        style={style}
      />
    );
  };
});

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search form', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' }).closest('form')).toBeInTheDocument();
  });

  it('should render with correct placeholder text', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('placeholder', 'Search blogs...');
  });

  it('should have correct form attributes', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const input = screen.getByTestId('search-input');
    expect(input).toHaveAttribute('autoComplete', 'off');
    expect(input).toHaveAttribute('autoCorrect', 'off');
    expect(input).toHaveAttribute('name', 'q');
  });

  it('should handle input changes', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(mockHandleInputChange).toHaveBeenCalledWith('test query');
  });

  it('should handle form submission', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const form = screen.getByRole('button', { name: 'Search' }).closest('form');
    fireEvent.submit(form!);

    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('should not show clear button when query is empty', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument();
  });

  it('should show clear button when query has value', () => {
    // Mock useSearch to return a non-empty query
    const { useSearch } = require('@/features/filters/hooks/useSearch');
    useSearch.mockReturnValue({
      query: 'test query',
      handleInputChange: mockHandleInputChange,
      handleSearch: mockHandleSearch,
      error: null,
    });

    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    expect(clearButton).toBeInTheDocument();
  });

  it('should clear query when clear button is clicked', () => {
    // Mock useSearch to return a non-empty query
    const { useSearch } = require('@/features/filters/hooks/useSearch');
    useSearch.mockReturnValue({
      query: 'test query',
      handleInputChange: mockHandleInputChange,
      handleSearch: mockHandleSearch,
      error: null,
    });

    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    fireEvent.click(clearButton);

    expect(mockHandleInputChange).toHaveBeenCalledWith('');
  });

  it('should have correct styling classes', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const container = screen.getByRole('button', { name: 'Search' }).closest('form')?.parentElement;
    expect(container).toHaveClass(
      'mx-auto',
      'max-w-[1450px]',
      'px-5',
      'sm:px-7',
      'lg:px-5',
      'w-full',
      'py-5',
    );

    const form = screen.getByRole('button', { name: 'Search' }).closest('form');
    expect(form).toHaveClass('flex', 'gap-2');

    const inputContainer = screen.getByTestId('search-input').parentElement;
    expect(inputContainer).toHaveClass('relative', 'flex-1');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toHaveClass(
      'px-4',
      'py-2',
      'bg-purple-500',
      'text-white',
      'rounded-lg',
      'hover:bg-purple-600',
      'font-bold',
    );
  });

  it('should have correct clear button styling', () => {
    // Mock useSearch to return a non-empty query
    const { useSearch } = require('@/features/filters/hooks/useSearch');
    useSearch.mockReturnValue({
      query: 'test query',
      handleInputChange: mockHandleInputChange,
      handleSearch: mockHandleSearch,
      error: null,
    });

    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    expect(clearButton).toHaveClass(
      'absolute',
      'text-2xl',
      'right-3',
      'top-1/2',
      '-translate-y-1/2',
      'text-gray-300',
      'hover:text-gray-400',
      'focus:outline-none',
    );
  });

  it('should render X icon in clear button', () => {
    // Mock useSearch to return a non-empty query
    const { useSearch } = require('@/features/filters/hooks/useSearch');
    useSearch.mockReturnValue({
      query: 'test query',
      handleInputChange: mockHandleInputChange,
      handleSearch: mockHandleSearch,
      error: null,
    });

    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const clearButton = screen.getByRole('button', { name: 'Clear search' });
    const xIcon = clearButton.querySelector('svg');
    expect(xIcon).toBeInTheDocument();
    expect(xIcon).toHaveClass('w-5', 'h-5');
  });

  it('should handle search with different action prop', () => {
    render(<Search action="/projects" placeholder="Search blogs..." />);

    const form = screen.getByRole('button', { name: 'Search' }).closest('form');
    fireEvent.submit(form!);

    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('should be accessible with proper ARIA labels', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const clearButton = screen.queryByRole('button', { name: 'Clear search' });
    if (clearButton) {
      expect(clearButton).toHaveAttribute('aria-label', 'Clear search');
    }
  });

  it('should have input focused by default', () => {
    render(<Search action="/blogs" placeholder="Search blogs..." />);

    const input = screen.getByTestId('search-input');
    expect(input).toHaveFocus();
  });
});

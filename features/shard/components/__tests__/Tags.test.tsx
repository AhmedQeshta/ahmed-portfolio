import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import Tags from '@/features/shard/components/ui/Tags';


describe('Tags', () => {
  const mockTags = ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'];

  it('should render tags when provided', () => {
    render(<Tags tags={mockTags} />);

    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('#React')).toBeInTheDocument();
    expect(screen.getByText('#TypeScript')).toBeInTheDocument();
    expect(screen.getByText('#Next.js')).toBeInTheDocument();
    expect(screen.getByText('#Tailwind CSS')).toBeInTheDocument();
  });

  it('should not render when tags array is empty', () => {
    render(<Tags tags={[]} />);

    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });

  it('should not render when tags is undefined', () => {
    render(<Tags tags={undefined} />);

    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });

  it('should not render when tags is null', () => {
    render(<Tags tags={null as any} />);

    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });


  it('should have correct styling for tags container', () => {
    render(<Tags tags={mockTags} />);

    const container = screen.getByTestId('tags-container');
    expect(container).toHaveClass(
      'bg-gray-900/50',
      'backdrop-blur-sm',
      'border',
      'border-gray-800',
      'rounded-xl',
      'p-8',
    );
  });

  it('should have correct styling for individual tags', () => {
    render(<Tags tags={mockTags} />);

    const reactTag = screen.getByText('#React');
    expect(reactTag).toHaveClass(
      'px-3',
      'py-1',
      'bg-purple-600/20',
      'text-purple-500',
      'rounded-full',
      'text-sm',
      'border',
      'border-purple-600/20',
    );
  });

  it('should render tags title with correct styling', () => {
    render(<Tags tags={mockTags} />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Tags');
    expect(title).toHaveClass('text-lg', 'font-bold', 'mb-4');
    // Theme-dependent class - check for either text-white or text-gray-900
    expect(
      title.className.includes('text-white') || title.className.includes('text-gray-900'),
    ).toBe(true);
  });

  it('should handle single tag', () => {
    render(<Tags tags={['React']} />);

    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('#React')).toBeInTheDocument();
    expect(screen.queryByText('#TypeScript')).not.toBeInTheDocument();
  });
});

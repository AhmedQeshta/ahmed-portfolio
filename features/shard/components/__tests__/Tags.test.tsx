import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tags from '@/features/shard/components/ui/Tags';

// Mock the ScrollAnimation component
jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
  }) {
    return (
      <div data-testid="scroll-animation" className={className} {...props}>
        {children}
      </div>
    );
  };
});

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

  it('should render ScrollAnimation wrapper', () => {
    render(<Tags tags={mockTags} />);

    const scrollAnimations = screen.getAllByTestId('scroll-animation');
    expect(scrollAnimations.length).toBeGreaterThan(0);
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
      'bg-blue-600/20',
      'text-blue-300',
      'rounded-full',
      'text-sm',
      'border',
      'border-blue-600/30',
    );
  });

  it('should render tags title with correct styling', () => {
    render(<Tags tags={mockTags} />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Tags');
    expect(title).toHaveClass('text-lg', 'font-bold', 'text-white', 'mb-4');
  });

  it('should handle single tag', () => {
    render(<Tags tags={['React']} />);

    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('#React')).toBeInTheDocument();
    expect(screen.queryByText('#TypeScript')).not.toBeInTheDocument();
  });
});

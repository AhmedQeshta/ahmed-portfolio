import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import Categories from '@/features/shard/components/ui/Categories';

// Mock ScrollAnimation component
jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({
    children,
    className,
    delay,
  }: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }) {
    return (
      <div data-testid="scroll-animation" className={className} data-delay={delay}>
        {children}
      </div>
    );
  };
});

const mockCategories = [
  { _id: '1', name: 'Frontend Development', slug: 'frontend-development' },
  { _id: '2', name: 'React', slug: 'react' },
  { _id: '3', name: 'TypeScript', slug: 'typescript' },
];

describe('Categories', () => {
  it('should render nothing when categories array is empty', () => {
    const { container } = render(<Categories categories={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing when categories is null or undefined', () => {
    const { container } = render(<Categories categories={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render all categories with correct styling', () => {
    render(<Categories categories={mockCategories} />);

    // Check if all category names are rendered
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    // Check for ScrollAnimation wrappers
    const scrollAnimations = screen.getAllByTestId('scroll-animation');
    expect(scrollAnimations).toHaveLength(4); // 1 wrapper + 3 categories
  });

  it('should apply custom className when provided', () => {
    render(<Categories categories={mockCategories} className="custom-class" />);

    const wrapper = screen.getAllByTestId('scroll-animation')[0];
    expect(wrapper).toHaveClass('flex', 'flex-wrap', 'gap-2', 'custom-class');
  });

  it('should use custom delay when provided', () => {
    render(<Categories categories={mockCategories} delay={0.5} />);

    const wrapper = screen.getAllByTestId('scroll-animation')[0];
    expect(wrapper).toHaveAttribute('data-delay', '0.5');
  });

  it('should use default delay when not provided', () => {
    render(<Categories categories={mockCategories} />);

    const wrapper = screen.getAllByTestId('scroll-animation')[0];
    expect(wrapper).toHaveAttribute('data-delay', '0.3');
  });
});

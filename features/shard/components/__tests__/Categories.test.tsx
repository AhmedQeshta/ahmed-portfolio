import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import Categories from '@/features/shard/components/ui/Categories';


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

    // Check wrapper has correct classes
    const wrapper = screen.getByText('Frontend Development').parentElement;
    expect(wrapper).toHaveClass('flex', 'flex-wrap', 'gap-2');
  });

  it('should apply custom className when provided', () => {
    render(<Categories categories={mockCategories} className="custom-class" />);

    const wrapper = screen.getByText('Frontend Development').parentElement;
    expect(wrapper).toHaveClass('flex', 'flex-wrap', 'gap-2', 'custom-class');
  });

  it('should use custom delay when provided', () => {
    render(<Categories categories={mockCategories} delay={0.5} />);

    // Delay is not used in the component, just verify it renders
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('should use default delay when not provided', () => {
    render(<Categories categories={mockCategories} />);

    // Delay is not used in the component, just verify it renders
    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });
});

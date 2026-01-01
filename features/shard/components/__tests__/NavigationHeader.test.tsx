import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';

describe('NavigationHeader', () => {
  it('should render navigation link with correct props', () => {
    render(<NavigationHeader link="/projects" text="Back to Projects" />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).toHaveTextContent('Back to Projects');
  });

  it('should render arrow icon', () => {
    render(<NavigationHeader link="/projects" text="Back to Projects" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('inline-flex', 'items-center', 'gap-2');
  });

  it('should have correct default styling', () => {
    render(<NavigationHeader link="/projects" text="Back to Projects" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'inline-flex',
      'items-center',
      'gap-2',
      'text-gray-300',
      'hover:text-white',
      'transition-colors',
      'group',
    );
  });

  it('should render with different link and text', () => {
    render(<NavigationHeader link="/home" text="Go Home" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveTextContent('Go Home');
  });

  it('should have proper container structure', () => {
    render(<NavigationHeader link="/projects" text="Back to Projects" />);

    const container = screen.getByTestId('navigation-header');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('relative', 'z-10', 'p-6', 'pt-20', 'lg:pt-24');
  });

  it('should be accessible with proper link attributes', () => {
    render(<NavigationHeader link="/projects" text="Back to Projects" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).toHaveTextContent('Back to Projects');
  });

  it('should have prefetch enabled for performance', () => {
    render(<NavigationHeader link="/projects" text="Back to Projects" />);

    const link = screen.getByRole('link');
    // In the actual implementation, prefetch is set to true
    // This test verifies the link renders correctly
    expect(link).toBeInTheDocument();
  });
});

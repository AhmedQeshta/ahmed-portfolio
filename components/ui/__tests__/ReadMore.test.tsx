import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReadMore from '@/components/ui/ReadMore';

// Mock the ScrollAnimation component
jest.mock('@/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="scroll-animation" className={className}>
        {children}
      </div>
    );
  };
});

describe('ReadMore', () => {
  it('should render the read more link', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/blog/post-1');
    expect(link).toHaveTextContent('Read More');
  });

  it('should render ScrollAnimation wrapper', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" />);

    const scrollAnimation = screen.getByTestId('scroll-animation');
    expect(scrollAnimation).toBeInTheDocument();
    expect(scrollAnimation).toHaveClass('flex', 'justify-center', 'mt-12');
  });

  it('should apply correct styling to the link', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'px-6',
      'py-3',
      'gradient-button-primary',
      'rounded-full',
      'font-semibold',
    );
  });

  it('should render with different link and text', () => {
    render(<ReadMore link="/projects" text="View Project" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).toHaveTextContent('View Project');
  });

  it('should have proper semantic structure', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" />);

    const scrollAnimation = screen.getByTestId('scroll-animation');
    const link = screen.getByRole('link');

    expect(scrollAnimation).toContainElement(link);
  });
});

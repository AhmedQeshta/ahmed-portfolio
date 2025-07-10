import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

interface IMockDiv extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className: string;
}
// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: IMockDiv) => (
      <div className={className} data-testid="scroll-animation-container" {...props}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

describe('ScrollAnimation', () => {
  it('should render children correctly', () => {
    render(
      <ScrollAnimation>
        <div data-testid="child-content">Animated content</div>
      </ScrollAnimation>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Animated content')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    render(
      <ScrollAnimation className="custom-animation-class">
        <div>Animated content</div>
      </ScrollAnimation>,
    );

    const container = screen.getByTestId('scroll-animation-container');
    expect(container).toHaveClass('custom-animation-class');
  });

  it('should have default props', () => {
    render(
      <ScrollAnimation>
        <div>Animated content</div>
      </ScrollAnimation>,
    );

    const container = screen.getByTestId('scroll-animation-container');
    expect(container).toBeInTheDocument();
  });

  it('should render with different directions', () => {
    const { rerender } = render(
      <ScrollAnimation direction="down">
        <div>Down animation</div>
      </ScrollAnimation>,
    );

    let container = screen.getByTestId('scroll-animation-container');
    expect(container).toBeInTheDocument();

    rerender(
      <ScrollAnimation direction="up">
        <div>Up animation</div>
      </ScrollAnimation>,
    );

    container = screen.getByTestId('scroll-animation-container');
    expect(container).toBeInTheDocument();
  });

  it('should render with different delays', () => {
    render(
      <ScrollAnimation delay={0.5}>
        <div>Delayed animation</div>
      </ScrollAnimation>,
    );

    const container = screen.getByTestId('scroll-animation-container');
    expect(container).toBeInTheDocument();
  });

  it('should render with different durations', () => {
    render(
      <ScrollAnimation duration={1.0}>
        <div>Long duration animation</div>
      </ScrollAnimation>,
    );

    const container = screen.getByTestId('scroll-animation-container');
    expect(container).toBeInTheDocument();
  });
});

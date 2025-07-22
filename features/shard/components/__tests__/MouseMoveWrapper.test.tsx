import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MouseMoveWrapper from '@/features/shard/components/ui/MouseMoveWrapper';

// Mock the useMouseMove hook
jest.mock('@/features/shard/hooks/useMouseMove', () => ({
  useMouseMove: () => ({
    cardRef: { current: null },
    handleMouseMove: jest.fn(),
    handleMouseLeave: jest.fn(),
    handleMouseEnter: jest.fn(),
    gradientStyle: {
      left: '50%',
      top: '50%',
      opacity: 0,
    },
  }),
}));

// Mock the cn utility function
jest.mock('@/features/shard/utils/statusColor', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('MouseMoveWrapper', () => {
  it('should render children correctly', () => {
    render(
      <MouseMoveWrapper>
        <div data-testid="child-content">Child content</div>
      </MouseMoveWrapper>,
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    render(
      <MouseMoveWrapper className="custom-wrapper-class">
        <div>Child content</div>
      </MouseMoveWrapper>,
    );

    const wrapper = screen.getByTestId('mouse-move-wrapper');
    expect(wrapper).toHaveClass('custom-wrapper-class');
  });

  it('should have default wrapper classes', () => {
    render(
      <MouseMoveWrapper>
        <div>Child content</div>
      </MouseMoveWrapper>,
    );

    const wrapper = screen.getByTestId('mouse-move-wrapper');
    expect(wrapper).toHaveClass('relative', 'overflow-hidden', 'rounded-2xl');
  });

  it('should combine default and custom classes', () => {
    render(
      <MouseMoveWrapper className="custom-class">
        <div>Child content</div>
      </MouseMoveWrapper>,
    );

    const wrapper = screen.getByTestId('mouse-move-wrapper');
    expect(wrapper).toHaveClass('relative', 'overflow-hidden', 'rounded-2xl', 'custom-class');
  });

  it('should render gradient overlay', () => {
    render(
      <MouseMoveWrapper>
        <div>Child content</div>
      </MouseMoveWrapper>,
    );

    const gradientOverlay = screen.getByTestId('gradient-overlay');
    expect(gradientOverlay).toBeInTheDocument();
  });

  it('should handle mouse events', () => {
    render(
      <MouseMoveWrapper>
        <div>Child content</div>
      </MouseMoveWrapper>,
    );

    const wrapper = screen.getByTestId('mouse-move-wrapper');

    // These events should be handled by the mocked hook
    fireEvent.mouseMove(wrapper);
    fireEvent.mouseLeave(wrapper);
    fireEvent.mouseEnter(wrapper);

    // The component should render without errors
    expect(wrapper).toBeInTheDocument();
  });
});

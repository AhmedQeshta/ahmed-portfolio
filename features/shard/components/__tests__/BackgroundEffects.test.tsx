import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundEffects from '@/features/shard/components/ui/BackgroundEffects';

describe('BackgroundEffects', () => {
  it('should render the background effects container', () => {
    render(<BackgroundEffects />);

    const container = screen.getByTestId('background-effects');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('fixed', 'inset-0', 'pointer-events-none');
  });

  it('should render two background orbs with correct positioning and styling', () => {
    render(<BackgroundEffects />);

    const orbs = screen.getAllByTestId('background-orb');
    expect(orbs).toHaveLength(2);

    // First orb (purple)
    expect(orbs[0]).toHaveClass(
      'absolute',
      'top-1/4',
      'left-1/4',
      'w-96',
      'h-96',
      'bg-purple-600/10',
      'rounded-full',
      'blur-3xl',
      'animate-pulse',
    );

    // Second orb (blue)
    expect(orbs[1]).toHaveClass(
      'absolute',
      'bottom-1/4',
      'right-1/4',
      'w-96',
      'h-96',
      'bg-blue-600/10',
      'rounded-full',
      'blur-3xl',
      'animate-pulse',
      'delay-1000',
    );
  });

  it('should have proper z-index and positioning', () => {
    render(<BackgroundEffects />);

    const container = screen.getByTestId('background-effects');
    expect(container).toHaveClass('fixed', 'inset-0');
  });

  it('should not interfere with user interactions', () => {
    render(<BackgroundEffects />);

    const container = screen.getByTestId('background-effects');
    expect(container).toHaveClass('pointer-events-none');
  });
});

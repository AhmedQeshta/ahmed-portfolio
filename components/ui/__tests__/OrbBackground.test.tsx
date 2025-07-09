import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrbBackground from '@/components/ui/OrbBackground';

describe('OrbBackground', () => {
  it('should render the background container', () => {
    render(<OrbBackground />);

    const container = screen.getByTestId('orb-background');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('fixed', 'inset-0', 'pointer-events-none', 'overflow-hidden');
  });

  it('should render three background orbs', () => {
    render(<OrbBackground />);

    const purpleOrb = screen.getByTestId('orb-purple');
    const blueOrb = screen.getByTestId('orb-blue');
    const pinkOrb = screen.getByTestId('orb-pink');

    expect(purpleOrb).toBeInTheDocument();
    expect(blueOrb).toBeInTheDocument();
    expect(pinkOrb).toBeInTheDocument();
  });

  it('should render purple orb with correct positioning', () => {
    render(<OrbBackground />);

    const purpleOrb = screen.getByTestId('orb-purple');
    expect(purpleOrb).toHaveClass(
      'absolute',
      'top-[-10%]',
      'left-[-10%]',
      'w-96',
      'h-96',
      'bg-orb-purple',
      'rounded-full',
      'blur-3xl',
      'animate-pulse',
    );
  });

  it('should render blue orb with correct positioning', () => {
    render(<OrbBackground />);

    const blueOrb = screen.getByTestId('orb-blue');
    expect(blueOrb).toHaveClass(
      'absolute',
      'bottom-[-10%]',
      'right-[-10%]',
      'w-96',
      'h-96',
      'bg-orb-blue',
      'rounded-full',
      'blur-3xl',
      'animate-pulse',
    );
  });

  it('should render pink orb with correct positioning', () => {
    render(<OrbBackground />);

    const pinkOrb = screen.getByTestId('orb-pink');
    expect(pinkOrb).toHaveClass(
      'absolute',
      'top-1/2',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      '-translate-y-1/2',
      'w-96',
      'h-96',
      'bg-orb-pink',
      'rounded-full',
      'blur-3xl',
      'animate-pulse',
    );
  });

  it('should have proper z-index styling', () => {
    render(<OrbBackground />);

    const container = screen.getByTestId('orb-background');
    expect(container).toHaveStyle({ zIndex: -1 });
  });

  it('should not interfere with user interactions', () => {
    render(<OrbBackground />);

    const container = screen.getByTestId('orb-background');
    expect(container).toHaveClass('pointer-events-none');
  });

  it('should have overflow hidden', () => {
    render(<OrbBackground />);

    const container = screen.getByTestId('orb-background');
    expect(container).toHaveClass('overflow-hidden');
  });
});

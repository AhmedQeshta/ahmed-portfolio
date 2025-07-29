import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '@/features/shard/components/ui/Loading';

describe('Loading', () => {
  it('should render the loading container with proper accessibility', () => {
    render(<Loading />);

    const container = screen.getByRole('status');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Loading content');
    expect(container).toHaveAttribute('aria-live', 'polite');
    expect(container).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'min-h-[300px]',
      'py-20',
    );
  });

  it('should render the loading text', () => {
    render(<Loading />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('text-gray-300', 'text-sm', 'font-medium', 'animate-pulse');
  });

  it('should render the screen reader text', () => {
    render(<Loading />);

    const srText = screen.getByText('Content is loading, please wait');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });

  it('should render the spinner elements', () => {
    render(<Loading />);

    // Check for the main spinner
    const container = screen.getByRole('status');
    const spinnerElements = container.querySelectorAll('.animate-spin');

    expect(spinnerElements.length).toBeGreaterThan(0);
  });

  it('should render progress dots', () => {
    render(<Loading />);

    // Find all progress dots
    const container = screen.getByRole('status');
    const progressDots = container.querySelectorAll('.bg-purple-400.rounded-full');

    expect(progressDots.length).toBe(3);
  });

  it('should have proper semantic structure', () => {
    render(<Loading />);

    const statusElement = screen.getByRole('status');
    const loadingText = screen.getByText('Loading...');
    const srText = screen.getByText('Content is loading, please wait');

    expect(statusElement).toBeInTheDocument();
    expect(loadingText).toBeInTheDocument();
    expect(srText).toBeInTheDocument();
  });

  it('should apply correct styling classes to main elements', () => {
    render(<Loading />);

    const container = screen.getByRole('status');
    const loadingText = screen.getByText('Loading...');

    expect(container).toHaveClass('flex', 'items-center', 'justify-center');
    expect(loadingText).toHaveClass('text-gray-300', 'animate-pulse');
  });

  it('should have proper layout structure', () => {
    render(<Loading />);

    const container = screen.getByRole('status');
    expect(container).toHaveClass('min-h-[300px]');

    // Check that it contains the expected child structure
    const contentDiv = container.querySelector('.flex.flex-col.items-center.space-y-4');
    expect(contentDiv).toBeInTheDocument();
  });

  it('should render animated elements with proper styles', () => {
    render(<Loading />);

    const container = screen.getByRole('status');

    // Check for spinner animations
    const spinnerElements = container.querySelectorAll('.animate-spin');
    expect(spinnerElements.length).toBeGreaterThan(0);

    // Check for pulse animations
    const pulseElements = container.querySelectorAll('.animate-pulse');
    expect(pulseElements.length).toBeGreaterThan(0);
  });

  it('should have accessibility attributes', () => {
    render(<Loading />);

    const container = screen.getByRole('status');

    expect(container).toHaveAttribute('role', 'status');
    expect(container).toHaveAttribute('aria-live', 'polite');
    expect(container).toHaveAttribute('aria-label', 'Loading content');
  });
});

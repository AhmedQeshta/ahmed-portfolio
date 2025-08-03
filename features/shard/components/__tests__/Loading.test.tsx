import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '@/features/shard/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render the LoadingSpinner container', () => {
    render(<LoadingSpinner />);

    const container = screen.getByTestId('loading-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      'min-h-screen',
      'bg-gradient-to-br',
      'from-gray-900',
      'via-black',
      'to-gray-900',
      'flex',
      'items-center',
      'justify-center',
    );
  });

  it('should render the main content area', () => {
    render(<LoadingSpinner />);

    const contentArea = screen.getByTestId('loading-content');
    expect(contentArea).toBeInTheDocument();
  });

  it('should render the loading title', () => {
    render(<LoadingSpinner />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Loading');
    expect(title).toHaveClass('text-2xl', 'font-bold', 'gradient-text', 'animate-pulse');
  });

  it('should render the loading description', () => {
    render(<LoadingSpinner />);

    const description = screen.getByText('Please wait while we prepare your content...');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-gray-400', 'text-sm', 'animate-pulse', 'delay-200');
  });

  it('should render the spinner elements', () => {
    render(<LoadingSpinner />);

    // Check for spinner container
    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should render background animated elements', () => {
    render(<LoadingSpinner />);

    const backgroundElements = screen.getByTestId('background-elements');
    expect(backgroundElements).toBeInTheDocument();
  });

  it('should render progress dots', () => {
    render(<LoadingSpinner />);

    // The progress dots should be rendered as divs with specific classes
    const dots = screen.getByTestId('progress-dots');
    expect(dots).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(<LoadingSpinner />);

    const title = screen.getByRole('heading', { level: 2 });
    const description = screen.getByText('Please wait while we prepare your content...');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should apply correct styling classes to main elements', () => {
    render(<LoadingSpinner />);

    const title = screen.getByRole('heading', { level: 2 });
    const description = screen.getByText('Please wait while we prepare your content...');

    expect(title).toHaveClass('text-2xl', 'font-bold', 'gradient-text', 'animate-pulse');
    expect(description).toHaveClass('text-gray-400', 'text-sm', 'animate-pulse', 'delay-200');
  });

  it('should have full screen layout', () => {
    render(<LoadingSpinner />);

    const container = screen.getByTestId('loading-container');
    expect(container).toHaveClass('min-h-screen');
  });
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';

interface IMockHeading extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}
interface IMockDiv extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface IMockParagraph extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, className, ...props }: IMockHeading) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    div: ({ children, className, ...props }: IMockDiv) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    p: ({ children, ...props }: IMockParagraph) => <p {...props}>{children}</p>,
  },
}));

describe('ErrorHandle', () => {
  const defaultProps = {
    id: 'error-section',
    description: 'This is an error description',
  };

  it('should render the error section with correct props', () => {
    render(<ErrorHandle {...defaultProps} />);

    const section = screen.getByTestId('error-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'error-section');
    expect(section).toHaveClass('py-20');
  });

  it('should render the description correctly', () => {
    render(<ErrorHandle {...defaultProps} />);

    const description = screen.getByText('This is an error description');
    expect(description).toBeInTheDocument();
    const descriptionContainer = description.closest('div');
    expect(descriptionContainer).toHaveClass('text-center', 'text-red-400');
  });

  it('should have correct container structure', () => {
    render(<ErrorHandle {...defaultProps} />);

    const container = screen.getByTestId('error-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('mx-auto', 'max-w-5xl', 'px-4');
  });

  it('should render with different error messages', () => {
    const customProps = {
      id: 'custom-error',
      description: 'A different error message',
    };

    render(<ErrorHandle {...customProps} />);

    expect(screen.getByText('A different error message')).toBeInTheDocument();
    expect(screen.getByTestId('custom-error')).toHaveAttribute('id', 'custom-error');
  });

  it('should have proper semantic structure', () => {
    render(<ErrorHandle {...defaultProps} />);

    const section = screen.getByTestId('error-section');
    const description = screen.getByText('This is an error description');

    expect(section).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    render(<ErrorHandle {...defaultProps} />);

    const section = screen.getByTestId('error-section');
    const description = screen.getByText('This is an error description');

    expect(section).toHaveClass('py-20');
    const descriptionContainer = description.closest('div');
    expect(descriptionContainer).toHaveClass('text-center', 'text-red-400');
  });
});

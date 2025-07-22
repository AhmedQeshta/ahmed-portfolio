import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubmitButton from '@/features/contact/components/ui/SubmitButton';

// Mock the cn utility function
jest.mock('@/features/shard/utils/statusColor', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('SubmitButton', () => {
  it('should render button with default text when not pending', () => {
    render(<SubmitButton isPending={false} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Send Message');
    expect(button).not.toBeDisabled();
  });

  it('should render button with pending text when isPending is true', () => {
    render(<SubmitButton isPending={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Sending ...');
    expect(button).toBeDisabled();
  });

  it('should apply custom styles when provided', () => {
    render(<SubmitButton isPending={false} customStyle="custom-button-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-button-class');
  });

  it('should have default styling classes', () => {
    render(<SubmitButton isPending={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'px-6',
      'py-3',
      'gradient-button-primary',
      'rounded-full',
      'font-semibold',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-opacity',
    );
  });

  it('should combine default and custom styles', () => {
    render(<SubmitButton isPending={false} customStyle="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'px-6',
      'py-3',
      'gradient-button-primary',
      'rounded-full',
      'font-semibold',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      'transition-opacity',
      'custom-class',
    );
  });

  it('should have correct button type', () => {
    render(<SubmitButton isPending={false} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should be disabled when isPending is true', () => {
    render(<SubmitButton isPending={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('disabled');
  });

  it('should not be disabled when isPending is false', () => {
    render(<SubmitButton isPending={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute('disabled');
  });

  it('should pass through additional props', () => {
    render(<SubmitButton isPending={false} data-testid="submit-button" />);

    const button = screen.getByTestId('submit-button');
    expect(button).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from '@/features/shard/components/form/Label';

// Mock the cn utility function
jest.mock('@/features/shard/utils/statusColor', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('Label', () => {
  it('should render label with title and htmlFor attribute', () => {
    render(<Label title="Test Label" htmlFor="test-input" />);

    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('should apply custom styles when provided', () => {
    render(<Label title="Test Label" htmlFor="test-input" customStyle="custom-label-class" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('custom-label-class');
  });

  it('should have default styling classes', () => {
    render(<Label title="Test Label" htmlFor="test-input" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('block', 'text-sm', 'text-white', 'mb-1');
  });

  it('should combine default and custom styles', () => {
    render(<Label title="Test Label" htmlFor="test-input" customStyle="custom-label-class" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('block', 'text-sm', 'text-white', 'mb-1', 'custom-label-class');
  });

  it('should render with different titles', () => {
    render(<Label title="Email Address" htmlFor="email" />);

    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toHaveAttribute('for', 'email');
  });

  it('should pass through additional props', () => {
    render(<Label title="Test Label" htmlFor="test-input" data-testid="custom-label" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('data-testid', 'custom-label');
  });

  it('should handle empty title', () => {
    render(<Label title="" htmlFor="test-input" />);

    const label = screen.getByTestId('label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('should be accessible with proper label association', () => {
    render(<Label title="Username" htmlFor="username-input" />);

    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', 'username-input');
  });
});

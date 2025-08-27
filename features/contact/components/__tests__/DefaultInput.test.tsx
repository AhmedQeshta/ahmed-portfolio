import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultInput from '@/features/shard/components/form/DefaultInput';

// Mock the cn utility function
jest.mock('@/features/shard/utils/statusColor', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('DefaultInput', () => {
  const mockHandleInputChange = jest.fn();

  beforeEach(() => {
    mockHandleInputChange.mockClear();
  });

  it('should render input with default props', () => {
    render(
      <DefaultInput
        handleInputChange={mockHandleInputChange}
        name="test-input"
        placeholder="Enter text"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('should call handleInputChange when input value changes', () => {
    // Create a function that expects 2 parameters (field, value)
    const mockHandleInputChange = jest.fn((field: string, value: string) => {});

    render(<DefaultInput handleInputChange={mockHandleInputChange} name="test-input" value="" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(mockHandleInputChange).toHaveBeenCalledWith('test-input', 'test value');
  });

  it('should apply custom styles when provided', () => {
    render(
      <DefaultInput
        handleInputChange={mockHandleInputChange}
        name="test-input"
        customStyle="custom-class"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('should show error styling when displayErrors is provided', () => {
    render(
      <DefaultInput
        handleInputChange={mockHandleInputChange}
        name="test-input"
        displayErrors="This field is required"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500/50', 'focus:ring-red-500');
  });

  it('should show error message when displayErrors is provided', () => {
    render(
      <DefaultInput
        handleInputChange={mockHandleInputChange}
        name="test-input"
        displayErrors="This field is required"
      />,
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass(
      'text-red-400',
      'text-sm',
      'mt-0',
      'block',
    );
  });

  it('should apply default styling when no errors', () => {
    render(<DefaultInput handleInputChange={mockHandleInputChange} name="test-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-white/30', 'focus:ring-purple-500');
  });

  it('should not show error message when displayErrors is empty', () => {
    render(
      <DefaultInput handleInputChange={mockHandleInputChange} name="test-input" displayErrors="" />,
    );

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('should pass through additional props to input element', () => {
    render(
      <DefaultInput
        handleInputChange={mockHandleInputChange}
        name="test-input"
        disabled
        readOnly
        maxLength={50}
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('maxlength', '50');
  });

  it('should have correct default classes', () => {
    render(<DefaultInput handleInputChange={mockHandleInputChange} name="test-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'w-full',
      'px-4',
      'py-2',
      'bg-transparent',
      'border',
      'rounded-md',
      'text-white',
      'placeholder:text-placeholder',
      'focus:outline-none',
      'focus:ring-2',
      'transition-colors',
    );
  });
});

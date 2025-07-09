import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DefaultTextarea from '@/components/ui/DefaultTextarea';

// Mock the cn utility function
jest.mock('@/utils/statusColor', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('DefaultTextarea', () => {
  const mockHandleInputChange = jest.fn();

  beforeEach(() => {
    mockHandleInputChange.mockClear();
  });

  it('should render textarea with default props', () => {
    render(
      <DefaultTextarea
        handleInputChange={mockHandleInputChange}
        name="test-textarea"
        placeholder="Enter text"
      />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('name', 'test-textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toHaveAttribute('id', 'test-textarea');
  });

  it('should call handleInputChange when textarea value changes', () => {
    render(<DefaultTextarea handleInputChange={mockHandleInputChange} name="test-textarea" />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test value' } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(['test-textarea'], 'test value');
  });

  it('should apply custom styles when provided', () => {
    render(
      <DefaultTextarea
        handleInputChange={mockHandleInputChange}
        name="test-textarea"
        customStyle="custom-class"
      />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('should show error styling when displayErrors is provided', () => {
    render(
      <DefaultTextarea
        handleInputChange={mockHandleInputChange}
        name="test-textarea"
        displayErrors="This field is required"
      />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-500/50', 'focus:ring-red-500');
  });

  it('should show error message when displayErrors is provided', () => {
    render(
      <DefaultTextarea
        handleInputChange={mockHandleInputChange}
        name="test-textarea"
        displayErrors="This field is required"
      />,
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass(
      'text-red-400',
      'text-sm',
      'mt-1',
      'block',
    );
  });

  it('should apply default styling when no errors', () => {
    render(<DefaultTextarea handleInputChange={mockHandleInputChange} name="test-textarea" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-white/30', 'focus:ring-purple-500');
  });

  it('should not show error message when displayErrors is empty', () => {
    render(
      <DefaultTextarea
        handleInputChange={mockHandleInputChange}
        name="test-textarea"
        displayErrors=""
      />,
    );

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('should pass through additional props to textarea element', () => {
    render(
      <DefaultTextarea
        handleInputChange={mockHandleInputChange}
        name="test-textarea"
        disabled
        readOnly
        rows={5}
        cols={50}
      />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('disabled');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '50');
  });

  it('should have correct default classes', () => {
    render(<DefaultTextarea handleInputChange={mockHandleInputChange} name="test-textarea" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
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

  it('should handle multiline text input', () => {
    render(<DefaultTextarea handleInputChange={mockHandleInputChange} name="test-textarea" />);

    const textarea = screen.getByRole('textbox');
    const multilineText = 'Line 1\nLine 2\nLine 3';
    fireEvent.change(textarea, { target: { value: multilineText } });

    expect(mockHandleInputChange).toHaveBeenCalledWith(['test-textarea'], multilineText);
  });
});

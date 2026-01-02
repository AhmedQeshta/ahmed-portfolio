import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '@/features/shard/utils/test-utils';
import ContactForm from '@/features/contact/components/form/ContactForm';

// Mock the useContact hook
const mockUseContact: any = {
  formData: {
    name: '',
    email: '',
    message: '',
    newsletter: true,
  },
  state: null,
  formAction: jest.fn(),
  isPending: false,
  handleInputChange: jest.fn(),
  handleSubmit: jest.fn(),
  resetForm: jest.fn(),
  displayErrors: {
    name: '',
    email: '',
    message: '',
    general: '',
  },
};

jest.mock('@/features/contact/hooks/useContact', () => ({
  useContact: () => mockUseContact,
}));

jest.mock('@/features/contact/components/form/SuccessMessage', () => {
  return function MockSuccessMessage({ state, resetForm }: any) {
    return (
      <div data-testid="success-message">
        {state.message}
        <button onClick={resetForm}>Send Another Message</button>
      </div>
    );
  };
});

jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({ children, direction, delay }: any) {
    return (
      <div data-testid="scroll-animation" data-direction={direction} data-delay={delay}>
        {children}
      </div>
    );
  };
});

jest.mock('@/features/shard/components/form/DefaultInput', () => {
  return function MockDefaultInput({
    name,
    value,
    handleInputChange,
    placeholder,
    displayErrors,
    ...props
  }: any) {
    return (
      <input
        data-testid={`input-${name}`}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        {...props}
      />
    );
  };
});

jest.mock('@/features/shard/components/form/Label', () => {
  return function MockLabel({ htmlFor, title }: any) {
    return (
      <label htmlFor={htmlFor} data-testid={`label-${htmlFor}`}>
        {title}
      </label>
    );
  };
});

jest.mock('@/features/shard/components/form/DefaultTextarea', () => {
  return function MockDefaultTextarea({
    name,
    value,
    handleInputChange,
    placeholder,
    displayErrors,
    rows,
    ...props
  }: any) {
    return (
      <textarea
        data-testid={`textarea-${name}`}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
    );
  };
});

jest.mock('@/features/contact/components/ui/SubmitButton', () => {
  return function MockSubmitButton({ isPending }: any) {
    return (
      <button type="submit" data-testid="submit-button" disabled={isPending}>
        {isPending ? 'Sending...' : 'Send Message'}
      </button>
    );
  };
});

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock state
    mockUseContact.formData = {
      name: '',
      email: '',
      message: '',
      newsletter: true,
    };
    mockUseContact.state = null;
    mockUseContact.isPending = false;
    mockUseContact.displayErrors = {
      name: '',
      email: '',
      message: '',
      general: '',
    };
  });

  it('renders contact form with all fields', () => {
    render(<ContactForm />);

    expect(screen.getByTestId('label-name')).toBeInTheDocument();
    expect(screen.getByTestId('label-email')).toBeInTheDocument();
    expect(screen.getByTestId('label-message')).toBeInTheDocument();

    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-message')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('displays form fields with correct placeholders', () => {
    render(<ContactForm />);

    expect(screen.getByTestId('input-name')).toHaveAttribute('placeholder', 'Enter your full name');
    expect(screen.getByTestId('input-email')).toHaveAttribute(
      'placeholder',
      'Enter your email address',
    );
    expect(screen.getByTestId('textarea-message')).toHaveAttribute(
      'placeholder',
      'Tell me about your project, ideas, or how I can help you...',
    );
  });

  it('shows success message when state.success is true', () => {
    mockUseContact.state = { success: true, message: 'Message sent successfully!' };

    render(<ContactForm />);

    expect(screen.getByTestId('success-message')).toBeInTheDocument();
    expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
  });

  it('calls resetForm when Send Another Message button is clicked', () => {
    mockUseContact.state = { success: true, message: 'Message sent successfully!' };
    const mockResetForm = jest.fn();
    mockUseContact.resetForm = mockResetForm;

    render(<ContactForm />);

    const resetButton = screen.getByText('Send Another Message');
    fireEvent.click(resetButton);

    expect(mockResetForm).toHaveBeenCalled();
  });

  it('displays general error when present', () => {
    mockUseContact.displayErrors.general = 'Something went wrong';

    render(<ContactForm />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toHaveClass('text-red-400');
  });

  it('handles form submission', async () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    mockUseContact.handleSubmit = mockHandleSubmit;

    render(<ContactForm />);

    const form = screen.getByTestId('input-name').closest('form');
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it('shows loading state on submit button when isPending is true', () => {
    mockUseContact.isPending = true;

    render(<ContactForm />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
  });

  it('shows normal state on submit button when isPending is false', () => {
    mockUseContact.isPending = false;

    render(<ContactForm />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent('Send Message');
  });

  it('passes correct props to form inputs', () => {
    mockUseContact.formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world',
      newsletter: true,
    };

    render(<ContactForm />);

    expect(screen.getByTestId('input-name')).toHaveValue('John Doe');
    expect(screen.getByTestId('input-email')).toHaveValue('john@example.com');
    expect(screen.getByTestId('textarea-message')).toHaveValue('Hello world');
  });

  it('passes correct props to form elements', () => {
    render(<ContactForm />);

    const nameInput = screen.getByTestId('input-name');
    const emailInput = screen.getByTestId('input-email');
    const messageTextarea = screen.getByTestId('textarea-message');

    expect(nameInput).toHaveAttribute('name', 'name');
    expect(emailInput).toHaveAttribute('name', 'email');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(messageTextarea).toHaveAttribute('name', 'message');
    expect(messageTextarea).toHaveAttribute('rows', '6'); // Updated to match actual rows value
  });
});

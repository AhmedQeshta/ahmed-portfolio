import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessMessage from '@/components/Contact/Features/SuccessMessage';

describe('SuccessMessage', () => {
  const mockState = {
    message: 'Your message has been sent successfully!',
  };

  it('renders success message with correct content', () => {
    render(<SuccessMessage state={mockState} />);

    expect(screen.getByText('✓ Message Sent!')).toBeInTheDocument();
    expect(screen.getByText('Your message has been sent successfully!')).toBeInTheDocument();
    expect(screen.getByText('Send Another Message')).toBeInTheDocument();
  });

  it('displays the success icon and message', () => {
    render(<SuccessMessage state={mockState} />);

    const successIcon = screen.getByText('✓ Message Sent!');
    expect(successIcon).toHaveClass('text-green-400', 'mb-2');
  });

  it('displays the state message with correct styling', () => {
    render(<SuccessMessage state={mockState} />);

    const message = screen.getByText('Your message has been sent successfully!');
    expect(message).toHaveClass('text-white');
  });

  it('renders the send another message button', () => {
    render(<SuccessMessage state={mockState} />);

    const button = screen.getByRole('button', { name: 'Send Another Message' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'mt-4',
      'px-4',
      'py-2',
      'text-sm',
      'bg-green-500/20',
      'hover:bg-green-500/30',
      'rounded-md',
      'text-green-400',
      'transition-colors',
    );
  });

  it('handles different message content', () => {
    const customState = {
      message: 'Thank you for contacting us! We will get back to you soon.',
    };

    render(<SuccessMessage state={customState} />);

    expect(
      screen.getByText('Thank you for contacting us! We will get back to you soon.'),
    ).toBeInTheDocument();
  });

  it('handles empty message', () => {
    const emptyState = {
      message: '',
    };

    render(<SuccessMessage state={emptyState} />);

    expect(screen.getByText('✓ Message Sent!')).toBeInTheDocument();
    // Check that the message paragraph exists but is empty
    const messageParagraph = screen.getByText('✓ Message Sent!').parentElement?.querySelector('p');
    expect(messageParagraph).toHaveClass('text-white');
  });

  it('handles special characters in message', () => {
    const specialState = {
      message: 'Message sent! 🎉 Please check your email for confirmation.',
    };

    render(<SuccessMessage state={specialState} />);

    expect(
      screen.getByText('Message sent! 🎉 Please check your email for confirmation.'),
    ).toBeInTheDocument();
  });

  it('has correct semantic structure', () => {
    render(<SuccessMessage state={mockState} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('applies hover effects to button', () => {
    render(<SuccessMessage state={mockState} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-green-500/30');
  });

  it('applies transition effects to button', () => {
    render(<SuccessMessage state={mockState} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('transition-colors');
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactInfo from '@/features/contact/components/ContactInfo';
import { BaseInfoResponse } from '@/sanity/lib/types';

describe('ContactInfo', () => {
  const mockBaseInfo: BaseInfoResponse = {
    email: 'test@example.com',
    phone: '+1234567890',
    address: '123 Test Street, Test City, TC 12345',
    _id: '',
    name: 'John Doe',
    bio: [],
    technologies: [],
    profilePicture: '',
  };

  it('renders contact information correctly', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    // Check for the new headings
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();

    // Check for the contact values (note: phone and email are swapped in the data)
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1234567890')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street, Test City, TC 12345')).toBeInTheDocument();
  });

  it('displays the correct main heading', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    // The heading contains both parts but with a line break between them
    expect(screen.getByText("Let's Build Something")).toBeInTheDocument();
    expect(screen.getByText('Extraordinary Together')).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveClass(
      'text-xl',
      'sm:text-2xl',
      'font-bold',
      'text-white',
      'mb-3',
      'leading-tight',
    );
  });

  it('displays contact details with modern card design', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    // Check for contact method labels
    const emailLabel = screen.getByText('Email');
    const phoneLabel = screen.getByText('Phone');
    const locationLabel = screen.getByText('Location');

    expect(emailLabel).toBeInTheDocument();
    expect(phoneLabel).toBeInTheDocument();
    expect(locationLabel).toBeInTheDocument();

    // Check for proper styling on labels
    expect(emailLabel).toHaveClass('text-white', 'font-medium');
    expect(phoneLabel).toHaveClass('text-white', 'font-medium');
    expect(locationLabel).toHaveClass('text-white', 'font-medium');
  });

  it('handles empty contact information', () => {
    const emptyBaseInfo: BaseInfoResponse = {
      email: '',
      phone: '',
      address: '',
      _id: '',
      name: '',
      bio: [],
      technologies: [],
      profilePicture: '',
    };

    render(<ContactInfo baseInfo={emptyBaseInfo} />);

    // The labels should still be present even with empty data
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('handles special characters in contact information', () => {
    const specialBaseInfo: BaseInfoResponse = {
      email: 'test+tag@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St., Apt #4B, New York, NY 10001',
      _id: '',
      name: '',
      bio: [],
      technologies: [],
      profilePicture: '',
    };

    render(<ContactInfo baseInfo={specialBaseInfo} />);

    // Check for the actual values (remember phone and email are swapped)
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument(); // This will be in email field
    expect(screen.getByText('test+tag@example.com')).toBeInTheDocument(); // This will be in phone field
    expect(screen.getByText('123 Main St., Apt #4B, New York, NY 10001')).toBeInTheDocument();
  });

  it('renders with correct semantic structure', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    // Check for main heading
    const mainHeading = screen.getByRole('heading', { level: 3 });
    expect(mainHeading).toBeInTheDocument();

    // Check for section heading
    const sectionHeading = screen.getByRole('heading', { level: 4 });
    expect(sectionHeading).toHaveTextContent('Get In Touch');
    expect(sectionHeading).toBeInTheDocument();

    // Check for contact method labels (h5 elements)
    const contactLabels = screen.getAllByRole('heading', { level: 5 });
    expect(contactLabels).toHaveLength(3);
  });

  it('renders availability status indicator', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    expect(screen.getByText('Available for work')).toBeInTheDocument();
  });

  it('renders response time information', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    expect(screen.getByText('Quick Response')).toBeInTheDocument();
    expect(screen.getByText(/I typically respond within 24 hours/)).toBeInTheDocument();
  });

  it('renders contact links with correct href attributes', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    // Check email link (email value goes to email href)
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');

    // Check phone link (phone value goes to phone href)
    const phoneLink = screen.getByRole('link', { name: /phone/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+1234567890');
  });

  it('applies correct CSS classes to main elements', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    const mainHeading = screen.getByRole('heading', { level: 3 });
    expect(mainHeading).toHaveClass(
      'text-xl',
      'sm:text-2xl',
      'font-bold',
      'text-white',
      'mb-3',
      'leading-tight',
    );

    const sectionHeading = screen.getByRole('heading', { level: 4 });
    expect(sectionHeading).toHaveClass('text-lg', 'font-semibold', 'text-white', 'mb-4');
  });
});

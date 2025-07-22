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
    name: '',
    bio: [],
    technologies: [],
    profilePicture: '',
  };

  it('renders contact information correctly', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Phone: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: +1234567890')).toBeInTheDocument();
    expect(screen.getByText('Location: 123 Test Street, Test City, TC 12345')).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Get in Touch');
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-white', 'mb-4');
  });

  it('displays contact details with correct styling', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    const contactDetails = screen.getAllByText(/Phone:|Email:|Location:/);
    expect(contactDetails).toHaveLength(3);

    contactDetails.forEach((detail) => {
      expect(detail).toHaveClass('text-text-secondary', 'mb-2');
    });
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

    expect(screen.getByText((content) => content.includes('Phone:'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Email:'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Location:'))).toBeInTheDocument();
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

    expect(screen.getByText('Phone: test+tag@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: +1 (555) 123-4567')).toBeInTheDocument();
    expect(
      screen.getByText('Location: 123 Main St., Apt #4B, New York, NY 10001'),
    ).toBeInTheDocument();
  });

  it('renders with correct semantic structure', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();

    const paragraphs = screen.getAllByText(/Phone:|Email:|Location:/);
    expect(paragraphs).toHaveLength(3);
  });

  it('applies correct CSS classes to elements', () => {
    render(<ContactInfo baseInfo={mockBaseInfo} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveClass('text-lg', 'font-semibold', 'text-white', 'mb-4');

    const paragraphs = screen.getAllByText(/Phone:|Email:|Location:/);
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toHaveClass('text-text-secondary', 'mb-2');
    });
  });
});

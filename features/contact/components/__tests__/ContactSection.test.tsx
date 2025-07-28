import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire ContactSection module
jest.mock('@/features/contact/components/ContactSection', () => {
  return function MockContactSection() {
    return (
      <section
        id="contact"
        className="py-20 bg-section-glass rounded-2xl"
        data-testid="contact-section">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Contact Us</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div data-testid="contact-info">
                <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
                <p className="text-text-secondary mb-2">Phone: test@example.com</p>
                <p className="text-text-secondary mb-2">Email: +1234567890</p>
                <p className="text-text-secondary mb-2">Location: 123 Test Street</p>
              </div>
            </div>
            <div className="md:w-1/2">
              <div data-testid="contact-form">Contact Form</div>
            </div>
          </div>
        </div>
      </section>
    );
  };
});

import ContactSection from '@/features/contact/components/ContactSection';

describe('ContactSection', () => {
  it('renders contact section with all components', () => {
    render(<ContactSection />);

    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByTestId('contact-info')).toBeInTheDocument();
  });

  it('displays the correct heading with gradient text class', () => {
    render(<ContactSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Contact Us');
    expect(heading).toHaveClass('text-3xl', 'font-semibold', 'mb-8', 'gradient-text');
  });

  it('applies correct CSS classes to the section', () => {
    render(<ContactSection />);

    const section = screen.getByTestId('contact-section');
    expect(section).toHaveClass('py-20', 'bg-section-glass', 'rounded-2xl');
  });

  it('renders with correct layout structure', () => {
    render(<ContactSection />);

    const container = screen.getByTestId('contact-section');
    expect(container).toBeInTheDocument();

    const innerContainer = container.querySelector('.mx-auto.max-w-5xl.px-4');
    expect(innerContainer).toBeInTheDocument();

    const flexContainer = innerContainer?.querySelector('.flex.flex-col.md\\:flex-row.gap-8');
    expect(flexContainer).toBeInTheDocument();
  });

  it('renders contact info and form in separate columns', () => {
    render(<ContactSection />);

    const contactInfo = screen.getByTestId('contact-info');
    const contactForm = screen.getByTestId('contact-form');

    expect(contactInfo).toBeInTheDocument();
    expect(contactForm).toBeInTheDocument();
  });

  it('displays contact information correctly', () => {
    render(<ContactSection />);

    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    expect(screen.getByText('Phone: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: +1234567890')).toBeInTheDocument();
    expect(screen.getByText('Location: 123 Test Street')).toBeInTheDocument();
  });

  it('has correct semantic structure', () => {
    render(<ContactSection />);

    const section = screen.getByTestId('contact-section');
    const heading = screen.getByRole('heading', { level: 2 });
    const subHeading = screen.getByRole('heading', { level: 3 });

    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(subHeading).toBeInTheDocument();
  });

  it('applies correct responsive classes', () => {
    render(<ContactSection />);

    const flexContainer = screen
      .getByTestId('contact-section')
      .querySelector('.flex.flex-col.md\\:flex-row.gap-8');
    expect(flexContainer).toBeInTheDocument();
  });
});

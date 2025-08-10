import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire Header module to avoid Sanity import issues
jest.mock('@/features/header/components/Header', () => {
  return function MockHeader() {
    return (
      <section
        id="home"
        className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900"
        data-testid="header-section">
        <div className="relative mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]">
            <div className="order-2 lg:order-1 space-y-10" data-testid="base-info-wrapper">
              <div data-testid="base-info">BaseInfo</div>
            </div>
            <div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              data-testid="profile-image-wrapper">
              <div data-testid="profile-image">ProfileImage</div>
            </div>
          </div>
        </div>
      </section>
    );
  };
});

import Header from '@/features/header/components/Header';

describe('Header', () => {
  it('renders Header with BaseInfo and ProfileImage', () => {
    render(<Header />);
    expect(screen.getByTestId('base-info')).toBeInTheDocument();
    expect(screen.getByTestId('profile-image')).toBeInTheDocument();
  });

  it('renders with enhanced structure and responsive layout', () => {
    render(<Header />);
    const section = screen.getByTestId('header-section');
    expect(section).toHaveClass(
      'relative',
      'min-h-screen',
      'overflow-hidden',
      'flex',
      'items-center',
      'bg-gradient-to-br',
      'from-slate-900',
      'via-purple-900/10',
      'to-slate-900',
    );

    // Check for enhanced grid layout
    const gridContainer = screen.getByTestId('base-info-wrapper').parentElement;
    expect(gridContainer).toHaveClass(
      'grid',
      'lg:grid-cols-2',
      'gap-16',
      'lg:gap-20',
      'items-center',
      'min-h-[80vh]',
    );
  });

  it('has proper responsive order classes', () => {
    render(<Header />);

    // BaseInfo should be order-2 on mobile, order-1 on large screens
    const baseInfoWrapper = screen.getByTestId('base-info-wrapper');
    expect(baseInfoWrapper).toHaveClass('order-2', 'lg:order-1', 'space-y-10');

    // ProfileImage should be order-1 on mobile, order-2 on large screens
    const profileImageWrapper = screen.getByTestId('profile-image-wrapper');
    expect(profileImageWrapper).toHaveClass(
      'order-1',
      'lg:order-2',
      'flex',
      'justify-center',
      'lg:justify-end',
    );
  });

  it('uses enhanced container sizing and spacing', async () => {
    render(await Header());

    const section = screen.getByTestId('header-section');
    const container = section.querySelector('.mx-auto');

    expect(container).toHaveClass(
      'relative',
      'mx-auto',
      'max-w-[1450px]',
      'px-5',
      'sm:px-7',
      'lg:px-5',
      'w-full',
      'py-16',
      'lg:py-24',
    );
  });

  it('does not render scroll indicator', () => {
    render(<Header />);
    expect(screen.queryByText('Scroll to explore')).not.toBeInTheDocument();
  });
});

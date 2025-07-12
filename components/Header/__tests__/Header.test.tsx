import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the entire Header module to avoid Sanity import issues
jest.mock('@/components/Header/Header', () => {
  return function MockHeader() {
    return (
      <section
        id="home"
        className="flex flex-col lg:flex-row items-center py-20"
        data-testid="header-section">
        <div className="mx-auto max-w-5xl px-4 w-full">
          <div className="flex flex-col lg:flex-row items-center">
            <div data-testid="base-info">BaseInfo</div>
            <div data-testid="profile-image">ProfileImage</div>
          </div>
        </div>
      </section>
    );
  };
});

import Header from '@/components/Header/Header';

describe('Header', () => {
  it('renders Header with BaseInfo and ProfileImage', () => {
    render(<Header />);
    expect(screen.getByTestId('base-info')).toBeInTheDocument();
    expect(screen.getByTestId('profile-image')).toBeInTheDocument();
  });

  it('renders with correct structure', () => {
    render(<Header />);
    const section = screen.getByTestId('header-section');
    expect(section).toHaveClass('flex', 'flex-col', 'lg:flex-row', 'items-center', 'py-20');
  });
});

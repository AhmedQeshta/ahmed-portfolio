import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseInfo from '@/features/header/components/BaseInfo';
import { IBaseInfoResponse } from '@/features/header/types/header';

jest.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: unknown }) => (
    <div data-testid="portable-text">{JSON.stringify(value)}</div>
  ),
}));

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: () => 'mocked-tech-url.jpg',
}));

jest.mock('next/image', () => (props: any) => {
  const { priority, fill, ...restProps } = props;
  return <img {...restProps} alt={props.alt} data-testid="next-image" />;
});

const mockProps: IBaseInfoResponse = {
  baseInfo: {
    _id: '1',
    name: 'Ahmed',
    bio: [{ _type: 'block', children: [{ text: 'Hello' }] }],
    technologies: [
      // First 8 technologies (used in ProfileImage orbit)
      { _id: 't1', name: 'React', order: 1, logo: 'logo1.png', website: 'https://react.dev' },
      { _id: 't2', name: 'Vue', order: 2, logo: 'logo2.png', website: 'https://vuejs.org' },
      { _id: 't3', name: 'Angular', order: 3, logo: 'logo3.png', website: 'https://angular.io' },
      { _id: 't4', name: 'Node.js', order: 4, logo: 'logo4.png', website: 'https://nodejs.org' },
      { _id: 't5', name: 'Python', order: 5, logo: 'logo5.png', website: 'https://python.org' },
      { _id: 't6', name: 'Java', order: 6, logo: 'logo6.png', website: 'https://java.com' },
      { _id: 't7', name: 'Go', order: 7, logo: 'logo7.png', website: 'https://golang.org' },
      { _id: 't8', name: 'Rust', order: 8, logo: 'logo8.png', website: 'https://rust-lang.org' },
      // Remaining technologies (used in BaseInfo - starting from index 8)
      {
        _id: 't9',
        name: 'TypeScript',
        order: 9,
        logo: 'logo9.png',
        website: 'https://typescriptlang.org',
      },
      {
        _id: 't10',
        name: 'JavaScript',
        order: 10,
        logo: 'logo10.png',
        website: 'https://javascript.com',
      },
      { _id: 't11', name: 'PHP', order: 11, logo: 'logo11.png', website: 'https://php.net' },
    ],
    profilePicture: 'profile.jpg',
    email: 'test@example.com',
    phone: '+1234567890',
    address: '123 Test Street',
  },
};

const mockPropsNoRemainingTech: IBaseInfoResponse = {
  baseInfo: {
    ...mockProps.baseInfo,
    technologies: [
      // Only first 8 technologies (no remaining ones for BaseInfo)
      { _id: 't1', name: 'React', order: 1, logo: 'logo1.png', website: 'https://react.dev' },
      { _id: 't2', name: 'Vue', order: 2, logo: 'logo2.png', website: 'https://vuejs.org' },
      { _id: 't3', name: 'Angular', order: 3, logo: 'logo3.png', website: 'https://angular.io' },
      { _id: 't4', name: 'Node.js', order: 4, logo: 'logo4.png', website: 'https://nodejs.org' },
      { _id: 't5', name: 'Python', order: 5, logo: 'logo5.png', website: 'https://python.org' },
      { _id: 't6', name: 'Java', order: 6, logo: 'logo6.png', website: 'https://java.com' },
      { _id: 't7', name: 'Go', order: 7, logo: 'logo7.png', website: 'https://golang.org' },
      { _id: 't8', name: 'Rust', order: 8, logo: 'logo8.png', website: 'https://rust-lang.org' },
    ],
  },
};

const mockPropsNoTech: IBaseInfoResponse = {
  baseInfo: {
    ...mockProps.baseInfo,
    technologies: [],
  },
};

describe('BaseInfo', () => {
  it('renders name, bio, and core content', () => {
    render(<BaseInfo {...mockProps} />);

    // Check main elements
    expect(screen.getByText('Ahmed')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
  });

  it('renders remaining technology icons when technologies exist after first 8', () => {
    render(<BaseInfo {...mockProps} />);

    // Check for technologies section
    expect(screen.getByText('Core Technologies')).toBeInTheDocument();
    expect(screen.getByText('Technologies I work with')).toBeInTheDocument();

    // Should render 3 remaining technologies (after first 8)
    const techImages = screen.getAllByTestId('next-image');
    expect(techImages).toHaveLength(3);

    // Check technology names in tooltips - these should be the ones after index 8
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();

    // Should NOT show the first 8 technologies (those are in ProfileImage orbit)
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
  });

  it('does not render technology section when no remaining technologies after first 8', () => {
    render(<BaseInfo {...mockPropsNoRemainingTech} />);

    // Should not show technologies section since there are no remaining technologies after first 8
    expect(screen.queryByText('Core Technologies')).not.toBeInTheDocument();
    expect(screen.queryByText('Technologies I work with')).not.toBeInTheDocument();
  });

  it('does not render technology section when no technologies at all', () => {
    render(<BaseInfo {...mockPropsNoTech} />);

    // Should not show technologies section
    expect(screen.queryByText('Core Technologies')).not.toBeInTheDocument();
    expect(screen.queryByText('Technologies I work with')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes to main elements', () => {
    render(<BaseInfo {...mockProps} />);

    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveClass(
      'text-4xl',
      'sm:text-5xl',
      'lg:text-6xl',
      'font-bold',
      'gradient-text',
      'leading-tight',
    );

    const subtitle = screen.getByRole('heading', { level: 2 });
    expect(subtitle).toHaveClass(
      'text-xl',
      'sm:text-2xl',
      'lg:text-3xl',
      'font-semibold',
      'text-white/90',
      'leading-tight',
    );
  });

  it('renders technology grid with enhanced gaps and smaller icons', () => {
    render(<BaseInfo {...mockProps} />);

    // Check technology grid container using one of the remaining technologies
    const techGrid = screen.getByText('TypeScript').closest('.grid');
    expect(techGrid).toHaveClass(
      'grid',
      'grid-cols-4',
      'sm:grid-cols-6',
      'lg:grid-cols-8',
      'xl:grid-cols-10',
      'gap-6',
      'lg:gap-8',
    );
  });

  it('renders section headers with correct styling when technologies exist', () => {
    render(<BaseInfo {...mockProps} />);

    // Check Core Technologies heading
    const techHeading = screen.getByRole('heading', { level: 3 });
    expect(techHeading).toHaveClass('text-xl', 'sm:text-2xl', 'font-bold', 'text-white', 'mb-2');
  });

  it('does not render stats section', () => {
    render(<BaseInfo {...mockProps} />);

    // Should not show stats
    expect(screen.queryByText('5+')).not.toBeInTheDocument();
    expect(screen.queryByText('Years Experience')).not.toBeInTheDocument();
    expect(screen.queryByText('50+')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects Completed')).not.toBeInTheDocument();
    expect(screen.queryByText('20+')).not.toBeInTheDocument();
    expect(screen.queryByText('Happy Clients')).not.toBeInTheDocument();
  });
});

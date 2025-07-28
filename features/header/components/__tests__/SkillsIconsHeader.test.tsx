import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsIconsHeader from '@/features/header/components/ui/SkillsIconsHeader';
import { ITechnologiesResponse } from '@/features/shard/types/technology';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: () => 'mocked-tech-url.jpg',
}));
jest.mock('next/image', () => (props: any) => {
  const { priority, fill, ...restProps } = props;
  return <img {...restProps} alt={props.alt} data-testid="next-image" />;
});

const mockProps: ITechnologiesResponse = {
  technologies: [
    // First 8 technologies (used in ProfileImage orbit) - these won't show in SkillsIconsHeader
    { _id: 't1', name: 'Vue', order: 1, logo: 'logo1.png', website: 'https://vuejs.org' },
    { _id: 't2', name: 'Angular', order: 2, logo: 'logo2.png', website: 'https://angular.io' },
    { _id: 't3', name: 'Node.js', order: 3, logo: 'logo3.png', website: 'https://nodejs.org' },
    { _id: 't4', name: 'Python', order: 4, logo: 'logo4.png', website: 'https://python.org' },
    { _id: 't5', name: 'Java', order: 5, logo: 'logo5.png', website: 'https://java.com' },
    { _id: 't6', name: 'Go', order: 6, logo: 'logo6.png', website: 'https://golang.org' },
    { _id: 't7', name: 'Rust', order: 7, logo: 'logo7.png', website: 'https://rust-lang.org' },
    { _id: 't8', name: 'C++', order: 8, logo: 'logo8.png', website: 'https://cplusplus.com' },
    // These will show in SkillsIconsHeader (starting from index 8)
    { _id: 't9', name: 'React', order: 9, logo: 'logo9.png', website: 'https://react.dev' },
    {
      _id: 't10',
      name: 'TypeScript',
      order: 10,
      logo: 'logo10.png',
      website: 'https://typescriptlang.org',
    },
  ],
};

describe('SkillsIconsHeader', () => {
  it('renders technology icons with correct alt and src', () => {
    render(<SkillsIconsHeader {...mockProps} />);
    expect(screen.getAllByTestId('next-image')).toHaveLength(2);
    expect(screen.getByAltText('React')).toBeInTheDocument();
    expect(screen.getByAltText('TypeScript')).toBeInTheDocument();
    expect(screen.getAllByTestId('next-image')[0]).toHaveAttribute('src', 'mocked-tech-url.jpg');
    expect(screen.getAllByTestId('next-image')[1]).toHaveAttribute('src', 'mocked-tech-url.jpg');
  });
});

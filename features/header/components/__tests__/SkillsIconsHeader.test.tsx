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
    { _id: 't1', name: 'React', order: 1, logo: 'logo1.png', website: 'https://react.dev' },
    {
      _id: 't2',
      name: 'TypeScript',
      order: 2,
      logo: 'logo2.png',
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

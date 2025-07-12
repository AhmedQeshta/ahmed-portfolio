import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseInfo from '@/components/Header/BaseInfo';
import { IBaseInfoResponse } from '@/utils/types/header';

jest.mock('@portabletext/react', () => ({
  PortableText: ({ value }: { value: unknown }) => (
    <div data-testid="portable-text">{JSON.stringify(value)}</div>
  ),
}));
jest.mock(
  '@/components/Header/SkillsIconsHeader',
  () =>
    ({ technologies }: { technologies: unknown }) => (
      <div data-testid="skills-icons">SkillsIcons</div>
    ),
);
jest.mock('@/components/ui/Loading', () => () => <div data-testid="loading">Loading...</div>);

const mockProps: IBaseInfoResponse = {
  baseInfo: {
    _id: '1',
    name: 'Ahmed',
    bio: [{ _type: 'block', children: [{ text: 'Hello' }] }],
    technologies: [],
    profilePicture: 'profile.jpg',
    email: 'test@example.com',
    phone: '+1234567890',
    address: '123 Test Street',
  },
};

describe('BaseInfo', () => {
  it('renders name, bio, and skills icons', () => {
    render(<BaseInfo {...mockProps} />);
    expect(screen.getByText('Ahmed')).toBeInTheDocument();
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
    expect(screen.getByTestId('skills-icons')).toBeInTheDocument();
  });
});

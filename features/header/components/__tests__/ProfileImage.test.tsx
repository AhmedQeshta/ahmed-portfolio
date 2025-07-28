import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileImage from '@/features/header/components/ProfileImage';
import { IBaseInfoResponse } from '@/features/header/types/header';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: () => 'mocked-url.jpg',
}));
jest.mock(
  '@/features/shard/components/ui/MouseMoveWrapper',
  () =>
    ({ children, ...props }: { children: React.ReactNode; className?: string }) => (
      <div data-testid="mouse-move-wrapper" {...props}>
        {children}
      </div>
    ),
);
jest.mock('next/image', () => (props: any) => {
  const { priority, ...restProps } = props;
  return <img {...restProps} alt={props.alt} data-testid="next-image" />;
});

const mockProps: IBaseInfoResponse = {
  baseInfo: {
    _id: '1',
    name: 'Ahmed',
    bio: [],
    technologies: [],
    profilePicture: 'profile.jpg',
    email: 'test@example.com',
    phone: '+1234567890',
    address: '123 Test Street',
  },
};

describe('ProfileImage', () => {
  it('renders profile image when profilePicture is present', () => {
    render(<ProfileImage {...mockProps} />);
    expect(screen.getByTestId('mouse-move-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByAltText('Ahmed profile picture')).toBeInTheDocument();
  });

  it('renders fallback with initial when profilePicture is missing', () => {
    const props: IBaseInfoResponse = {
      baseInfo: { ...mockProps.baseInfo, profilePicture: '' },
    };
    render(<ProfileImage {...props} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});

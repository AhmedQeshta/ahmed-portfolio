import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PortableImage from '../portableText/PortableImage';
import { ImageValue } from '../../types/common';

// Mock the getImageUrl function
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: jest.fn((source, width, height, quality) => {
    // Mock different URLs based on parameters
    if (quality === undefined) {
      return 'https://cdn.sanity.io/images/test/test-gif.gif';
    }
    return 'https://cdn.sanity.io/images/test/test-image.jpg';
  }),
}));

describe('PortableImage', () => {
  const mockValue = {
    asset: {
      _ref: 'image-test123',
    },
    alt: 'Test image',
  };

  const mockGifValue = {
    asset: {
      _ref: 'image-test123-gif',
    },
    alt: 'Test GIF',
  };

  it('should render image with correct props', async () => {
    render(<PortableImage value={mockValue as unknown as ImageValue} />);

    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
    expect(image).toHaveClass('w-full', 'h-auto', 'object-cover');

    // Wait for image to load
    await act(async () => {
      image.dispatchEvent(new Event('load'));
    });
  });

  it('should handle GIF images correctly', async () => {
    render(<PortableImage value={mockGifValue as unknown as ImageValue} />);

    const image = screen.getByAltText('Test GIF');
    expect(image).toBeInTheDocument();

    // Check if unoptimized prop is set (Next.js Image component handles this internally)
    // The unoptimized prop might not be visible in the DOM, so we check the component behavior
    expect(image).toHaveAttribute('src', 'https://cdn.sanity.io/images/test/test-gif.gif');

    // Wait for image to load
    await act(async () => {
      image.dispatchEvent(new Event('load'));
    });
  });

  it('should show loading state initially', () => {
    render(<PortableImage value={mockValue as unknown as ImageValue} />);

    // Check for loading spinner
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should show error state when image fails to load', async () => {
    render(<PortableImage value={mockValue as unknown as ImageValue} />);

    const image = screen.getByAltText('Test image');

    await act(async () => {
      image.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument();
    });
  });

  it('should render caption when alt text is provided', () => {
    render(<PortableImage value={mockValue as unknown as ImageValue} />);

    expect(screen.getByText('Test image')).toBeInTheDocument();
  });

  it('should not render when no value is provided', () => {
    const { container } = render(<PortableImage value={null as unknown as ImageValue} />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render when no asset is provided', () => {
    const { container } = render(
      <PortableImage value={{ alt: 'Test' } as unknown as ImageValue} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('should have correct responsive sizing', () => {
    render(<PortableImage value={mockValue as unknown as ImageValue} />);

    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute(
      'sizes',
      '(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 85vw, (max-width: 1280px) 75vw, 1200px',
    );
  });
});

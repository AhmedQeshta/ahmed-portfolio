import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import Technologies from '@/features/shard/components/ui/Technologies';
import { TechnologyResponse } from '@/sanity/lib/types';


// Mock the getImageUrl function
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: jest.fn(() => 'https://example.com/image.jpg'),
}));

interface IMockImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill: boolean;
}

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: IMockImage) => {
    const { fill, ...restProps } = props;
    return <img {...restProps} />;
  },
}));

describe('Technologies', () => {
  const mockTechnologies = [
    {
      _id: '1',
      name: 'React',
      logo: 'image-1',
      order: 1,
    },
    {
      _id: '2',
      name: 'TypeScript',
      logo: 'image-2',
      order: 2,
    },
    {
      _id: '3',
      name: 'Next.js',
      logo: null,
      order: 3,
    },
  ];

  it('should render technologies when provided', () => {
    render(<Technologies technologies={mockTechnologies as unknown as TechnologyResponse[]} />);

    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('should not render when technologies array is empty', () => {
    render(<Technologies technologies={[]} />);

    expect(screen.queryByText('Technologies')).not.toBeInTheDocument();
  });

  it('should not render when technologies is null', () => {
    render(<Technologies technologies={null as any} />);

    expect(screen.queryByText('Technologies')).not.toBeInTheDocument();
  });

  it('should render technology logos when available', () => {
    render(<Technologies technologies={mockTechnologies as unknown as TechnologyResponse[]} />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2); // Only React and TypeScript have logos
  });

  it('should render technology without logo', () => {
    render(<Technologies technologies={mockTechnologies as unknown as TechnologyResponse[]} />);

    expect(screen.getByText('Next.js')).toBeInTheDocument();
    // Next.js doesn't have a logo, so it should still render the text
  });

  it('should have correct styling for technologies container', () => {
    render(<Technologies technologies={mockTechnologies as unknown as TechnologyResponse[]} />);

    const container = screen.getByTestId('technologies-container');
    expect(container).toHaveClass(
      'bg-gray-900/50',
      'backdrop-blur-sm',
      'border',
      'border-gray-800',
      'rounded-xl',
      'p-6',
    );
  });

  it('should have correct styling for individual technology items', () => {
    render(<Technologies technologies={mockTechnologies as unknown as TechnologyResponse[]} />);

    const reactItem = screen.getByText('React').closest('div');
    expect(reactItem).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'px-3',
      'py-2',
      'bg-gradient-to-r',
      'from-gray-800',
      'to-gray-700',
      'text-gray-200',
      'rounded-lg',
      'text-sm',
      'font-medium',
      'border',
      'border-gray-600',
      'hover:border-gray-500',
      'transition-colors',
    );
  });

  it('should render technologies title with correct styling', () => {
    render(<Technologies technologies={mockTechnologies as unknown as TechnologyResponse[]} />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveTextContent('Technologies');
    expect(title).toHaveClass('text-xl', 'font-bold', 'text-white', 'mb-4');
  });

  it('should handle single technology', () => {
    render(
      <Technologies technologies={[mockTechnologies[0]] as unknown as TechnologyResponse[]} />,
    );

    expect(screen.getByText('Technologies')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });
});

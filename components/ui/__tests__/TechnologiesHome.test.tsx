import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TechnologiesHome from '@/components/ui/TechnologiesHome';

// Mock the getImageUrl function
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: jest.fn(() => 'https://example.com/image.jpg'),
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...restProps } = props;
    return <img {...restProps} />;
  },
}));

describe('TechnologiesHome', () => {
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
      logo: 'image-3',
      order: 3,
    },
    {
      _id: '4',
      name: 'Tailwind CSS',
      logo: 'image-4',
      order: 4,
    },
    {
      _id: '5',
      name: 'Node.js',
      logo: 'image-5',
      order: 5,
    },
  ];

  it('should render technologies when provided', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    expect(screen.getByText('Technologies:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('should not render when technologies array is empty', () => {
    render(<TechnologiesHome technologies={[]} link="/technologies" />);

    expect(screen.queryByText('Technologies:')).not.toBeInTheDocument();
  });

  it('should not render when technologies is null', () => {
    render(<TechnologiesHome technologies={null as any} link="/technologies" />);

    expect(screen.queryByText('Technologies:')).not.toBeInTheDocument();
  });

  it('should render only first 4 technologies', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
  });

  it('should render "+1" link when there are more than 4 technologies', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    const moreLink = screen.getByText('+1');
    expect(moreLink).toBeInTheDocument();
    expect(moreLink).toHaveAttribute('href', '/technologies');
  });

  it('should not render "+" link when there are 4 or fewer technologies', () => {
    const fourTechnologies = mockTechnologies.slice(0, 4);
    render(<TechnologiesHome technologies={fourTechnologies} link="/technologies" />);

    expect(screen.queryByText('+1')).not.toBeInTheDocument();
  });

  it('should render technology logos when available', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(4); // Only first 4 technologies
  });

  it('should have correct styling for technologies label', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    const label = screen.getByText('Technologies:');
    expect(label).toHaveClass('text-text-accent', 'text-xs', 'mb-2', 'font-medium');
  });

  it('should have correct styling for individual technology items', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    const reactItem = screen.getByText('React').closest('div');
    expect(reactItem).toHaveClass(
      'flex',
      'items-center',
      'gap-1',
      'bg-white/5',
      'hover:bg-white/10',
      'px-2',
      'py-1',
      'rounded-md',
      'transition-colors',
      'border',
      'border-white/5',
    );
  });

  it('should have correct styling for the more link', () => {
    render(<TechnologiesHome technologies={mockTechnologies} link="/technologies" />);

    const moreLink = screen.getByText('+1');
    expect(moreLink).toHaveClass(
      'text-xs',
      'text-gray-400',
      'px-2',
      'py-1',
      'bg-white/5',
      'rounded-md',
      'border',
      'border-white/5',
    );
  });

  it('should handle single technology', () => {
    render(<TechnologiesHome technologies={[mockTechnologies[0]]} link="/technologies" />);

    expect(screen.getByText('Technologies:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
    expect(screen.queryByText('+1')).not.toBeInTheDocument();
  });
});

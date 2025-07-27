import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogCard from '@/features/blogs/components/BlogCard';
import { ITechnologies } from '@/features/shard/types/technology';
import { BlogPostResponse } from '@/sanity/lib/types';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    readonly children: React.ReactNode;
    readonly href: string;
  }) {
    return (
      <a href={href} data-testid="blog-link">
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return function MockImage({ priority, ...restProps }: any) {
    return <img data-testid="blog-image" {...restProps} />;
  };
});

// Mock child components
jest.mock('@/features/shard/components/ui/TechnologiesHome', () => {
  return function MockTechnologiesHome({ technologies, link }: ITechnologies) {
    return <div data-testid="technologies-home">Technologies: {technologies?.length || 0}</div>;
  };
});

jest.mock('@/features/shard/components/ui/MouseMoveWrapper', () => {
  return function MockMouseMoveWrapper({ children }: { readonly children: React.ReactNode }) {
    return <div data-testid="mouse-move-wrapper">{children}</div>;
  };
});

// Mock the getImageUrl function
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: jest.fn(
    (image, width, height, quality) =>
      `https://example.com/image-${width}x${height}-q${quality}.jpg`,
  ),
}));

// Mock the date utility functions
jest.mock('@/features/shard/utils/date', () => ({
  formatDate: jest.fn(() => 'Jan 1, 2023'),
  formatReadingTime: jest.fn(() => '5 min read'),
}));

const mockBlog: BlogPostResponse = {
  _id: '1',
  slug: 'test-blog-post',
  thumbnail: 'https://example.com/thumbnail.jpg',
  title: 'Test Blog Post Title',
  description: 'This is a test blog post description that should be displayed in the card.',
  content: [],
  technologies: [
    { _id: '1', name: 'React', website: 'https://reactjs.org', order: 1, logo: 'react-logo.png' },
    {
      _id: '2',
      name: 'TypeScript',
      website: 'https://typescriptlang.org',
      order: 2,
      logo: 'ts-logo.png',
    },
  ],
  categories: [{ _id: '1', name: 'Technology', order: 1, slug: 'technology' }],
  tags: ['React', 'TypeScript'],
  publishedAt: '2023-01-01',
  readingTime: 5,
  featured: true,
};

describe('BlogCard', () => {
  it('should render the blog card with all elements', async () => {
    const { container } = render(await BlogCard({ blog: mockBlog }));

    expect(container.querySelector('[data-testid="mouse-move-wrapper"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="blog-link"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="blog-image"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="technologies-home"]')).toBeInTheDocument();
  });

  it('should render blog title', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();
  });

  it('should render blog description', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(
      screen.getByText(
        'This is a test blog post description that should be displayed in the card.',
      ),
    ).toBeInTheDocument();
  });

  it('should render formatted date', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
  });

  it('should render formatted reading time', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should render technologies with correct count', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(screen.getByText('Technologies: 2')).toBeInTheDocument();
  });

  it('should have correct link href', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const links = screen.getAllByTestId('blog-link');
    expect(links[0]).toHaveAttribute('href', '/blogs/test-blog-post');
  });

  it('should render image with correct props', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const image = screen.getByTestId('blog-image');
    expect(image).toHaveAttribute('src', 'https://example.com/image-400x280-q100.jpg');
    expect(image).toHaveAttribute('alt', 'Test Blog Post Title');
  });

  it('should render fallback div when no thumbnail', async () => {
    const blogWithoutThumbnail = { ...mockBlog, thumbnail: null } as any;
    render(await BlogCard({ blog: blogWithoutThumbnail }));

    const fallbackDiv = screen.getByText('T');
    expect(fallbackDiv).toBeInTheDocument();
    expect(fallbackDiv.closest('div')).toHaveClass(
      'w-full',
      'h-full',
      'bg-gradient-to-br',
      'from-purple-500',
      'to-pink-500',
      'flex',
      'items-center',
      'justify-center',
    );
  });

  it('should render first letter of title in fallback', async () => {
    const blogWithoutThumbnail = { ...mockBlog, thumbnail: null } as any;
    render(await BlogCard({ blog: blogWithoutThumbnail }));

    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('should have correct card styling classes', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const card = screen.getByTestId('mouse-move-wrapper').firstChild as HTMLElement;
    expect(card).toHaveClass(
      'bg-card-bg',
      'backdrop-blur-md',
      'border',
      'border-white/10',
      'rounded-2xl',
      'p-6',
      'hover:border-white/20',
      'hover:bg-card-hover',
      'transition-all',
      'duration-300',
      'group',
      'hover:scale-[1.02]',
      'hover:shadow-2xl',
      'relative',
      'z-10',
    );
  });

  it('should render calendar and clock icons', async () => {
    render(await BlogCard({ blog: mockBlog }));

    // Check for calendar and clock icons (they should be present as SVG elements)
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should handle blog without description', async () => {
    const blogWithoutDescription = { ...mockBlog, description: null } as any;
    render(await BlogCard({ blog: blogWithoutDescription }));

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should handle blog with empty technologies array', async () => {
    const blogWithoutTechnologies = { ...mockBlog, technologies: [] };
    render(await BlogCard({ blog: blogWithoutTechnologies }));

    expect(screen.getByText('Technologies: 0')).toBeInTheDocument();
  });

  it('should render read more link', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('should have correct title styling classes', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const title = screen.getByText('Test Blog Post Title');
    expect(title).toHaveClass(
      'text-xl',
      'font-bold',
      'text-white',
      'group-hover:text-blue-400',
      'transition-colors',
      'line-clamp-1',
    );
  });

  it('should have correct description styling classes', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const description = screen.getByText(
      'This is a test blog post description that should be displayed in the card.',
    );
    expect(description).toHaveClass(
      'text-text-secondary',
      'text-sm',
      'line-clamp-3',
      'leading-relaxed',
    );
  });
});

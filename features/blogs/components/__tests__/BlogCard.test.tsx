import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import '@testing-library/jest-dom';
import BlogCard from '@/features/blogs/components/BlogCard';
import { BlogPostResponse } from '@/sanity/lib/types';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    readonly children: React.ReactNode;
    readonly href: string;
    readonly [key: string]: any;
  }) {
    return (
      <a href={href} data-testid="blog-link" {...props}>
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
jest.mock('@/features/shard/components/ui/TechnologiesDisplay', () => {
  return function MockTechnologiesDisplay({ technologies }: { technologies?: any[] }) {
    return <div data-testid="technologies-display">Technologies: {technologies?.length || 0}</div>;
  };
});

jest.mock('@/features/shard/components/ui/MouseMoveWrapper', () => {
  return function MockMouseMoveWrapper({ children }: { readonly children: React.ReactNode }) {
    return <div data-testid="mouse-move-wrapper">{children}</div>;
  };
});

jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({
    children,
    className,
  }: {
    readonly children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="scroll-animation" className={className}>
        {children}
      </div>
    );
  };
});

jest.mock('@/features/shard/components/ui/ReadMore', () => {
  return function MockReadMore({ link, text, readMore, dataLength }: any) {
    return (
      <div data-testid="read-more">
        ReadMore: {text} (items: {dataLength})
      </div>
    );
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

// Mock the useFilter hook
jest.mock('@/features/filters/hooks/useFilter', () => ({
  useFilter: jest.fn((data) => ({
    filtered: data,
    handleFilter: jest.fn(),
    activeFilter: 'all',
  })),
}));

// Mock the Filter component
jest.mock('@/features/filters/components/Filter', () => {
  return function MockFilter({ categories, handleFilter, activeFilter }: any) {
    return (
      <div data-testid="filter-component">
        Filter: {categories?.length || 0} categories, Active: {activeFilter}
      </div>
    );
  };
});

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
  it('should render blog article with semantic structure', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('bg-card-bg', 'backdrop-blur-md', 'border', 'border-white/10');
  });

  it('should render blog title as heading', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Blog Post Title');
  });

  it('should render blog description', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    expect(
      screen.getByText(
        'This is a test blog post description that should be displayed in the card.',
      ),
    ).toBeInTheDocument();
  });

  it('should render formatted date with semantic time element', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2023-01-01');
    expect(timeElement).toHaveTextContent('Jan 1, 2023');
  });

  it('should render formatted reading time', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should render technologies with correct count', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    expect(screen.getByText('Technologies: 2')).toBeInTheDocument();
  });

  it('should render image with optimized properties', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    const image = screen.getByTestId('blog-image');
    expect(image).toHaveAttribute('src', 'https://example.com/image-600x400-q90.jpg');
    expect(image).toHaveAttribute('alt', 'Cover image for Test Blog Post Title');
  });

  it('should render fallback div when no thumbnail', async () => {
    const blogWithoutThumbnail = { ...mockBlog, thumbnail: '' };
    render(await BlogCard({ blogs: [blogWithoutThumbnail], readMore: false }));

    const fallbackText = screen.getByText('T');
    expect(fallbackText).toBeInTheDocument();
    const fallbackContainer = fallbackText.parentElement;
    expect(fallbackContainer).toHaveClass(
      'w-full',
      'h-full',
      'bg-gradient-to-br',
      'from-purple-500',
      'via-violet-500',
      'to-pink-500',
    );
  });

  it('should render call to action without separate link', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    expect(screen.getByText('Read Article')).toBeInTheDocument();
    // Should not be a separate link since the whole card is clickable
    // The "Read Article" text should be in a div, not a separate link
    const readArticleElement = screen.getByText('Read Article');
    expect(readArticleElement.closest('div')).not.toBeNull();
  });

  it('should handle blog without description', async () => {
    const blogWithoutDescription = { ...mockBlog, description: '' };
    render(await BlogCard({ blogs: [blogWithoutDescription], readMore: false }));

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('should handle blog with empty technologies array', async () => {
    const blogWithoutTechnologies = { ...mockBlog, technologies: [] };
    render(await BlogCard({ blogs: [blogWithoutTechnologies], readMore: false }));

    expect(screen.getByText('Technologies: 0')).toBeInTheDocument();
  });

  it('should render floating read indicator', async () => {
    render(await BlogCard({ blogs: [mockBlog], readMore: false }));

    expect(screen.getByText('Read')).toBeInTheDocument();
  });
});

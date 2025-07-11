import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogCard from '@/components/Blogs/BlogCard';
import { ITechnologies } from '@/utils/types/technology';
import { ISeeBlogButton } from '@/utils/types/blog';
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
interface IMockImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority: Boolean;
}
jest.mock('next/image', () => {
  // { src, alt, width, height, className, priority }
  return function MockImage({ priority, ...restProps }: any) {
    return <img data-testid="blog-image" {...restProps} />;
  };
});

// Mock child components
jest.mock('@/components/ui/TechnologiesHome', () => {
  return function MockTechnologiesHome({ technologies, link }: ITechnologies) {
    return <div data-testid="technologies-home">Technologies: {technologies?.length || 0}</div>;
  };
});

jest.mock('@/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({
    children,
    className,
  }: {
    readonly children: React.ReactNode;
    readonly className: string;
  }) {
    return (
      <div data-testid="scroll-animation" className={className}>
        {children}
      </div>
    );
  };
});

jest.mock('@/components/ui/MouseMoveWrapper', () => {
  return function MockMouseMoveWrapper({ children }: { readonly children: React.ReactNode }) {
    return <div data-testid="mouse-move-wrapper">{children}</div>;
  };
});

jest.mock('@/components/Blogs/Features/SeeBlogButton', () => {
  return function MockSeeBlogButton({ slug }: ISeeBlogButton) {
    return <button data-testid="see-blog-button">See blog</button>;
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
jest.mock('@/utils/date', () => ({
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
  publishedAt: '2023-01-01',
  readingTime: 5,
  featured: false,
};

describe('BlogCard', () => {
  it('should render the blog card with all elements', async () => {
    const { container } = render(await BlogCard({ blog: mockBlog }));

    expect(container.querySelector('[data-testid="mouse-move-wrapper"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="scroll-animation"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="blog-link"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="blog-image"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="technologies-home"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="see-blog-button"]')).toBeInTheDocument();
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

    expect(screen.getByTestId('technologies-home')).toHaveTextContent('Technologies: 2');
  });

  it('should have correct link href', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const link = screen.getByTestId('blog-link');
    expect(link).toHaveAttribute('href', 'blogs/test-blog-post');
  });

  it('should render image with correct props', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const image = screen.getByTestId('blog-image');
    expect(image).toHaveAttribute('src', 'https://example.com/image-200x140-q100.jpg');
    expect(image).toHaveAttribute('alt', 'Test Blog Post Title');
    expect(image).toHaveAttribute('width', '200');
    expect(image).toHaveAttribute('height', '140');
    expect(image).toHaveClass('object-cover', 'w-full', 'h-48');
  });

  it('should render fallback div when no thumbnail', async () => {
    const blogWithoutThumbnail = { ...mockBlog, thumbnail: null } as unknown as BlogPostResponse;
    render(await BlogCard({ blog: blogWithoutThumbnail }));

    const fallbackDiv = screen.getByText('T');
    expect(fallbackDiv).toBeInTheDocument();
    expect(fallbackDiv.closest('div')).toHaveClass(
      'w-full',
      'h-48',
      'bg-gradient-to-br',
      'from-purple-500',
      'to-pink-500',
    );
  });

  it('should render first letter of title in fallback', async () => {
    const blogWithoutThumbnail = { ...mockBlog, thumbnail: null } as unknown as BlogPostResponse;
    render(await BlogCard({ blog: blogWithoutThumbnail }));

    expect(screen.getByText('T')).toBeInTheDocument();
  });

  it('should have correct card styling classes', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const card = screen.getByTestId('scroll-animation');
    expect(card).toHaveClass(
      'bg-card-bg',
      'backdrop-blur-md',
      'border',
      'border-white/20',
      'rounded-xl',
      'overflow-hidden',
      'hover:bg-card-hover',
      'transition',
    );
  });

  it('should render calendar and clock icons', async () => {
    render(await BlogCard({ blog: mockBlog }));

    // Check for calendar icon (SVG)
    const calendarIcon = screen.getByText('Jan 1, 2023').previousElementSibling;
    expect(calendarIcon).toBeInTheDocument();

    // Check for clock icon (SVG)
    const clockIcon = screen.getByText('5 min read').previousElementSibling;
    expect(clockIcon).toBeInTheDocument();
  });

  it('should handle blog without description', async () => {
    const blogWithoutDescription = {
      ...mockBlog,
      description: null,
    } as unknown as BlogPostResponse;
    render(await BlogCard({ blog: blogWithoutDescription }));

    expect(
      screen.queryByText(
        'This is a test blog post description that should be displayed in the card.',
      ),
    ).not.toBeInTheDocument();
  });

  it('should handle blog with empty technologies array', async () => {
    const blogWithoutTechnologies = { ...mockBlog, technologies: [] };
    render(await BlogCard({ blog: blogWithoutTechnologies }));

    expect(screen.getByTestId('technologies-home')).toHaveTextContent('Technologies: 0');
  });

  it('should render see blog button', async () => {
    render(await BlogCard({ blog: mockBlog }));

    expect(screen.getByTestId('see-blog-button')).toBeInTheDocument();
    expect(screen.getByText('See blog')).toBeInTheDocument();
  });

  it('should have correct title styling classes', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const title = screen.getByText('Test Blog Post Title');
    expect(title).toHaveClass(
      'text-xl',
      'font-bold',
      'text-white',
      'mb-1',
      'group-hover:text-blue-400',
      'transition-colors',
      'line-clamp-1',
      'capitalize',
    );
  });

  it('should have correct description styling classes', async () => {
    render(await BlogCard({ blog: mockBlog }));

    const description = screen.getByText(
      'This is a test blog post description that should be displayed in the card.',
    );
    expect(description).toHaveClass('text-text-secondary', 'text-sm', 'mb-4', 'line-clamp-3');
  });
});

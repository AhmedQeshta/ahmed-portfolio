import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogGrid from '@/features/blogs/components/BlogGrid';

// Mock the sanity client and queries
jest.mock('@/sanity/lib/client', () => ({
  sanityFetch: jest.fn(),
}));

jest.mock('@/sanity/lib/queries', () => ({
  blogPostsQuery: 'mock-query',
}));

// Mock child components
jest.mock('@/features/blogs/components/BlogCard', () => {
  return function MockBlogCard({ blog }: any) {
    return <div data-testid="blog-card">Blog: {blog.title}</div>;
  };
});

jest.mock('@/features/shard/components/ui/ReadMore', () => {
  return function MockReadMore({ link, text }: any) {
    return <div data-testid="read-more">{text}</div>;
  };
});

jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({ children, className }: any) {
    return (
      <div data-testid="scroll-animation" className={className}>
        {children}
      </div>
    );
  };
});

jest.mock('@/features/shard/components/ui/ErrorHandle', () => {
  return function MockErrorHandle({ id, title, description }: any) {
    return <div data-testid="error-handle">{description}</div>;
  };
});

const mockBlogs = [
  {
    _id: '1',
    title: 'React Blog Post',
    slug: 'react-blog-post',
    description: 'A blog post about React',
    content: [],
    technologies: [
      { _id: '1', name: 'React', website: 'https://reactjs.org', order: 1, logo: 'react-logo.png' },
    ],
    categories: [{ _id: '1', name: 'Frontend', order: 1, slug: 'frontend' }],
    publishedAt: '2023-01-01',
    readingTime: 5,
    featured: false,
    thumbnail: 'https://example.com/image1.jpg',
    tags: ['react', 'frontend'],
  },
  {
    _id: '2',
    title: 'TypeScript Blog Post',
    slug: 'typescript-blog-post',
    description: 'A blog post about TypeScript',
    content: [],
    technologies: [
      {
        _id: '2',
        name: 'TypeScript',
        website: 'https://typescriptlang.org',
        order: 2,
        logo: 'ts-logo.png',
      },
    ],
    categories: [{ _id: '2', name: 'Backend', order: 2, slug: 'backend' }],
    publishedAt: '2023-01-02',
    readingTime: 7,
    featured: true,
    thumbnail: 'https://example.com/image2.jpg',
    tags: ['typescript', 'backend'],
  },
  {
    _id: '3',
    title: 'Next.js Blog Post',
    slug: 'nextjs-blog-post',
    description: 'A blog post about Next.js',
    content: [],
    technologies: [
      {
        _id: '3',
        name: 'Next.js',
        website: 'https://nextjs.org',
        order: 3,
        logo: 'nextjs-logo.png',
      },
    ],
    categories: [{ _id: '3', name: 'Full Stack', order: 3, slug: 'full-stack' }],
    publishedAt: '2023-01-03',
    readingTime: 10,
    featured: false,
    thumbnail: 'https://example.com/image3.jpg',
    tags: ['nextjs', 'fullstack'],
  },
];

describe('BlogGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error after each test
    jest.restoreAllMocks();
  });

  it('should render blog grid with all blogs when no query is provided', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getByTestId('read-more')).toBeInTheDocument();
    expect(screen.getByText('View All Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(3);
    expect(screen.getByText('Blog: React Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Blog: TypeScript Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Blog: Next.js Blog Post')).toBeInTheDocument();
  });

  it('should render blog grid without read more when readMore is false', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: false }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.queryByTestId('read-more')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(3);
  });

  it('should filter blogs by title when query is provided', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true, query: 'React' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
    expect(screen.getByText('Blog: React Blog Post')).toBeInTheDocument();
    expect(screen.queryByText('Blog: TypeScript Blog Post')).not.toBeInTheDocument();
    expect(screen.queryByText('Blog: Next.js Blog Post')).not.toBeInTheDocument();
  });

  it('should filter blogs by description when query is provided', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true, query: 'TypeScript' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
    expect(screen.getByText('Blog: TypeScript Blog Post')).toBeInTheDocument();
  });

  it('should filter blogs by tags when query is provided', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true, query: 'frontend' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
    expect(screen.getByText('Blog: React Blog Post')).toBeInTheDocument();
  });

  it('should filter blogs by categories when query is provided', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true, query: 'Full Stack' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
    expect(screen.getByText('Blog: Next.js Blog Post')).toBeInTheDocument();
  });

  it('should show no blogs found message when no blogs match query', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true, query: 'NonExistent' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getByText('No blogs found.')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-card')).not.toBeInTheDocument();
  });

  it('should show no blogs found message when blogs array is empty', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue([]);

    render(await BlogGrid({ readMore: true }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getByText('No blogs found.')).toBeInTheDocument();
    expect(screen.queryByTestId('blog-card')).not.toBeInTheDocument();
  });

  it('should handle case-insensitive search', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true, query: 'react' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
    expect(screen.getByText('Blog: React Blog Post')).toBeInTheDocument();
  });

  it('should render error component when fetch fails', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockRejectedValue(new Error('Fetch failed'));

    render(await BlogGrid({ readMore: true }));

    expect(screen.getByTestId('error-handle')).toBeInTheDocument();
    expect(screen.getByText('Failed to load Blogs. Please try again later.')).toBeInTheDocument();
  });

  it('should have correct section styling', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true }));

    const section = screen.getByText('Blogs').closest('section');
    expect(section).toHaveClass('py-10');
    expect(section).toHaveAttribute('id', 'blogs');
  });

  it('should have correct container styling', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true }));

    const container = screen.getByText('Blogs').closest('div');
    expect(container).toHaveClass('mx-auto', 'max-w-7xl', 'px-5', 'sm:px-7', 'lg:px-10');
  });

  it('should have correct heading styling', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true }));

    const heading = screen.getByText('Blogs');
    expect(heading).toHaveClass('text-3xl', 'font-semibold', 'mb-8', 'gradient-text');
  });

  it('should render scroll animations for blog cards', async () => {
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(mockBlogs);

    render(await BlogGrid({ readMore: true }));

    const scrollAnimations = screen.getAllByTestId('scroll-animation');
    expect(scrollAnimations.length).toBeGreaterThan(0);
  });

  it('should handle blogs without tags gracefully', async () => {
    const blogsWithoutTags = mockBlogs.map((blog) => ({ ...blog, tags: undefined }));
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(blogsWithoutTags);

    render(await BlogGrid({ readMore: true, query: 'react' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
  });

  it('should handle blogs without categories gracefully', async () => {
    const blogsWithoutCategories = mockBlogs.map((blog) => ({ ...blog, categories: undefined }));
    const { sanityFetch } = require('@/sanity/lib/client');
    sanityFetch.mockResolvedValue(blogsWithoutCategories);

    render(await BlogGrid({ readMore: true, query: 'react' }));

    expect(screen.getByText('Blogs')).toBeInTheDocument();
    expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
  });
});

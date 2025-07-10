import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '@/components/Blogs/Blog';
import { ITechnologies } from '@/utils/types/technology';
import { ILinkNavigation, IShareCard, ITags } from '@/utils/types/common';
import { IBlog, ILatestBlogs, IRelatedBlogs } from '@/utils/types/blog';
import { BlogPostResponse } from '@/sanity/lib/types';

// Mock all child components
jest.mock('@/components/ui/Technologies', () => {
  return function MockTechnologies({ technologies }: ITechnologies) {
    return <div data-testid="technologies">Technologies: {technologies?.length || 0}</div>;
  };
});

jest.mock('@/components/ui/Tags', () => {
  return function MockTags({ tags }: ITags) {
    return <div data-testid="tags">Tags: {tags?.length || 0}</div>;
  };
});

jest.mock('@/components/ui/ShareCard', () => {
  return function MockShareCard({ url, title }: IShareCard) {
    return <div data-testid="share-card">Share: {title}</div>;
  };
});

jest.mock('@/components/Blogs/Features/LatestBlogs', () => {
  return function MockLatestBlogs({ latestBlogs }: ILatestBlogs) {
    return <div data-testid="latest-blogs">Latest: {latestBlogs?.length || 0}</div>;
  };
});

jest.mock('@/components/Blogs/Features/RelatedBlogs', () => {
  return function MockRelatedBlogs({ relatedBlogs }: IRelatedBlogs) {
    return <div data-testid="related-blogs">Related: {relatedBlogs?.length || 0}</div>;
  };
});

jest.mock('@/components/Blogs/Features/PostDetails', () => {
  return function MockPostDetails({ blog }: IBlog) {
    return <div data-testid="post-details">Post Details: {blog.title}</div>;
  };
});

jest.mock('@/components/Blogs/Features/HeroBlog', () => {
  return function MockHeroBlog({ blog }: IBlog) {
    return <div data-testid="hero-blog">Hero: {blog.title}</div>;
  };
});

jest.mock('@/components/Blogs/Features/BlogContent', () => {
  return function MockBlogContent({ blog }: IBlog) {
    return <div data-testid="blog-content">Content: {blog.title}</div>;
  };
});

jest.mock('@/components/ui/NavigationHeader', () => {
  return function MockNavigationHeader({ link, text }: ILinkNavigation) {
    return <div data-testid="navigation-header">{text}</div>;
  };
});

jest.mock('@/components/ui/BackgroundEffects', () => {
  return function MockBackgroundEffects() {
    return <div data-testid="background-effects">Background Effects</div>;
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

// Mock environment variable
const originalEnv = process.env;
beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
});

afterAll(() => {
  process.env = originalEnv;
});

const mockBlog: BlogPostResponse = {
  _id: '1',
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  description: 'This is a test blog post description',
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
  tags: ['web', 'development'],
  categories: [{ _id: '1', name: 'Technology', order: 1, slug: 'technology' }],
  publishedAt: '2023-01-01',
  readingTime: 5,
  featured: false,
  thumbnail: 'https://example.com/image.jpg',
};

const mockLatestBlogs = [
  { ...mockBlog, _id: '2', title: 'Latest Blog 1' },
  { ...mockBlog, _id: '3', title: 'Latest Blog 2' },
];

const mockRelatedBlogs = [
  { ...mockBlog, _id: '4', title: 'Related Blog 1' },
  { ...mockBlog, _id: '5', title: 'Related Blog 2' },
];

describe('Blog', () => {
  it('should render the blog component with all sections', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    // Check main sections
    expect(screen.getByTestId('navigation-header')).toBeInTheDocument();
    expect(screen.getByTestId('hero-blog')).toBeInTheDocument();
    expect(screen.getByTestId('blog-content')).toBeInTheDocument();
    expect(screen.getByTestId('technologies')).toBeInTheDocument();
    expect(screen.getByTestId('tags')).toBeInTheDocument();
    expect(screen.getByTestId('share-card')).toBeInTheDocument();
    expect(screen.getByTestId('latest-blogs')).toBeInTheDocument();
    expect(screen.getByTestId('related-blogs')).toBeInTheDocument();
    expect(screen.getByTestId('post-details')).toBeInTheDocument();
    expect(screen.getByTestId('background-effects')).toBeInTheDocument();
  });

  it('should render navigation header with correct props', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('navigation-header')).toHaveTextContent('Back to Blogs');
  });

  it('should render hero blog with blog data', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('hero-blog')).toHaveTextContent('Hero: Test Blog Post');
  });

  it('should render blog content with blog data', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('blog-content')).toHaveTextContent('Content: Test Blog Post');
  });

  it('should render technologies with correct count', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('technologies')).toHaveTextContent('Technologies: 2');
  });

  it('should render tags with correct count', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('tags')).toHaveTextContent('Tags: 2');
  });

  it('should render share card with blog title', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('share-card')).toHaveTextContent('Share: Test Blog Post');
  });

  it('should render latest blogs with correct count', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('latest-blogs')).toHaveTextContent('Latest: 2');
  });

  it('should render related blogs with correct count', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('related-blogs')).toHaveTextContent('Related: 2');
  });

  it('should render post details with blog title', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByTestId('post-details')).toHaveTextContent('Post Details: Test Blog Post');
  });

  it('should render blog description in scroll animation', () => {
    render(<Blog blog={mockBlog} latestBlogs={mockLatestBlogs} relatedBlogs={mockRelatedBlogs} />);

    expect(screen.getByText('This is a test blog post description')).toBeInTheDocument();
  });

  it('should handle empty arrays gracefully', () => {
    const blogWithEmptyArrays = {
      ...mockBlog,
      technologies: [],
      tags: [],
    };

    render(<Blog blog={blogWithEmptyArrays} latestBlogs={[]} relatedBlogs={[]} />);

    expect(screen.getByTestId('technologies')).toHaveTextContent('Technologies: 0');
    expect(screen.getByTestId('tags')).toHaveTextContent('Tags: 0');
    expect(screen.getByTestId('latest-blogs')).toHaveTextContent('Latest: 0');
    expect(screen.getByTestId('related-blogs')).toHaveTextContent('Related: 0');
  });
});

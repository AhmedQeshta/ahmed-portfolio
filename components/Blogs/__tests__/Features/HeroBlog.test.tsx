import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroBlog from '@/components/Blogs/Features/HeroBlog';

// Mock ScrollAnimation
jest.mock('@/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({ children, className }: any) {
    return (
      <div data-testid="scroll-animation" className={className}>
        {children}
      </div>
    );
  };
});

// Mock Image
jest.mock('next/image', () => {
  return function MockImage(props: any) {
    return <img data-testid="hero-image" {...props} />;
  };
});

// Mock date utils
jest.mock('@/utils/date', () => ({
  formatDate: () => 'Jan 1, 2023',
  formatReadingTime: () => '5 min read',
}));

describe('HeroBlog', () => {
  const mockBlog = {
    _id: '1',
    title: 'Test Blog',
    slug: 'test-blog',
    description: 'desc',
    content: [],
    thumbnail: 'img.jpg',
    technologies: [],
    categories: [
      { _id: 'cat1', name: 'Tech', order: 1, slug: 'tech' },
      { _id: 'cat2', name: 'News', order: 2, slug: 'news' },
    ],
    publishedAt: '2023-01-01',
    readingTime: 5,
    featured: true,
  };

  it('renders nothing if no blog is provided', () => {
    const { container } = render(<HeroBlog blog={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders image, title, categories, and meta info', () => {
    render(<HeroBlog blog={mockBlog as any} />);
    expect(screen.getByTestId('hero-image')).toBeInTheDocument();
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
  });

  it('renders without categories and featured', () => {
    const blog = { ...mockBlog, categories: undefined, featured: false };
    render(<HeroBlog blog={blog as any} />);
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
  });
});

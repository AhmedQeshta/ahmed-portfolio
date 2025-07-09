import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostDetails from '../../Features/PostDetails';

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

// Mock date utils
jest.mock('@/utils/date', () => ({
  formatDate: () => 'Jan 1, 2023',
  formatReadingTime: () => '5 min read',
}));

describe('PostDetails', () => {
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
    tags: ['tag1', 'tag2'],
    publishedAt: '2023-01-01',
    readingTime: 5,
    featured: false,
  };

  it('renders nothing if no blog is provided', () => {
    const { container } = render(<PostDetails blog={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders post details with meta info, categories, and tags', () => {
    render(<PostDetails blog={mockBlog as any} />);
    expect(screen.getByText('Post Details')).toBeInTheDocument();
    expect(screen.getByText('Jan 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('Categories:')).toBeInTheDocument();
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getAllByTestId('scroll-animation').length).toBeGreaterThan(0);
  });

  it('renders without categories and tags', () => {
    const blog = { ...mockBlog, categories: undefined, tags: undefined };
    render(<PostDetails blog={blog as any} />);
    expect(screen.getByText('Post Details')).toBeInTheDocument();
    expect(screen.queryByText('Categories:')).not.toBeInTheDocument();
    expect(screen.queryByText('Tags:')).not.toBeInTheDocument();
  });
});

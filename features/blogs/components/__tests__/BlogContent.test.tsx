import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogContent from '@/features/blogs/components/ui/BlogContent';
import { BlogPostResponse } from '@/sanity/lib/types';

// Mock ScrollAnimation
jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
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

// Mock PortableText
jest.mock('@portabletext/react', () => ({
  PortableText: ({ value }: any) => <div data-testid="portable-text">{JSON.stringify(value)}</div>,
}));

describe('BlogContent', () => {
  const mockBlog: BlogPostResponse = {
    _id: '1',
    title: 'Test Blog',
    slug: 'test-blog',
    description: 'desc',
    content: [{ _type: 'block', children: [{ text: 'Hello world' }] }],
    thumbnail: 'img.jpg',
    technologies: [],
    categories: [],
    publishedAt: '2023-01-01',
    readingTime: 5,
    featured: false,
  };

  it('renders nothing if no blog is provided', () => {
    const { container } = render(<BlogContent blog={null as unknown as BlogPostResponse} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders ScrollAnimation wrappers and PortableText', () => {
    render(<BlogContent blog={mockBlog} />);
    expect(screen.getAllByTestId('scroll-animation').length).toBeGreaterThan(0);
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
    expect(screen.getByTestId('portable-text')).toHaveTextContent('Hello world');
  });
});

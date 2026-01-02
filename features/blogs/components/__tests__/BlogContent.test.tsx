import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import '@testing-library/jest-dom';
import BlogContent from '@/features/blogs/components/ui/BlogContent';
import { BlogPostResponse } from '@/sanity/lib/types';


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

  it('renders PortableText', () => {
    render(<BlogContent blog={mockBlog} />);
    expect(screen.getByTestId('portable-text')).toBeInTheDocument();
    expect(screen.getByTestId('portable-text')).toHaveTextContent('Hello world');
  });
});

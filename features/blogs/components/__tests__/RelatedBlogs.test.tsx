import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import '@testing-library/jest-dom';
import RelatedBlogs from '@/features/blogs/components/ui/RelatedBlogs';
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

// Mock Image
jest.mock('next/image', () => {
  return function MockImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img data-testid="related-image" {...props} />;
  };
});

// Mock Link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    readonly children: React.ReactNode;
    href: string;
  }) {
    return (
      <a href={href} data-testid="related-link">
        {children}
      </a>
    );
  };
});

// Mock getImageUrl
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (src: string) => src,
}));

// Mock date utils
jest.mock('@/features/shard/utils/date', () => ({
  formatReadingTime: () => '5 min read',
}));

describe('RelatedBlogs', () => {
  const mockBlogs: BlogPostResponse[] = [
    {
      _id: '1',
      slug: 'blog-1',
      thumbnail: 'img1.jpg',
      title: 'Blog 1',
      readingTime: 5,
      content: [],
      technologies: [],
      categories: [],
      publishedAt: '2023-01-01',
      featured: false,
      description: '',
    },
    {
      _id: '2',
      slug: 'blog-2',
      thumbnail: 'img2.jpg',
      title: 'Blog 2',
      readingTime: 5,
      content: [],
      technologies: [],
      categories: [],
      publishedAt: '2023-01-02',
      featured: false,
      description: '',
    },
  ];

  it('renders nothing if no blogs are provided', () => {
    const { container } = render(<RelatedBlogs relatedBlogs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders related blogs with links and images', () => {
    render(<RelatedBlogs relatedBlogs={mockBlogs} />);
    expect(screen.getByText('Related Posts')).toBeInTheDocument();
    expect(screen.getAllByTestId('related-link').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('related-image').length).toBeGreaterThan(0);
    expect(screen.getByText('Blog 1')).toBeInTheDocument();
    expect(screen.getByText('Blog 2')).toBeInTheDocument();
    expect(screen.getAllByText('5 min read').length).toBeGreaterThan(0);
  });
});

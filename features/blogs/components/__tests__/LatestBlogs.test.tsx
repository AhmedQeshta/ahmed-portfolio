import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import '@testing-library/jest-dom';
import LatestBlogs from '@/features/blogs/components/ui/LatestBlogs';
import { BlogPostResponse } from '@/sanity/lib/types';

// Mock Image
jest.mock('next/image', () => {
  return function MockImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img data-testid="latest-image" {...props} />;
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
      <a href={href} data-testid="latest-link">
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
  formatDate: () => 'Jan 1, 2023',
}));

describe('LatestBlogs', () => {
  const mockBlogs: BlogPostResponse[] = [
    {
      _id: '1',
      slug: 'blog-1',
      thumbnail: 'img1.jpg',
      title: 'Blog 1',
      publishedAt: '2023-01-01',
      content: [],
      technologies: [],
      categories: [],
      readingTime: 5,
      featured: false,
      description: '',
    },
    {
      _id: '2',
      slug: 'blog-2',
      thumbnail: 'img2.jpg',
      title: 'Blog 2',
      publishedAt: '2023-01-02',
      content: [],
      technologies: [],
      categories: [],
      readingTime: 5,
      featured: false,
      description: '',
    },
  ];

  it('renders nothing if no blogs are provided', () => {
    const { container } = render(<LatestBlogs latestBlogs={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders latest blogs with links and images', () => {
    render(<LatestBlogs latestBlogs={mockBlogs} />);
    expect(screen.getByText('Latest Posts')).toBeInTheDocument();
    expect(screen.getAllByTestId('latest-link').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('latest-image').length).toBeGreaterThan(0);
    expect(screen.getByText('Blog 1')).toBeInTheDocument();
    expect(screen.getByText('Blog 2')).toBeInTheDocument();
    expect(screen.getAllByText('Jan 1, 2023').length).toBeGreaterThan(0);
    expect(screen.getByText('View all posts →')).toBeInTheDocument();
  });
});

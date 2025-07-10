import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroBlog from '@/components/Blogs/Features/HeroBlog';
import { BlogPostResponse } from '@/sanity/lib/types';

// Mock ScrollAnimation
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

// Mock Image
jest.mock('next/image', () => {
  return function MockImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img data-testid="hero-image" {...props} />;
  };
});

// Mock date utils
jest.mock('@/utils/date', () => ({
  formatDate: () => 'Jan 1, 2023',
  formatReadingTime: () => '5 min read',
}));

/**
 * make it pass
   PASS  components/Blogs/__tests__/Features/HeroBlog.test.tsx
  ● Console

    console.error
      Received `true` for a non-boolean attribute `fill`.
      
      If you want to write it to the DOM, pass a string instead: fill="true" or fill={value.toString()}.

      122 |
      123 |   it('renders image, title, categories, and meta info', () => {
    > 124 |     render(<HeroBlog blog={mockBlog} />);
          |           ^
      125 |     expect(screen.getByTestId('hero-image')).toBeInTheDocument();
      126 |     expect(screen.getByText('Test Blog')).toBeInTheDocument();
      127 |     expect(screen.getByText('Tech')).toBeInTheDocument();

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3078:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3154:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:17117:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:17741:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:11391:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:1522:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:15268:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:15149:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:14956:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:14936:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:14419:13)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:16216:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:566:34)
      at process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:859:10)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (components/Blogs/__tests__/Features/HeroBlog.test.tsx:124:11)

    console.error
      Received `true` for a non-boolean attribute `priority`.
      
      If you want to write it to the DOM, pass a string instead: priority="true" or priority={value.toString()}.

      122 |
      123 |   it('renders image, title, categories, and meta info', () => {
    > 124 |     render(<HeroBlog blog={mockBlog} />);
          |           ^
      125 |     expect(screen.getByTestId('hero-image')).toBeInTheDocument();
      126 |     expect(screen.getByText('Test Blog')).toBeInTheDocument();
      127 |     expect(screen.getByText('Tech')).toBeInTheDocument();

      at validateProperty (node_modules/react-dom/cjs/react-dom-client.development.js:3078:27)
      at warnUnknownProperties (node_modules/react-dom/cjs/react-dom-client.development.js:3154:9)
      at validatePropertiesInDevelopment (node_modules/react-dom/cjs/react-dom-client.development.js:17117:9)
      at setInitialProperties (node_modules/react-dom/cjs/react-dom-client.development.js:17741:7)
      at completeWork (node_modules/react-dom/cjs/react-dom-client.development.js:11391:18)
      at runWithFiberInDEV (node_modules/react-dom/cjs/react-dom-client.development.js:1522:13)
      at completeUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:15268:19)
      at performUnitOfWork (node_modules/react-dom/cjs/react-dom-client.development.js:15149:11)
      at workLoopSync (node_modules/react-dom/cjs/react-dom-client.development.js:14956:41)
      at renderRootSync (node_modules/react-dom/cjs/react-dom-client.development.js:14936:11)
      at performWorkOnRoot (node_modules/react-dom/cjs/react-dom-client.development.js:14419:13)
      at performWorkOnRootViaSchedulerTask (node_modules/react-dom/cjs/react-dom-client.development.js:16216:7)
      at flushActQueue (node_modules/react/cjs/react.development.js:566:34)
      at process.env.NODE_ENV.exports.act (node_modules/react/cjs/react.development.js:859:10)
      at node_modules/@testing-library/react/dist/act-compat.js:47:25
      at renderRoot (node_modules/@testing-library/react/dist/pure.js:190:26)
      at render (node_modules/@testing-library/react/dist/pure.js:292:10)
      at Object.<anonymous> (components/Blogs/__tests__/Features/HeroBlog.test.tsx:124:11)
 */

describe('HeroBlog', () => {
  const mockBlog: BlogPostResponse = {
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
    const { container } = render(<HeroBlog blog={null as unknown as BlogPostResponse} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders image, title, categories, and meta info', () => {
    render(<HeroBlog blog={mockBlog} />);
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
    render(<HeroBlog blog={blog as unknown as BlogPostResponse} />);
    expect(screen.getByText('Test Blog')).toBeInTheDocument();
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
  });
});

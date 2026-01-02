import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import ReadMore from '@/features/shard/components/ui/ReadMore';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    readonly children: React.ReactNode;
    readonly href: string;
    readonly [key: string]: any;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});


describe('ReadMore', () => {
  it('should render the read more link', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" readMore={true} dataLength={5} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/blog/post-1');
    expect(link).toHaveTextContent('Read More');
  });


  it('should apply correct styling to the link', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" readMore={true} dataLength={5} />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'px-6',
      'py-3',
      'gradient-button-primary',
      'rounded-full',
      'font-semibold',
    );
  });

  it('should render with different link and text', () => {
    render(<ReadMore link="/projects" text="View Project" readMore={true} dataLength={3} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects');
    expect(link).toHaveTextContent('View Project');
  });

  it('should have proper semantic structure', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" readMore={true} dataLength={5} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('should not render when readMore is false', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" readMore={false} dataLength={5} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should not render when dataLength is 0', () => {
    render(<ReadMore link="/blog/post-1" text="Read More" readMore={true} dataLength={0} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

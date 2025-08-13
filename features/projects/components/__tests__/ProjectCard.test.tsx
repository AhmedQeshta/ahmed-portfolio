import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectCard from '@/features/projects/components/ProjectCard';
import { IProjectResponse } from '@/features/projects/types/project';

// Mock Next.js components
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
      <a href={href} data-testid="project-link" {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return function MockImage({ priority, ...restProps }: any) {
    return <img data-testid="project-image" {...restProps} />;
  };
});

// Mock child components
jest.mock('@/features/shard/components/ui/TechnologiesDisplay', () => {
  return function MockTechnologiesDisplay({ technologies }: { technologies?: any[] }) {
    return <div data-testid="technologies-display">Technologies: {technologies?.length || 0}</div>;
  };
});

jest.mock('@/features/shard/components/ui/MouseMoveWrapper', () => {
  return function MockMouseMoveWrapper({ children }: { readonly children: React.ReactNode }) {
    return <div data-testid="mouse-move-wrapper">{children}</div>;
  };
});

jest.mock('@/features/shard/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({
    children,
    className,
  }: {
    readonly children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="scroll-animation" className={className}>
        {children}
      </div>
    );
  };
});

jest.mock('@/features/shard/components/ui/ReadMore', () => {
  return function MockReadMore({ link, text, readMore, dataLength }: any) {
    return (
      <div data-testid="read-more">
        ReadMore: {text} (items: {dataLength})
      </div>
    );
  };
});

// Mock the getImageUrl function
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: jest.fn(
    (image, width, height, quality) =>
      `https://example.com/image-${width}x${height}-q${quality}.jpg`,
  ),
}));

// Mock the date utility functions
jest.mock('@/features/shard/utils/date', () => ({
  formatDateDuration: jest.fn(() => 'Jan 2024 - Mar 2024'),
}));

const mockProject: IProjectResponse['project'] = {
  _id: '2',
  title: 'Test Project Title',
  description: 'This is a test project description that should be displayed in the card.',
  slug: 'test-project',
  screenshot: 'https://example.com/screenshot.png',
  technologies: [
    { _id: 'tech1', name: 'React', logo: 'react.svg', order: 1 },
    { _id: 'tech2', name: 'TypeScript', logo: 'typescript.svg', order: 2 },
  ],
  startDate: '2024-01-01',
  endDate: '2024-03-01',
  liveUrl: 'https://live-demo.com',
  repoUrl: 'https://github.com/example/test',
  fullDescription: [],
  status: 'completed',
  gallery: [],
  categories: [],
  featured: false,
  order: 0,
};

describe('ProjectCard', () => {
  it('should render project article with semantic structure', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('bg-card-bg', 'backdrop-blur-md', 'border', 'border-white/10');
  });

  it('should render project title as heading', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Project Title');
  });

  it('should render project description', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    expect(
      screen.getByText('This is a test project description that should be displayed in the card.'),
    ).toBeInTheDocument();
  });

  it('should render formatted duration with semantic time element', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveTextContent('Jan 2024 - Mar 2024');
  });

  it('should render technologies with correct count', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    expect(screen.getByTestId('technologies-display')).toHaveTextContent('Technologies: 2');
  });

  it('should render image with optimized properties', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    const image = screen.getByTestId('project-image');
    expect(image).toBeInTheDocument();
  });

  it('should render project status badges when URLs are provided', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Open Source')).toBeInTheDocument();
  });

  it('should render fallback div when no screenshot', () => {
    const projectWithoutScreenshot = { ...mockProject, screenshot: '' };
    render(<ProjectCard projects={[projectWithoutScreenshot]} readMore={false} />);

    // The fallback shows the first letter of the title
    const fallbackDiv = screen.getByText('T');
    expect(fallbackDiv).toBeInTheDocument();
  });

  it('should render call to action without separate link', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    const actionText = screen.getByText('View Details');
    expect(actionText).toBeInTheDocument();
  });

  it('should handle project without description', () => {
    const projectWithoutDescription = { ...mockProject, description: '' };
    render(<ProjectCard projects={[projectWithoutDescription]} readMore={false} />);

    expect(screen.queryByText(/this is a test project description/i)).not.toBeInTheDocument();
  });

  it('should handle project with empty technologies array', () => {
    const projectWithoutTech = { ...mockProject, technologies: [] };
    render(<ProjectCard projects={[projectWithoutTech]} readMore={false} />);

    expect(screen.getByTestId('technologies-display')).toHaveTextContent('Technologies: 0');
  });

  it('should render floating view indicator', () => {
    render(<ProjectCard projects={[mockProject]} readMore={false} />);

    // The view indicator shows "View" text
    const viewIndicator = screen.getByText('View');
    expect(viewIndicator).toBeInTheDocument();
  });

  it('should not render status badges when URLs are not provided', () => {
    const projectWithoutUrls = { ...mockProject, liveUrl: undefined, repoUrl: undefined };
    render(<ProjectCard projects={[projectWithoutUrls]} readMore={false} />);

    expect(screen.queryByText('Live')).not.toBeInTheDocument();
    expect(screen.queryByText('Open Source')).not.toBeInTheDocument();
  });
});

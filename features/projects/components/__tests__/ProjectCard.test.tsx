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
  it('should render the project card as a single clickable link', () => {
    const { container } = render(<ProjectCard project={mockProject} />);

    expect(container.querySelector('[data-testid="mouse-move-wrapper"]')).toBeInTheDocument();
    const projectLink = container.querySelector('[data-testid="project-link"]');
    expect(projectLink).toBeInTheDocument();
    expect(projectLink).toHaveAttribute('href', '/projects/test-project');
    expect(projectLink).toHaveAttribute('aria-label', 'View project details: Test Project Title');
  });

  it('should render project article with semantic structure', () => {
    render(<ProjectCard project={mockProject} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('bg-card-bg', 'backdrop-blur-md', 'border', 'border-white/10');
  });

  it('should render project title as heading', () => {
    render(<ProjectCard project={mockProject} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Project Title');
  });

  it('should render project description', () => {
    render(<ProjectCard project={mockProject} />);

    expect(
      screen.getByText('This is a test project description that should be displayed in the card.'),
    ).toBeInTheDocument();
  });

  it('should render formatted duration with semantic time element', () => {
    render(<ProjectCard project={mockProject} />);

    const timeElement = screen.getByRole('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveTextContent('Jan 2024 - Mar 2024');
  });

  it('should render technologies with correct count', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Technologies: 2')).toBeInTheDocument();
  });

  it('should render image with optimized properties', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByTestId('project-image');
    expect(image).toHaveAttribute('src', 'https://example.com/image-600x400-q90.jpg');
    expect(image).toHaveAttribute('alt', 'Screenshot of Test Project Title project');
  });

  it('should render project status badges when URLs are provided', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Open Source')).toBeInTheDocument();
  });

  it('should render fallback div when no screenshot', () => {
    const projectWithoutScreenshot = { ...mockProject, screenshot: null } as any;
    render(<ProjectCard project={projectWithoutScreenshot} />);

    const fallbackDiv = screen.getByText('T');
    expect(fallbackDiv).toBeInTheDocument();
    const container = fallbackDiv.parentElement;
    expect(container).toHaveClass(
      'w-full',
      'h-full',
      'bg-gradient-to-br',
      'from-purple-500',
      'via-violet-500',
      'to-pink-500',
    );
  });

  it('should render call to action without separate link', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('View Details')).toBeInTheDocument();
    // Should not be a separate link since the whole card is clickable
    // The "View Details" text should be in a div, not a link
    const viewDetailsElement = screen.getByText('View Details');
    expect(viewDetailsElement.closest('div')).not.toBeNull();
    expect(viewDetailsElement.closest('a')).toHaveAttribute('data-testid', 'project-link');
  });

  it('should handle project without description', () => {
    const projectWithoutDescription = { ...mockProject, description: null } as any;
    render(<ProjectCard project={projectWithoutDescription} />);

    expect(screen.getByText('Test Project Title')).toBeInTheDocument();
    expect(screen.getByText('Jan 2024 - Mar 2024')).toBeInTheDocument();
  });

  it('should handle project with empty technologies array', () => {
    const projectWithoutTechnologies = { ...mockProject, technologies: [] };
    render(<ProjectCard project={projectWithoutTechnologies} />);

    expect(screen.getByText('Technologies: 0')).toBeInTheDocument();
  });

  it('should have proper hover effects and accessibility', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByTestId('project-link');
    expect(link).toHaveClass('block', 'h-full', 'group');

    const article = screen.getByRole('article');
    expect(article).toHaveClass('hover:border-white/20', 'hover:bg-card-hover', 'transition-all');
  });

  it('should render floating view indicator', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('View')).toBeInTheDocument();
  });

  it('should not render status badges when URLs are not provided', () => {
    const projectWithoutUrls = { ...mockProject, liveUrl: null, repoUrl: null } as any;
    render(<ProjectCard project={projectWithoutUrls} />);

    expect(screen.queryByText('Live')).not.toBeInTheDocument();
    expect(screen.queryByText('Open Source')).not.toBeInTheDocument();
  });
});

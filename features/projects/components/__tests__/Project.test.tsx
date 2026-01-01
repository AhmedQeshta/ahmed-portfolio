import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import Project from '@/features/projects/components/Project';
import { IProjectResponse } from '@/features/projects/types/project';

jest.mock('@/features/shard/components/ui/NavigationHeader', () => () => (
  <div data-testid="navigation-header" />
));
jest.mock('@/features/projects/components/ui/HeroProject', () => () => (
  <div data-testid="hero-project" />
));
jest.mock('@/features/shard/components/ui/ActionButtons', () => () => (
  <div data-testid="action-buttons" />
));
jest.mock('@/features/projects/components/ui/FullDescription', () => () => (
  <div data-testid="full-description" />
));
jest.mock('@/features/projects/components/ui/ProjectGallery', () => () => (
  <div data-testid="project-gallery" />
));
jest.mock('@/features/projects/components/ui/TimelineProject', () => () => (
  <div data-testid="timeline-project" />
));
jest.mock('@/features/shard/components/ui/Technologies', () => () => (
  <div data-testid="technologies" />
));
jest.mock('@/features/projects/components/ui/StatsProject', () => () => (
  <div data-testid="stats-project" />
));
jest.mock('@/features/shard/components/ui/BackgroundEffects', () => () => (
  <div data-testid="background-effects" />
));

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: '',
  fullDescription: [],
  slug: 'test-project',
  screenshot: '',
  status: 'completed',
  technologies: [],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/example',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  gallery: [],
  categories: [],
  featured: false,
  order: 0,
};

describe('Project', () => {
  it('renders all sub-components', () => {
    render(<Project project={mockProject} />);
    expect(screen.getByTestId('navigation-header')).toBeInTheDocument();
    expect(screen.getByTestId('hero-project')).toBeInTheDocument();
    expect(screen.getByTestId('action-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('full-description')).toBeInTheDocument();
    expect(screen.getByTestId('project-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('timeline-project')).toBeInTheDocument();
    expect(screen.getByTestId('technologies')).toBeInTheDocument();
    expect(screen.getByTestId('stats-project')).toBeInTheDocument();
    expect(screen.getByTestId('background-effects')).toBeInTheDocument();
  });
});

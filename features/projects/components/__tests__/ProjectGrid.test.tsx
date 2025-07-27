import { render, screen } from '@testing-library/react';
import ProjectGrid from '@/features/projects/components/ProjectGrid';
import { IProjectResponse } from '@/features/projects/types/project';

// Mock sanityFetch
jest.mock('@/sanity/lib/client', () => ({
  sanityFetch: jest.fn(),
}));

import { sanityFetch } from '@/sanity/lib/client';
import { ProjectResponse } from '@/sanity/lib/types';

jest.mock('@/features/shard/components/ui/ErrorHandle', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div>{description}</div>,
}));

const mockProjects: ProjectResponse[] = [
  {
    _id: '1',
    title: 'Test Project 1',
    slug: 'test-project-1',
    description: 'Desc 1',
    screenshot: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    technologies: [],
    startDate: '2023-01-01',
    endDate: '2023-02-01',
    liveUrl: '',
    repoUrl: '',
    fullDescription: [],
    status: 'completed',
    gallery: [],
    categories: [],
    featured: false,
    order: 1,
  },
  {
    _id: '2',
    title: 'Test Project 2',
    slug: 'test-project-2',
    description: 'Desc 2',
    screenshot: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg',
    technologies: [],
    startDate: '2023-03-01',
    endDate: '2023-04-01',
    liveUrl: '',
    repoUrl: '',
    fullDescription: [],
    status: 'completed',
    gallery: [],
    categories: [],
    featured: false,
    order: 2,
  },
];

describe('ProjectGrid', () => {
  beforeEach(() => {
    (sanityFetch as jest.Mock).mockClear();
  });

  it('renders the project grid with projects', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue(mockProjects);
    const { findByText } = render(await ProjectGrid({ readMore: true }));

    expect(await findByText('Test Project 1')).toBeInTheDocument();
    expect(await findByText('Test Project 2')).toBeInTheDocument();
    expect(screen.getByText('View All Projects')).toBeInTheDocument();
  });

  it('renders a message when there are no projects', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue([]);
    const { findByText } = render(await ProjectGrid({ readMore: false }));
    expect(await findByText('No projects found')).toBeInTheDocument();
  });

  it('handles errors during fetch', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (sanityFetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    const { findByText } = render(await ProjectGrid({ readMore: true }));

    expect(
      await findByText('Failed to load Projects. Please try again later.'),
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});

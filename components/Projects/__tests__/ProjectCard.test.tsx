import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/Projects/ProjectCard';
import { IProjectResponse } from '@/utils/types/project';
import { formatDateDuration } from '@/utils/date';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockProject: IProjectResponse['project'] = {
  _id: '2',
  title: 'Another Test Project',
  description: 'Description for another test project.',
  slug: 'another-test-project',
  screenshot: '/another-screenshot.png',
  technologies: [{ _id: 'tech3', name: 'Next.js', logo: 'next.svg', order: 1 }],
  startDate: '2024-01-01',
  endDate: '2024-03-01',
  liveUrl: 'https://live-demo.com',
  repoUrl: 'https://github.com/example/another',
  fullDescription: [],
  status: 'completed',
  gallery: [],
  categories: [],
  featured: false,
  order: 0
};

describe('ProjectCard', () => {
  it('renders project card with all details', () => {
    render(<ProjectCard project={mockProject} />);

    // The main link wraps the whole card, so we find it by its content.
    const mainLink = screen.getByRole('link', { name: /Another Test Project/i });
    expect(mainLink).toHaveAttribute('href', '/projects/another-test-project');

    // Check for other elements within the card
    expect(screen.getByAltText('Another Test Project')).toBeInTheDocument();
    expect(screen.getByText('Another Test Project')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(
      screen.getByText(formatDateDuration(mockProject.startDate!, mockProject.endDate!)),
    ).toBeInTheDocument();
    expect(screen.getByText('Description for another test project.')).toBeInTheDocument();

    // Check for the external links
    expect(screen.getByRole('link', { name: 'Live Demo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import HeroProject from '@/components/Projects/Features/HeroProject';
import { IProjectResponse } from '@/utils/types/project';

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: 'A brief description of the test project.',
  fullDescription: [],
  slug: 'test-project',
  screenshot: 'https://via.placeholder.com/800x600',
  status: 'in-progress',
  technologies: [],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/example/test-project',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  gallery: [],
};

describe('HeroProject', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<HeroProject project={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders project hero data correctly', () => {
    render(<HeroProject project={mockProject} />);

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Project');
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test Project' })).toBeInTheDocument();
    expect(screen.getByText('A brief description of the test project.')).toBeInTheDocument();
  });
});

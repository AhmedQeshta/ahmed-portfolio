import { render, screen } from '@testing-library/react';
import HeroModal from '@/features/projects/components/ui/HeroModal';
import { IProjectResponse } from '@/features/projects/types/project';

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: 'A brief description of the test project.',
  fullDescription: [],
  slug: 'test-project',
  screenshot: 'https://via.placeholder.com/150',
  status: 'completed',
  technologies: [],
  liveUrl: 'https://example.com',
  repoUrl: 'https://github.com/example/test-project',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  gallery: [],
};

describe('HeroModal', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<HeroModal project={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the project screenshot and status', () => {
    render(<HeroModal project={mockProject} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProject.screenshot);
    expect(image).toHaveAttribute('alt', mockProject.title);
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
  });
});

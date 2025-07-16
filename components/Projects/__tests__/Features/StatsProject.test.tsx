import { render, screen } from '@testing-library/react';
import StatsProject from '@/components/Projects/Features/StatsProject';
import { IProjectResponse } from '@/utils/types/project';

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: '',
  fullDescription: [],
  slug: 'test-project',
  screenshot: '',
  status: 'completed',
  technologies: [
    { _id: 'tech1', name: 'React', logo: 'react.svg' },
    { _id: 'tech2', name: 'TypeScript', logo: 'typescript.svg' },
  ],
  liveUrl: '',
  repoUrl: '',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  gallery: ['/img1.png', '/img2.png', '/img3.png'],
};

describe('StatsProject', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<StatsProject project={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders project stats correctly', () => {
    render(<StatsProject project={mockProject} />);
    expect(screen.getByText('Project Details')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('Technologies:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Gallery Images:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

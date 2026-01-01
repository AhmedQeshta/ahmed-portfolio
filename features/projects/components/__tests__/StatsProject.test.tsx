import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import StatsProject from '@/features/projects/components/ui/StatsProject';
import { IProjectResponse } from '@/features/projects/types/project';
import { ProjectResponse } from '@/sanity/lib/types';

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: '',
  fullDescription: [],
  slug: 'test-project',
  screenshot: '',
  status: 'completed',
  technologies: [
    {
      _id: 'tech1',
      name: 'React',
      logo: 'react.svg',
      order: 0,
    },
    {
      _id: 'tech2',
      name: 'TypeScript',
      logo: 'typescript.svg',
      order: 0,
    },
  ],
  liveUrl: '',
  repoUrl: '',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  gallery: ['/img1.png', '/img2.png', '/img3.png'],
  categories: [],
  featured: false,
  order: 0,
};

describe('StatsProject', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<StatsProject project={null as unknown as ProjectResponse} />);
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

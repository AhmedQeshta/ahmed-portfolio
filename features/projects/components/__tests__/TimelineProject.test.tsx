import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import TimelineProject from '@/features/projects/components/ui/TimelineProject';
import { IProjectResponse } from '@/features/projects/types/project';
import { formatDate } from '@/features/shard/utils/date';
import { ProjectResponse } from '@/sanity/lib/types';

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: '',
  fullDescription: [],
  slug: 'test-project',
  screenshot: '',
  status: 'completed',
  technologies: [],
  liveUrl: '',
  repoUrl: '',
  startDate: '2023-01-15',
  endDate: '2023-12-25',
  gallery: [],
  categories: [],
  featured: false,
  order: 0,
};

describe('TimelineProject', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<TimelineProject project={null as unknown as ProjectResponse} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders project timeline correctly', () => {
    render(<TimelineProject project={mockProject} />);
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Started:')).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockProject.startDate!))).toBeInTheDocument();
    expect(screen.getByText('Completed:')).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockProject.endDate!))).toBeInTheDocument();
  });
});

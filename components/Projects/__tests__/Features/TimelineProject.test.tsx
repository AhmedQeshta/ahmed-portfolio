import { render, screen } from '@testing-library/react';
import TimelineProject from '@/components/Projects/Features/TimelineProject';
import { IProjectResponse } from '@/utils/types/project';
import { formatDate } from '@/utils/date';

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
};

describe('TimelineProject', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<TimelineProject project={null} />);
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

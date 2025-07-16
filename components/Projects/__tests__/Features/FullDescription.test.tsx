
import { render, screen } from '@testing-library/react';
import FullDescription from '@/components/Projects/Features/FullDescription';
import { IProjectResponse } from '@/utils/types/project';

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: 'A brief description of the test project.',
  fullDescription: [
    {
      _key: '1a',
      _type: 'block',
      children: [
        {
          _key: '1a1',
          _type: 'span',
          marks: [],
          text: 'This is the full description.',
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ],
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

describe('FullDescription', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<FullDescription project={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the project title and full description', () => {
    render(<FullDescription project={mockProject} />);
    expect(screen.getByText('About This Project')).toBeInTheDocument();
    expect(screen.getByText('This is the full description.')).toBeInTheDocument();
  });
}); 
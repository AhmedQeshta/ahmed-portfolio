import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import ProjectGallery from '@/features/projects/components/ui/ProjectGallery';
import { IProjectResponse } from '@/features/projects/types/project';

const mockProjectWithGallery: IProjectResponse['project'] = {
  _id: '1',
  title: 'Test Project',
  description: 'A brief description.',
  fullDescription: [],
  slug: 'test-project',
  screenshot: '',
  status: 'completed',
  technologies: [],
  liveUrl: '',
  repoUrl: '',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  gallery: ['/image1.jpg', '/image2.jpg'],
  categories: [],
  featured: false,
  order: 0
};

const mockProjectWithoutGallery: IProjectResponse['project'] = {
  ...mockProjectWithGallery,
  gallery: [],
};

describe('ProjectGallery', () => {
  it('renders nothing when gallery is null or empty', () => {
    const { container } = render(<ProjectGallery project={mockProjectWithoutGallery} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the gallery with images', () => {
    render(<ProjectGallery project={mockProjectWithGallery} />);
    expect(screen.getByRole('heading', { name: 'Gallery' })).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Test Project gallery image 1');
    expect(images[1]).toHaveAttribute('alt', 'Test Project gallery image 2');
  });
});

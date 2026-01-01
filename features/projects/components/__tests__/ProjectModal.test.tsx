import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import ProjectModal from '@/features/projects/components/ProjectModal';
import { IProjectResponse } from '@/features/projects/types/project';

const mockRouter = {
  back: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// Mock IntersectionObserver
const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

const mockProject: IProjectResponse['project'] = {
  _id: '1',
  title: 'Modal Test Project',
  description: 'Modal description.',
  slug: 'modal-test-project',
  screenshot: '/modal-screenshot.png',
  technologies: [],
  startDate: '2023-01-01',
  endDate: '2023-02-01',
  liveUrl: 'https://live-modal.com',
  repoUrl: 'https://github.com/example/modal',
  fullDescription: [],
  status: 'completed',
  gallery: [],
  categories: [],
  featured: false,
  order: 1,
};

describe('ProjectModal', () => {
  beforeEach(() => {
    mockRouter.back.mockClear();
  });

  it('renders the modal with project details and closes it', () => {
    render(<ProjectModal project={mockProject} />);

    expect(screen.getByText('Modal Test Project')).toBeInTheDocument();
    expect(screen.getByText('Modal description.')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(closeButton);
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});

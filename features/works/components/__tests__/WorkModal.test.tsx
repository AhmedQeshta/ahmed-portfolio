import { screen, fireEvent } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import WorkModal from '@/features/works/components/WorkModal';
import { IWorkResponse } from '@/features/works/types/work';

const mockRouter = {
  back: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Modal Work Title',
  company: 'Modal Corp',
  slug: 'modal-work',
  employmentType: 'full-time',
  locationType: 'remote',
  startDate: '2023-01-01',
  current: true,
  technologies: [],
  companyUrl: 'https://modal.corp',
  logo: 'logo.png',
  achievements: [],
  location: 'virtual',
  categories: [],
  order: 0,
};

describe('WorkModal', () => {
  beforeEach(() => {
    mockRouter.back.mockClear();
  });

  it('renders the modal with work details and handles close', () => {
    render(<WorkModal work={mockWork} />);

    // Check that some details are rendered
    expect(screen.getByText('Modal Work Title')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument(); // From CompanyInformation

    // Check that the close button works
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});

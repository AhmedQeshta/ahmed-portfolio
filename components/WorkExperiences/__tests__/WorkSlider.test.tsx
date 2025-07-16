import { render, screen } from '@testing-library/react';
import WorkSlider from '@/components/WorkExperiences/WorkSlider';
import { IWorksResponse } from '@/utils/types/work';

jest.mock('react-slick', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-slider">{children}</div>
  ),
}));

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockWorks: IWorksResponse['works'] = [
  {
    _id: 'work1',
    title: 'First Work',
    company: 'Company A',
    slug: 'work-1',
    employmentType: 'full-time',
    locationType: 'remote',
    startDate: '2022-01-01',
    current: true,
    technologies: [],
    categories: [],
    order: 1,
  },
  {
    _id: 'work2',
    title: 'Second Work',
    company: 'Company B',
    slug: 'work-2',
    employmentType: 'part-time',
    locationType: 'on-site',
    startDate: '2021-01-01',
    current: false,
    technologies: [],
    categories: [],
    order: 2,
  },
];

describe('WorkSlider', () => {
  it('renders a slide for each work item', () => {
    render(<WorkSlider works={mockWorks} />);

    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
    expect(screen.getByText('First Work')).toBeInTheDocument();
    expect(screen.getByText('Second Work')).toBeInTheDocument();
    // Two cards means two links to the work details page
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders the slider even with no work items', () => {
    render(<WorkSlider works={[]} />);
    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
    expect(screen.queryByText('First Work')).not.toBeInTheDocument();
  });
});

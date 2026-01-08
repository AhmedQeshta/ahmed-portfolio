import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import WorkGridSlider from '@/features/works/components/WorkGridSlider';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { IWorkSlider } from '@/features/works/types/work';

jest.mock('@/sanity/lib/client');
jest.mock('@/features/shard/components/ui/ErrorHandle', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div>{description}</div>,
}));
jest.mock('@/features/works/components/WorkSlider', () => ({
  __esModule: true,
  default: ({ works }: IWorkSlider) => (
    <div data-testid="work-slider">
      {works.map((work) => (
        <div key={work._id}>{work.title}</div>
      ))}
    </div>
  ),
}));

const mockWorks: WorkExperienceResponse[] = [
  {
    _id: 'work1',
    title: 'Awesome Work',
    company: 'Slider Inc.',
    slug: 'awesome-work',
    employmentType: 'full-time',
    locationType: 'remote',
    startDate: '2022-01-01',
    current: true,
    technologies: [],
    categories: [],
    order: 0,
  },
];

describe('WorkGridSlider', () => {
  beforeEach(() => {
    (sanityFetch as jest.Mock).mockClear();
  });

  it('renders the slider with works when fetch is successful', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue(mockWorks);
    render(await WorkGridSlider());

    expect(screen.getByText('Works Experience')).toBeInTheDocument();
    expect(screen.getByTestId('work-slider')).toBeInTheDocument();
    expect(screen.getByText('Awesome Work')).toBeInTheDocument();
  });

  it('renders a message when no works are found', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue([]);
    render(await WorkGridSlider());

    expect(screen.getByText('Works Experience')).toBeInTheDocument();
    expect(screen.getByText('No work experience found')).toBeInTheDocument();
  });

  it('renders an error message when fetch fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (sanityFetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    render(await WorkGridSlider());

    expect(
      screen.getByText('Failed to load work experience. Please try again later.'),
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});

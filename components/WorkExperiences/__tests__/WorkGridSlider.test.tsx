import { render, screen } from '@testing-library/react';
import WorkGridSlider from '@/components/WorkExperiences/WorkGridSlider';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { IWorkSlider } from '@/utils/types/work';

jest.mock('@/sanity/lib/client');
jest.mock('@/components/ui/ErrorHandle', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div>{description}</div>,
}));
jest.mock('@/components/WorkExperiences/WorkSlider', () => ({
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

    expect(screen.getByText('Works')).toBeInTheDocument();
    expect(screen.getByTestId('work-slider')).toBeInTheDocument();
    expect(screen.getByText('Awesome Work')).toBeInTheDocument();
  });

  it('renders a message when no works are found', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue([]);
    render(await WorkGridSlider());

    expect(screen.getByText('Works')).toBeInTheDocument();
    expect(screen.getByText('No works found.')).toBeInTheDocument();
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

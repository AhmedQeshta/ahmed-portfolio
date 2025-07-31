import { render, screen } from '@testing-library/react';
import WorkGrid from '@/features/works/components/WorkGrid';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';

jest.mock('@/sanity/lib/client');
jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));
jest.mock('@/features/shard/components/ui/ErrorHandle', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div>{description}</div>,
}));

const mockWorks: WorkExperienceResponse[] = [
  {
    _id: 'work1',
    title: 'Software Engineer',
    company: 'Tech Corp',
    slug: 'swe-tc',
    employmentType: 'full-time',
    locationType: 'remote',
    startDate: '2022-01-01',
    current: true,
    technologies: [],
    categories: [],
    order: 0,
  },
];

describe('WorkGrid', () => {
  beforeEach(() => {
    (sanityFetch as jest.Mock).mockClear();
  });

  it('renders work experiences when fetch is successful', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue(mockWorks);
    render(await WorkGrid());

    expect(screen.getByText('Works Experience')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders a message when no work experiences are found', async () => {
    (sanityFetch as jest.Mock).mockResolvedValue([]);
    render(await WorkGrid());

    expect(screen.getByText('Works Experience')).toBeInTheDocument();
    expect(screen.getByText('No work experience found.')).toBeInTheDocument();
  });

  it('renders an error message when fetch fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (sanityFetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));
    render(await WorkGrid());

    expect(
      screen.getByText('Failed to load work experience. Please try again later.'),
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});

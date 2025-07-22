import { render, screen } from '@testing-library/react';
import WorkCard from '@/features/works/components/WorkCard';
import { IWorksResponse } from '@/features/works/types/work';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockWorks: IWorksResponse['works'] = [
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
    order: 1,
  },
  {
    _id: 'work2',
    title: 'Designer',
    company: 'Design Co',
    slug: 'designer-dc',
    employmentType: 'contract',
    locationType: 'on-site',
    startDate: '2021-01-01',
    current: false,
    technologies: [],
    categories: [],
    order: 2,
  },
];

describe('WorkCard', () => {
  it('renders a card for each work experience', () => {
    render(<WorkCard works={mockWorks} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders nothing if no works are provided', () => {
    const { container } = render(<WorkCard works={[]} />);
    // The grid div is still rendered, but it should have no children.
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.grid')?.childElementCount).toBe(0);
  });
});

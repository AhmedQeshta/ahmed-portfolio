import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import Card from '@/features/works/components/ui/Card';
import { IWorkResponse } from '@/features/works/types/work';
import { durationOfWork } from '@/features/shard/utils/date';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  slug: 'software-engineer-at-tech-corp',
  logo: 'logo.png',
  company: 'Tech Corp',
  current: true,
  title: 'Software Engineer',
  employmentType: 'full-time',
  locationType: 'remote',
  startDate: '2022-01-01',
  endDate: undefined,
  location: 'New York, NY',
  description: 'Developing awesome things.',
  technologies: [{ _id: 'tech1', name: 'React', logo: 'react.svg', order: 1 }],
  categories: [],
  order: 0,
};

describe('Card', () => {
  it('renders all work details correctly', () => {
    render(<Card work={mockWork} />);

    // Check main link
    expect(screen.getByRole('link', { name: /Software Engineer/i })).toHaveAttribute(
      'href',
      '/works/software-engineer-at-tech-corp',
    );

    // Check texts
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText(/full time/i)).toBeInTheDocument();
    expect(screen.getByText(/remote/i)).toBeInTheDocument();
    expect(screen.getByText(durationOfWork('2022-01-01', '', true))).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    expect(screen.getByText('Developing awesome things.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();

    // Check image
    expect(screen.getByAltText('Tech Corp')).toHaveAttribute('src', 'logo.png');
  });

  it('renders without a logo', () => {
    const workWithoutLogo = { ...mockWork, logo: undefined };
    render(<Card work={workWithoutLogo} />);
    expect(screen.getByText('T')).toBeInTheDocument(); // Fallback to first letter of company name
  });
});

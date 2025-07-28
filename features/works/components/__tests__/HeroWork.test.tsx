import { render, screen } from '@testing-library/react';
import HeroWork from '@/features/works/components/ui/HeroWork';
import { IWorkResponse } from '@/features/works/types/work';

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Senior Developer',
  company: 'Innovate LLC',
  companyUrl: 'https://innovate.llc',
  employmentType: 'contract',
  locationType: 'hybrid',
  current: true,
  description: 'Building the future of web.',
  slug: 'swe',
  startDate: '2022-01-01',
  technologies: [],
  categories: [],
  order: 0,
  location: 'New York, NY',
};

describe('HeroWork', () => {
  it('renders all hero details correctly', () => {
    render(<HeroWork work={mockWork} />);

    // Check badges
    expect(screen.getByText('CONTRACT')).toBeInTheDocument();
    expect(screen.getByText('CURRENT POSITION')).toBeInTheDocument();
    expect(screen.getByText('HYBRID')).toBeInTheDocument();

    // Check title and description
    expect(screen.getByRole('heading', { name: 'Senior Developer' })).toBeInTheDocument();
    expect(screen.getByText('Building the future of web.')).toBeInTheDocument();

    // Check company link
    const companyLink = screen.getByRole('link', { name: /Innovate LLC/i });
    expect(companyLink).toBeInTheDocument();
    expect(companyLink).toHaveAttribute('href', 'https://innovate.llc');
  });

  it('renders without a company URL', () => {
    const workWithoutUrl = { ...mockWork, companyUrl: undefined };
    render(<HeroWork work={workWithoutUrl} />);
    expect(screen.getByText('Innovate LLC')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Innovate LLC/i })).not.toBeInTheDocument();
  });

  it('does not render current and location type badges if not applicable', () => {
    const workNotCurrent = { ...mockWork, current: false, locationType: 'on-site' as const };
    render(<HeroWork work={workNotCurrent} />);
    expect(screen.queryByText('CURRENT POSITION')).not.toBeInTheDocument();
    expect(screen.queryByText('HYBRID')).not.toBeInTheDocument();
  });
  it('renders nothing if no work prop is provided', () => {
    const { container } = render(<HeroWork work={undefined as unknown as IWorkResponse['work']} />);
    expect(container).toBeEmptyDOMElement();
  });
});

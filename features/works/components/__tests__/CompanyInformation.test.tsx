import { render, screen } from '@testing-library/react';
import CompanyInformation from '@/features/works/components/ui/CompanyInformation';
import { IWorkResponse } from '@/features/works/types/work';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Software Engineer',
  slug: 'swe',
  company: 'Tech Corp',
  companyUrl: 'https://techcorp.com',
  logo: 'logo.png',
  employmentType: 'full-time',
  locationType: 'remote',
  startDate: '2022-01-01',
  current: true,
  technologies: [],
  categories: [],
  order: 0,
};

describe('CompanyInformation', () => {
  it('renders company information with a link', () => {
    render(<CompanyInformation work={mockWork} />);

    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByAltText('Tech Corp')).toHaveAttribute('src', 'logo.png');
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /visit company website/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://techcorp.com');
  });

  it('renders company information without a link if no url is provided', () => {
    const workWithoutUrl = { ...mockWork, companyUrl: undefined };
    render(<CompanyInformation work={workWithoutUrl} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders nothing if no logo is provided', () => {
    const workWithoutLogo = { ...mockWork, logo: undefined };
    const { container } = render(<CompanyInformation work={workWithoutLogo} />);
    expect(container).toBeEmptyDOMElement();
  });
});

import { render, screen } from '@testing-library/react';
import Location from '@/features/works/components/ui/Location';
import { IWorkResponse } from '@/features/works/types/work';

const mockWork: Partial<IWorkResponse['work']> & {
  _id: string;
  title: string;
  company: string;
  slug: string;
} = {
  _id: 'work1',
  title: 'Frontend Developer',
  company: 'Web Solutions',
  slug: 'frontend-developer',
  location: 'San Francisco, CA',
  locationType: 'on-site',
  employmentType: 'full-time',
  startDate: '2023-01-01',
  current: false,
  technologies: [],
};

const mockWorkRemote: typeof mockWork = {
  ...mockWork,
  locationType: 'remote',
  location: 'New York, NY',
};

const mockWorkHybrid: typeof mockWork = {
  ...mockWork,
  locationType: 'hybrid',
  location: 'Los Angeles, CA',
};

const mockWorkNoLocationType: typeof mockWork = {
  ...mockWork,
  locationType: undefined,
  location: 'Chicago, IL',
};

const mockWorkNoLocation: typeof mockWork = {
  ...mockWork,
  location: undefined,
  locationType: 'remote',
};

describe('Location', () => {
  it('renders the location and location type for on-site work', () => {
    render(<Location work={mockWork as IWorkResponse['work']} />);

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('on site')).toBeInTheDocument();
  });

  it('renders the location and location type for remote work', () => {
    render(<Location work={mockWorkRemote as IWorkResponse['work']} />);

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    expect(screen.getByText('remote')).toBeInTheDocument();
  });

  it('renders the location and location type for hybrid work', () => {
    render(<Location work={mockWorkHybrid as IWorkResponse['work']} />);

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
    expect(screen.getByText('hybrid')).toBeInTheDocument();
  });

  it('renders only location when locationType is not provided', () => {
    render(<Location work={mockWorkNoLocationType as IWorkResponse['work']} />);

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Chicago, IL')).toBeInTheDocument();
    // Should not render any location type text
    expect(screen.queryByText('remote')).not.toBeInTheDocument();
    expect(screen.queryByText('on site')).not.toBeInTheDocument();
    expect(screen.queryByText('hybrid')).not.toBeInTheDocument();
  });

  it('returns null when location is not provided', () => {
    const { container } = render(<Location work={mockWorkNoLocation as IWorkResponse['work']} />);

    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('Location')).not.toBeInTheDocument();
  });

  it('properly formats location type with hyphens replaced by spaces', () => {
    const mockWorkWithHyphen = {
      ...mockWork,
      locationType: 'on-site' as const, // Use a valid type but test the replace logic
      location: 'Boston, MA',
    };

    render(<Location work={mockWorkWithHyphen as IWorkResponse['work']} />);

    expect(screen.getByText('on site')).toBeInTheDocument();
  });
});

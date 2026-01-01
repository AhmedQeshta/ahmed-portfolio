import { screen } from '@testing-library/react';
import { render } from '@/features/shard/utils/test-utils';
import { IWorkResponse } from '@/features/works/types/work';
import WorkDetails from '@/features/works/components/ui/WorkDetails';

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Data Analyst',
  company: 'Data Insights',
  slug: 'data-analyst',
  employmentType: 'part-time',
  locationType: 'hybrid',
  current: true,
  startDate: '2023-01-01',
  technologies: [],
  categories: [],
  order: 0,
};

describe('WorkDetails', () => {
  it('renders all work details for a current position', () => {
    render(<WorkDetails work={mockWork} />);

    expect(screen.getByText('Work Details')).toBeInTheDocument();
    expect(screen.getByText('PART TIME')).toBeInTheDocument();
    expect(screen.getByText('HYBRID')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
  });

  it('renders without the active badge for a past position', () => {
    const pastWork = { ...mockWork, current: false };
    render(<WorkDetails work={pastWork} />);

    expect(screen.getByText('Work Details')).toBeInTheDocument();
    expect(screen.getByText('PART TIME')).toBeInTheDocument();
    expect(screen.getByText('HYBRID')).toBeInTheDocument();
    expect(screen.queryByText('ACTIVE')).not.toBeInTheDocument();
  });

  it('renders nothing if work prop is not provided', () => {
    const { container } = render(
      <WorkDetails work={undefined as unknown as IWorkResponse['work']} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

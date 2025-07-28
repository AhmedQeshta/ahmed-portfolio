import { render, screen } from '@testing-library/react';
import Timeline from '@/features/works/components/ui/Timeline';
import { IWorkResponse } from '@/features/works/types/work';
import { formatDate, durationOfWork } from '@/features/shard/utils/date';

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Product Manager',
  company: 'Product Inc.',
  slug: 'product-manager',
  startDate: '2021-06-01',
  endDate: '2023-06-01',
  current: false,
  employmentType: 'full-time',
  locationType: 'remote',
  technologies: [],
  categories: [],
  order: 0,
};

const mockCurrentWork: IWorkResponse['work'] = {
  ...mockWork,
  endDate: undefined,
  current: true,
};

describe('Timeline', () => {
  it('renders the complete timeline for a past job', () => {
    render(<Timeline work={mockWork} />);

    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockWork.startDate))).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockWork.endDate!))).toBeInTheDocument();
    expect(
      screen.getByText(
        durationOfWork(mockWork.startDate, mockWork.endDate!, mockWork.current)
          .split('|')[1]
          ?.trim() || '',
      ),
    ).toBeInTheDocument();
  });

  it('renders the timeline for a current job', () => {
    render(<Timeline work={mockCurrentWork} />);

    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText(formatDate(mockCurrentWork.startDate))).toBeInTheDocument();
    expect(screen.queryByText('Ended:')).not.toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders nothing if work prop is not provided', () => {
    const { container } = render(<Timeline work={undefined as unknown as IWorkResponse['work']} />);
    expect(container).toBeEmptyDOMElement();
  });
});

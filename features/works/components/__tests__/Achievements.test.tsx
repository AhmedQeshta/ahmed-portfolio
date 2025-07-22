import { render, screen } from '@testing-library/react';
import Achievements from '@/features/works/components/ui/Achievements';
import { IWorkResponse } from '@/features/works/types/work';

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Software Engineer',
  company: 'Tech Corp',
  slug: 'software-engineer',
  employmentType: 'full-time',
  locationType: 'remote',
  startDate: '2022-01-01',
  current: true,
  technologies: [],
  achievements: ['Developed a new feature.', 'Improved performance by 20%.'],
  categories: [],
  order: 0,
};

const mockWorkNoAchievements: IWorkResponse['work'] = {
  ...mockWork,
  achievements: [],
};

describe('Achievements', () => {
  it('renders the list of achievements', () => {
    render(<Achievements work={mockWork} />);
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText('Developed a new feature.')).toBeInTheDocument();
    expect(screen.getByText('Improved performance by 20%.')).toBeInTheDocument();
  });

  it('renders nothing when there are no achievements', () => {
    const { container } = render(<Achievements work={mockWorkNoAchievements} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when achievements is null', () => {
    const workWithNullAchievements = { ...mockWork, achievements: undefined };
    const { container } = render(<Achievements work={workWithNullAchievements} />);
    expect(container).toBeEmptyDOMElement();
  });
});

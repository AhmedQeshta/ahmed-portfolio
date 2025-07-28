import { render, screen } from '@testing-library/react';
import Skills from '@/features/works/components/ui/Skills';
import { IWorkResponse } from '@/features/works/types/work';

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'UI/UX Designer',
  company: 'Creative Studio',
  slug: 'ui-ux-designer',
  skills: 'User research\nWireframing\nPrototyping',
  employmentType: 'full-time',
  locationType: 'remote',
  startDate: '2023-01-01',
  current: true,
  technologies: [],
  categories: [],
  order: 0,
};

describe('Skills', () => {
  it('renders skills and responsibilities', () => {
    render(<Skills work={mockWork} />);
    expect(screen.getByText('Skills & Responsibilities')).toBeInTheDocument();
    expect(screen.getByText(/User research/)).toBeInTheDocument();
    expect(screen.getByText(/Wireframing/)).toBeInTheDocument();
    expect(screen.getByText(/Prototyping/)).toBeInTheDocument();
  });

  it('renders nothing if skills are not provided', () => {
    const workWithoutSkills = { ...mockWork, skills: '' };
    const { container } = render(<Skills work={workWithoutSkills} />);
    expect(container).toBeEmptyDOMElement();
  });
});

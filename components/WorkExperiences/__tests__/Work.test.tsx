import { render, screen } from '@testing-library/react';
import Work from '@/components/WorkExperiences/Work';
import { IWorkResponse } from '@/utils/types/work';

jest.mock('@/sanity/lib/image', () => ({
  getImageUrl: (source: any) => source,
}));

const mockWork: IWorkResponse['work'] = {
  _id: 'work1',
  title: 'Lead Engineer',
  company: 'Mega Corp',
  slug: 'lead-engineer',
  employmentType: 'full-time',
  locationType: 'on-site',
  startDate: '2020-01-01',
  endDate: '2022-12-31',
  current: false,
  description: 'Leading a team of engineers.',
  logo: 'logo.png',
  technologies: [
    {
      _id: 'tech1',
      name: 'TypeScript',
      order: 0,
      logo: 'typescript.svg',
    },
  ],
  achievements: ['Launched a major product.'],
  skills: 'Team leadership',
  location: 'Remote',
  companyUrl: 'https://megacorp.com',
  categories: [],
  order: 0,
};

describe('Work', () => {
  it('renders the main components of the work page', () => {
    render(<Work work={mockWork} />);

    // Check Navigation
    expect(screen.getByText('Back to Work Experience')).toBeInTheDocument();

    // Check Hero
    expect(screen.getByText('Lead Engineer')).toBeInTheDocument();

    // Check Action Buttons
    expect(screen.getByText('Live Demo')).toBeInTheDocument();

    // Check Company Info
    expect(screen.getByText('Company')).toBeInTheDocument();

    // Check Achievements
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();

    // Check Skills
    expect(screen.getByText('Skills & Responsibilities')).toBeInTheDocument();

    // Check Timeline
    expect(screen.getByText('Timeline')).toBeInTheDocument();

    // Check Location
    expect(screen.getByText('Location')).toBeInTheDocument();

    // Check Technologies
    expect(screen.getByText('Technologies')).toBeInTheDocument();

    // Check Work Details
    expect(screen.getByText('Work Details')).toBeInTheDocument();
  });
});

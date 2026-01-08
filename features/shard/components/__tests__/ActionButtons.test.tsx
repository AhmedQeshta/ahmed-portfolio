import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';
import ActionButtons from '@/features/shard/components/ui/ActionButtons';
import { ExternalLink, Github } from 'lucide-react';

// Mock the cn utility function
jest.mock('@/features/shard/utils/statusColor', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

// Test data
const mockLinksWithIcons = [
  {
    id: 1,
    text: 'View Project',
    link: 'https://example.com/project',
    customStyle: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded',
    icon: <ExternalLink size={20} />,
  },
  {
    id: 2,
    text: 'GitHub',
    link: 'https://github.com/example',
    customStyle: 'bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded',
    icon: <Github size={20} />,
  },
];

const mockLinksWithoutIcons = [
  {
    id: 1,
    text: 'Learn More',
    link: 'https://example.com/learn',
    customStyle: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded',
  },
  {
    id: 2,
    text: 'Contact',
    link: 'https://example.com/contact',
    customStyle: 'bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded',
  },
];

describe('ActionButtons', () => {
  it('should render nothing when listLinks is null', () => {
    const { container } = render(<ActionButtons listLinks={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render all links with icons correctly', () => {
    render(<ActionButtons listLinks={mockLinksWithIcons} />);

    expect(screen.getByText('View Project')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/project');
    expect(links[1]).toHaveAttribute('href', 'https://github.com/example');
  });

  it('should render all links without icons correctly', () => {
    render(<ActionButtons listLinks={mockLinksWithoutIcons} />);

    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/learn');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/contact');
  });

  it('should apply custom styles to links', () => {
    render(<ActionButtons listLinks={mockLinksWithIcons} />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveClass(
      'bg-blue-500',
      'hover:bg-blue-600',
      'text-white',
      'px-4',
      'py-2',
      'rounded',
    );
    expect(links[1]).toHaveClass(
      'bg-gray-800',
      'hover:bg-gray-900',
      'text-white',
      'px-4',
      'py-2',
      'rounded',
    );

    links.forEach((link) => {
      expect(link).toHaveClass('flex', 'items-center', 'gap-2', 'hover:text-blue-400');
    });
  });

  it('should handle empty array of links', () => {
    render(<ActionButtons listLinks={[]} />);

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('should handle links with missing optional properties', () => {
    const incompleteLinks = [
      {
        id: 1,
        text: 'Test Link',
        // No link property - should not render
      },
      {
        id: 2,
        text: 'Another Test',
        link: 'https://example.com',
      },
      {
        id: 3,
        text: 'Empty Link',
        link: '', // Empty link - should not render
      },
    ];

    render(<ActionButtons listLinks={incompleteLinks} />);

    // Only the item with a valid link should be rendered
    expect(screen.queryByText('Test Link')).not.toBeInTheDocument();
    expect(screen.getByText('Another Test')).toBeInTheDocument();
    expect(screen.queryByText('Empty Link')).not.toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'https://example.com');
  });

  it('should handle internal vs external links correctly', () => {
    const mixedLinks = [
      {
        id: 1,
        text: 'Internal Page',
        link: '/projects/test',
        customStyle: 'text-blue-500',
      },
      {
        id: 2,
        text: 'External Site',
        link: 'https://example.com',
        customStyle: 'text-green-500',
      },
      {
        id: 3,
        text: 'Email Link',
        link: 'mailto:test@example.com',
        customStyle: 'text-purple-500',
      },
    ];

    render(<ActionButtons listLinks={mixedLinks} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    // Internal link should not have target="_blank"
    expect(links[0]).toHaveAttribute('href', '/projects/test');
    expect(links[0]).not.toHaveAttribute('target');
    expect(links[0]).not.toHaveAttribute('rel');

    // External links should have target="_blank"
    expect(links[1]).toHaveAttribute('href', 'https://example.com');
  });
});

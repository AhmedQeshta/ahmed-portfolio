import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShareCard from '@/components/ui/ShareCard';

// Mock the ScrollAnimation component
jest.mock('@/components/ui/ScrollAnimation', () => {
  return function MockScrollAnimation({ children }: { children: React.ReactNode }) {
    return <div data-testid="scroll-animation">{children}</div>;
  };
});

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
  writable: true,
});

describe('ShareCard', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
    (navigator.clipboard.writeText as jest.Mock).mockClear();
  });

  it('should render the share card title', () => {
    render(<ShareCard />);

    expect(screen.getByText('Share This Post')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Share This Post');
  });

  it('should render all share buttons', () => {
    render(<ShareCard />);

    expect(screen.getByText('Share on Twitter')).toBeInTheDocument();
    expect(screen.getByText('Share on LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Copy Link')).toBeInTheDocument();
  });

  it('should render ScrollAnimation wrapper', () => {
    render(<ShareCard />);

    const scrollAnimation = screen.getByTestId('scroll-animation');
    expect(scrollAnimation).toBeInTheDocument();
  });

  it('should handle Twitter share', () => {
    render(<ShareCard url="https://example.com" title="Test Post" />);

    const twitterButton = screen.getByText('Share on Twitter');
    fireEvent.click(twitterButton);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
    );
  });

  it('should handle LinkedIn share', () => {
    render(<ShareCard url="https://example.com" title="Test Post" />);

    const linkedinButton = screen.getByText('Share on LinkedIn');
    fireEvent.click(linkedinButton);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('linkedin.com/sharing/share-offsite'),
      '_blank',
    );
  });

  it('should handle copy link functionality', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);

    render(<ShareCard url="https://example.com" title="Test Post" />);

    const copyButton = screen.getByText('Copy Link');
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com');
  });

  it('should show copied state after copying link', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockResolvedValue(undefined);

    render(<ShareCard url="https://example.com" title="Test Post" />);

    const copyButton = screen.getByText('Copy Link');
    await act(async () => {
      fireEvent.click(copyButton);
    });

    // Wait for the state to update and the copied message to appear
    expect(await screen.findByText('Copied!')).toBeInTheDocument();
  });

  it('should use default values when props are not provided', () => {
    render(<ShareCard />);

    const twitterButton = screen.getByText('Share on Twitter');
    fireEvent.click(twitterButton);

    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
    );
  });

  it('should have correct styling classes', () => {
    render(<ShareCard />);

    const container = screen.getByTestId('share-card');
    expect(container).toHaveClass(
      'bg-gray-900/50',
      'backdrop-blur-sm',
      'border',
      'border-gray-800',
      'rounded-xl',
      'p-6',
    );
  });

  it('should handle clipboard error gracefully', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(new Error('Clipboard error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ShareCard url="https://example.com" title="Test Post" />);

    const copyButton = screen.getByText('Copy Link');
    await act(async () => {
      fireEvent.click(copyButton);
    });
    // Wait for the error to be handled
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(consoleSpy).toHaveBeenCalledWith('Failed to copy:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});

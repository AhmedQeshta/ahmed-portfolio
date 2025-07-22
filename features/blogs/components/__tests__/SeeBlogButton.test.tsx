import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeeBlogButton from '@/features/blogs/components/ui/SeeBlogButton';

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('SeeBlogButton', () => {
  it('renders button and navigates on click', () => {
    render(<SeeBlogButton slug="test-slug" />);
    const button = screen.getByRole('button', { name: /see blog/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith('/blogs/test-slug');
  });
});

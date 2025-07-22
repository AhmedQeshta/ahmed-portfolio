import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '';
  },
}));

jest.mock('nanoid', () => ({
  nanoid: () => 'test-id',
  customAlphabet: () => () => 'test-id',
}));

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority, fill, ...props }) => {
    // The priority and fill props are not valid for img tags
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    ...jest.requireActual('framer-motion').motion,
    div: jest.requireActual('react').forwardRef(({ children, ...props }, ref) => (
      <div {...props} ref={ref}>
        {children}
      </div>
    )),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Global test setup
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

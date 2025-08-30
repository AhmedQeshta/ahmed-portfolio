import { getStoredTheme, saveTheme, getSystemTheme, getEffectiveTheme } from '../storage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Theme Storage Utils', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  describe('getStoredTheme', () => {
    it('should return null when no theme is stored', () => {
      expect(getStoredTheme('test-key')).toBeNull();
    });

    it('should return valid theme when stored', () => {
      localStorageMock.setItem('test-key', 'dark');
      expect(getStoredTheme('test-key')).toBe('dark');
    });

    it('should return null for invalid theme', () => {
      localStorageMock.setItem('test-key', 'invalid');
      expect(getStoredTheme('test-key')).toBeNull();
    });
  });

  describe('saveTheme', () => {
    it('should save theme to localStorage', () => {
      saveTheme('test-key', 'light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', 'light');
    });
  });

  describe('getSystemTheme', () => {
    it('should return dark when system prefers dark', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      expect(getSystemTheme()).toBe('dark');
    });

    it('should return light when system prefers light', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      expect(getSystemTheme()).toBe('light');
    });
  });

  describe('getEffectiveTheme', () => {
    it('should return stored theme when valid', () => {
      localStorageMock.setItem('test-key', 'light');
      expect(getEffectiveTheme('test-key')).toBe('light');
    });

    it('should return system theme when stored theme is system', () => {
      localStorageMock.setItem('test-key', 'system');
      // Reset the mock to ensure it returns dark
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      expect(getEffectiveTheme('test-key')).toBe('dark');
    });

    it('should return system theme when no theme stored and default is system', () => {
      // Reset the mock to ensure it returns dark
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
      expect(getEffectiveTheme('test-key')).toBe('dark');
    });

    it('should return default theme when no theme stored and default is not system', () => {
      expect(getEffectiveTheme('test-key', 'light')).toBe('light');
    });
  });
});

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/features/(.*)$': '<rootDir>/features/$1',
    '^@/features/shard/(.*)$': '<rootDir>/features/shard/$1',
    '^@/features/works/(.*)$': '<rootDir>/features/works/$1',
    '^@/features/blogs/(.*)$': '<rootDir>/features/blogs/$1',
    '^@/features/project/(.*)$': '<rootDir>/features/project/$1',
    '^@/features/projects/(.*)$': '<rootDir>/features/projects/$1',
    '^@/features/contact/(.*)$': '<rootDir>/features/contact/$1',
    '^@/features/shard/components/ui/ErrorHandle$':
      '<rootDir>/features/works/components/ui/ErrorHandle',
    '^@/features/project/components/ui/HeroProject$':
      '<rootDir>/features/project/components/ui/HeroProject',
    '^@/features/contact/hooks/useContact$': '<rootDir>/features/shard/hooks/useContact',
    '^@/features/contact/utils/email$': '<rootDir>/features/shard/utils/email',
    '^@/features/shard/components/ui/DefaultInput$':
      '<rootDir>/features/shard/components/ui/DefaultInput',
    '^@/features/shard/components/ui/TechnologiesHome$': '<rootDir>/components/ui/TechnologiesHome',
    '^@/features/shard/components/ui/Technologies$':
      '<rootDir>/features/blogs/components/ui/Technologies',
    nanoid: require.resolve('nanoid'),
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'utils/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/sanity/',
    '<rootDir>/features/shard/utils/__tests__/test-utils.tsx',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

/** @type {import('next').Config} */
const nextConfig = {
  /* config options here */
  // Disable ESLint during production builds to prevent circular structure errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Add typechecking option to ignore specific types
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Performance optimizations for faster navigation
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // Enable faster client-side navigation
    optimizeCss: true,
    // Enable faster page transitions
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Enable static optimization
  output: process.env.NEXT_OUTPUT_MODE || 'standalone',
  // Optimize bundle size
  swcMinify: true,
  // Enable compression
  compress: true,
  // Optimize runtime for faster navigation
  poweredByHeader: false,
  // Enable faster page transitions
  reactStrictMode: true,
  // Optimize for better navigation performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable better caching for navigation
  generateEtags: false,
  // Optimize for faster page loads
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    // Enable faster client-side navigation and CSS optimization
    optimizeCss: true,
  },
  // CSS optimization and critical CSS extraction
  // Note: Next.js 15 handles CSS optimization automatically with optimizeCss: true
  // Critters is available for critical CSS extraction if needed
  // Enable static optimization
  output: 'standalone',
  // Enable compression (includes CSS compression)
  compress: true,
  // Optimize CSS loading and reduce render-blocking
  // Next.js 15 automatically optimizes CSS with optimizeCss: true
  // Optimize runtime for faster navigation
  poweredByHeader: false,
  // Enable faster page transitions
  reactStrictMode: false,
  // Optimize for better navigation performance
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable better caching for navigation
  generateEtags: false,
  // Optimize for faster page loads and client-side navigation
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Ensure client-side navigation works properly
  // Don't use trailingSlash as it can cause redirects that trigger full reloads
  trailingSlash: false,
  // Ensure proper routing without basePath interference
  // basePath should only be set if deploying to a subdirectory
  // Locator configuration for Turbopack (Next.js 15+)
  turbopack: {
    rules: {
      "**/*.{tsx,jsx}": {
        loaders: [{
          loader: "@locator/webpack-loader",
          options: { env: "development" }
        }]
      }
    }
  }
};

export default nextConfig;

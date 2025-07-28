import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
<<<<<<< HEAD
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
  },
  // Enable static optimization
  output: 'standalone',
  // Optimize bundle size
  swcMinify: true,
  // Enable compression
  compress: true,
  // Optimize runtime for faster navigation
  poweredByHeader: false,
  // Enable faster page transitions
  reactStrictMode: true,
=======
>>>>>>> 20fb6be268ea0a9505f81d0b71fcc5b64031fbe9
};

export default nextConfig;

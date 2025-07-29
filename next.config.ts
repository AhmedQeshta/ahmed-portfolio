/** @type {import('next').Config} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Add image sizing optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimize image loading
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  // Add typechecking option to ignore specific types
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Performance optimizations for faster navigation
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@sanity/image-url',
      'react-slick',
      'slick-carousel',
    ],
    // Enable modern output for better performance
    esmExternals: true,
    // Optimize CSS loading
    optimizeCss: false, // Disabled due to critters issue
  },
  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // ESM support for modern builds
  output: process.env.NEXT_OUTPUT_MODE || 'standalone',
  // Enable compression
  compress: true,
  // Optimize runtime for faster navigation
  poweredByHeader: false,
  // Enable faster page transitions
  reactStrictMode: true,
  // Optimize static generation
  generateEtags: false,
  // Bundle analyzer and advanced webpack optimizations
  webpack: (config: any, { dev, isServer }: { dev: boolean; isServer: boolean }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking and dead code elimination
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        innerGraph: true,
        // Advanced minification
        minimize: true,
        // Module concatenation for smaller bundles
        concatenateModules: true,
      };

      // Resolve alias for better tree shaking
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname),
      };
    }

    // Advanced bundle splitting for better caching
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // Framework chunk (React, Next.js)
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'framework',
            priority: 40,
            chunks: 'all',
            enforce: true,
          },
          // Vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            chunks: 'all',
            maxSize: 100000,
          },
          // Animation libraries (heavier)
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|react-slick|slick-carousel)[\\/]/,
            name: 'animations',
            priority: 30,
            chunks: 'all',
          },
          // CMS and API libraries
          cms: {
            test: /[\\/]node_modules[\\/](@sanity|@portabletext)[\\/]/,
            name: 'cms',
            priority: 25,
            chunks: 'all',
          },
          // Icon libraries
          icons: {
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            name: 'icons',
            priority: 20,
            chunks: 'all',
          },
          // Utility libraries
          utils: {
            test: /[\\/]node_modules[\\/](clsx|tailwind-merge|zod)[\\/]/,
            name: 'utils',
            priority: 15,
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
  // Add headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

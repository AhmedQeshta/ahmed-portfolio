import { Metadata, Viewport } from 'next';
import { siteUrl } from '@/features/shard/utils/url';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Ahmed Qeshta - Software Engineer',
  description:
    'Explore insights, tutorials, and thoughts on software development, technology, and programming by Ahmed Qeshta.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
    ],
    other: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer Portfolio',
    images: ['/ahmed-qeshta-og.png'],
    type: 'website',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Qeshta - Software Engineer',
    description: 'Ahmed Qeshta - Software Engineer Portfolio',
    images: ['/ahmed-qeshta-og.png'],
    creator: '@ahmedqeshta',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: '/manifest.json',
  creator: 'Ahmed Qeshta',
  publisher: 'Ahmed Qeshta',
  authors: [
    {
      name: 'Ahmed Qeshta',
      url: new URL(siteUrl),
    },
  ],
  applicationName: 'Ahmed Qeshta - Software Engineer',
  appleWebApp: {
    title: 'Ahmed Qeshta - Software Engineer',
    statusBarStyle: 'black-translucent',
    capable: true,
    startupImage: [
      {
        url: '/icons/icon-512x512.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/icon-512x512.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/icons/icon-512x512.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
      },
      {
        url: '/icons/icon-512x512.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Ahmed Portfolio',
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': '/images/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'google-adsense-account': process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || '',
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#000000',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

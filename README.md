# Ahmed Qeshta - Portfolio

A high-performance, accessible portfolio website built with Next.js 15, showcasing my work as a Software Engineer.

<img width="1847" height="1849" alt="Image" src="https://github.com/user-attachments/assets/9171a61c-118b-4b1d-a4e7-7769ce27556f" />

## 🚀 Performance Optimizations

This portfolio has been optimized for exceptional mobile performance and accessibility:

### Core Web Vitals Optimizations

- **LCP (Largest Contentful Paint)**: < 2.5s through optimized image loading and reduced animation complexity
- **FID (First Input Delay)**: < 100ms with code splitting and bundle optimization
- **CLS (Cumulative Layout Shift)**: < 0.1 with proper image sizing and layout stability

### Key Performance Features

- **Image Optimization**: WebP/AVIF support with next/image
- **Bundle Splitting**: Separate chunks for animations and vendor libraries
- **Tree Shaking**: Eliminated unused JavaScript code
- **CSS Optimization**: Reduced animation complexity for mobile devices
- **Preloading**: Critical resources preloaded for faster initial load
- **Compression**: Enabled gzip/brotli compression
- **Caching**: Optimized cache headers for static assets

### Accessibility (WCAG 2.1 AA Compliant)

- **Skip Navigation**: Skip-to-main-content link for keyboard users
- **ARIA Labels**: Comprehensive ARIA attributes for screen readers
- **Focus Management**: Proper focus indicators and keyboard navigation
- **Reduced Motion**: Respects user's motion preferences
- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Color Contrast**: Meets WCAG contrast requirements

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Styling**: Tailwind CSS with custom animations
- **CMS**: Sanity.io for content management
- **Animations**: Framer Motion (optimized)
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Testing**: Jest + React Testing Library

## 📱 PWA Features

- **Manifest**: Complete PWA manifest with shortcuts
- **Icons**: Maskable icons for all devices
- **Offline Support**: Service worker for basic offline functionality
- **Install Prompt**: Add to home screen capability

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ahmed-portfolio.git

# Navigate to the project directory
cd ahmed-portfolio

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
# or
yarn dev
```

## 📊 Build & Performance

```bash
# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Test coverage
npm run test:coverage

# Lint code
npm run lint
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_api_token

# Site Configuration
SITE_URL=https://yourdomain.com
GOOGLE_VERIFICATION=your_google_verification_code

# Email Configuration (if using contact form)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

## 📈 Performance Monitoring

The portfolio includes performance monitoring capabilities:

- Core Web Vitals tracking
- Error boundary with retry functionality
- Loading states with accessibility support
- Optimized animations based on device capability

## 🔍 SEO Optimizations

- **Sitemap**: Dynamic sitemap generation
- **Robots.txt**: Proper crawling instructions
- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Schema Markup**: Structured data for rich snippets
- **Canonical URLs**: Proper URL canonicalization

## 📋 Performance Checklist

- ✅ Images optimized with WebP/AVIF
- ✅ Critical CSS inlined
- ✅ JavaScript bundles split and optimized
- ✅ Fonts preloaded and optimized
- ✅ Service worker for caching
- ✅ Gzip/Brotli compression enabled
- ✅ CDN integration ready
- ✅ Mobile-first responsive design
- ✅ Accessibility audited
- ✅ Performance budget established

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Ahmed Qeshta**

- Website: [ahmedqeshta.vercel.app](https://ahmedqeshta.vercel.app)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/ahmedqeshta)
- Email: ahmed.qeshta.dev@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Sanity.io for the powerful CMS
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- Vercel for hosting and deployment

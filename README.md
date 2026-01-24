# Ahmed Qeshta's Portfolio

A modern, responsive portfolio website built with Next.js 15 and Sanity CMS, showcasing projects, blog posts, work experience, and professional information.

<img width="1847" height="1849" alt="Image" src="https://github.com/user-attachments/assets/797265d5-73e6-47b3-b582-02ab329408c1" />

## 🌟 Features

- **Dynamic Content Management**: Powered by Sanity CMS for easy content updates
- **Blog System**: Write and publish blog posts with rich content
- **Project Showcase**: Display projects with detailed information and media
- **Work Experience**: Professional timeline and experience showcase
- **Contact Form**: Functional contact form with email integration
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Built-in SEO features and meta tag management
- **Performance Optimized**: Fast loading with Next.js optimizations
- **Type Safety**: Full TypeScript implementation

## 🌟 Open Graph & SEO Setup

### Social Media Sharing

- **Default OG Image**: `/public/images/ahmed-qeshta-og.png` for general website sharing
- **Dynamic Blog Images**: Individual blog posts use their thumbnails with fallback to default
- **Smart Fallbacks**: All pages have proper fallback images if specific images aren't available

### SEO Features

- **Dynamic Metadata**: Each blog post and work experience has unique SEO titles and descriptions
- **Structured Data**: Proper article metadata for better search engine understanding
- **Social Media Optimization**: Twitter Cards and Open Graph properly configured
- **Canonical URLs**: Prevents duplicate content issues

### Image Requirements

- **Default OG Image**: 1200x630px (already in place)
- **Blog Thumbnails**: Any size (automatically handled with proper aspect ratios)
- **Work Logos**: Any size (falls back to default OG image if not available)

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Forms**: [Zod](https://zod.dev/) for validation
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Package Manager**: [Yarn](https://yarnpkg.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Sanity account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmedqeshta/ahmed-portfolio.git
   cd ahmed-portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token

   # Email Configuration (for contact form)
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=587
   EMAIL_USER=your_email@domain.com
   EMAIL_PASS=your_email_password
   EMAIL_TO=recipient@domain.com

   # Next.js Configuration
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up Sanity Studio**

   ```bash
   yarn sanity init
   ```

5. **Start the development server**
   ```bash
   yarn dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 📁 Project Structure

```
ahmed-portfolio/
├── app/                    # Next.js App Router
│   ├── (app)/             # Main app layout
│   ├── (pages)/           # Page routes
│   │   ├── blogs/         # Blog pages
│   │   ├── projects/      # Project pages
│   │   └── works/         # Work experience pages
│   └── (sanity)/          # Sanity Studio
├── features/              # Feature-based components
│   ├── blogs/             # Blog components
│   ├── contact/           # Contact form components
│   ├── projects/          # Project components
│   ├── works/             # Work experience components
│   ├── navbar/            # Navigation components
│   ├── header/            # Header components
│   └── shard/             # Shared components
├── sanity/                # Sanity CMS configuration
│   ├── lib/               # Sanity utilities
│   └── schemaTypes/       # Content schemas
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## 🎨 Content Management

Access the Sanity Studio at `/studio` to manage:

- **Base Info**: Personal information and bio
- **Projects**: Portfolio projects with descriptions, images, and links
- **Blog Posts**: Articles and blog content
- **Work Experience**: Professional experience and roles
- **Technologies**: Skills and technology stack
- **Categories**: Content categorization

## 🔄 Revalidation Webhook
To enable on-demand revalidation when content is published in Sanity:

1. Go to your Sanity Project Dashboard -> API -> Webhooks.
2. Create a new webhook:
   - **Name**: Portfolio Revalidation
   - **URL**: `https://your-site.com/api/revalidate/sanity`
   - **Trigger on**: Create, Update, Delete
   - **Filter**: `_type in ["blogPost", "project", "workExperience", "baseInfo", "technology", "category", "feature"]`
   - **Secret**: Set a strong secret string.
3. Add the secret to your deployment environment variables:
   ```env
   SANITY_REVALIDATE_SECRET=your_secret_here
   ```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

## 📱 Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test`

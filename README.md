# Ahmed Qeshta's Portfolio

A modern, responsive portfolio website built with Next.js 15 and Sanity CMS, showcasing projects, blog posts, work experience, and professional information.

<img width="1847" height="1849" alt="Image" src="https://github.com/user-attachments/assets/9171a61c-118b-4b1d-a4e7-7769ce27556f" />

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
- `yarn test` - Run Jest tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Generate test coverage report

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The project is configured for standalone output and can be deployed to:

- Railway
- Digital Ocean
- AWS
- Google Cloud Platform

## 🔧 Configuration

### Sanity Configuration

Edit `sanity.config.ts` to customize:

- Studio appearance
- Plugins and tools
- Schema organization

### Next.js Configuration

Modify `next.config.ts` for:

- Image optimization
- Performance settings
- Build optimizations

### Styling

Customize the design in:

- `tailwind.config.js` - Tailwind configuration
- `app/globals.css` - Global styles
- Component-specific styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Ahmed Qeshta**

- Email: [ahmed.qeshta.dev@gmail.com](mailto:ahmed.qeshta.dev@gmail.com)
- Portfolio: [https://ahmedqeshta.vercel.app](https://ahmedqeshta.vercel.app)
- LinkedIn: [linkedin.com/in/ahmedqeshta](https://linkedin.com/in/ahmedqeshta)
- GitHub: [github.com/ahmedqeshta](https://github.com/ahmedqeshta)

---

⭐ Star this repository if you found it helpful!

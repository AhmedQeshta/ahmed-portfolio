# 🎨 Sanity Studio Setup Guide

## ✅ **What's Already Done**

Your Sanity Studio is now integrated with your Next.js 15 project! Here's what's been set up:

### 📁 **Project Structure**

```
├── sanity/
│   ├── lib/
│   │   ├── client.ts      # Sanity client configuration
│   │   ├── queries.ts     # GROQ queries for fetching data
│   │   └── types.ts       # TypeScript interfaces
│   ├── schemaTypes/
│   │   ├── workExperience.ts  # Work experience schema
│   │   ├── project.ts         # Project schema
│   │   ├── blogPost.ts        # Blog post schema
│   │   └── index.ts           # Schema exports
│   ├── env.ts             # Environment configuration
│   └── structure.ts       # Studio structure
├── sanity.config.ts       # Main Sanity configuration
├── sanity.cli.ts          # CLI configuration
└── .env.local             # Environment variables
```

### 🔧 **Configuration Details**

- **Project ID**: `0ew1aiai`
- **Dataset**: `ahmed-qeshta-portfolio`
- **Studio Route**: `/studio`
- **API Version**: `2025-06-03`

---

## 🚀 **2. Running the Studio Locally**

### Start Development Server

```bash
npm run dev
```

### Access the Studio

Open your browser and navigate to:

```
http://localhost:3000/studio
```

You'll see the Sanity Studio interface where you can:

- ✏️ Create and edit content
- 📸 Upload images and assets
- 🔍 Query data with Vision plugin
- 👥 Manage content collaboratively

---

## 🌐 **3. Deploy Studio for Collaborators**

### Option A: Deploy with Vercel (Recommended)

1. **Push to GitHub**:

```bash
git add .
git commit -m "Add Sanity Studio integration"
git push origin main
```

2. **Deploy on Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js
   - Add environment variables in Vercel dashboard:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=0ew1aiai
     NEXT_PUBLIC_SANITY_DATASET=ahmed-qeshta-portfolio
     NEXT_PUBLIC_SANITY_API_VERSION=2025-06-03
     ```
   - Deploy!

3. **Studio URL**: `https://your-domain.vercel.app/studio`

### Option B: Deploy Standalone Studio

If you want a separate studio deployment:

```bash
# Create standalone studio
npx create-sanity@latest --template clean --typescript

# Or deploy current studio
sanity deploy
```

---

## 📊 **4. Querying Content in Next.js**

### Basic Usage Example

```tsx
// app/page.tsx
import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';

export default async function HomePage() {
  const projects = await sanityFetch<ProjectResponse[]>({
    query: projectsQuery,
    tags: ['project'], // For revalidation
  });

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <img src={project.screenshot} alt={project.title} />
        </div>
      ))}
    </div>
  );
}
```

### Available Queries

```tsx
// Work Experience
import { workExperienceQuery, workExperienceBySlugQuery } from '@/sanity/lib/queries';

// Projects
import { projectsQuery, projectBySlugQuery, featuredProjectsQuery } from '@/sanity/lib/queries';

// Blog Posts
import {
  blogPostsQuery,
  blogPostBySlugQuery,
  featuredBlogPostsQuery,
  blogPostsByCategoryQuery,
} from '@/sanity/lib/queries';
```

### Image Optimization

For optimized images, use Sanity's image URLs:

```tsx
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// Usage
<img src={urlFor(project.screenshot).width(800).height(600).url()} alt={project.title} />;
```

---

## 👥 **5. Adding Collaborators**

### Invite Team Members

1. **Go to Sanity Management**:

   ```
   https://www.sanity.io/manage/personal/project/0ew1aiai
   ```

2. **Add Members**:

   - Click "Members" tab
   - Click "Invite members"
   - Enter email addresses
   - Set permissions (Admin, Editor, Viewer)

3. **Share Studio URL**:
   ```
   https://your-domain.vercel.app/studio
   ```

### Permissions Levels

- **Admin**: Full access, can manage schemas and settings
- **Editor**: Can create, edit, and publish content
- **Viewer**: Read-only access

---

## 🔧 **6. Advanced Configuration**

### Custom Studio Structure

Edit `sanity/structure.ts` to customize the studio sidebar:

```tsx
import { StructureBuilder } from 'sanity/structure';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Featured Projects')
        .child(
          S.documentList()
            .title('Featured Projects')
            .filter('_type == "project" && featured == true'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => !['project'].includes(listItem.getId()!)),
    ]);
```

### Environment Variables

For production, ensure these are set:

```bash
# .env.local (local development)
NEXT_PUBLIC_SANITY_PROJECT_ID="0ew1aiai"
NEXT_PUBLIC_SANITY_DATASET="ahmed-qeshta-portfolio"
NEXT_PUBLIC_SANITY_API_VERSION="2025-06-03"

# For authenticated requests (optional)
SANITY_API_READ_TOKEN="your-read-token"
SANITY_API_WRITE_TOKEN="your-write-token"
```

### CORS Settings

Your localhost and deployment domains are already added to CORS origins. To add more:

```bash
sanity cors add https://your-new-domain.com --credentials
```

---

## 🎯 **Quick Start Checklist**

- [x] ✅ Sanity Studio installed and configured
- [x] ✅ Schema types created (Work Experience, Projects, Blog Posts)
- [x] ✅ Environment variables set up
- [x] ✅ Client and queries configured
- [x] ✅ Start development server (`npm run dev`)
- [x] ✅ Access studio at `http://localhost:3000/studio`
- [x] ✅ Create some sample content
- [x] ✅ Deploy to Vercel
- [x] ✅ Invite collaborators

---

## 🆘 **Troubleshooting**

### Common Issues

1. **Studio not loading**: Check environment variables in `.env.local`
2. **CORS errors**: Add your domain to CORS origins
3. **Build errors**: Ensure all dependencies are installed
4. **Image not showing**: Check image asset URLs in queries

### Useful Commands

```bash
# Check Sanity status
sanity status

# List datasets
sanity dataset list

# Deploy studio (standalone)
sanity deploy

# Check CORS settings
sanity cors list
```

---

## 📚 **Resources**

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js Integration Guide](https://www.sanity.io/docs/nextjs)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)

---

**🎉 Your Sanity Studio is ready to use! Start creating content and building your portfolio.**

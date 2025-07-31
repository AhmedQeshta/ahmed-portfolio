import Blog from '@/features/blogs/components/Blog';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostBySlugQuery, blogPostsQuery, featuresQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, FeatureResponse } from '@/sanity/lib/types';
import { FixedPageProps } from '@/types/app-router';
import { notFound } from 'next/navigation';
import { Metadata } from 'next/types';

// Metadata generation function
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });
    const blogFeature = features.filter(
      (_, { name, status }: any) => name === 'blogs' && status === 'publish',
    );

    if (!blogFeature) notFound();

    const blog = await sanityFetch<BlogPostResponse>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ['blogPost'],
    });

    if (!blog) return {};

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    const url = `${siteUrl}/blogs/${blog.slug}`;
    const title = blog.seo?.metaTitle || blog.title;
    const description = blog.seo?.metaDescription || blog.description;
    const image = blog.thumbnail;

    // Add category names to keywords
    const categoryNames = blog.categories?.map((cat) => cat.name) || [];
    const keywords = [...(blog.tags || []), ...categoryNames].join(', ');

    return {
      title,
      description,
      keywords,
      alternates: { canonical: url },
      other: {
        'article:tag': categoryNames.join(', '),
        'article:section': categoryNames[0] || 'Technology',
      },
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        images: image ? [image] : undefined,
        tags: [...(blog.tags || []), ...categoryNames],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : undefined,
        creator: '@ahmedqeshta',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

// Generate static params for all blog routes at build time
export async function generateStaticParams() {
  try {
    const blogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
    });

    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for blogs:', error);
    return [];
  }
}

// Use our fixed type to avoid the "not satisfying PageProps" error
export default async function Page(props: FixedPageProps) {
  const { slug } = await props.params;

  try {
    const blog = await sanityFetch<BlogPostResponse>({
      query: blogPostBySlugQuery,
      params: { slug },
      tags: ['blogPost'],
    });
    const latestBlogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
      params: {
        limit: 3,
        order: 'desc',
        orderBy: 'publishedAt',
      },
    });

    const relatedBlogs = await sanityFetch<BlogPostResponse[]>({
      query: blogPostsQuery,
      tags: ['blogPosts'],
      params: {
        limit: 3,
        order: 'desc',
        orderBy: 'publishedAt',
        exclude: [blog._id],
      },
    });

    return <Blog blog={blog} latestBlogs={latestBlogs} relatedBlogs={relatedBlogs} />;
  } catch (error) {
    return (
      <ErrorHandle id={'blog'} description={'Failed to load blog post. Please try again later.'} />
    );
  }
}

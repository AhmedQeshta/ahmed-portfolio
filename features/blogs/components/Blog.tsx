'use client';

import Technologies from '@/features/shard/components/ui/Technologies';
import Tags from '@/features/shard/components/ui/Tags';
import ShareCard from '@/features/shard/components/ui/ShareCard';
import LatestBlogs from '@/features/blogs/components/ui/LatestBlogs';
import RelatedBlogs from '@/features/blogs/components/ui/RelatedBlogs';
import PostDetails from '@/features/blogs/components/ui/PostDetails';
import HeroBlog from '@/features/blogs/components/ui/HeroBlog';
import BlogContent from '@/features/blogs/components/ui/BlogContent';
import BackgroundEffects from '@/features/shard/components/ui/BackgroundEffects';
import { IBlog } from '@/features/blogs/types/blog';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Blog({ blog, latestBlogs, relatedBlogs }: IBlog) {
  const { technologies, tags, description, slug, title } = blog;
  const { isDark } = useTheme();
  const url = `${process.env.SITE_URL ?? 'https://ahmedqeshta.vercel.app'}/blogs/${slug}`;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDark ? 'from-gray-900 via-black to-gray-900' : 'from-gray-50 via-white to-gray-100'
      }`}>
      {/* Navigation Header */}
      <NavigationHeader link="/blogs" text="Back to Blogs" />

      {/* Hero Section */}
      <HeroBlog blog={blog} />

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Blog Description */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-8 mb-8 text-justify`}>
                <p
                  className={`text-xl leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {description}
                </p>
              </div>

              {/* Blog Content */}
              <BlogContent blog={blog} />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Share Card */}
              <ShareCard url={url} title={title} />

              {/* Latest Blogs Card */}
              <LatestBlogs latestBlogs={latestBlogs} />

              {/* Related Blogs Card */}
              <RelatedBlogs relatedBlogs={relatedBlogs} />

              {/* Technologies Used */}
              <Technologies technologies={technologies} />

              {/* Tags */}
              <Tags tags={tags} />

              {/* Blog Stats Card */}
              <PostDetails blog={blog} />
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <BackgroundEffects />
    </div>
  );
}

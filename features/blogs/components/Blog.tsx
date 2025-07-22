import Technologies from '@/features/shard/components/ui/Technologies';
import Tags from '@/features/shard/components/ui/Tags';
import ShareCard from '@/features/blogs/components/ui/ShareCard';
import LatestBlogs from '@/features/blogs/components/ui/LatestBlogs';
import RelatedBlogs from '@/features/blogs/components/ui/RelatedBlogs';
import PostDetails from '@/features/blogs/components/ui/PostDetails';
import HeroBlog from '@/features/blogs/components/ui/HeroBlog';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';
import BlogContent from '@/features/blogs/components/ui/BlogContent';
import BackgroundEffects from '@/features/shard/components/ui/BackgroundEffects';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBlog } from '@/features/blogs/types/blog';

export default function Blog({ blog, latestBlogs, relatedBlogs }: IBlog) {
  const { technologies, tags, description, slug, title } = blog;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${slug}`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
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
              <ScrollAnimation
                direction="down"
                delay={0.2}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
              </ScrollAnimation>

              {/* Blog Content */}
              <BlogContent blog={blog} />
              {/* Technologies Used */}
              <Technologies technologies={technologies} />

              {/* Tags */}
              <Tags tags={tags} />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Share Card */}
              <ShareCard url={url} title={title} />

              {/* Latest Blogs Card */}
              <LatestBlogs latestBlogs={latestBlogs} />

              {/* Related Blogs Card */}
              <RelatedBlogs relatedBlogs={relatedBlogs} />

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

import { BlogPostResponse } from '@/sanity/lib/types';
import Technologies from '@/components/ui/Technologies';
import Tags from '@/components/ui/Tags';
import ShareCard from '@/components/ui/ShareCard';
import LatestBlogs from '@/components/Blogs/Features/LatestBlogs';
import RelatedBlogs from '@/components/Blogs/Features/RelatedBlogs';
import PostDetails from '@/components/Blogs/Features/PostDetails';
import HeroBlog from '@/components/Blogs/Features/HeroBlog';
import NavigationHeader from '@/components/ui/NavigationHeader';
import BlogContent from '@/components/Blogs/Features/BlogContent';
import BackgroundEffects from '@/components/ui/BackgroundEffects';

interface BlogProps {
  blog: BlogPostResponse;
  latestBlogs?: BlogPostResponse[];
  relatedBlogs?: BlogPostResponse[];
}

export default function Blog({ blog, latestBlogs = [], relatedBlogs = [] }: BlogProps) {
  const { technologies, tags, description } = blog;
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
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
              </div>

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
              <ShareCard />

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

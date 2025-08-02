import { IBlogCardProps } from '@/features/blogs/types/blog';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Card from './ui/Card';
import ReadMore from '@/features/shard/components/ui/ReadMore';

export default async function BlogCard({ blogs, readMore }: IBlogCardProps) {
  return (
    <>
      <ScrollAnimation
        direction="up"
        delay={0.3}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {blogs?.map((blog, index) => (
          <ScrollAnimation
            key={blog._id}
            direction="up"
            delay={0.4 + index * 0.1}
            className="h-full">
            <Card blog={blog} />
          </ScrollAnimation>
        ))}
      </ScrollAnimation>
      {/* Read More Section */}
      <ReadMore
        link="/blogs"
        text="View All Blogs"
        readMore={readMore}
        dataLength={blogs?.length || 0}
      />
    </>
  );
}

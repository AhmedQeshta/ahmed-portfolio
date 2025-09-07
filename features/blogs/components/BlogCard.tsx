'use client';
import { IBlogCardProps } from '@/features/blogs/types/blog';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Card from './ui/Card';
import ReadMore from '@/features/shard/components/ui/ReadMore';
import { useFilter } from '@/features/filters/hooks/useFilter';
import { BlogPostResponse } from '@/sanity/lib/types';
import Filter from '@/features/filters/components/Filter';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';

export default function BlogCard({ blogs, readMore, categories }: IBlogCardProps) {
  if (!blogs) return null;

  const { filtered, handleFilter, activeFilter } = useFilter<BlogPostResponse[]>(blogs);

  return (
    <>
      {readMore && (
        <Filter categories={categories} handleFilter={handleFilter} activeFilter={activeFilter} />
      )}
      {filtered?.length === 0 ? (
        <EmptyItem title="No blogs found" subTitle="Check back soon for new articles!" icon="📝" />
      ) : (
        <>
          <ScrollAnimation
            direction="up"
            delay={0.3}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered?.map((blog, index) => (
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
            dataLength={filtered?.length || 0}
          />
        </>
      )}
    </>
  );
}

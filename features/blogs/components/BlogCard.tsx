'use client';
import { IBlogCardProps } from '@/features/blogs/types/blog';
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered?.map((blog, index) => (
              <div key={blog._id} className="h-full">
                <Card blog={blog} />
              </div>
            ))}
          </div>
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

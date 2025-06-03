import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  html: string;
  description: string;
  tags: string[];
  category: string;
  thumbnail: string;
  slug: string;
}

interface BlogGridProps {
  blogs?: BlogPost[];
  readMore?: boolean;
}

export default function BlogGrid({ blogs = [], readMore = true }: BlogGridProps) {
  // Default example item as specified in requirements
  const defaultBlogs: BlogPost[] = [
    {
      id: '1',
      title: 'How to Master React',
      description: 'Tips and tricks for building scalable React apps with Next.js.',
      html: '<h1>this is title</h1>',
      tags: ['tag1', 'tag2', 'tag3'],
      category: 'Category Blog',
      thumbnail: '/images/sample-blog.png',
      slug: 'how-to-master-react',
    },
  ];

  const items = blogs.length > 0 ? blogs : defaultBlogs;

  return (
    // add the tags as a badge and the category and do not add html
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 gradient-text">Blogs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((blog) => (
            <div
              key={blog.id}
              className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition">
              <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">📝</span>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{blog.description}</p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-sm text-white/80 hover:text-white underline">
                  Read Blog
                </Link>
              </div>
            </div>
          ))}
        </div>

        {readMore && (
          <div className="flex justify-center mt-12">
            <Link
              href="/blogs"
              className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
              View All Blogs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

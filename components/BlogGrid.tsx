import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

interface BlogGridProps {
  blogs?: BlogPost[];
}

export default function BlogGrid({ blogs = [] }: BlogGridProps) {
  // Default example item as specified in requirements
  const defaultBlogs: BlogPost[] = [
    {
      id: '1',
      title: 'How to Master React',
      description: 'Tips and tricks for building scalable React apps with Next.js.',
      thumbnail: '/images/sample-blog.png',
      slug: 'how-to-master-react',
    },
  ];

  const items = blogs.length > 0 ? blogs : defaultBlogs;

  return (
    <section id="blog" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-[linear-gradient(to-r,#ffffff,#e9d5ff,#c084fc)]">
          Blogs
        </h2>

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
                  href={`/blog/${blog.slug}`}
                  className="text-sm text-white/80 hover:text-white underline">
                  Read Blog
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-6 py-3 bg-[linear-gradient(to-r,#9333ea,#db2777)] rounded-full text-white hover:bg-[linear-gradient(to-r,#7c3aed,#be185d)] transition">
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
}

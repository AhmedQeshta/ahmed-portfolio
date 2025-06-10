import { BlogPostResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, User, Share2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

interface BlogProps {
  blog: BlogPostResponse;
  latestBlogs?: BlogPostResponse[];
  relatedBlogs?: BlogPostResponse[];
}

export default function Blog({ blog, latestBlogs = [], relatedBlogs = [] }: BlogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatReadingTime = (time?: number) => {
    return time ? `${time} min read` : '5 min read';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}
      <div className="relative z-10 p-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" priority />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Categories and Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.categories?.map((category) => (
                <span
                  key={category._id}
                  className="px-3 py-1 bg-purple-600/80 text-white text-sm rounded-full backdrop-blur-sm">
                  {category.name}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{formatReadingTime(blog.readingTime)}</span>
              </div>
              {blog.featured && (
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded border border-yellow-500/30">
                  FEATURED
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Blog Description */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                <p className="text-xl text-gray-300 leading-relaxed">{blog.description}</p>
              </div>

              {/* Blog Content */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                <div className="prose prose-invert prose-lg max-w-none">
                  <PortableText
                    value={blog.content}
                    components={{
                      block: {
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-bold text-white mb-3 mt-5">{children}</h3>
                        ),
                        normal: ({ children }) => (
                          <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-purple-500 pl-6 my-6 italic text-gray-400">
                            {children}
                          </blockquote>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="text-white font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => <em className="text-purple-300">{children}</em>,
                        code: ({ children }) => (
                          <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                            {children}
                          </code>
                        ),
                      },
                      types: {
                        image: ({ value }) => (
                          <div className="my-8">
                            <Image
                              src={value.asset.url}
                              alt={value.alt || ''}
                              width={800}
                              height={400}
                              className="rounded-lg w-full h-auto"
                            />
                          </div>
                        ),
                        codeBlock: ({ value }) => (
                          <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
                            <code className={`language-${value.language} text-green-400 text-sm`}>
                              {value.code}
                            </code>
                          </pre>
                        ),
                      },
                    }}
                  />
                </div>
              </div>

              {/* Technologies Used */}
              {blog.technologies && blog.technologies.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                    <Tag size={24} className="text-purple-400" />
                    Technologies Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.technologies.map((tech) => (
                      <span
                        key={tech._id}
                        className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition-colors">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Share Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                  <Share2 size={20} className="text-blue-400" />
                  Share This Post
                </h3>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                    Share on Twitter
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors text-sm">
                    Share on LinkedIn
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Latest Blogs Card */}
              {latestBlogs.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Latest Posts</h3>
                  <div className="space-y-4">
                    {latestBlogs.slice(0, 3).map((latestBlog) => (
                      <Link
                        key={latestBlog._id}
                        href={`/blogs/${latestBlog.slug}`}
                        className="block group">
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={latestBlog.thumbnail}
                              alt={latestBlog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-purple-300 transition-colors">
                              {latestBlog.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate(latestBlog.publishedAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blogs"
                    className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    View all posts →
                  </Link>
                </div>
              )}

              {/* Related Blogs Card */}
              {relatedBlogs.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                      <Link
                        key={relatedBlog._id}
                        href={`/blogs/${relatedBlog.slug}`}
                        className="block group">
                        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={relatedBlog.thumbnail}
                              alt={relatedBlog.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm font-medium line-clamp-2 group-hover:text-purple-300 transition-colors">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatReadingTime(relatedBlog.readingTime)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Stats Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Post Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Published:</span>
                    <span className="font-medium text-gray-200">
                      {formatDate(blog.publishedAt)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reading Time:</span>
                    <span className="font-medium text-gray-200">
                      {formatReadingTime(blog.readingTime)}
                    </span>
                  </div>
                  {blog.categories && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Categories:</span>
                      <span className="font-medium text-gray-200">{blog.categories.length}</span>
                    </div>
                  )}
                  {blog.tags && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tags:</span>
                      <span className="font-medium text-gray-200">{blog.tags.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}

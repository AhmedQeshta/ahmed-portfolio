import { ProjectResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

interface ProjectModalProps {
  project: ProjectResponse;
}

export default function Project({ project }: ProjectModalProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'in-progress':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'on-hold':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}
      <div className="relative z-10 p-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            {/* Title and Description */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-700">
                <Github size={20} />
                Source Code
              </a>
            )}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Full Description */}
              {project.fullDescription && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    About This Project
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none">
                    <PortableText value={project.fullDescription} />
                  </div>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="group relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                        <Image
                          src={image}
                          alt={`${project.title} gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              {(project.startDate || project.endDate) && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                    <Calendar size={24} className="text-blue-400" />
                    Timeline
                  </h3>
                  <div className="space-y-3 text-gray-300">
                    {project.startDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span className="font-medium">{formatDate(project.startDate)}</span>
                      </div>
                    )}
                    {project.endDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Completed:</span>
                        <span className="font-medium">{formatDate(project.endDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                    <Tag size={24} className="text-purple-400" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech._id}
                        className="px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition-colors">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Stats */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status).replace('border-', 'border ')}`}>
                      {project.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  {project.technologies && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Technologies:</span>
                      <span className="font-medium text-gray-200">
                        {project.technologies.length}
                      </span>
                    </div>
                  )}
                  {project.gallery && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Gallery Images:</span>
                      <span className="font-medium text-gray-200">{project.gallery.length}</span>
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

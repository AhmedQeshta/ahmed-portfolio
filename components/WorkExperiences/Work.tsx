import { WorkExperienceResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import {
  ExternalLink,
  MapPin,
  Calendar,
  Briefcase,
  Building,
  Award,
  ArrowLeft,
} from 'lucide-react';
import { durationOfWork, formatDate } from '@/utils/date';
import { getImageUrl } from '@/sanity/lib/image';
import Link from 'next/link';

interface WorkProps {
  work: WorkExperienceResponse;
}

export default function Work({ work }: WorkProps) {
  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'part-time':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'freelance':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'contract':
        return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'internship':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getLocationTypeColor = (type: string) => {
    switch (type) {
      case 'remote':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'on-site':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'hybrid':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}
      <div className="relative z-10 p-6">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Work Experience
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30" />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            {/* Status Badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span
                className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getEmploymentTypeColor(work.employmentType)}`}>
                {work.employmentType.replace('-', ' ').toUpperCase()}
              </span>
              {work.current && (
                <span className="inline-block px-4 py-2 text-sm font-medium rounded-full border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                  CURRENT POSITION
                </span>
              )}
              {work.locationType && (
                <span
                  className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getLocationTypeColor(work.locationType)}`}>
                  {work.locationType.replace('-', ' ').toUpperCase()}
                </span>
              )}
            </div>

            {/* Title and Company */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {work.title}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <Building size={28} className="text-purple-400" />
              {work.companyUrl ? (
                <a
                  href={work.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-2">
                  {work.company}
                  <ExternalLink size={24} />
                </a>
              ) : (
                <span className="text-2xl md:text-3xl text-gray-200">{work.company}</span>
              )}
            </div>
            {work.description && (
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed">
                {work.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Action Buttons */}
          {work.companyUrl && (
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href={work.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Building size={20} />
                Visit Company
              </a>
            </div>
          )}

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Company Information */}
              {work.logo && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Building size={28} className="text-purple-400" />
                    Company
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white p-2 flex-shrink-0">
                      <Image
                        src={getImageUrl(work.logo, 80, 80, 90)}
                        alt={work.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{work.company}</h3>
                      {work.companyUrl && (
                        <a
                          href={work.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-2">
                          Visit Company Website
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Key Achievements */}
              {work.achievements && work.achievements.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Award size={28} className="text-yellow-400" />
                    Key Achievements
                  </h2>
                  <ul className="space-y-4">
                    {work.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {work.skills && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Skills & Responsibilities</h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">{work.skills}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                  <Calendar size={24} className="text-blue-400" />
                  Timeline
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Started:</span>
                    <span className="font-medium">{formatDate(work.startDate)}</span>
                  </div>
                  {work.endDate && !work.current && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ended:</span>
                      <span className="font-medium">{formatDate(work.endDate)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-medium">
                      {durationOfWork(work.startDate, work.endDate || '', work.current)
                        .split('|')[1]
                        ?.trim() || 'Current'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              {work.location && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                    <MapPin size={24} className="text-green-400" />
                    Location
                  </h3>
                  <div className="text-gray-300">
                    <p className="font-medium">{work.location}</p>
                    <p className="text-sm text-gray-400 capitalize mt-1">
                      {work.locationType?.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Technologies */}
              {work.technologies && work.technologies.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                    <Briefcase size={24} className="text-purple-400" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {work.technologies.map((tech) => (
                      <div
                        key={tech._id}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition-colors">
                        {tech.logo && (
                          <div className="relative w-4 h-4">
                            <Image
                              src={getImageUrl(tech.logo, 16, 16, 90)}
                              alt={tech.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Details */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Work Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getEmploymentTypeColor(work.employmentType)}`}>
                      {work.employmentType.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Work Mode:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getLocationTypeColor(work.locationType)}`}>
                      {work.locationType?.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  {work.current && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="px-2 py-1 rounded text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
                        ACTIVE
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

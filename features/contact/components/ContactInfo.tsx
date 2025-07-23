import { BaseInfoResponse } from '@/sanity/lib/types';
import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';

interface IContactInfo {
  baseInfo: BaseInfoResponse;
}

export default function ContactInfo({ baseInfo }: IContactInfo) {
  // Fix the email/phone mix-up
  const { email: phoneValue, phone: emailValue, address, profilePicture, name } = baseInfo;
  const email = emailValue;
  const phone = phoneValue;

  return (
    <div className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 max-w-3xl mx-auto text-center flex flex-col items-center hover:bg-card-hover transition duration-300">
      {/* Profile Image */}
      <div className="w-28 h-28 mb-6 relative rounded-full overflow-hidden border-2 border-white/10 shadow-xl group">
        {profilePicture ? (
          <Image
            src={getImageUrl(profilePicture, 200, 200)}
            alt={name || 'Profile'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <Image
            src="/images/apple-icon-180x180.png"
            alt="Profile"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Headline Content */}
      <h2 className="text-xl text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium">
        Got an idea for a new project?
      </h2>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Or looking for a front-end developer to join your team?
      </h1>
      <p className="text-text-secondary mb-8 max-w-2xl">
        Whether you have a project in mind, want to collaborate, or just want to say hi, I'm always
        open to meaningful conversations.
      </p>

      {/* Contact Button */}
      <button className="px-6 py-3 gradient-button-primary rounded-full mb-8 text-sm font-medium shadow-lg hover:shadow-purple-600/20 transition-all duration-300">
        Send Message
      </button>

      {/* Contact Methods */}
      <h3 className="text-lg text-white font-medium mb-4 w-full text-left">Contact Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Email */}
        <div className="flex flex-col h-full bg-card-bg backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-600/10 group">
          <div className="bg-gradient-to-r from-blue-600/10 to-blue-500/5 p-4 border-b border-white/5">
            <div className="p-2 rounded-full bg-blue-600/20 inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-sm font-medium text-white mb-1">Email</h3>
            <p className="text-xs text-text-secondary break-all">{email}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col h-full bg-card-bg backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-600/10 group">
          <div className="bg-gradient-to-r from-green-600/10 to-green-500/5 p-4 border-b border-white/5">
            <div className="p-2 rounded-full bg-green-600/20 inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-sm font-medium text-white mb-1">Phone</h3>
            <p className="text-xs text-text-secondary">{phone}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col h-full bg-card-bg backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-600/10 group">
          <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 p-4 border-b border-white/5">
            <div className="p-2 rounded-full bg-amber-600/20 inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
          <div className="p-4 flex-grow">
            <h3 className="text-sm font-medium text-white mb-1">Location</h3>
            <p className="text-xs text-text-secondary">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

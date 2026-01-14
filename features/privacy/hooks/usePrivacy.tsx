import {
  FileText,
  Database,
  Settings,
  Globe,
  Cookie,
  Lock,
  Scale,
  Baby,
  FileEdit,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export const usePrivacy = () => {
  const { isDark } = useTheme();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const thirdPartyServices = [
    {
      name: 'Google AdSense',
      description:
        'Our website uses Google AdSense to display advertisements. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to our website or other websites.',
      links: [
        {
          text: "Google's Ads Settings",
          url: 'https://www.google.com/settings/ads',
        },
        {
          text: 'www.aboutads.info',
          url: 'https://www.aboutads.info/choices/',
        },
      ],
    },
    {
      name: 'Sanity CMS',
      description:
        'Our website content is managed through Sanity CMS. Sanity may collect technical information about your device and usage patterns when you access content from their servers.',
      links: [
        {
          text: "Sanity's Privacy Policy",
          url: 'https://www.sanity.io/legal/privacy',
        },
      ],
    },
    {
      name: 'Google reCAPTCHA',
      description:
        'We use Google reCAPTCHA v3 to protect our contact form from spam and abuse. reCAPTCHA works by collecting hardware and software information, such as device and application data, and sending this data to Google for analysis.',
      links: [
        {
          text: "Google's Privacy Policy",
          url: 'https://policies.google.com/privacy',
        },
        {
          text: 'Terms of Service',
          url: 'https://policies.google.com/terms',
        },
      ],
    },
    {
      name: 'MailChimp',
      description:
        'We use MailChimp to manage our newsletter subscriptions. When you subscribe to our newsletter, your email address and name are stored in MailChimp.',
      links: [
        {
          text: "MailChimp's Privacy Policy",
          url: 'https://mailchimp.com/legal/privacy/',
        },
      ],
    },
  ];

  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function properly.',
    },
    {
      name: 'Analytics Cookies',
      description:
        'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    },
    {
      name: 'Advertising Cookies',
      description:
        'These cookies are used to deliver advertisements relevant to you and your interests.',
    },
  ];

  const userRights = [
    {
      title: 'Right to Access',
      description: 'You have the right to request copies of your personal data.',
    },
    {
      title: 'Right to Rectification',
      description:
        'You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.',
    },
    {
      title: 'Right to Erasure',
      description:
        'You have the right to request that we erase your personal data, under certain conditions.',
    },
    {
      title: 'Right to Restrict Processing',
      description:
        'You have the right to request that we restrict the processing of your personal data, under certain conditions.',
    },
    {
      title: 'Right to Object to Processing',
      description:
        'You have the right to object to our processing of your personal data, under certain conditions.',
    },
    {
      title: 'Right to Data Portability',
      description:
        'You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
    },
    {
      title: 'Right to Withdraw Consent',
      description:
        'You have the right to withdraw your consent at any time where we rely on consent to process your personal information.',
    },
  ];

  const sections = [
    {
      id: 'introduction',
      icon: FileText,
      title: 'Introduction',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            Welcome to Ahmed Qeshta&apos;s portfolio website (the &quot;Site&quot;). This Privacy
            Policy explains how we collect, use, disclose, and safeguard your information when you
            visit our website. Please read this privacy policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access the site.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use',
      icon: Settings,
      title: 'How We Use Your Information',
      gradient: 'from-amber-500/20 to-orange-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="space-y-2 ml-6 list-disc">
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Improve our website and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and ensure website security</li>
          </ul>
        </>
      ),
    },
    {
      id: 'data-security',
      icon: Lock,
      title: 'Data Security',
      gradient: 'from-red-500/20 to-rose-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or electronic storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </>
      ),
    },
    {
      id: 'children-privacy',
      icon: Baby,
      title: "Children's Privacy",
      gradient: 'from-pink-500/20 to-rose-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            Our website is not intended for children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you are a parent or guardian and
            believe that your child has provided us with personal information, please contact us
            immediately so we can delete such information.
          </p>
        </>
      ),
    },
    {
      id: 'information-collect',
      icon: Database,
      title: 'Information We Collect',
      gradient: 'from-purple-500/20 to-pink-500/20',
      content: (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <p className="text-lg leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>Fill out our contact form (name, email address, message)</li>
              <li>Subscribe to our newsletter (email address, name)</li>
              <li>Download resources such as CV or portfolio materials</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
            <p className="text-lg leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your
              device, including:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Date and time of your visit</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies and Tracking Technologies',
      gradient: 'from-indigo-500/20 to-violet-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track activity on our website and
            hold certain information. Cookies are files with a small amount of data which may
            include an anonymous unique identifier. Cookies are sent to your browser from a website
            and stored on your device.
          </p>
          <p className="text-lg leading-relaxed mb-6">We use the following types of cookies:</p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } transition-all duration-300 hover:scale-[1.02]`}>
                <h4 className="font-semibold text-lg mb-2">{cookie.name}</h4>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {cookie.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you do not accept cookies, you may not be able to use some
            portions of our website.
          </p>
        </>
      ),
    },
    {
      id: 'third-party',
      icon: Globe,
      title: 'Third-Party Services',
      gradient: 'from-green-500/20 to-emerald-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6">
            We use several third-party services that may collect information about you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } transition-all duration-300 hover:scale-[1.01]`}>
                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                <p
                  className={`text-base leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {service.description}
                </p>
                {service.name === 'Google AdSense' && (
                  <p
                    className={`text-base leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    You may opt out of personalized advertising by visiting the links below. You can
                    also opt out of third-party vendor&apos;s use of cookies for personalized
                    advertising.
                  </p>
                )}
                {service.name === 'Google Analytics' && (
                  <p
                    className={`text-base leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    You can prevent Google Analytics from recognizing you on return visits by
                    disabling cookies in your browser or by installing the opt-out add-on.
                  </p>
                )}
                <div className="flex flex-wrap gap-3 mt-4">
                  {service.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isDark
                          ? 'bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 border border-purple-500/30'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200'
                      } hover:scale-105`}>
                      {link.text}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'your-rights',
      icon: Scale,
      title: 'Your Rights',
      gradient: 'from-teal-500/20 to-cyan-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6">
            Depending on your location, you may have the following rights regarding your personal
            information:
          </p>
          <div className="grid md:grid-cols-1 gap-4 mb-4">
            {userRights.map((right, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } transition-all duration-300 hover:scale-[1.02]`}>
                <h4 className="font-semibold text-lg mb-2">{right.title}</h4>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {right.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg leading-relaxed">
            To exercise any of these rights, please contact us using the contact information
            provided below.
          </p>
        </>
      ),
    },
    {
      id: 'changes',
      icon: FileEdit,
      title: 'Changes to This Privacy Policy',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the &quot;Last updated&quot;
            date. You are advised to review this Privacy Policy periodically for any changes.
            Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </>
      ),
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact Us',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div
            className={`p-6 rounded-lg border ${
              isDark
                ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-purple-500/30'
                : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200'
            }`}>
            <div className="space-y-4">
              <div>
                <strong className="text-lg">Email:</strong>{' '}
                <a
                  href="mailto:ahmedqeshta0@gmail.com"
                  className={`font-semibold transition-colors ${
                    isDark
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-purple-600 hover:text-purple-700'
                  } hover:underline`}>
                  ahmed.qeshta.dev@gmail.com
                </a>
              </div>
              <div>
                <strong className="text-lg">Website:</strong>{' '}
                <a
                  href="https://ahmedqeshta.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 font-semibold transition-colors ${
                    isDark
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-purple-600 hover:text-purple-700'
                  } hover:underline`}>
                  https://ahmedqeshta.tech
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className={`mt-4 text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              You can also use the contact form on our website to reach out regarding
              privacy-related inquiries.
            </p>
          </div>
        </>
      ),
    },
  ];

  return { lastUpdated, sections, isDark };
};

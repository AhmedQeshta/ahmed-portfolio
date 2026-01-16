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
        'Our website partners with Google AdSense to use advertising on our site. Google AdSense uses cookies and other tracking technologies to place advertising based on your previous visits to our site or other sites.',
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
        'The content on our website is managed on Sanity CMS. Sanity may gather technical information about your device when you visit their server for content.',
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
        'To avoid spammers and unwanted activities on the website, we employ Google reCAPTCHA v3. Note that this service collects users’ hardware and software attributes through their device and applications, which are then submitted to Google for evaluation.',
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
        'For our newsletter service, we use a tool from MailChimp. If you subscribe to our newsletters, your email and name will be recorded on a database maintained by MailChimp.',
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
      description: 'These cookies are required for the functionality of the website.',
    },
    {
      name: 'Analytics Cookies',
      description:
        'These cookies allow us to track interactions with our website to collect information for anonymous reporting.',
    },
    {
      name: 'Advertising Cookies',
      description:
        'These cookies are designed for the delivery of ads relevant to you and your interests.',
    },
  ];

  const userRights = [
    {
      title: 'Right to Access',
      description: 'You are entitled to access copies of your personal data.',
    },
    {
      title: 'Right to Rectification',
      description:
        'You have the right to request that we correct any information that you believe is inaccurate or complete your information that you believe is incomplete.',
    },
    {
      title: 'Right to Erasure',
      description: 'You can ask us to delete your personal data. There are conditions.',
    },
    {
      title: 'Right to Restrict Processing',
      description:
        'You have a right to request that we restrict the processing of your personal data.',
    },
    {
      title: 'Right to Object to Processing',
      description:
        'You may exercise your right to object to us processing your personal data in certain circumstances.',
    },
    {
      title: 'Right to Data Portability',
      description:
        'You have the right, under certain circumstances, to ask for the transfer of the information that we have collected to a new organization, or directly to you.',
    },
    {
      title: 'Right to Withdraw Consent',
      description:
        'You can withdraw your consent to the processing of your personal data at any time if the basis for processing is consent.',
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
            Welcome to Ahmed Qeshta&apos;s portfolio website the &ldquo;Site&ldquo;. This Privacy
            Policy describes how we collect, use, disclose, and protect your information when you
            visit our website. Please read this privacy policy carefully. If you do not agree with
            the terms of this Privacy Policy, please do not access the site.
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
            <li>Address your questions and issues and provide customer service </li>
            <li>Send newsletters and updates (with your consent)</li>
            <li>Ensure improvement in website & user experience</li>
            <li>Analyzing website traffic and usage patterns</li>
            <li>Comply with the law</li>
            <li>Prevent Frauds and Website Security</li>
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
            Those necessary technical and organizational measures are used to ensure the protection
            of your personal data against unauthorized access, change, disclosure, or destruction.
            Nevertheless, the transmission of data over the Internet or electronic data storage is
            not 100% secure.
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
            Our website is not aimed at persons under the age of 13 years. We do not collect
            personal information from persons under the age of 13 years. If your child has provided
            personal information, please inform us so that the information can be deleted.
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
            We use cookies and similar tracking technologies to track activities on our website and
            store certain information. Cookies are files with a small amount of data that may
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
            You may choose to have your browser refuse our cookies, or you may, if you wish, alert
            you before a cookie is sent to you. However, if you decline a cookie, you may not be
            able to fully use our website.
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
                    You can opt out of advertising targeting by clicking on the following links. You
                    can also opt out of third-party vendors use of cookies for advertising.
                  </p>
                )}
                {service.name === 'Google Analytics' && (
                  <p
                    className={`text-base leading-relaxed mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    You can opt out of Google Analytics tracking on future visits by opting out of
                    the use of cookies or using the opt-out add-on.
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
            We reserve the right to make changes to this Privacy Policy from time to time. By
            notifying you through our Privacy Policy being posted on this page with a notice under
            the “Last Updated” heading, changes become effective. So, it is always best to keep a
            check on the Privacy Policy from time to time for any changes.
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
              You can also contact us through the contact form available on our website with regards
              to privacy-related queries.
            </p>
          </div>
        </>
      ),
    },
  ];

  return { lastUpdated, sections, isDark };
};

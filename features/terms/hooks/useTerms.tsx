import {
  FileText,
  Shield,
  Scale,
  AlertCircle,
  Copyright,
  Globe,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export const useTerms = () => {
  const { isDark } = useTheme();
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sections = [
    {
      id: 'introduction',
      icon: FileText,
      title: 'Introduction',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            Welcome to Ahmed Qeshta&apos;s portfolio website. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            ANY PARTICIPATION IN THIS SITE WILL CONSTITUTE ACCEPTANCE OF THIS AGREEMENT. IF YOU DO NOT AGREE TO ABIDE BY THE ABOVE, PLEASE DO NOT USE THIS SITE.
          </p>
        </>
      ),
    },
    {
      id: 'intellectual-property',
      icon: Copyright,
      title: 'Intellectual Property',
      gradient: 'from-amber-500/20 to-orange-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            This site and its original content, features, and functionality are owned by Ahmed Qeshta and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except specific open-source code snippets or projects explicitly marked with a permissive license (e.g., MIT License).
          </p>
        </>
      ),
    },
    {
      id: 'user-obligations',
      icon: Shield,
      title: 'User Obligations',
      gradient: 'from-green-500/20 to-emerald-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            By using this website, you agree not to:
          </p>
          <ul className="space-y-2 ml-6 list-disc">
            <li>Use the website in any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the website, the server on which the website is stored, or any server, computer, or database connected to the website.</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'disclaimer',
      icon: AlertCircle,
      title: 'Disclaimer',
      gradient: 'from-red-500/20 to-rose-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            The information provided on this website is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
          </p>
        </>
      ),
    },
    {
      id: 'external-links',
      icon: Globe,
      title: 'External Links',
      gradient: 'from-purple-500/20 to-pink-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.
          </p>
        </>
      ),
    },
    {
      id: 'governing-law',
      icon: Scale,
      title: 'Governing Law',
      gradient: 'from-indigo-500/20 to-violet-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of Palestine and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
            If you have any questions about these Terms, please contact us:
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
                    ahmedqeshta0@gmail.com
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
          </div>
        </>
      ),
    },
  ];

  return { lastUpdated, sections, isDark };
};

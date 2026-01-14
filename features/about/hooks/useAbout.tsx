import { useTheme } from '@/features/theme/hooks/useTheme';
import OptimizedLink from '@/features/shard/components/ui/OptimizedLink';
import { Briefcase, Code, GraduationCap, Lightbulb, MessageCircle, User } from 'lucide-react';

export const useAbout = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      id: 'who-i-am',
      icon: User,
      title: 'Who I Am',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            I&apos;m Ahmed Qeshta, a passionate software engineer dedicated to building innovative
            digital solutions that make a difference. With a strong foundation in both frontend and
            backend development, I specialize in creating modern, scalable web applications and
            mobile experiences that combine functionality with exceptional user design.
          </p>
          <p className="text-lg leading-relaxed">
            My journey in software development began with a curiosity about how things work behind
            the scenes. Over the years, I&apos;ve honed my skills across various technologies and
            frameworks, always staying current with the latest industry trends and best practices. I
            believe in writing clean, maintainable code and following software engineering
            principles that ensure long-term project success.
          </p>
        </>
      ),
    },
    {
      id: 'expertise',
      icon: Code,
      title: 'My Expertise',
      gradient: 'from-purple-500/20 to-pink-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            As a full-stack developer, I work across the entire technology stack, from designing
            intuitive user interfaces to building robust server-side architectures. My technical
            expertise spans multiple programming languages, frameworks, and tools, allowing me to
            choose the right technology for each project&apos;s unique requirements.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I have extensive experience with modern web technologies including React, Next.js,
            TypeScript, and Node.js. I&apos;m proficient in building responsive, mobile-first
            applications that perform seamlessly across all devices. On the backend, I work with
            various databases, API design, and cloud services to create scalable solutions that can
            grow with your business needs.
          </p>
          <p className="text-lg leading-relaxed">
            Beyond web development, I also have experience in mobile app development, allowing me to
            create cross-platform solutions that provide consistent experiences across web and
            mobile platforms. I&apos;m well-versed in modern development practices including version
            control, testing, continuous integration, and agile methodologies.
          </p>
        </>
      ),
    },
    {
      id: 'approach',
      icon: Lightbulb,
      title: 'My Approach',
      gradient: 'from-amber-500/20 to-orange-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            I believe that great software is built through collaboration, clear communication, and a
            deep understanding of user needs. Every project I work on starts with understanding the
            problem we&apos;re solving and the people we&apos;re solving it for. This user-centric
            approach ensures that the solutions I build are not just technically sound, but also
            genuinely useful and intuitive.
          </p>
          <p className="text-lg leading-relaxed">
            Quality and attention to detail are at the core of my work. I&apos;m committed to
            writing code that is not only functional but also maintainable, well-documented, and
            follows industry best practices. I understand that software development is an iterative
            process, and I&apos;m always open to feedback and continuous improvement.
          </p>
        </>
      ),
    },
    {
      id: 'services',
      icon: Briefcase,
      title: 'What I Do',
      gradient: 'from-green-500/20 to-emerald-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-6">
            I offer a range of services to help bring your digital ideas to life:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Web Development',
                desc: 'Building responsive, modern web applications using the latest technologies and frameworks',
              },
              {
                title: 'Mobile App Development',
                desc: 'Creating cross-platform mobile applications that work seamlessly on iOS and Android',
              },
              {
                title: 'Full-Stack Solutions',
                desc: 'Developing end-to-end applications from database design to user interface',
              },
              {
                title: 'Consulting',
                desc: 'Providing technical guidance and expertise to help you make informed decisions about your technology stack',
              },
              {
                title: 'Code Review & Optimization',
                desc: 'Improving existing codebases for better performance, maintainability, and scalability',
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isDark
                    ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } transition-all duration-300 hover:scale-[1.02]`}>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'learning',
      icon: GraduationCap,
      title: 'Continuous Learning',
      gradient: 'from-indigo-500/20 to-violet-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            The technology landscape is constantly evolving, and I&apos;m committed to staying at
            the forefront of these changes. I regularly engage in continuous learning through online
            courses, technical blogs, open-source contributions, and hands-on experimentation with
            new technologies. This commitment to growth ensures that I can bring the most current
            and effective solutions to every project.
          </p>
          <p className="text-lg leading-relaxed">
            I also believe in sharing knowledge with the community. Through my blog posts and
            technical writing, I aim to help other developers learn and grow while documenting my
            own journey and discoveries in software development.
          </p>
        </>
      ),
    },
    {
      id: 'connect',
      icon: MessageCircle,
      title: `Let's Connect`,
      gradient: 'from-rose-500/20 to-pink-500/20',
      content: (
        <>
          <p className="text-lg leading-relaxed mb-4">
            I&apos;m always interested in discussing new projects, opportunities, or just connecting
            with fellow developers and technology enthusiasts. Whether you have a project in mind,
            want to collaborate, or simply want to chat about technology, feel free to reach out.
          </p>
          <div
            className={`p-6 rounded-lg border ${
              isDark
                ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            }`}>
            <p className="text-lg leading-relaxed mb-4">
              You can explore my work through the{' '}
              <OptimizedLink
                href="/projects"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                projects
              </OptimizedLink>{' '}
              and{' '}
              <OptimizedLink
                href="/works"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                work experience
              </OptimizedLink>{' '}
              sections, read my thoughts on{' '}
              <OptimizedLink
                href="/blogs"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                my blog
              </OptimizedLink>
              , or get in touch through the{' '}
              <OptimizedLink
                href="/#contact"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                contact form
              </OptimizedLink>
              . I look forward to hearing from you!
            </p>
          </div>
        </>
      ),
    },
  ];

  return { sections, isDark };
};

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
            Hello, I&apos;m Ahmed Qeshta. A passionate software engineer with quite a determination
            to create innovative digital solutions that make a difference. Backed by a solid
            foundation in both frontend and backend development, I specialize in creating modern,
            scalable web applications along with mobile experiences that merge functionality with
            exceptional user design.
          </p>
          <p className="text-lg leading-relaxed">
            My software development experience began as a result of my curiosity to know the
            mechanics behind the scenes. Over the years, I have sharpened my skills on a number of
            technologies, keeping myself up to date with the latest developments. My interests
            include coding with clean, scalable code, as well as software development principles to
            ensure a successful end product.
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
            As a full stack developer, I have exposure to the whole technology stack. This ranges
            from designing user-friendly interfaces to constructing complex server-side solutions.
            Technically proficient in a number of programming languages and tools, I decide which
            tools to apply to which task based on its requirements.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            I possess industry expertise with current web development technologies such as React,
            Next.js, TypeScript, and Node.js. Moreover, I am knowledgeable about developing
            mobile-first websites that are fully responsive. Furthermore, having expertise with
            databases, REST API, as well as cloud-based solutions, I am capable of developing
            scalable solutions that are upgradable as per your growing business requirements.
          </p>
          <p className="text-lg leading-relaxed">
            Besides web development, I also possess experience in mobile app development, which
            enables me to develop cross-platform apps offering unified experiences across various
            web and mobile platforms. I possess good knowledge about contemporary web development
            techniques, version control, testing, integration, and agile.
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
            I think that excellent software can be created through collaboration, communication, and
            a good understanding of what our users need. Every software development project that I
            undertake begins with a process of understanding that problem we are trying to solve, as
            well as the people we are trying to solve it for.
          </p>
          <p className="text-lg leading-relaxed">
            Quality and attention to detail are the very foundation of everything I do. I am
            dedicated to ensuring that the code I write is not only efficient but maintainable and
            follows industry best practices. I recognize that software development is a continuous
            process and am eager to accept feedback.
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
            Here are some of the services I provide in making your digital concepts come into
            reality:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Web Development',
                desc: 'Creating responsive and modern web applications based on contemporary technologies and tools',
              },
              {
                title: 'Mobile App Development',
                desc: 'Developing cross-platform mobile applications that are compatible with both iOS and Android operating systems',
              },
              {
                title: 'Full-Stack Solutions',
                desc: 'Creating end-to-end applications ranging from database design to UI',
              },
              {
                title: 'Consulting',
                desc: 'Offering technical guidance and expertise to assist with decision making regarding your technology choices',
              },
              {
                title: 'Code Review & Optimization',
                desc: 'Enhancing existing codes to improve performance, maintenance, and scalability',
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
            The technology environment undergoes dynamic evolution, which is something that I am
            eager to be up-to-date with. Through continuous learning, such as completing online
            courses, following technical blogs, working with open source projects, as well as
            experimenting with new technologies, it becomes possible for me to bring the most
            up-to-date solutions to each of the projects that I work on.
          </p>
          <p className="text-lg leading-relaxed">
            I also believe that sharing knowledge within the community is part of my role. Through
            my blog postings and tech writing expertise, I can facilitate learning for some
            developers and document my experience and findings within the industry of software
            development.
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
            I&apos;m always eager to explore new projects, ideas, or just connect with developers
            and tech enthusiasts. Whether you&apos;d like to discuss a project you&apos;d like to
            undertake, work together on a project, or simply want to chat about the world of tech,
            I&apos;m here for you.
          </p>
          <div
            className={`p-6 rounded-lg border ${
              isDark
                ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
            }`}>
            <p className="text-lg leading-relaxed mb-4">
              You can explore my work through the
              <OptimizedLink
                href="/projects"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                projects
              </OptimizedLink>
              and
              <OptimizedLink
                href="/works"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                work experience
              </OptimizedLink>
              sections, read my thoughts on
              <OptimizedLink
                href="/blogs"
                className={`font-semibold transition-colors ${
                  isDark
                    ? 'text-purple-400 hover:text-purple-300'
                    : 'text-purple-600 hover:text-purple-700'
                } hover:underline`}>
                my blog
              </OptimizedLink>
              , or get in touch through the
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

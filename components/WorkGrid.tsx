import Image from 'next/image';

interface WorkItem {
  id: string;
  title: string;
  company: string;
  technologies: string;
  period: string;
  logo: string;
  description?: string;
}

interface WorkGridProps {
  workItems?: WorkItem[];
}

export default function WorkGrid({ workItems = [] }: WorkGridProps) {
  // Default example item as specified in requirements
  const defaultWorkItems: WorkItem[] = [
    {
      id: '1',
      title: 'FrontEnd Developer',
      company: 'Google for Startups',
      technologies: 'React, Next.js, TailwindCSS',
      period: 'Jan 2023 – Dec 2023',
      logo: '/logos/example-company-logo.png',
      description:
        'Built E-commerce sites, learned new skills, and tackled tough problems at Google for Startups program.',
    },
  ];

  const items = workItems.length > 0 ? workItems : defaultWorkItems;

  return (
    <section id="work" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 bg-clip-text text-transparent bg-[linear-gradient(to-r,#ffffff,#e9d5ff,#c084fc)]">
          Work Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-card-hover transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-2xl font-bold">{item.company.charAt(0)}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-text-secondary mb-2">{item.company}</p>
              <p className="text-text-accent text-sm mb-2">Technologies: {item.technologies}</p>
              <p className="text-text-secondary text-sm mb-4">{item.period}</p>

              {item.description && (
                <p className="text-text-secondary text-sm mb-4">{item.description}</p>
              )}

              <button className="px-4 py-2 bg-[linear-gradient(to-r,#9333ea,#db2777)] rounded-md text-white text-sm hover:bg-[linear-gradient(to-r,#7c3aed,#be185d)] transition">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

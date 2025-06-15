import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { WorkExperienceResponse } from '@/sanity/lib/types';

interface SkillsProps {
  work: WorkExperienceResponse;
}
export default function Skills({ work: { skills } }: SkillsProps) {
  if (!skills) return null;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.1}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-2xl font-bold text-white mb-6">Skills & Responsibilities</h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="text-gray-300 leading-relaxed whitespace-pre-line">{skills}</div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

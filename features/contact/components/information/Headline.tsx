import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function HeadLine() {
  return (
    <ScrollAnimation direction="down" delay={0.2}>
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
          Let's Build Something
          <span className="gradient-text block">Extraordinary Together</span>
        </h3>
        <p className="text-text-secondary leading-relaxed">
          I'm passionate about creating digital experiences that make a difference. Whether you're
          looking to collaborate on a project or need a dedicated developer for your team, I'd love
          to hear from you.
        </p>
      </div>
    </ScrollAnimation>
  );
}

import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function ContactHeader() {
  return (
    <div className="text-center mb-16 lg:mb-20">
      <ScrollAnimation direction="down" delay={0.1}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-purple-300">Get In Touch</span>
        </div>
      </ScrollAnimation>

      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="gradient-text">Let's Create</span>
          <br />
          <span className="text-white">Something Amazing</span>
        </h2>
      </ScrollAnimation>

      <ScrollAnimation direction="down" delay={0.3}>
        <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Ready to bring your ideas to life? Whether it's a new project, collaboration, or just a
          friendly chat about technology, I'm here to help.
        </p>
      </ScrollAnimation>
    </div>
  );
}

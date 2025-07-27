import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function TimeInfo() {
  return (
    <ScrollAnimation direction="down" delay={0.4}>
      <div className="mt-auto">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Quick Response</span>
          </div>
          <p className="text-text-secondary text-sm">
            I typically respond within 24 hours. For urgent matters, feel free to call directly.
          </p>
        </div>
      </div>
    </ScrollAnimation>
  );
}

import ScrollAnimation from './ScrollAnimation';

interface ITags {
  tags?: string[];
}

export default function Tags({ tags }: ITags) {
  if (!tags || tags.length === 0) return null;

  return (
    <ScrollAnimation
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
      data-testid="tags-container">
      <ScrollAnimation direction="down" delay={0.2}>
        <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.4} className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <ScrollAnimation
            key={index}
            direction="down"
            delay={0.5 + index * 0.1}
            className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30">
            #{tag}
          </ScrollAnimation>
        ))}
      </ScrollAnimation>
    </ScrollAnimation>
  );
}

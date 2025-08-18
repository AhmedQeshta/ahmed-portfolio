export default function KeyboardHint({ length }: { length: number }) {
  if (length <= 1) return null;
  return (
    <div className="absolute top-16 right-6 z-20 bg-black/70 backdrop-blur-md rounded-lg px-4 py-2">
      <p className="text-gray-300 text-xs">Use ← → keys to navigate</p>
    </div>
  );
}

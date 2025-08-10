export default function Content() {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        You're Offline
      </h1>
      <p className="text-gray-400 text-lg leading-relaxed">
        It looks like you've lost your internet connection. Don't worry, you can still view cached
        content from your previous visits.
      </p>
    </div>
  );
}

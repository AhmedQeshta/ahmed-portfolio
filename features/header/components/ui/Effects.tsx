export default function Effects() {
  return (
    <>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />

      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] left-[15%] w-2 h-2 bg-purple-400/60 rounded-full animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute top-[20%] right-[20%] w-1 h-1 bg-blue-400/60 rounded-full animate-float"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-[60%] left-[10%] w-3 h-3 bg-pink-400/60 rounded-full animate-float"
          style={{ animationDelay: '4s' }}
        />
        <div
          className="absolute bottom-[30%] right-[15%] w-2 h-2 bg-purple-400/60 rounded-full animate-float"
          style={{ animationDelay: '6s' }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-1 h-1 bg-blue-400/60 rounded-full animate-float"
          style={{ animationDelay: '8s' }}
        />
        <div
          className="absolute bottom-[40%] right-[30%] w-2 h-2 bg-pink-400/60 rounded-full animate-float"
          style={{ animationDelay: '10s' }}
        />
      </div>
    </>
  );
}

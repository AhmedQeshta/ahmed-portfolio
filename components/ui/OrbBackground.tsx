export default function OrbBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
      {/* Purple orb */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orb-purple rounded-full blur-3xl animate-pulse"></div>

      {/* Blue orb */}
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orb-blue rounded-full blur-3xl animate-pulse"></div>

      {/* Pink orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orb-pink rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
}

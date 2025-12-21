export default function OrbBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      data-testid="orb-background">
      {/* Blue orb */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orb-blue rounded-full blur-3xl animate-pulse"
        data-testid="orb-blue"></div>
    </div>
  );
}

const particles = [
  { emoji: '🦕', x: '8%', y: '12%', size: 28, dur: '7s', delay: '0s' },
  { emoji: '🦖', x: '88%', y: '8%', size: 24, dur: '9s', delay: '1.5s' },
  { emoji: '🌿', x: '5%', y: '55%', size: 20, dur: '6s', delay: '0.8s' },
  { emoji: '🌋', x: '92%', y: '60%', size: 22, dur: '8s', delay: '2s' },
  { emoji: '🦴', x: '15%', y: '85%', size: 18, dur: '7s', delay: '3s' },
  { emoji: '🥚', x: '80%', y: '88%', size: 20, dur: '5s', delay: '1s' },
  { emoji: '⚡', x: '50%', y: '5%', size: 16, dur: '6s', delay: '2.5s' },
  { emoji: '🦷', x: '70%', y: '30%', size: 14, dur: '8s', delay: '0.5s' },
];

const orbs = [
  { color: 'rgba(124,58,237,0.35)', x: '10%', y: '15%', size: 400, dur: '18s', delay: '0s' },
  { color: 'rgba(37,99,235,0.3)', x: '70%', y: '60%', size: 350, dur: '22s', delay: '3s' },
  { color: 'rgba(6,182,212,0.2)', x: '40%', y: '75%', size: 300, dur: '16s', delay: '6s' },
  { color: 'rgba(168,85,247,0.2)', x: '85%', y: '20%', size: 280, dur: '20s', delay: '9s' },
];

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f0720 0%, #0a1628 40%, #0d1f18 70%, #0a0f1e 100%)',
        }}
      />

      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full orb-drift"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            '--dur': orb.dur,
            '--delay': orb.delay,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating emoji particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute float-particle select-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            '--dur': p.dur,
            '--delay': p.delay,
            opacity: 0.4,
            filter: 'blur(0.5px)',
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Bottom gradient vignette */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }}
      />
    </div>
  );
}

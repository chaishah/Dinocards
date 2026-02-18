// Floating geometric particles — no emojis, just subtle shapes
const dots = [
  { x: '8%',  y: '12%', size: 3,  dur: '7s',  delay: '0s'   },
  { x: '88%', y: '8%',  size: 2,  dur: '9s',  delay: '1.5s' },
  { x: '5%',  y: '55%', size: 4,  dur: '6s',  delay: '0.8s' },
  { x: '92%', y: '60%', size: 2,  dur: '8s',  delay: '2s'   },
  { x: '15%', y: '85%', size: 3,  dur: '7s',  delay: '3s'   },
  { x: '80%', y: '88%', size: 2,  dur: '5s',  delay: '1s'   },
  { x: '50%', y: '5%',  size: 2,  dur: '6s',  delay: '2.5s' },
  { x: '70%', y: '30%', size: 3,  dur: '8s',  delay: '0.5s' },
  { x: '35%', y: '70%', size: 2,  dur: '9s',  delay: '4s'   },
  { x: '60%', y: '45%', size: 2,  dur: '7s',  delay: '1.2s' },
];

// Very subtle, cool-steel orbs
const orbs = [
  { color: 'rgba(148,163,184,0.06)', x: '15%',  y: '20%', size: 440, dur: '22s', delay: '0s'  },
  { color: 'rgba(100,116,139,0.05)', x: '75%',  y: '65%', size: 380, dur: '28s', delay: '4s'  },
  { color: 'rgba(71, 85,105,0.07)',  x: '45%',  y: '78%', size: 320, dur: '18s', delay: '8s'  },
  { color: 'rgba(51, 65, 85,0.08)', x: '88%',  y: '25%', size: 300, dur: '24s', delay: '12s' },
];

// Small geometric cross/line shape as SVG
const CrossShape = ({ size }) => (
  <svg width={size * 3} height={size * 3} viewBox="0 0 12 12" fill="none">
    <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
    <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
  </svg>
);

const DiamondShape = ({ size }) => (
  <svg width={size * 4} height={size * 4} viewBox="0 0 16 16" fill="none">
    <rect
      x="4" y="4" width="8" height="8"
      transform="rotate(45 8 8)"
      stroke="rgba(148,163,184,0.2)"
      strokeWidth="1"
    />
  </svg>
);

export default function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient — deep steel charcoal */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(145deg, #090c12 0%, #0d1117 45%, #0a0e16 75%, #080b10 100%)',
        }}
      />

      {/* Subtle steel orbs */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full orb-drift"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 65%)`,
            transform: 'translate(-50%, -50%)',
            '--dur': orb.dur,
            '--delay': orb.delay,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Fine dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.8,
        }}
      />

      {/* Horizontal scan lines — very subtle */}
      <div
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(148,163,184,0.015) 3px, rgba(148,163,184,0.015) 4px)',
        }}
      />

      {/* Floating geometric dot particles */}
      {dots.map((p, i) => (
        <div
          key={i}
          className="absolute float-particle"
          style={{
            left: p.x,
            top: p.y,
            '--dur': p.dur,
            '--delay': p.delay,
          }}
        >
          {i % 3 === 0 ? (
            <CrossShape size={p.size} />
          ) : i % 3 === 1 ? (
            <DiamondShape size={p.size} />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: p.size * 2,
                height: p.size * 2,
                background: 'rgba(148,163,184,0.25)',
                boxShadow: '0 0 6px rgba(148,163,184,0.15)',
              }}
            />
          )}
        </div>
      ))}

      {/* Corner vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)',
        }}
      />
    </div>
  );
}

import { motion } from 'framer-motion';

// SVG icons — no emoji
const SkullIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="24" stroke="rgba(148,163,184,0.2)" strokeWidth="1.5"/>
    <ellipse cx="26" cy="23" rx="14" ry="13" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" fill="none"/>
    <circle cx="20" cy="21" r="4" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" fill="none"/>
    <circle cx="32" cy="21" r="4" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" fill="none"/>
    <path d="M20 33v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <line x1="26" y1="33" x2="26" y2="38" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 9A6 6 0 1 0 4.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <polyline points="1,3 4.5,5 3,8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const StatCard = ({ value, label, color, delay }) => (
  <motion.div
    className="flex-1 rounded-2xl p-4 flex flex-col items-center gap-1"
    style={{
      background: 'rgba(148,163,184,0.05)',
      border: '1px solid rgba(148,163,184,0.1)',
    }}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 22 }}
  >
    <span className="text-2xl font-black" style={{ color }}>{value}</span>
    <span style={{ fontSize: '9px', color: 'rgba(148,163,184,0.4)', letterSpacing: '0.15em', fontWeight: 600 }}>
      {label}
    </span>
  </motion.div>
);

export default function ResultScreen({ total, liked, onRestart }) {
  const percentage = Math.round((liked / total) * 100);

  const getMessage = () => {
    if (percentage >= 80) return { title: 'Dino Superfan', sub: 'You love almost every prehistoric beast.' };
    if (percentage >= 60) return { title: 'Paleo Enthusiast', sub: 'Dinosaurs definitely have your attention.' };
    if (percentage >= 40) return { title: 'Curious Explorer', sub: 'Some species caught your eye.' };
    return { title: 'Picky Paleontologist', sub: 'Very selective taste in prehistoric creatures.' };
  };

  const { title, sub } = getMessage();

  return (
    <motion.div
      className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto px-4"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      {/* Title block */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-center mb-3">
          <SkullIcon />
        </div>
        <h2
          className="font-black text-white"
          style={{ fontSize: '1.5rem', letterSpacing: '-0.03em', color: 'rgba(220,228,240,0.95)' }}
        >
          {title}
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(148,163,184,0.45)', marginTop: '4px', fontWeight: 500 }}>{sub}</p>
      </motion.div>

      {/* Stats panel */}
      <div
        className="w-full rounded-3xl p-5 flex flex-col gap-4"
        style={{
          background: 'rgba(148,163,184,0.04)',
          border: '1px solid rgba(148,163,184,0.1)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Circular progress ring */}
        <div className="flex items-center justify-center">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="7" />
              <motion.circle
                cx="50" cy="50" r="42" fill="none"
                stroke="url(#steelGrad)" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 42}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 42 * (1 - percentage / 100)}` }}
                transition={{ delay: 0.3, duration: 1.4, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="steelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(148,163,184,0.6)" />
                  <stop offset="100%" stopColor="rgba(194,207,224,0.9)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="font-black"
                style={{ fontSize: '1.5rem', color: 'rgba(220,228,240,0.95)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {percentage}%
              </motion.span>
              <span style={{ fontSize: '9px', color: 'rgba(148,163,184,0.4)', letterSpacing: '0.1em', fontWeight: 600 }}>
                LIKED
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <StatCard value={liked} label="LIKED" color="rgba(155,191,164,0.8)" delay={0.2} />
          <StatCard value={total - liked} label="PASSED" color="rgba(194,130,130,0.8)" delay={0.3} />
          <StatCard value={total} label="TOTAL" color="rgba(194,207,224,0.8)" delay={0.4} />
        </div>
      </div>

      {/* Restart button */}
      <motion.button
        onClick={onRestart}
        className="w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2.5 relative overflow-hidden"
        style={{
          background: 'rgba(148,163,184,0.08)',
          border: '1px solid rgba(148,163,184,0.18)',
          backdropFilter: 'blur(16px)',
          color: 'rgba(194,207,224,0.85)',
          fontSize: '13px',
          letterSpacing: '0.08em',
        }}
        whileHover={{
          background: 'rgba(148,163,184,0.14)',
          boxShadow: '0 8px 32px rgba(148,163,184,0.12)',
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute inset-0 shimmer rounded-2xl" />
        <RefreshIcon />
        <span className="relative font-black tracking-widest">EXPLORE AGAIN</span>
      </motion.button>
    </motion.div>
  );
}

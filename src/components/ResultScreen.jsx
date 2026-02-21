import { motion } from 'framer-motion';
import { calcPersonality } from '../data/personalities';

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M3 9A6 6 0 1 0 4.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <polyline points="1,3 4.5,5 3,8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const PersonalityIcon = ({ type, color }) => {
  switch (type) {
    case 'apex_predator':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M26 10 L32 22 L44 24 L35 33 L37 45 L26 39 L15 45 L17 33 L8 24 L20 22 Z" stroke={color} strokeOpacity="0.7" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
          <circle cx="26" cy="26" r="4" fill={color} fillOpacity="0.25"/>
        </svg>
      );
    case 'gentle_giant':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M26 14 C26 14 16 18 16 28 C16 36 26 42 26 42 C26 42 36 36 36 28 C36 18 26 14 26 14Z" stroke={color} strokeOpacity="0.7" strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
          <path d="M22 26 L25 29 L30 23" stroke={color} strokeOpacity="0.8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'sky_ruler':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M6 26 C6 26 16 14 26 14 C36 14 46 26 46 26 L26 22 Z" stroke={color} strokeOpacity="0.7" strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
          <circle cx="26" cy="22" r="3" fill={color} fillOpacity="0.5"/>
        </svg>
      );
    case 'living_fortress':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M26 12 L38 18 L38 30 C38 37 26 42 26 42 C26 42 14 37 14 30 L14 18 Z" stroke={color} strokeOpacity="0.7" strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
          <path d="M22 26 L25 29 L31 22" stroke={color} strokeOpacity="0.9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'feathered_visionary':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M26 40 C26 40 12 32 12 20 C12 14 18 12 22 14 C24 15 26 18 26 18 C26 18 28 15 30 14 C34 12 40 14 40 20 C40 32 26 40 26 40Z" stroke={color} strokeOpacity="0.6" strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
          <line x1="26" y1="18" x2="26" y2="36" stroke={color} strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      );
    case 'titan_chaser':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M10 38 L18 22 L26 10 L34 22 L42 38 Z" stroke={color} strokeOpacity="0.6" strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
          <path d="M16 38 L22 28 L26 20 L30 28 L36 38" stroke={color} strokeOpacity="0.4" strokeWidth="1" fill="none"/>
        </svg>
      );
    case 'speed_freak':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M28 12 L20 26 L26 26 L22 40 L34 22 L28 22 Z" stroke={color} strokeOpacity="0.7" strokeWidth="1.5" fill={color} fillOpacity="0.15" strokeLinejoin="round"/>
        </svg>
      );
    case 'horn_collector':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <ellipse cx="26" cy="30" rx="12" ry="9" stroke={color} strokeOpacity="0.6" strokeWidth="1.5" fill={color} fillOpacity="0.08"/>
          <path d="M18 30 L14 14" stroke={color} strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M26 30 L26 12" stroke={color} strokeOpacity="0.9" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M34 30 L38 14" stroke={color} strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case 'deep_diver':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <path d="M10 28 C14 24 18 32 22 28 C26 24 30 32 34 28 C38 24 42 28 42 28" stroke={color} strokeOpacity="0.5" strokeWidth="1.2" fill="none"/>
          <path d="M10 34 C14 30 18 38 22 34 C26 30 30 38 34 34 C38 30 42 34 42 34" stroke={color} strokeOpacity="0.3" strokeWidth="1" fill="none"/>
          <path d="M26 10 L20 22 L32 22 Z" fill={color} fillOpacity="0.4" stroke={color} strokeOpacity="0.6" strokeWidth="1.2"/>
        </svg>
      );
    case 'paleo_completionist':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          {[0,45,90,135,180,225,270,315].map((a, i) => (
            <line key={i}
              x1="26" y1="26"
              x2={26 + 16 * Math.cos(a * Math.PI / 180)}
              y2={26 + 16 * Math.sin(a * Math.PI / 180)}
              stroke={color} strokeOpacity="0.5" strokeWidth="1.2" strokeLinecap="round"
            />
          ))}
          <circle cx="26" cy="26" r="5" fill={color} fillOpacity="0.4" stroke={color} strokeOpacity="0.7" strokeWidth="1"/>
        </svg>
      );
    case 'prehistoric_contrarian':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <line x1="16" y1="16" x2="36" y2="36" stroke={color} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
          <line x1="36" y1="16" x2="16" y2="36" stroke={color} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default: // true_explorer
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke={color} strokeOpacity="0.2" strokeWidth="1.5"/>
          <circle cx="26" cy="26" r="14" stroke={color} strokeOpacity="0.4" strokeWidth="1.2" fill="none"/>
          <line x1="26" y1="12" x2="26" y2="40" stroke={color} strokeOpacity="0.3" strokeWidth="1"/>
          <line x1="12" y1="26" x2="40" y2="26" stroke={color} strokeOpacity="0.3" strokeWidth="1"/>
          <path d="M26 16 L29 24 L26 22 L23 24 Z" fill={color} fillOpacity="0.7"/>
        </svg>
      );
  }
};

const StatPill = ({ value, label, color, delay }) => (
  <motion.div
    className="flex-1 rounded-2xl p-3 flex flex-col items-center gap-0.5"
    style={{
      background: 'rgba(148,163,184,0.05)',
      border: '1px solid rgba(148,163,184,0.1)',
    }}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 22 }}
  >
    <span className="text-xl font-black" style={{ color }}>{value}</span>
    <span style={{ fontSize: '9px', color: 'rgba(148,163,184,0.4)', letterSpacing: '0.14em', fontWeight: 600 }}>
      {label}
    </span>
  </motion.div>
);

export default function ResultScreen({ likedDinos, total, onRestart }) {
  const personality = calcPersonality(likedDinos);
  const liked = likedDinos.length;
  const passed = total - liked;

  return (
    <motion.div
      className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto px-4"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
    >
      {/* Personality card */}
      <motion.div
        className="w-full rounded-3xl overflow-hidden relative"
        style={{
          background: `linear-gradient(160deg, ${personality.gradientFrom} 0%, ${personality.gradientTo} 100%)`,
          border: '1px solid rgba(148,163,184,0.1)',
          boxShadow: '0 24px 56px rgba(0,0,0,0.5)',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: 'spring', stiffness: 220, damping: 24 }}
      >
        {/* Glow blob */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${personality.accentColor}22 0%, transparent 70%)`,
            transform: 'translate(20%, -20%)',
          }}
        />

        <div className="relative px-6 pt-6 pb-5 flex flex-col items-center gap-3 text-center">
          {/* Label */}
          <span
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              color: personality.accentColor,
              background: `${personality.accentColor}18`,
              border: `1px solid ${personality.accentColor}35`,
              fontSize: '9px',
              letterSpacing: '0.18em',
            }}
          >
            YOUR PALEO PERSONALITY
          </span>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <PersonalityIcon type={personality.key} color={personality.accentColor} />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(1.3rem, 5vw, 1.6rem)', letterSpacing: '-0.03em', color: 'rgba(220,228,240,0.97)' }}
            >
              {personality.title}
            </h2>
            <p
              className="font-semibold uppercase tracking-widest mt-0.5"
              style={{ fontSize: '10px', color: personality.accentColor, opacity: 0.8 }}
            >
              {personality.subtitle}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            className="leading-relaxed"
            style={{ fontSize: '12px', color: 'rgba(200,215,230,0.7)', fontWeight: 500, maxWidth: '30ch' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {personality.description}
          </motion.p>

          {/* Divider */}
          <div
            className="w-12 h-0.5 rounded-full mt-1"
            style={{ background: `linear-gradient(to right, transparent, ${personality.accentColor}60, transparent)` }}
          />

          {/* Stats row */}
          <div className="flex gap-2 w-full">
            <StatPill value={liked} label="LIKED" color="rgba(155,191,164,0.85)" delay={0.35} />
            <StatPill value={passed} label="PASSED" color="rgba(194,130,130,0.85)" delay={0.4} />
            <StatPill value={total} label="TOTAL" color="rgba(194,207,224,0.85)" delay={0.45} />
          </div>
        </div>
      </motion.div>

      {/* Liked dinos chips */}
      {likedDinos.length > 0 && (
        <motion.div
          className="w-full rounded-2xl px-4 py-3"
          style={{
            background: 'rgba(148,163,184,0.04)',
            border: '1px solid rgba(148,163,184,0.09)',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="mb-2"
            style={{ fontSize: '9px', color: 'rgba(148,163,184,0.4)', fontWeight: 700, letterSpacing: '0.18em' }}
          >
            YOUR PICKS
          </p>
          <div className="flex flex-wrap gap-1.5">
            {likedDinos.map(d => (
              <span
                key={d.id}
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: `${d.accentColor}14`,
                  border: `1px solid ${d.accentColor}30`,
                  color: d.accentColor,
                  fontSize: '10px',
                }}
              >
                {d.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Restart */}
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
        whileHover={{ background: 'rgba(148,163,184,0.14)', boxShadow: '0 8px 32px rgba(148,163,184,0.12)' }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="absolute inset-0 shimmer rounded-2xl" />
        <RefreshIcon />
        <span className="relative font-black tracking-widest">NEW RANDOM DECK</span>
      </motion.button>
    </motion.div>
  );
}

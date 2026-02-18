import { motion } from 'framer-motion';

// SVG icons — no emoji
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
    <path
      d="M11 17.5S2 12 2 6a4 4 0 0 1 7.5-1.9A4 4 0 0 1 20 6c0 6-9 11.5-9 11.5z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
  </svg>
);

const UndoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5A5 5 0 1 0 4.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <polyline points="1,3 4.5,5 3,8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <polygon
      points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"
    />
  </svg>
);

const ActionButton = ({ onClick, disabled, children, color, size = 'md' }) => {
  const sizes = {
    sm: 'w-11 h-11',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} rounded-full flex items-center justify-center
        transition-colors duration-200 select-none outline-none
        disabled:opacity-25 disabled:cursor-not-allowed`}
      style={{
        background: `rgba(${color}, 0.08)`,
        border: `1px solid rgba(${color}, 0.2)`,
        boxShadow: disabled ? 'none' : `0 4px 20px rgba(${color}, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)`,
        backdropFilter: 'blur(16px)',
        color: disabled ? `rgba(${color}, 0.3)` : `rgba(${color}, 0.75)`,
      }}
      whileHover={!disabled ? {
        scale: 1.06,
        background: `rgba(${color}, 0.14)`,
        boxShadow: `0 6px 28px rgba(${color}, 0.22)`,
      } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default function SwipeButtons({ onSwipeLeft, onSwipeRight, onUndo, canUndo, remaining }) {
  return (
    <div className="flex items-center gap-3">
      {/* Pass */}
      <ActionButton onClick={onSwipeLeft} disabled={remaining === 0} color="194, 130, 130" size="lg">
        <XIcon />
      </ActionButton>

      {/* Undo */}
      <ActionButton onClick={onUndo} disabled={!canUndo} color="148, 163, 184" size="sm">
        <UndoIcon />
      </ActionButton>

      {/* Bookmark / Star */}
      <ActionButton onClick={() => {}} disabled={remaining === 0} color="192, 176, 128" size="sm">
        <StarIcon />
      </ActionButton>

      {/* Like */}
      <ActionButton onClick={onSwipeRight} disabled={remaining === 0} color="155, 191, 164" size="lg">
        <HeartIcon />
      </ActionButton>
    </div>
  );
}

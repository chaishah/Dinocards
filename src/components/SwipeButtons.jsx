import { motion } from 'framer-motion';

const ActionButton = ({ onClick, disabled, children, color, glow, size = 'md' }) => {
  const sizes = {
    sm: 'w-11 h-11 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-16 h-16 text-3xl',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${sizes[size]} rounded-full flex items-center justify-center
        transition-all duration-200 select-none outline-none
        disabled:opacity-30 disabled:cursor-not-allowed`}
      style={{
        background: `rgba(${color}, 0.15)`,
        border: `1.5px solid rgba(${color}, 0.35)`,
        boxShadow: disabled ? 'none' : `0 8px 24px rgba(${color}, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)`,
        backdropFilter: 'blur(12px)',
      }}
      whileHover={!disabled ? { scale: 1.08, boxShadow: `0 12px 32px rgba(${color}, 0.45)` } : {}}
      whileTap={!disabled ? { scale: 0.92 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default function SwipeButtons({ onSwipeLeft, onSwipeRight, onUndo, canUndo, remaining }) {
  return (
    <div className="flex items-center gap-4">
      {/* Pass / Nope */}
      <ActionButton
        onClick={onSwipeLeft}
        disabled={remaining === 0}
        color="239, 68, 68"
        size="lg"
      >
        <span>✕</span>
      </ActionButton>

      {/* Undo */}
      <ActionButton
        onClick={onUndo}
        disabled={!canUndo}
        color="168, 85, 247"
        size="sm"
      >
        <span className="text-base">↩</span>
      </ActionButton>

      {/* Info */}
      <ActionButton
        onClick={() => {}}
        disabled={remaining === 0}
        color="234, 179, 8"
        size="sm"
      >
        <span className="text-base">⭐</span>
      </ActionButton>

      {/* Like / Cool */}
      <ActionButton
        onClick={onSwipeRight}
        disabled={remaining === 0}
        color="34, 197, 94"
        size="lg"
      >
        <span>♥</span>
      </ActionButton>
    </div>
  );
}

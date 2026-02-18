import { motion } from 'framer-motion';

const StatCard = ({ value, label, color, delay }) => (
  <motion.div
    className="flex-1 rounded-2xl p-4 flex flex-col items-center gap-1"
    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 200, damping: 20 }}
  >
    <span className="text-3xl font-black" style={{ color }}>{value}</span>
    <span className="text-xs text-white/50 uppercase tracking-widest font-medium">{label}</span>
  </motion.div>
);

export default function ResultScreen({ total, liked, onRestart }) {
  const percentage = Math.round((liked / total) * 100);

  const getMessage = () => {
    if (percentage >= 80) return { text: "Dino Superfan! 🦖", sub: "You love almost every prehistoric beast!" };
    if (percentage >= 60) return { text: "Paleo Enthusiast!", sub: "Dinosaurs definitely have your attention." };
    if (percentage >= 40) return { text: "Curious Explorer", sub: "Some dinos caught your eye!" };
    return { text: "Picky Paleontologist", sub: "Very selective taste in prehistoric creatures." };
  };

  const { text, sub } = getMessage();

  return (
    <motion.div
      className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="text-6xl mb-3">🦕</div>
        <h2 className="text-3xl font-black text-white text-shadow">{text}</h2>
        <p className="text-white/50 mt-1 text-sm">{sub}</p>
      </motion.div>

      {/* Stats */}
      <div
        className="w-full rounded-3xl p-6 flex flex-col gap-4"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Progress ring */}
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                initial={{ strokeDashoffset: `${2 * Math.PI * 42}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 42 * (1 - percentage / 100)}` }}
                transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl font-black text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {percentage}%
              </motion.span>
              <span className="text-xs text-white/40 font-medium">liked</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <StatCard value={liked} label="Liked" color="#22c55e" delay={0.2} />
          <StatCard value={total - liked} label="Passed" color="#ef4444" delay={0.3} />
          <StatCard value={total} label="Total" color="#a855f7" delay={0.4} />
        </div>
      </div>

      {/* CTA */}
      <motion.button
        onClick={onRestart}
        className="w-full py-4 rounded-2xl font-bold text-white text-lg relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
        }}
        whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(124, 58, 237, 0.6)' }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute inset-0 shimmer rounded-2xl" />
        <span className="relative">🔄 Explore Again</span>
      </motion.button>
    </motion.div>
  );
}

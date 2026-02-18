import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const SWIPE_THRESHOLD = 120;

const DangerDots = ({ level }) => (
  <div className="flex gap-1 items-center">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 rounded-full transition-all"
        style={{
          background: i < level
            ? `hsl(${120 - (level - 1) * 12}, 85%, 55%)`
            : 'rgba(255,255,255,0.15)',
          boxShadow: i < level ? `0 0 4px hsl(${120 - (level - 1) * 12}, 85%, 55%)` : 'none',
        }}
      />
    ))}
  </div>
);

const StatBadge = ({ label, value, icon }) => (
  <div
    className="flex flex-col gap-0.5 px-3 py-2 rounded-xl"
    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
  >
    <span className="text-xs text-white/50 uppercase tracking-widest font-medium">{icon} {label}</span>
    <span className="text-sm text-white font-semibold leading-tight">{value}</span>
  </div>
);

export default function DinoCard({ dino, onSwipe, isTop, stackIndex }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null); // 'left' | 'right' | null
  const [factIndex, setFactIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const rotate = useTransform(x, [-300, 0, 300], [-22, 0, 22]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -30], [1, 0]);
  const cardOpacity = useTransform(x, [-400, 0, 400], [0, 1, 0]);
  const scale = useTransform(x, [-300, 0, 300], [0.9, 1, 0.9]);

  const handleDragEnd = (_, info) => {
    setIsDragging(false);
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset > SWIPE_THRESHOLD || velocity > 500) {
      animateOut('right');
    } else if (offset < -SWIPE_THRESHOLD || velocity < -500) {
      animateOut('left');
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 });
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 25 });
      setSwipeDir(null);
    }
  };

  const animateOut = (direction) => {
    const targetX = direction === 'right' ? 600 : -600;
    animate(x, targetX, {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      onComplete: () => onSwipe(dino.id, direction),
    });
    animate(y, 80, { type: 'spring', stiffness: 200, damping: 20 });
  };

  const handleButtonSwipe = (direction) => {
    if (!isTop) return;
    animateOut(direction);
  };

  const nextFact = () => setFactIndex((i) => (i + 1) % dino.facts.length);
  const prevFact = () => setFactIndex((i) => (i - 1 + dino.facts.length) % dino.facts.length);

  const stackOffset = stackIndex * 10;
  const stackScale = 1 - stackIndex * 0.04;
  const stackRotate = stackIndex % 2 === 0 ? stackIndex * 2 : -stackIndex * 2;

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-full max-w-sm"
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : stackOffset,
        rotate: isTop ? rotate : stackRotate,
        scale: isTop ? scale : stackScale,
        opacity: isTop ? cardOpacity : 1,
        zIndex: 10 - stackIndex,
        cursor: isTop ? 'grab' : 'default',
        touchAction: 'none',
        originX: 0.5,
        originY: 1,
      }}
      drag={isTop ? true : false}
      dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
      dragElastic={0.8}
      onDragStart={() => setIsDragging(true)}
      onDrag={(_, info) => {
        if (info.offset.x > 40) setSwipeDir('right');
        else if (info.offset.x < -40) setSwipeDir('left');
        else setSwipeDir(null);
      }}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: 'grabbing' } : {}}
      initial={{ scale: stackScale, y: stackOffset, rotate: stackRotate }}
      animate={isTop ? {} : { scale: stackScale, y: stackOffset, rotate: stackRotate }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
    >
      {/* Main Card */}
      <div
        className="relative w-full rounded-3xl overflow-hidden card-shadow select-none"
        style={{
          height: 'min(580px, 82dvh)',
          background: `linear-gradient(160deg, ${dino.gradientFrom} 0%, ${dino.gradientTo} 100%)`,
        }}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 shimmer pointer-events-none z-10 rounded-3xl" />

        {/* Hero image */}
        <div className="relative h-56 overflow-hidden">
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <span className="text-6xl">{dino.emoji}</span>
            </div>
          )}
          <img
            src={dino.image}
            alt={dino.name}
            onLoad={() => setImgLoaded(true)}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{
              opacity: imgLoaded ? 1 : 0,
              filter: 'brightness(0.85) saturate(1.1)',
            }}
            draggable={false}
          />
          {/* Gradient fade at bottom of image */}
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background: `linear-gradient(to bottom, transparent, ${dino.gradientFrom})`,
            }}
          />

          {/* Swipe stamps */}
          {isTop && (
            <>
              <motion.div
                className="absolute top-4 left-4 px-4 py-2 rounded-xl font-black text-white text-xl tracking-wider border-4 stamp-animate"
                style={{
                  opacity: likeOpacity,
                  borderColor: '#22c55e',
                  background: 'rgba(34,197,94,0.25)',
                  backdropFilter: 'blur(8px)',
                  rotate: '-8deg',
                }}
              >
                COOL!
              </motion.div>
              <motion.div
                className="absolute top-4 right-4 px-4 py-2 rounded-xl font-black text-white text-xl tracking-wider border-4"
                style={{
                  opacity: nopeOpacity,
                  borderColor: '#ef4444',
                  background: 'rgba(239,68,68,0.25)',
                  backdropFilter: 'blur(8px)',
                  rotate: '8deg',
                }}
              >
                PASS
              </motion.div>
            </>
          )}

          {/* Diet badge */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest"
            style={{
              background: dino.diet === 'Herbivore'
                ? 'rgba(34,197,94,0.4)'
                : dino.diet === 'Carnivore'
                  ? 'rgba(239,68,68,0.4)'
                  : 'rgba(59,130,246,0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {dino.diet === 'Herbivore' ? '🌿' : dino.diet === 'Carnivore' ? '🥩' : '🐟'} {dino.diet}
          </div>
        </div>

        {/* Card body */}
        <div className="px-5 pt-3 pb-5 flex flex-col gap-3" style={{ height: 'calc(100% - 224px)' }}>
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2
                  className="text-2xl font-black text-white text-shadow leading-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {dino.name}
                </h2>
                <p className="text-sm font-medium" style={{ color: dino.accentColor }}>
                  {dino.nickname} &bull; {dino.period}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5"
                style={{
                  background: `${dino.glowColor}`,
                  border: `1px solid ${dino.accentColor}50`,
                }}
              >
                {dino.emoji}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            <StatBadge label="Length" value={dino.length} icon="📏" />
            <StatBadge label="Weight" value={dino.weight} icon="⚖️" />
            <StatBadge label="Region" value={dino.location.split(' ')[0]} icon="🌍" />
          </div>

          {/* Danger level */}
          <div
            className="px-3 py-2 rounded-xl flex items-center justify-between gap-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-xs text-white/50 uppercase tracking-widest font-medium">⚡ Danger</span>
            <DangerDots level={dino.dangerLevel} />
          </div>

          {/* Fact card */}
          <div
            className="flex-1 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30 rounded-2xl"
              style={{ background: `radial-gradient(circle at top right, ${dino.glowColor}, transparent 70%)` }}
            />
            <p className="text-sm text-white/90 leading-relaxed relative z-10 font-medium">
              <span className="text-lg mr-1">💡</span>
              {dino.facts[factIndex]}
            </p>
            <div className="flex items-center justify-between relative z-10 mt-2">
              <button
                onClick={(e) => { e.stopPropagation(); prevFact(); }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                ‹
              </button>
              <div className="flex gap-1">
                {dino.facts.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === factIndex ? '16px' : '4px',
                      background: i === factIndex ? dino.accentColor : 'rgba(255,255,255,0.25)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); nextFact(); }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

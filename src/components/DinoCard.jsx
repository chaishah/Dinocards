import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const SWIPE_THRESHOLD = 120;

// Diet label — text only, no emoji
const dietLabel = (diet) => {
  if (diet === 'Herbivore') return { text: 'HERBIVORE', color: 'rgba(155,191,164,0.25)', border: 'rgba(155,191,164,0.4)' };
  if (diet === 'Carnivore') return { text: 'CARNIVORE', color: 'rgba(194,130,130,0.25)', border: 'rgba(194,130,130,0.4)' };
  return { text: 'PISCIVORE', color: 'rgba(136,180,204,0.25)', border: 'rgba(136,180,204,0.4)' };
};

// Bone icon SVG — replaces emoji in placeholder
const BoneIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8a6 6 0 0 1 6 6 6 6 0 0 1-2 4.47L28.53 28A6 6 0 0 1 34 26a6 6 0 1 1-4.47 9.93L17.07 23.53A6 6 0 0 1 8 20a6 6 0 0 1 6-12z"
      stroke="rgba(148,163,184,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="14" cy="14" r="3" fill="rgba(148,163,184,0.3)"/>
    <circle cx="34" cy="34" r="3" fill="rgba(148,163,184,0.3)"/>
  </svg>
);

// Danger bar — subtle steel tones
const DangerBar = ({ level }) => (
  <div className="flex gap-1 items-center">
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        className="h-1.5 flex-1 rounded-full transition-all"
        style={{
          background: i < level
            ? `rgba(${Math.round(194 - i * 10)}, ${Math.round(194 - i * 14)}, ${Math.round(224 - i * 18)}, ${0.4 + i * 0.06})`
            : 'rgba(255,255,255,0.08)',
        }}
      />
    ))}
  </div>
);

const StatBadge = ({ label, value }) => (
  <div
    className="flex flex-col gap-0.5 px-3 py-2 rounded-xl"
    style={{
      background: 'rgba(148,163,184,0.05)',
      border: '1px solid rgba(148,163,184,0.12)',
    }}
  >
    <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'rgba(148,163,184,0.5)', fontSize: '9px' }}>{label}</span>
    <span className="text-sm text-white/80 font-semibold leading-tight">{value}</span>
  </div>
);

// Inline fossil logo for top-right of card
const FossilIcon = ({ accentColor }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke={accentColor} strokeOpacity="0.4" strokeWidth="1" />
    <circle cx="14" cy="14" r="4" fill={accentColor} fillOpacity="0.25" />
    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
      <line
        key={i}
        x1="14" y1="14"
        x2={14 + 9 * Math.cos((angle * Math.PI) / 180)}
        y2={14 + 9 * Math.sin((angle * Math.PI) / 180)}
        stroke={accentColor}
        strokeOpacity="0.3"
        strokeWidth="1"
      />
    ))}
  </svg>
);

export default function DinoCard({ dino, onSwipe, isTop, stackIndex }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null);
  const [factIndex, setFactIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

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
      type: 'spring', stiffness: 200, damping: 20,
      onComplete: () => onSwipe(dino.id, direction),
    });
    animate(y, 80, { type: 'spring', stiffness: 200, damping: 20 });
  };

  const nextFact = () => setFactIndex((i) => (i + 1) % dino.facts.length);
  const prevFact = () => setFactIndex((i) => (i - 1 + dino.facts.length) % dino.facts.length);

  const stackOffset = stackIndex * 10;
  const stackScale = 1 - stackIndex * 0.04;
  const stackRotate = stackIndex % 2 === 0 ? stackIndex * 2 : -stackIndex * 2;
  const diet = dietLabel(dino.diet);

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
      drag={isTop}
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
      {/* Main card */}
      <div
        className="relative w-full rounded-3xl overflow-hidden select-none"
        style={{
          height: 'min(570px, 80dvh)',
          background: `linear-gradient(160deg, ${dino.gradientFrom} 0%, ${dino.gradientTo} 100%)`,
          boxShadow: '0 24px 56px rgba(0,0,0,0.6), 0 0 0 1px rgba(148,163,184,0.07), inset 0 1px 0 rgba(148,163,184,0.12)',
        }}
      >
        {/* Shimmer sweep */}
        <div className="absolute inset-0 shimmer pointer-events-none z-10 rounded-3xl" />

        {/* Hero image */}
        <div className="relative overflow-hidden" style={{ height: '52%' }}>
          {/* Placeholder shown while loading or on error */}
          {(!imgLoaded || imgError) && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(148,163,184,0.04)' }}
            >
              <BoneIcon />
              {!imgError && (
                <div
                  className="absolute inset-0 animate-pulse"
                  style={{ background: 'rgba(148,163,184,0.03)' }}
                />
              )}
            </div>
          )}

          <img
            src={dino.image}
            alt={`${dino.name} — paleontology photograph`}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgLoaded(true); setImgError(true); }}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{
              opacity: imgLoaded && !imgError ? 1 : 0,
              filter: 'brightness(0.82) saturate(0.85) contrast(1.05)',
            }}
            draggable={false}
          />

          {/* Bottom fade into card */}
          <div
            className="absolute inset-x-0 bottom-0 h-28"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${dino.gradientFrom} 100%)`,
            }}
          />

          {/* Swipe stamps */}
          {isTop && (
            <>
              <motion.div
                className="absolute top-4 left-4 px-4 py-1.5 rounded-lg font-black text-sm tracking-widest"
                style={{
                  opacity: likeOpacity,
                  color: '#9bbfa4',
                  border: '1.5px solid rgba(155,191,164,0.6)',
                  background: 'rgba(155,191,164,0.12)',
                  backdropFilter: 'blur(12px)',
                  rotate: '-6deg',
                  letterSpacing: '0.15em',
                }}
              >
                LIKE
              </motion.div>
              <motion.div
                className="absolute top-4 right-4 px-4 py-1.5 rounded-lg font-black text-sm tracking-widest"
                style={{
                  opacity: nopeOpacity,
                  color: '#c29090',
                  border: '1.5px solid rgba(194,144,144,0.6)',
                  background: 'rgba(194,144,144,0.12)',
                  backdropFilter: 'blur(12px)',
                  rotate: '6deg',
                  letterSpacing: '0.15em',
                }}
              >
                PASS
              </motion.div>
            </>
          )}

          {/* Diet badge — text only */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              color: 'rgba(200,215,230,0.8)',
              background: diet.color,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${diet.border}`,
              fontSize: '10px',
              letterSpacing: '0.12em',
            }}
          >
            {diet.text}
          </div>
        </div>

        {/* Card body */}
        <div
          className="px-4 pt-2 pb-4 flex flex-col gap-2.5"
          style={{ height: '48%' }}
        >
          {/* Name row */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2
                className="font-black text-white leading-tight truncate"
                style={{ fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', letterSpacing: '-0.02em' }}
              >
                {dino.name}
              </h2>
              <p className="text-xs font-semibold tracking-widest uppercase mt-0.5" style={{ color: dino.accentColor, opacity: 0.8, fontSize: '10px' }}>
                {dino.nickname}&nbsp;&nbsp;{dino.period}
              </p>
            </div>
            <div className="flex-shrink-0 mt-0.5">
              <FossilIcon accentColor={dino.accentColor} />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-1.5">
            <StatBadge label="Length" value={dino.length} />
            <StatBadge label="Weight" value={dino.weight} />
            <StatBadge label="Region" value={dino.location.split('&')[0].trim()} />
          </div>

          {/* Threat level */}
          <div
            className="px-3 py-2 rounded-xl flex items-center gap-3"
            style={{
              background: 'rgba(148,163,184,0.04)',
              border: '1px solid rgba(148,163,184,0.09)',
            }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest flex-shrink-0"
              style={{ color: 'rgba(148,163,184,0.45)', fontSize: '9px', letterSpacing: '0.15em' }}
            >
              THREAT
            </span>
            <DangerBar level={dino.dangerLevel} />
            <span
              className="text-xs font-black flex-shrink-0"
              style={{ color: dino.accentColor, opacity: 0.7 }}
            >
              {dino.dangerLevel}/10
            </span>
          </div>

          {/* Fact panel */}
          <div
            className="flex-1 rounded-2xl p-3 flex flex-col justify-between relative overflow-hidden min-h-0"
            style={{
              background: 'rgba(148,163,184,0.05)',
              border: '1px solid rgba(148,163,184,0.1)',
            }}
          >
            {/* Subtle accent glow top-right */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${dino.glowColor} 0%, transparent 70%)`,
                transform: 'translate(30%, -30%)',
              }}
            />
            <p
              className="text-xs leading-relaxed relative z-10 line-clamp-3"
              style={{ color: 'rgba(210,220,235,0.85)', fontWeight: 500 }}
            >
              {dino.facts[factIndex]}
            </p>
            {/* Pagination dots */}
            <div className="flex items-center justify-between relative z-10 mt-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); prevFact(); }}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                style={{ color: 'rgba(148,163,184,0.5)', fontSize: '14px' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(148,163,184,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                ‹
              </button>
              <div className="flex gap-1">
                {dino.facts.map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === factIndex ? '14px' : '4px',
                      background: i === factIndex ? dino.accentColor : 'rgba(148,163,184,0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); nextFact(); }}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all"
                style={{ color: 'rgba(148,163,184,0.5)', fontSize: '14px' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(148,163,184,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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

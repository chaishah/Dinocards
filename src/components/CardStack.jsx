import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DinoCard from './DinoCard';
import SwipeButtons from './SwipeButtons';
import ResultScreen from './ResultScreen';

const DECK_SIZE = 7;
const VISIBLE_CARDS = 3;

const getRandomDeck = (dinosaurs) =>
  [...dinosaurs].sort(() => Math.random() - 0.5).slice(0, DECK_SIZE);

// SVG fossils icon for the empty state
const FossilsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="22" stroke="rgba(148,163,184,0.2)" strokeWidth="1.5"/>
    <circle cx="24" cy="20" r="8" stroke="rgba(148,163,184,0.35)" strokeWidth="1.5" fill="none"/>
    <path d="M16 32v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="18" r="2.5" fill="rgba(148,163,184,0.2)"/>
    <circle cx="28" cy="18" r="2.5" fill="rgba(148,163,184,0.2)"/>
    <line x1="24" y1="32" x2="24" y2="38" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function CardStack({ dinosaurs }) {
  const [deck, setDeck] = useState(() => getRandomDeck(dinosaurs));
  const [cards, setCards] = useState(() => deck);
  const [history, setHistory] = useState([]);
  const [swipedDir, setSwipedDir] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSwipe = useCallback((id, direction) => {
    setSwipedDir(direction);
    const dino = deck.find(d => d.id === id);
    setHistory(h => [...h, { dino, direction }]);
    setCards(prev => {
      const next = prev.filter(d => d.id !== id);
      if (next.length === 0) setTimeout(() => setShowResult(true), 400);
      return next;
    });
    setTimeout(() => setSwipedDir(null), 500);
  }, [deck]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setCards(prev => [last.dino, ...prev]);
  }, [history]);

  const handleButtonSwipe = useCallback((direction) => {
    if (cards.length === 0) return;
    handleSwipe(cards[0].id, direction);
  }, [cards, handleSwipe]);

  const handleRestart = () => {
    const newDeck = getRandomDeck(dinosaurs);
    setDeck(newDeck);
    setCards(newDeck);
    setHistory([]);
    setSwipedDir(null);
    setShowResult(false);
  };

  const likedDinos = history.filter(h => h.direction === 'right').map(h => h.dino);

  if (showResult) {
    return (
      <ResultScreen
        likedDinos={likedDinos}
        total={DECK_SIZE}
        onRestart={handleRestart}
      />
    );
  }

  const explored = deck.length - cards.length;
  const visibleCards = cards.slice(0, VISIBLE_CARDS);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto px-4">
      {/* Progress row */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-1.5">
          <span style={{ fontSize: '10px', color: 'rgba(148,163,184,0.4)', fontWeight: 600, letterSpacing: '0.1em' }}>
            {explored} / {DECK_SIZE} SWIPED
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(155,191,164,0.6)', fontWeight: 700, letterSpacing: '0.1em' }}>
            {likedDinos.length} LIKED
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: '2px', background: 'rgba(148,163,184,0.08)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, rgba(148,163,184,0.5), rgba(194,207,224,0.8))' }}
            initial={{ width: 0 }}
            animate={{ width: `${(explored / DECK_SIZE) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 22 }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 'min(570px, 62dvh)' }}
      >
        <AnimatePresence mode="sync">
          {visibleCards.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              <FossilsIcon />
              <p style={{ fontSize: '13px', color: 'rgba(148,163,184,0.35)', fontWeight: 600, letterSpacing: '0.08em' }}>
                ALL SPECIMENS REVIEWED
              </p>
            </motion.div>
          ) : (
            [...visibleCards].reverse().map((dino, reverseIdx) => {
              const stackIndex = visibleCards.length - 1 - reverseIdx;
              return (
                <DinoCard
                  key={dino.id}
                  dino={dino}
                  onSwipe={handleSwipe}
                  isTop={stackIndex === 0}
                  stackIndex={stackIndex}
                />
              );
            })
          )}
        </AnimatePresence>

        {/* Steel-toned swipe flash */}
        {swipedDir && (
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: swipedDir === 'right'
                ? 'radial-gradient(ellipse at 0% 50%, rgba(155,191,164,0.12) 0%, transparent 55%)'
                : 'radial-gradient(ellipse at 100% 50%, rgba(194,130,130,0.12) 0%, transparent 55%)',
            }}
          />
        )}
      </div>

      {/* Action buttons */}
      <SwipeButtons
        onSwipeLeft={() => handleButtonSwipe('left')}
        onSwipeRight={() => handleButtonSwipe('right')}
        onUndo={handleUndo}
        canUndo={history.length > 0}
        remaining={cards.length}
      />
    </div>
  );
}

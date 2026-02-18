import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DinoCard from './DinoCard';
import SwipeButtons from './SwipeButtons';
import ResultScreen from './ResultScreen';

const VISIBLE_CARDS = 3;

export default function CardStack({ dinosaurs }) {
  const [cards, setCards] = useState(dinosaurs);
  const [history, setHistory] = useState([]); // {id, direction}
  const [swipedDir, setSwipedDir] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSwipe = useCallback((id, direction) => {
    setSwipedDir(direction);
    setHistory((h) => [...h, { id, direction }]);
    setCards((prev) => {
      const next = prev.filter((d) => d.id !== id);
      if (next.length === 0) {
        setTimeout(() => setShowResult(true), 400);
      }
      return next;
    });
    setTimeout(() => setSwipedDir(null), 600);
  }, []);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const dino = dinosaurs.find((d) => d.id === last.id);
    if (!dino) return;
    setHistory((h) => h.slice(0, -1));
    setCards((prev) => [dino, ...prev]);
  }, [history, dinosaurs]);

  const handleButtonSwipe = useCallback((direction) => {
    if (cards.length === 0) return;
    // Programmatic swipe — trigger on top card
    const topCard = cards[0];
    handleSwipe(topCard.id, direction);
  }, [cards, handleSwipe]);

  const handleRestart = () => {
    setCards(dinosaurs);
    setHistory([]);
    setSwipedDir(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ResultScreen
        total={dinosaurs.length}
        liked={history.filter((h) => h.direction === 'right').length}
        onRestart={handleRestart}
      />
    );
  }

  const visibleCards = cards.slice(0, VISIBLE_CARDS);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto px-4">
      {/* Progress bar */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/50 font-medium uppercase tracking-widest">
            {dinosaurs.length - cards.length} / {dinosaurs.length} explored
          </span>
          <span className="text-xs font-bold" style={{ color: '#a855f7' }}>
            {history.filter((h) => h.direction === 'right').length} liked
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #a855f7, #3b82f6)',
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${((dinosaurs.length - cards.length) / dinosaurs.length) * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Card stack area */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 'min(580px, 64dvh)' }}
      >
        <AnimatePresence mode="sync">
          {visibleCards.length === 0 ? (
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center gap-4 text-white/40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="text-6xl">🦕</span>
              <p className="text-lg font-medium">All caught up!</p>
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

        {/* Swipe feedback flash */}
        {swipedDir && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            style={{
              background: swipedDir === 'right'
                ? 'radial-gradient(circle at left, rgba(34,197,94,0.3) 0%, transparent 60%)'
                : 'radial-gradient(circle at right, rgba(239,68,68,0.3) 0%, transparent 60%)',
            }}
          />
        )}
      </div>

      {/* Swipe buttons */}
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

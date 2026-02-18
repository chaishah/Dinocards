import Background from './components/Background';
import CardStack from './components/CardStack';
import { dinosaurs } from './data/dinosaurs';

export default function App() {
  return (
    <div
      className="relative w-full h-dvh flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Background />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.6), rgba(37,99,235,0.6))',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
              }}
            >
              🦖
            </div>
            <div>
              <h1
                className="text-lg font-black text-white leading-none"
                style={{ letterSpacing: '-0.02em' }}
              >
                DinoCards
              </h1>
              <p className="text-xs text-white/40 font-medium">Swipe to explore</p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="text-xs text-white/60 font-medium">
              {dinosaurs.length} dinos
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-ring" />
          </div>
        </header>

        {/* Swipe hint */}
        <div className="flex-shrink-0 flex items-center justify-center gap-6 py-1 px-5">
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
              style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              ←
            </div>
            <span className="text-xs text-white/35 font-medium">Pass</span>
          </div>
          <span className="text-xs text-white/20 font-medium">Swipe or tap buttons</span>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white/35 font-medium">Like</span>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
              style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.3)' }}
            >
              →
            </div>
          </div>
        </div>

        {/* Card area — fills remaining space */}
        <main className="flex-1 flex flex-col items-center justify-center pb-4 overflow-hidden">
          <CardStack dinosaurs={dinosaurs} />
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 flex items-center justify-center pb-4 pt-1">
          <p className="text-xs text-white/20 font-medium">
            Tap fact dots to navigate • Drag cards to swipe
          </p>
        </footer>
      </div>
    </div>
  );
}

import Background from './components/Background';
import CardStack from './components/CardStack';
import { dinosaurs } from './data/dinosaurs';

// Minimal wordmark SVG — replaces emoji logo
const DinoWordmark = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="rgba(148,163,184,0.08)" stroke="rgba(148,163,184,0.15)" strokeWidth="1"/>
    {/* Stylized D shape */}
    <path d="M8 8h5a7 7 0 0 1 0 12H8V8z" stroke="rgba(194,207,224,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11h2.5a4 4 0 0 1 0 6H10" stroke="rgba(194,207,224,0.4)" strokeWidth="1" fill="none" strokeLinecap="round"/>
  </svg>
);

export default function App() {
  return (
    <div
      className="relative w-full flex flex-col overflow-hidden"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        height: '100dvh',
        minHeight: '-webkit-fill-available',
      }}
    >
      <Background />

      {/* Content layer — strict flex column that never overflows */}
      <div className="relative z-10 flex flex-col h-full">

        {/* ── Header — compact, never overlaps cards ── */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-4 py-3"
          style={{
            borderBottom: '1px solid rgba(148,163,184,0.07)',
            background: 'rgba(9,12,18,0.4)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <DinoWordmark />
            <div>
              <h1
                className="font-black leading-none"
                style={{
                  fontSize: '1rem',
                  letterSpacing: '-0.03em',
                  color: 'rgba(220,228,240,0.95)',
                }}
              >
                DinoCards
              </h1>
              <p
                className="leading-none mt-0.5"
                style={{ fontSize: '10px', color: 'rgba(148,163,184,0.45)', letterSpacing: '0.08em', fontWeight: 500 }}
              >
                PREHISTORIC ARCHIVE
              </p>
            </div>
          </div>

          {/* Right — swipe hints inline in header, saves vertical space */}
          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-2 text-xs"
              style={{ color: 'rgba(148,163,184,0.4)', fontSize: '11px', fontWeight: 500 }}
            >
              <span style={{ color: 'rgba(194,144,144,0.7)' }}>← pass</span>
              <span style={{ color: 'rgba(148,163,184,0.2)' }}>·</span>
              <span style={{ color: 'rgba(155,191,164,0.7)' }}>like →</span>
            </div>
            <div
              className="flex items-center gap-2 px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(148,163,184,0.06)',
                border: '1px solid rgba(148,163,184,0.1)',
              }}
            >
              <span style={{ fontSize: '11px', color: 'rgba(148,163,184,0.5)', fontWeight: 600, letterSpacing: '0.05em' }}>
                {dinosaurs.length}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full pulse-ring"
                style={{ background: 'rgba(155,191,164,0.7)' }}
              />
            </div>
          </div>
        </header>

        {/* ── Swipe hint bar — only visible on mobile (sm shows it inline in header) ── */}
        <div
          className="flex sm:hidden flex-shrink-0 items-center justify-center gap-6 py-1.5"
          style={{ borderBottom: '1px solid rgba(148,163,184,0.05)' }}
        >
          <span style={{ fontSize: '10px', color: 'rgba(194,144,144,0.6)', fontWeight: 600, letterSpacing: '0.1em' }}>
            ← PASS
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(148,163,184,0.25)', fontWeight: 500 }}>
            SWIPE OR TAP BUTTONS
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(155,191,164,0.6)', fontWeight: 600, letterSpacing: '0.1em' }}>
            LIKE →
          </span>
        </div>

        {/* ── Card area — flex-1 with min-h-0 to respect parent bounds ── */}
        <main
          className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ padding: '8px 0' }}
        >
          <CardStack dinosaurs={dinosaurs} />
        </main>

        {/* ── Footer ── */}
        <footer
          className="flex-shrink-0 flex items-center justify-center py-2"
          style={{ borderTop: '1px solid rgba(148,163,184,0.05)' }}
        >
          <p style={{ fontSize: '10px', color: 'rgba(148,163,184,0.2)', fontWeight: 500, letterSpacing: '0.06em' }}>
            TAP DOTS TO NAVIGATE &nbsp;·&nbsp; DRAG CARDS TO SWIPE
          </p>
        </footer>
      </div>
    </div>
  );
}

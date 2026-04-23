import React from 'react'
import { GAME_LIB } from './games'

export default function CardHero({ copyHint }) {
  return (
    <div data-component="CardHero" style={{
      position: 'relative', width: '100%', height: 240,
      background: 'linear-gradient(180deg, #4fa0e0 0%, #2f7cc4 65%, #2470b8 100%)',
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 343 240" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id="coins" x="0" y="0" width="68" height="60" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
            <circle cx="48" cy="44" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="343" height="240" fill="url(#coins)" />
        <ellipse cx="171" cy="228" rx="170" ry="28" fill="rgba(255,255,255,0.10)" />
      </svg>

      <div style={{
        position: 'absolute', left: '50%', top: 120,
        transform: 'translateX(-50%)',
        width: 280, height: 128,
      }}>
        {[-22, 0, 22].map((rot, i) => {
          const keys = ['deep', 'nova', 'ember'];
          const g = GAME_LIB[keys[i]];
          const offsetX = (i - 1) * 60;
          const offsetY = i === 1 ? -8 : 8;
          return (
            <div key={i} style={{
              position: 'absolute',
              left: `calc(50% + ${offsetX}px - 48px)`,
              top: offsetY,
              width: 96, height: 120,
              borderRadius: 12,
              background: g.bg,
              transform: `rotate(${rot}deg)`,
              boxShadow: '0 10px 30px rgba(0,20,50,0.35), 0 2px 6px rgba(0,0,0,0.2), inset 0 0 0 2px rgba(255,255,255,0.18)',
              zIndex: i === 1 ? 3 : (i === 0 ? 1 : 2),
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: g.glyphColor, fontFamily: 'Figtree, sans-serif',
                fontWeight: 900, fontSize: 44,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}>{g.glyph}</div>
              <div style={{
                position: 'absolute', bottom: 8, left: 0, right: 0,
                textAlign: 'center', fontFamily: 'Figtree, sans-serif',
                fontWeight: 700, fontSize: 10, letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.9)',
              }}>FREE SPINS</div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', left: 16, right: 16, top: 20,
        fontFamily: 'Figtree, sans-serif', fontWeight: 900,
        fontSize: 32, lineHeight: '32px', letterSpacing: '-0.02em',
        color: '#fff', textAlign: 'center',
        textShadow: '0 2px 8px rgba(0,30,80,0.35)',
      }}>
        10 FREE SPINS
      </div>
      {copyHint && (
        <div style={{
          position: 'absolute', left: 16, right: 16, top: 56,
          fontFamily: 'Figtree, sans-serif', fontWeight: 700,
          fontSize: 12, letterSpacing: '0.02em',
          color: '#fff', textAlign: 'center',
          display: 'flex', justifyContent: 'center',
        }}>
          <span style={{
            background: 'rgba(10,30,60,0.38)',
            padding: '4px 12px', borderRadius: 999,
            backdropFilter: 'blur(2px)',
          }}>{copyHint}</span>
        </div>
      )}
    </div>
  );
}

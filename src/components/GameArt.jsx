import React from 'react'

export default function GameArt({ game, size = 40, radius }) {
  if (!game) return null;
  const r = radius ?? size / 2;
  const fontSize = Math.round(size * 0.5);

  if (game.image) {
    return (
      <img
        data-component="GameArt"
        src={game.image}
        alt={game.name}
        style={{
          width: size, height: size, borderRadius: r,
          objectFit: 'cover', flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div data-component="GameArt" style={{
      width: size, height: size, borderRadius: r,
      background: game.bg, position: 'relative', overflow: 'hidden',
      flexShrink: 0,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 45%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Figtree, sans-serif', fontWeight: 900,
        fontSize, color: game.glyphColor,
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
        letterSpacing: '-0.02em',
      }}>{game.glyph}</div>
    </div>
  );
}

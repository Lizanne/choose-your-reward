import React, { useState, useRef, useLayoutEffect } from 'react'
import GameArt from './GameArt'

function GameTile({ game, selected, onClick, disabled }) {
  return (
    <button data-component="GameTile" onClick={onClick} disabled={disabled} style={{
      width: '100%',
      background: 'transparent',
      border: 0,
      borderRadius: 12,
      padding: 0,
      height: 40,
      display: 'flex', alignItems: 'center', gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      fontFamily: 'Figtree, sans-serif',
      color: '#fff',
      textAlign: 'left',
    }}>
      <GameArt game={game} size={40} radius={9999} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{
          fontSize: 14, fontWeight: 700, lineHeight: '20px',
          color: '#fafafa',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{game.name}</div>
        <div style={{
          fontSize: 12, fontWeight: 400, lineHeight: '16px',
          color: '#fafafa',
        }}>{game.tagline}</div>
      </div>
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        border: selected ? 'none' : '1px solid #fafafa',
        background: selected ? '#fff' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 180ms ease, border-color 180ms ease',
      }}>
        {selected && (
          <svg width="10" height="8" viewBox="0 0 14 10" fill="none">
            <path d="M1.5 5L5 8.5L12.5 1.5" stroke="#3F92DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}

export default function GamePicker({ open, games, selectedId, onPick, disabledIds = [] }) {
  const innerRef = useRef(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const measure = () => {
      if (innerRef.current) setH(innerRef.current.scrollHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [games.length]);

  return (
    <div data-component="GamePicker" style={{
      height: open ? h : 0,
      overflow: 'hidden',
      transition: 'height 320ms cubic-bezier(0.2,0.8,0.2,1)',
    }}>
      <div ref={innerRef} style={{ padding: '12px 16px 16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {games.map(g => (
            <GameTile key={g.id} game={g}
              selected={g.id === selectedId}
              disabled={disabledIds.includes(g.id)}
              onClick={() => !disabledIds.includes(g.id) && onPick(g.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

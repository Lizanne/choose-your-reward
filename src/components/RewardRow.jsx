import React from 'react'
import GameArt from './GameArt'
import Icons from './Icons'

export default function RewardRow({ mode, game, onToggle, open, qualified, unavailable }) {
  const accent = '#EAF4FF';

  if (mode === 'empty') {
    return (
      <button data-component="RewardRow" onClick={onToggle} style={{
        width: '100%', background: 'transparent', border: 0,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer', fontFamily: 'Figtree, sans-serif',
        textAlign: 'left',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#f4f4f5',
          border: '1px dashed #e4e4e7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4.17v11.66M4.17 10h11.66" stroke="#71717a" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{
          flex: 1,
          fontWeight: 700, fontSize: 16, lineHeight: '24px',
          color: unavailable ? '#FFD9A8' : '#fafafa',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          {unavailable && Icons.alert}
          {unavailable ? 'Your game is no longer available' : 'Choose your game'}
        </span>
        <div style={{ color: '#fff', opacity: 0.85 }}>
          {Icons.chevron(open ? 180 : 0)}
        </div>
      </button>
    );
  }

  if (mode === 'picked') {
    return (
      <button data-component="RewardRow" onClick={onToggle} style={{
        width: '100%', background: 'transparent', border: 0,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'pointer', fontFamily: 'Figtree, sans-serif',
        textAlign: 'left',
      }}>
        <GameArt game={game} size={40} radius={9999} />
        <span style={{
          flex: 1, fontWeight: 700, fontSize: 16, lineHeight: '24px',
          color: '#fafafa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          minWidth: 0,
        }}>{game.name}</span>
        <div style={{ color: '#fff', opacity: 0.85, flexShrink: 0 }}>
          {Icons.chevron(open ? 180 : 0)}
        </div>
      </button>
    );
  }

  if (mode === 'qualified') {
    return (
      <div data-component="RewardRow" style={{
        width: '100%',
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'Figtree, sans-serif',
      }}>
        <GameArt game={game} size={40} radius={20} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span style={{
            fontWeight: 700, fontSize: 14, lineHeight: '20px',
            color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{game.name}</span>
          <span style={{
            fontWeight: 500, fontSize: 12, lineHeight: '16px',
            color: 'rgba(255,255,255,0.8)',
          }}><span style={{fontWeight:700}}>2 hrs</span> <span style={{fontWeight:400}}>left to play</span></span>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 8,
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 3.5v13l11-6.5-11-6.5z" fill="#3F92DB"/>
          </svg>
        </div>
      </div>
    );
  }
  return null;
}

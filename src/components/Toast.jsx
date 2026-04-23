import React from 'react'
import Icons from './Icons'

export default function Toast({ show, children }) {
  return (
    <div data-component="Toast" style={{
      position: 'absolute', left: 12, right: 12, top: 12,
      transform: show ? 'translateY(0)' : 'translateY(-12px)',
      opacity: show ? 1 : 0,
      pointerEvents: show ? 'auto' : 'none',
      transition: 'opacity 220ms ease, transform 220ms ease',
      background: 'rgba(20,38,60,0.92)',
      backdropFilter: 'blur(8px)',
      color: '#fff', borderRadius: 12,
      padding: '12px', fontSize: 12, lineHeight: '16px',
      fontFamily: 'Figtree, sans-serif', fontWeight: 500,
      display: 'flex', alignItems: 'center', gap: 8,
      boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
      zIndex: 20,
    }}>
      <div style={{ color: '#FFD9A8' }}>{Icons.alert}</div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

import React from 'react'
import ProgressRing from './ProgressRing'

export default function QualifierRow({ label, sub, pct, complete, icon, onAction, animate, delay = 0 }) {
  return (
    <div data-component="QualifierRow" style={{
      display: 'flex', alignItems: 'center', gap: 24,
      fontFamily: 'Figtree, sans-serif',
      ...(animate ? {
        animation: `qualifierSlideIn 480ms cubic-bezier(0.0, 0.0, 0.2, 1) ${delay}ms both`,
      } : {}),
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <ProgressRing pct={pct} complete={complete} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span style={{
            fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#fff',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{label}</span>
          {sub && <span style={{
            fontWeight: 400, fontSize: 12, lineHeight: '16px', color: '#fff',
          }}>{sub}</span>}
        </div>
      </div>
      {icon && (
        <button
          onClick={onAction}
          style={{
            width: 44, height: 44, borderRadius: 8,
            background: 'rgba(0,0,0,0.25)',
            border: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'transform 120ms ease, background 120ms ease',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >{icon}</button>
      )}
    </div>
  );
}

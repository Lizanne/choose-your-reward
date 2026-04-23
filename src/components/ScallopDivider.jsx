import React from 'react'

export default function ScallopDivider() {
  return (
    <div data-component="ScallopDivider" style={{
      position: 'relative', width: '100%', height: 16, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: -8, right: -8, top: 0,
        height: 16,
        backgroundImage: 'radial-gradient(circle at 8px 0, transparent 8px, rgba(255,255,255,0.12) 8px, rgba(255,255,255,0.12) 8.5px, transparent 8.5px)',
        backgroundSize: '16px 16px',
        backgroundPosition: '0 0',
        backgroundRepeat: 'repeat-x',
      }} />
    </div>
  );
}

import React from 'react'

export default function QualifiedSummary() {
  return (
    <div data-component="QualifiedSummary" style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: 'Figtree, sans-serif',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1.5 5L5 8.5L12.5 1.5" stroke="#3F92DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span style={{
        fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#fff',
      }}>Qualified</span>
    </div>
  );
}

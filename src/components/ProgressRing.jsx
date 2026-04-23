import React, { useState, useEffect, useRef } from 'react'

export default function ProgressRing({ pct, size = 32, stroke = 4, complete }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, pct)));

  // Track when transitioning to complete for the pop animation
  const [justCompleted, setJustCompleted] = useState(false);
  const prevComplete = useRef(complete);
  useEffect(() => {
    if (complete && !prevComplete.current) {
      setJustCompleted(true);
      const timer = setTimeout(() => setJustCompleted(false), 500);
      return () => clearTimeout(timer);
    }
    prevComplete.current = complete;
  }, [complete]);

  if (complete) {
    return (
      <div data-component="ProgressRing" style={{
        width: size, height: size, borderRadius: '50%',
        background: '#fff', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        animation: justCompleted ? 'checkPop 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) both' : undefined,
      }}>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M1.5 5L5 8.5L12.5 1.5" stroke="#3F92DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={justCompleted ? {
              strokeDasharray: 20,
              strokeDashoffset: 0,
              animation: 'checkDraw 350ms cubic-bezier(0.4, 0, 0.2, 1) 100ms both',
            } : undefined}
          />
        </svg>
      </div>
    );
  }
  return (
    <svg data-component="ProgressRing" width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(0,0,0,0.25)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="#fff" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={offset}
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1)' }} />
    </svg>
  );
}

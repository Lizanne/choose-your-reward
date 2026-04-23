import React from 'react'

const Icons = {
  plus: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  play: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 3.5v13l11-6.5-11-6.5z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" fill="#fff"/></svg>,
  lock: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="8" rx="1.5" stroke="#fff" strokeWidth="1.8"/><path d="M6.5 9V6.5a3.5 3.5 0 017 0V9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  chevron: (rot) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: `rotate(${rot}deg)`, transition: 'transform 280ms cubic-bezier(0.2,0.8,0.2,1)' }}><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  dots: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.6" fill="#fff"/><circle cx="12" cy="12" r="1.6" fill="#fff"/><circle cx="12" cy="19" r="1.6" fill="#fff"/></svg>,
  alert: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l7 12H1L8 2z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/><path d="M8 6.5v3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/><circle cx="8" cy="11.5" r="0.8" fill="#fff"/></svg>,
  refresh: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1.5 7a5.5 5.5 0 019.5-3.8M12.5 7a5.5 5.5 0 01-9.5 3.8M11 1.5v3h-3M3 12.5v-3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

export default Icons;

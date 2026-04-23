import React, { useState, useEffect } from 'react'
import PromoCard, { GAME_LIB } from './PromoCard'

const ALL_GAME_IDS = ['nova', 'deep', 'ember'];

export default function App() {
  const [state, setState] = useState('optin');
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [disabledIds, setDisabledIds] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  const [depositPct, setDepositPct] = useState(0);
  const [playPct, setPlayPct] = useState(0);
  const [pickerOpenOverride, setPickerOpenOverride] = useState(false);

  const gameIds = ALL_GAME_IDS;

  const handleOptIn = () => {
    setState('prequal');
  };

  const handleDeposit = () => {
    setDepositPct(prev => {
      const next = Math.min(1, prev + 0.25);
      return next;
    });
  };

  const handlePlay = () => {
    setPlayPct(prev => {
      const next = Math.min(1, prev + 0.2);
      return next;
    });
  };

  // Auto-qualify when both complete
  useEffect(() => {
    if (depositPct >= 1 && playPct >= 1 && selectedGameId && state === 'prequal') {
      const timer = setTimeout(() => setState('qualified'), 600);
      return () => clearTimeout(timer);
    }
  }, [depositPct, playPct, selectedGameId, state]);

  const handleSelect = (id) => {
    setSelectedGameId(id);
  };

  const clearToast = () => setToastMsg(null);

  const resetDemo = () => {
    setState('optin');
    setSelectedGameId(null);
    setDisabledIds([]);
    setToastMsg(null);
    setDepositPct(0);
    setPlayPct(0);
    setPickerOpenOverride(false);
  };

  return (
    <div data-component="App" className="page">
      <div style={{
        width: '100%', maxWidth: 390,
        background: '#fff',
        padding: '24px 16px 60px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '12px 0',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#F4F4F5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            flex: 1, textAlign: 'center',
            fontFamily: 'Figtree', fontWeight: 600, fontSize: 18, lineHeight: '28px',
            color: '#18181b',
            marginRight: 44,
          }}>My Promotions</span>
        </div>

        <PromoCard
          state={state}
          selectedGameId={selectedGameId}
          onSelect={handleSelect}
          onOptIn={handleOptIn}
          gameIds={gameIds}
          disabledIds={disabledIds}
          toastMsg={toastMsg}
          clearToast={clearToast}
          pickerOpenOverride={pickerOpenOverride}
          setPickerOpenOverride={setPickerOpenOverride}
          depositPct={depositPct}
          depositLabel={<><span style={{fontWeight:700}}>{'\u00a3'}{Math.round(depositPct*20)}</span> of {'\u00a3'}20</>}
          onDeposit={handleDeposit}
          playPct={playPct}
          playLabel={<><span style={{fontWeight:700}}>{'\u00a3'}{Math.round(playPct*50)}</span> of {'\u00a3'}50 cash</>}
          onPlay={handlePlay}
          showCopyHint={true}
        />

        {state === 'qualified' && (
          <button onClick={resetDemo} style={{
            width: '100%', padding: 12, borderRadius: 8,
            background: '#F4F4F5', border: 0,
            fontFamily: 'Figtree, sans-serif',
            fontWeight: 600, fontSize: 14, lineHeight: '20px',
            color: '#71717a', cursor: 'pointer',
          }}>Restart demo</button>
        )}
      </div>
    </div>
  );
}

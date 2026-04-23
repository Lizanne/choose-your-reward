import React, { useState, useRef, useEffect } from 'react'
import { GAME_LIB } from './components/games'
import Icons from './components/Icons'
import CardHero from './components/CardHero'
import GameArt from './components/GameArt'
import GamePicker from './components/GamePicker'
import RewardRow from './components/RewardRow'
import QualifierRow from './components/QualifierRow'
import QualifiedSummary from './components/QualifiedSummary'
import Toast from './components/Toast'
import ScallopDivider from './components/ScallopDivider'

export { GAME_LIB }

export default function PromoCard({
  state,
  selectedGameId,
  onSelect,
  onOptIn,
  gameIds,
  disabledIds = [],
  toastMsg,
  clearToast,
  pickerOpenOverride,
  setPickerOpenOverride,
  depositPct = 0,
  depositLabel = '\u00a30 of \u00a320',
  onDeposit,
  playPct = 0,
  playLabel = '\u00a30 of \u00a350 cash',
  onPlay,
  showCopyHint = true,
}) {
  const games = gameIds.map(id => GAME_LIB[id]);
  const selectedGame = selectedGameId ? GAME_LIB[selectedGameId] : null;
  const inPrequal = state === 'prequal';
  const hasPick = Boolean(selectedGame);

  // Track transition from no-pick → picked for qualifier entrance
  const [animateQualifiers, setAnimateQualifiers] = useState(false);
  const prevHadPick = useRef(hasPick);
  useEffect(() => {
    if (hasPick && !prevHadPick.current && inPrequal) {
      setAnimateQualifiers(true);
      const timer = setTimeout(() => setAnimateQualifiers(false), 1200);
      return () => clearTimeout(timer);
    }
    prevHadPick.current = hasPick;
  }, [hasPick, inPrequal]);

  // Track opt-in → pre-qual transition
  const [showPrequal, setShowPrequal] = useState(state !== 'optin');
  const prevState = useRef(state);
  useEffect(() => {
    if (prevState.current === 'optin' && state === 'prequal') {
      const t = setTimeout(() => setShowPrequal(true), 100);
      return () => clearTimeout(t);
    }
    if (state === 'optin') setShowPrequal(false);
    else setShowPrequal(true);
    prevState.current = state;
  }, [state]);

  const [localOpen, setLocalOpen] = useState(false);
  const pickerOpen = inPrequal && (!hasPick || localOpen || pickerOpenOverride);

  const togglePicker = () => {
    if (!hasPick) return;
    const next = !localOpen;
    setLocalOpen(next);
    if (setPickerOpenOverride) setPickerOpenOverride(false);
  };

  const rewardMode = state === 'qualified' ? 'qualified' : (hasPick ? 'picked' : 'empty');
  const unavailableNotice = !hasPick && disabledIds.length > 0 && inPrequal;

  const footerTime = state === 'qualified'
    ? '2 hrs left to play'
    : state === 'optin'
      ? '18 hours left to opt in'
      : '19 hrs 47 min left to qualify';

  return (
    <div data-component="PromoCard" style={{
      position: 'relative',
      width: '100%',
      borderRadius: 12,
      background: 'rgb(63,146,219)',
      boxShadow: '0 3px 3px -1.5px rgba(10,13,18,0.04), 0 8px 8px -4px rgba(0,0,0,0.03), 0 20px 24px -4px rgba(10,13,18,0.12)',
      overflow: 'hidden',
      fontFamily: 'Figtree, sans-serif',
      color: '#fff',
    }}>
      {/* HERO */}
      <div style={{ position: 'relative' }}>
        {state === 'optin' || state === 'prequal' || state === 'qualified' ? (
          <img
            src="/assets/promo-hero.webp"
            alt="Get 10 Free Spins when you buy scratch"
            style={{
              width: '100%', height: state === 'optin' ? 268 : 244, objectFit: 'cover', display: 'block',
            }}
          />
        ) : (
          <CardHero copyHint={showCopyHint ? 'PICK YOUR GAME' : null} />
        )}
        <div style={{
          position: 'absolute', top: 8, right: 8,
          width: 44, height: 44, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>{Icons.dots}</div>
        <Toast show={Boolean(toastMsg)}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Game unavailable</div>
            {toastMsg}
          </div>
          <button onClick={clearToast} style={{
            background: 'transparent', border: 0, color: '#EAF4FF',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', padding: 4,
            fontFamily: 'inherit',
          }}>Dismiss</button>
        </Toast>
      </div>

      {/* OPT-IN */}
      {state === 'optin' && (
        <>
          <div style={{
            padding: 16,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              fontWeight: 700, fontSize: 20, lineHeight: '28px',
              marginBottom: 8,
            }}>
              Free Spins for buying Scratch Cards!
            </div>
            <div style={{
              fontWeight: 500, fontSize: 14, lineHeight: '20px',
              color: 'rgba(255,255,255,0.95)',
            }}>
              Opt in, pick your favourite game, then deposit {'\u00a3'}20 and stake {'\u00a3'}50 cash within 24 hours to qualify.
            </div>
            <div style={{
              height: 1, width: '100%',
              background: 'rgba(255,255,255,0.2)',
              margin: '12px 0',
            }} />
            <div style={{
              fontWeight: 400, fontSize: 12, lineHeight: '16px',
              color: 'rgba(255,255,255,0.85)',
            }}>
              Valid from 00:00 to 23:59 (UK Time). Opt-in required. Deposit {'\u00a3'}20 and stake {'\u00a3'}50 cash on any casino game. 10 Free Spins ({'\u00a3'}0.20/spin) awarded on your chosen game. Winnings credited as cash. Award must be used within 4 days. 18+. BeGambleAware.org. T&Cs apply.
            </div>
          </div>
          <div style={{ padding: '16px 16px 16px' }}>
            <button onClick={onOptIn} style={{
              width: '100%',
              height: 48, borderRadius: 8,
              background: 'rgba(0,0,0,0.25)',
              color: '#fff',
              border: 0, cursor: 'pointer',
              fontFamily: 'Figtree, sans-serif',
              fontWeight: 700, fontSize: 16, lineHeight: '24px',
              transition: 'background 160ms ease',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.25)'}
            >Opt in</button>
          </div>
        </>
      )}

      {/* PRE-QUAL */}
      {state === 'prequal' && (
        <div style={{
          padding: 16,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {/* ── Rewards section ── */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontWeight: 700, fontSize: 16, lineHeight: '24px',
                color: '#fff',
              }}>Rewards</div>
              <div style={{
                fontWeight: 400, fontSize: 14, lineHeight: '20px',
                color: '#fafafa',
                marginTop: 2,
              }}>You can change your pick any time before qualifying ends.</div>
            </div>
            <div style={{
              borderRadius: 8,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <RewardRow
                mode={rewardMode}
                game={selectedGame}
                onToggle={togglePicker}
                open={pickerOpen}
                unavailable={unavailableNotice}
              />
              <GamePicker
                open={pickerOpen}
                games={games}
                selectedId={selectedGameId}
                onPick={onSelect}
                disabledIds={disabledIds}
              />
            </div>
          </div>

          {/* ── Qualifiers section ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{
                  fontWeight: 700, fontSize: 16, lineHeight: '24px',
                  color: '#fff',
                }}>Qualifiers</div>
                {!hasPick && (
                  <div style={{
                    fontWeight: 400, fontSize: 14, lineHeight: '20px',
                    color: '#fafafa',
                    fontFamily: 'Figtree, sans-serif',
                    marginTop: 2,
                  }}>
                    Choose your game to start qualifying.
                  </div>
                )}
              </div>
              <QualifierRow label="Opt in complete!" complete />
            </div>

            {hasPick && (
              <>
                <QualifierRow
                  label="Deposit" sub={depositLabel}
                  pct={depositPct} complete={depositPct >= 1}
                  icon={depositPct < 1 ? Icons.plus : null}
                  onAction={onDeposit}
                  animate={animateQualifiers} delay={80} />
                <QualifierRow
                  label="Play" sub={playLabel}
                  pct={playPct} complete={playPct >= 1}
                  icon={playPct < 1 ? Icons.play : null}
                  onAction={onPlay}
                  animate={animateQualifiers} delay={200} />
              </>
            )}
          </div>
        </div>
      )}

      {/* QUALIFIED */}
      {state === 'qualified' && (
        <div style={{
          padding: 16,
          display: 'flex', flexDirection: 'column', gap: 20,
        }}>
          {/* ── Rewards: game row with play button ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              fontWeight: 700, fontSize: 16, lineHeight: '24px',
              color: '#fff',
            }}>Rewards</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: 'Figtree, sans-serif',
            }}>
              <GameArt game={selectedGame} size={40} radius={9999} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{
                  fontWeight: 700, fontSize: 14, lineHeight: '20px', color: '#fff',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{selectedGame?.name}</span>
                <span style={{
                  fontWeight: 400, fontSize: 12, lineHeight: '18px', color: '#fff',
                }}>{selectedGame?.tagline}</span>
              </div>
              <div style={{
                width: 44, height: 44, borderRadius: 8,
                background: 'rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, cursor: 'pointer',
              }}>{Icons.play}</div>
            </div>
          </div>

          {/* ── Qualifiers: single "Qualified" row ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              fontWeight: 700, fontSize: 16, lineHeight: '24px',
              color: '#fff',
            }}>Qualifiers</div>
            <QualifiedSummary />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{
        padding: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{
          fontWeight: 700, fontSize: 14, lineHeight: '20px',
          color: '#fff',
        }}>
          {footerTime}
        </span>
        <span style={{
          fontWeight: 700, fontSize: 14, lineHeight: '20px',
          color: '#fff', textDecoration: 'underline',
          textUnderlineOffset: 2,
        }}>Promo terms</span>
      </div>
    </div>
  );
}

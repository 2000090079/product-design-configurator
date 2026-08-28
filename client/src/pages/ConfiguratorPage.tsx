import React, { useState } from 'react'
import { useConfigurator } from '../hooks/useConfigurator'
import { ColorPicker } from '../components/ColorPicker'
import { ProductPreview } from '../components/ProductPreview'
import { ShoeView } from '../types'

/* ─── tiny icon helpers ────────────────────────────────────────── */
function IconShare() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}
function IconReset() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
    </svg>
  )
}
function IconSave() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

const VIEW_OPTIONS: { value: ShoeView; label: string }[] = [
  { value: 'left',  label: 'Left Side' },
  { value: 'top',   label: 'Top' },
  { value: 'right', label: 'Right Side' },
]

export function ConfiguratorPage() {
  const {
    config,
    shoeColors,
    shoeView,
    isSaving,
    shareUrl,
    error,
    updateName,
    updatePartColor,
    resetColors,
    generateShareUrl,
    setShoeView,
    saveConfig,
  } = useConfigurator()

  const [copied, setCopied] = useState(false)
  const [localShareUrl, setLocalShareUrl] = useState<string | null>(null)

  const handleShare = () => {
    const url = generateShareUrl()
    setLocalShareUrl(url)
    navigator.clipboard.writeText(url).catch(() => {
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayShareUrl = localShareUrl ?? shareUrl

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0f1e', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backgroundColor: 'rgba(17,24,39,0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #e94560, #8b2cf5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}>
              👟
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px', color: '#fff', letterSpacing: '-0.02em' }}>
                SOLE STUDIO
              </div>
              <div style={{ fontSize: '11px', color: '#4b5563', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Shoe Configurator
              </div>
            </div>
          </div>

          {/* Name input in header */}
          <input
            value={config.name}
            onChange={e => updateName(e.target.value)}
            placeholder="Design name…"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              width: '200px',
              outline: 'none',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          />
        </div>
      </header>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

        {/* ── LEFT PANEL: color pickers ── */}
        <aside style={{
          width: '320px',
          flexShrink: 0,
          backgroundColor: '#111827',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '24px',
          position: 'sticky',
          top: '88px',
          maxHeight: 'calc(100vh - 104px)',
          overflowY: 'auto',
        }}>
          <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em', margin: 0 }}>
              Part Colors
            </h2>
            <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
              Select a part to customize its color
            </p>
          </div>

          <ColorPicker shoeColors={shoeColors} onChange={updatePartColor} />

          {/* Action buttons */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {/* Share / Copy link */}
            <button
              onClick={handleShare}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(233,69,96,0.4)',
                backgroundColor: copied ? 'rgba(16,185,129,0.15)' : 'rgba(233,69,96,0.12)',
                color: copied ? '#10b981' : '#e94560',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {copied ? <IconCheck /> : <IconShare />}
              {copied ? 'Link Copied!' : 'Share Design'}
            </button>

            {/* URL display */}
            {displayShareUrl && (
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '11px',
                color: '#6b7280',
                wordBreak: 'break-all',
                fontFamily: 'monospace',
                lineHeight: '1.5',
              }}>
                {displayShareUrl}
              </div>
            )}

            {/* Reset */}
            <button
              onClick={resetColors}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#9ca3af',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              <IconReset />
              Reset to Defaults
            </button>

            {/* Save to database */}
            <button
              onClick={saveConfig}
              disabled={isSaving}
              style={{
                width: '100%',
                padding: '10px 16px',
                borderRadius: '10px',
                border: 'none',
                background: isSaving ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #e94560, #8b2cf5)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                opacity: isSaving ? 0.6 : 1,
                fontFamily: 'inherit',
              }}
            >
              <IconSave />
              {isSaving ? 'Saving…' : 'Save to Library'}
            </button>

            {error && (
              <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', margin: 0 }}>
                {error}
              </p>
            )}
          </div>
        </aside>

        {/* ── RIGHT PANEL: shoe preview ── */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Preview card */}
          <div style={{
            backgroundColor: '#111827',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '40px 32px 32px',
            minHeight: '520px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background grid */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.03,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />

            {/* Glow behind shoe */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px', height: '300px',
              background: `radial-gradient(ellipse, ${shoeColors.accent}20 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* Shoe SVG */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', minHeight: '300px' }}>
              <ProductPreview shoeColors={shoeColors} shoeView={shoeView} />
            </div>

            {/* View toggle */}
            <div style={{
              position: 'relative',
              marginTop: '32px',
              display: 'flex',
              gap: '6px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              padding: '4px',
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              {VIEW_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setShoeView(opt.value)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '7px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    fontFamily: 'inherit',
                    letterSpacing: '0.02em',
                    ...(shoeView === opt.value
                      ? { backgroundColor: '#e94560', color: '#fff' }
                      : { backgroundColor: 'transparent', color: '#6b7280' }
                    ),
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Color preview chips */}
            <div style={{ position: 'relative', marginTop: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {(Object.entries(shoeColors) as [keyof typeof shoeColors, string][]).map(([part, hex]) => (
                <div
                  key={part}
                  title={`${part}: ${hex}`}
                  style={{
                    width: '20px', height: '20px',
                    borderRadius: '50%',
                    backgroundColor: hex,
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: `0 0 0 1px ${hex}60`,
                    cursor: 'default',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Material info strip */}
          <div style={{
            marginTop: '16px',
            backgroundColor: '#111827',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Design Name
              </div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginTop: '2px' }}>
                {config.name}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                7 Customizable Parts
              </div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: '#e94560', fontWeight: 600 }}>Upper</span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>·</span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>Sole</span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>·</span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>Toe Cap</span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>·</span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>+4 more</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

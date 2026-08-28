import React, { useState } from 'react'
import { useConfigurator } from '../hooks/useConfigurator'
import { ColorPicker } from '../components/ColorPicker'
import { ProductPreview } from '../components/ProductPreview'
import { ShoeView } from '../types'

function IconShare() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}
function IconReset() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
    </svg>
  )
}
function IconSave() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

const VIEW_OPTIONS: { value: ShoeView; label: string }[] = [
  { value: 'left',  label: 'Left Side' },
  { value: 'top',   label: 'Top' },
  { value: 'right', label: 'Right Side' },
]

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0a0f1e',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#fff',
  },
  header: {
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    backgroundColor: 'rgba(17,24,39,0.92)',
    backdropFilter: 'blur(12px)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    padding: '0 24px',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrap: {
    maxWidth: 760,
    margin: '0 auto',
    padding: '24px 16px 48px',
  },
  previewCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '28px 24px 20px',
    marginBottom: 20,
    position: 'relative' as const,
    overflow: 'hidden',
  },
  gridBg: {
    position: 'absolute' as const,
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),' +
      'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
    backgroundSize: '36px 36px',
    pointerEvents: 'none' as const,
  },
  svgWrap: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: 560,
    margin: '0 auto',
  },
  viewRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 6,
    marginTop: 18,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 10,
    padding: 4,
    width: 'fit-content',
    margin: '16px auto 0',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  pickersCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '20px 20px 16px',
    marginBottom: 14,
  },
  actionsRow: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
    marginBottom: 8,
  },
  btn: (active?: boolean, accent?: boolean): React.CSSProperties => ({
    flex: 1,
    minWidth: 110,
    padding: '10px 14px',
    borderRadius: 10,
    border: accent
      ? 'none'
      : `1px solid ${active ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.1)'}`,
    background: accent
      ? 'linear-gradient(135deg,#e94560,#8b2cf5)'
      : active
        ? 'rgba(16,185,129,0.14)'
        : 'rgba(255,255,255,0.05)',
    color: active ? '#10b981' : accent ? '#fff' : '#9ca3af',
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    fontFamily: 'inherit',
    transition: 'opacity 0.15s',
  }),
}

export function ConfiguratorPage() {
  const {
    config, shoeColors, shoeView, isSaving, shareUrl, error,
    updateName, updatePartColor, resetColors, generateShareUrl,
    setShoeView, saveConfig,
  } = useConfigurator()

  const [copied, setCopied] = useState(false)
  const [localShareUrl, setLocalShareUrl] = useState<string | null>(null)

  const handleShare = () => {
    const url = generateShareUrl()
    setLocalShareUrl(url)
    navigator.clipboard.writeText(url).catch(() => {
      const el = document.createElement('input')
      el.value = url; document.body.appendChild(el)
      el.select(); document.execCommand('copy')
      document.body.removeChild(el)
    })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayShareUrl = localShareUrl ?? shareUrl

  return (
    <div style={S.page}>
      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg,#e94560,#8b2cf5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>👟</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '-0.01em' }}>SOLE STUDIO</div>
            <div style={{ fontSize: 10, color: '#4b5563', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Shoe Configurator
            </div>
          </div>
        </div>
        <input
          value={config.name}
          onChange={e => updateName(e.target.value)}
          placeholder="Design name…"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '5px 12px',
            color: '#fff', fontSize: 13, fontWeight: 500,
            width: 170, outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      </header>

      <div style={S.wrap}>
        {/* ── SHOE PREVIEW (full width) ── */}
        <div style={S.previewCard}>
          <div style={S.gridBg} />
          {/* ambient glow behind shoe */}
          <div style={{
            position: 'absolute', top: '40%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '70%', height: '50%',
            background: `radial-gradient(ellipse,${shoeColors.accent}22 0%,transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* THE SHOE SVG */}
          <div style={S.svgWrap}>
            <ProductPreview shoeColors={shoeColors} shoeView={shoeView} />
          </div>

          {/* view toggle */}
          <div style={S.viewRow}>
            {VIEW_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setShoeView(opt.value)} style={{
                padding: '6px 14px', borderRadius: 7, border: 'none',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', letterSpacing: '0.01em',
                transition: 'all 0.15s',
                backgroundColor: shoeView === opt.value ? '#e94560' : 'transparent',
                color: shoeView === opt.value ? '#fff' : '#6b7280',
              }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── ACTIONS ── */}
        <div style={S.actionsRow}>
          <button onClick={handleShare} style={S.btn(copied, false)}>
            {copied ? <IconCheck /> : <IconShare />}
            {copied ? 'Copied!' : 'Share'}
          </button>
          <button onClick={resetColors} style={S.btn(false, false)}>
            <IconReset /> Reset
          </button>
          <button onClick={saveConfig} disabled={isSaving}
            style={{ ...S.btn(false, true), opacity: isSaving ? 0.6 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}>
            <IconSave /> {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>

        {/* share URL display */}
        {displayShareUrl && (
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '8px 12px', marginBottom: 14,
            fontSize: 11, color: '#6b7280', wordBreak: 'break-all',
            fontFamily: 'monospace', lineHeight: 1.5,
          }}>
            {displayShareUrl}
          </div>
        )}
        {error && (
          <p style={{ color: '#ef4444', fontSize: 12, textAlign: 'center', margin: '0 0 12px' }}>
            {error}
          </p>
        )}

        {/* ── COLOR PICKERS ── */}
        <div style={S.pickersCard}>
          <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#fff' }}>Customize Parts</h2>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: '#6b7280' }}>
              Click any swatch to change that region's color instantly
            </p>
          </div>
          <ColorPicker shoeColors={shoeColors} onChange={updatePartColor} />
        </div>
      </div>
    </div>
  )
}

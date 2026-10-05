import React, { useState } from 'react'
import { useConfigurator } from '../hooks/useConfigurator'
import { useTheme } from '../hooks/useTheme'
import { ColorPicker } from '../components/ColorPicker'
import { ProductPreview } from '../components/ProductPreview'
import { ProductTypeSelector } from '../components/ProductTypeSelector'
import { MaterialSelector } from '../components/MaterialSelector'
import { PRODUCTS } from '../data/options'
import { ProductType } from '../types'

const icon = (children: React.ReactNode) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)
const IconShare = () => icon(<><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></>)
const IconReset = () => icon(<><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.51" /></>)
const IconCheck = () => icon(<polyline points="20 6 9 17 4 12" />)
const IconSun = () => icon(<><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.5 1.5M17.2 17.2l1.5 1.5M5.3 18.7l1.5-1.5M17.2 6.8l1.5-1.5" /></>)
const IconMoon = () => icon(<path d="M20.5 14.6A8.5 8.5 0 1 1 9.4 3.5a6.8 6.8 0 0 0 11.1 11.1z" />)

const HEADLINE: Record<ProductType, React.ReactNode> = {
  shoe: <>Design your <em className="gold-text">signature</em> sneaker</>,
  shirt: <>A shirt cut to your <em className="gold-text">taste</em></>,
  cap: <>The cap, <em className="gold-text">reimagined</em></>,
  pants: <>Tailored trousers, <em className="gold-text">your way</em></>,
}

/** Short, stable reference number for the current design (like a boutique order ref). */
function designRef(seed: string): string {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  return String(Math.abs(h) % 10000).padStart(4, '0')
}

export function ConfiguratorPage() {
  const {
    config, productType, colors, materialId, view, isSaving, shareUrl, error,
    updateProductType, updateMaterial, updateName, updatePartColor, resetColors,
    generateShareUrl, setView, saveConfig,
  } = useConfigurator()
  const { theme, setTheme } = useTheme()
  const def = PRODUCTS[productType]
  const material = def.materials.find(m => m.id === materialId)
  const ref = designRef(productType + materialId + Object.values(colors).join(''))

  const [copied, setCopied] = useState(false)
  const handleShare = () => {
    const url = generateShareUrl()
    navigator.clipboard?.writeText(url).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stageWidth = { shoe: 640, cap: 470, shirt: 380, pants: 300 }[productType]

  return (
    <div className="lux-page">
      {/* ── HEADER ── */}
      <header className="lux-header">
        <div className="brand">
          <div className="brand-mark"><span className="gold-text">D</span></div>
          <div style={{ minWidth: 0 }}>
            <div className="brand-name">DESIGN STUDIO</div>
          </div>
        </div>
        <div className="header-right">
          <input
            className="name-input"
            value={config.name}
            onChange={e => updateName(e.target.value)}
            placeholder="Name your design"
            aria-label="Design name"
          />
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </header>

      <main className="lux-main">
        {/* ── PREVIEW ── */}
        <section className="lux-sticky" aria-label="Preview">
          <div style={{ marginBottom: 18 }}>
            <div className="eyebrow">Made to Order</div>
            <h1 className="hero-title">{HEADLINE[productType]}</h1>
          </div>

          <div className="stage-card">
            <div className="stage">
              <span className="stage-corner tl" /><span className="stage-corner tr" />
              <span className="stage-corner bl" /><span className="stage-corner br" />
              <span className="stage-label">{def.label} · Design Studio</span>
              <span className="stage-ref">N° {ref}</span>

              <div style={{ position: 'relative', margin: '0 auto', maxWidth: stageWidth }}>
                <ProductPreview productType={productType} colors={colors} materialId={materialId} view={view} />
              </div>

              <div className="view-tabs">
                {def.views.map(opt => (
                  <button key={opt.id} onClick={() => setView(opt.id)} aria-pressed={view === opt.id}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="stage-meta">
              <div style={{ minWidth: 0 }}>
                <div className="title">{config.name || 'Untitled'}</div>
                <div className="sub">{def.noun} — {material?.name}</div>
              </div>
              <div className="palette-dots">
                {def.parts.map(p => <span key={p.id} title={p.label} style={{ backgroundColor: colors[p.id] }} />)}
              </div>
            </div>
          </div>

          <div className="actions">
            <button onClick={handleShare} className={`btn btn-ghost${copied ? ' ok' : ''}`}>
              {copied ? <IconCheck /> : <IconShare />}
              {copied ? 'Copied' : 'Share'}
            </button>
            <button onClick={resetColors} className="btn btn-ghost">
              <IconReset /> Reset
            </button>
            <button onClick={saveConfig} disabled={isSaving} className="btn btn-gold">
              {isSaving ? 'Saving…' : 'Save Design'}
            </button>
          </div>
          {shareUrl && <div className="share-url">{shareUrl}</div>}
          {error && <p className="error-text">{error}</p>}
        </section>

        {/* ── CONTROLS ── */}
        <section aria-label="Customize" style={{ minWidth: 0 }}>
          <div className="panel">
            <div className="panel-head">
              <span className="panel-num">i.</span>
              <h2 className="panel-title">The Piece</h2>
              <span className="panel-hint">Choose what to create</span>
            </div>
            <div className="rule" />
            <ProductTypeSelector selected={productType} onChange={updateProductType} />
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-num">ii.</span>
              <h2 className="panel-title">Material</h2>
              <span className="panel-hint">Finish of the main panels</span>
            </div>
            <div className="rule" />
            <MaterialSelector productType={productType} selectedId={materialId} onChange={updateMaterial} />
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-num">iii.</span>
              <h2 className="panel-title">Colourway</h2>
              <span className="panel-hint">Tap a swatch · or the chip for any shade</span>
            </div>
            <div className="rule" />
            <ColorPicker parts={def.parts} colors={colors} onChange={updatePartColor} />
          </div>
        </section>
      </main>

      <footer className="lux-footer">
        <span>Design Studio</span>
        <span>Crafted to order</span>
      </footer>
    </div>
  )
}

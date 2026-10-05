import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SavedConfig } from '../types'
import { ProductPreview } from '../components/ProductPreview'
import { api } from '../lib/api'
import { PRODUCTS } from '../data/options'
import { useTheme } from '../hooks/useTheme'

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="lux-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24, textAlign: 'center' }}>
      {children}
    </div>
  )
}

export function SharedConfigPage() {
  useTheme()
  const { shareId } = useParams<{ shareId: string }>()
  const [config, setConfig] = useState<SavedConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!shareId) return
    api.get(`/api/configurations/share/${shareId}`)
      .then(res => {
        if (res.status === 404) { setNotFound(true); return null }
        return res.json()
      })
      .then(data => { if (data) setConfig(data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [shareId])

  if (loading) {
    return (
      <Centered>
        <div className="eyebrow">Design Studio</div>
        <p className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--text-2)', margin: 0 }}>Unveiling the design…</p>
      </Centered>
    )
  }

  if (notFound || !config) {
    return (
      <Centered>
        <div className="eyebrow">Design Studio</div>
        <p className="serif" style={{ fontSize: 28, margin: 0 }}>This design could not be found.</p>
        <Link to="/" className="btn btn-ghost" style={{ textDecoration: 'none', padding: '0 28px' }}>Create your own</Link>
      </Centered>
    )
  }

  const def = PRODUCTS[config.productType] ?? PRODUCTS.shoe
  const colors = config.colors ?? config.shoeColors ?? {}
  const material = def.materials.find(m => m.id === config.materialId)

  return (
    <div className="lux-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 4vw, 48px)' }}>
      <div className="stage-card" style={{ width: '100%', maxWidth: 620 }}>
        <div style={{ padding: '26px 28px 22px', borderBottom: '1px solid var(--line)' }}>
          <div className="eyebrow">Shared Design · Design Studio</div>
          <h1 className="hero-title" style={{ fontSize: 34 }}>{config.name}</h1>
        </div>

        <div className="stage">
          <span className="stage-corner tl" /><span className="stage-corner tr" />
          <span className="stage-corner bl" /><span className="stage-corner br" />
          <div style={{ position: 'relative', maxWidth: def.type === 'shoe' ? 500 : 320, margin: '0 auto' }}>
            <ProductPreview productType={def.type} colors={colors} materialId={config.materialId} />
          </div>
        </div>

        <div style={{ padding: '6px 28px 26px' }}>
          {[
            ['Piece', def.noun],
            ...(material ? [['Material', material.name]] : []),
          ].map(([k, v]) => (
            <div key={k} className="part-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="part-label">{k}</span>
              <span className="serif" style={{ fontSize: 19 }}>{v}</span>
            </div>
          ))}
          {Object.keys(colors).length > 0 && (
            <div className="part-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="part-label">Colourway</span>
              <div className="palette-dots">
                {Object.values(colors).map((hex, i) => <span key={i} style={{ backgroundColor: hex }} />)}
              </div>
            </div>
          )}
          <Link to="/" className="btn btn-gold" style={{ textDecoration: 'none', width: '100%', marginTop: 20 }}>
            Create Your Own Design
          </Link>
        </div>
      </div>
    </div>
  )
}

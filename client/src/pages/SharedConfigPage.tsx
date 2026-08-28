import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SavedConfig } from '../types'
import { ProductPreview } from '../components/ProductPreview'
import { api } from '../lib/api'

export function SharedConfigPage() {
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
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0f1e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>👟</div>
          <p style={{ color: '#6b7280', fontSize: '14px', fontFamily: "'Inter', system-ui" }}>Loading design…</p>
        </div>
      </div>
    )
  }

  if (notFound || !config) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0f1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', fontFamily: "'Inter', system-ui" }}>
        <p style={{ color: '#9ca3af', fontSize: '16px', fontWeight: 500 }}>Design not found.</p>
        <Link to="/" style={{ color: '#e94560', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}>
          ← Create your own
        </Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0f1e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "'Inter', system-ui" }}>
      <div style={{ width: '100%', maxWidth: '520px', backgroundColor: '#111827', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #e94560, #8b2cf5)', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '24px' }}>👟</div>
          <div>
            <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '18px', margin: 0, letterSpacing: '-0.02em' }}>
              {config.name}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', margin: '2px 0 0', fontWeight: 500 }}>
              Shared Design · Sole Studio
            </p>
          </div>
        </div>

        {/* Shoe preview */}
        <div style={{ padding: '32px 24px 20px', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div style={{ height: '260px' }}>
            <ProductPreview config={config} shoeView="left" />
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {config.shoeColors && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>Colors</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Object.values(config.shoeColors).map((hex, i) => (
                    <div
                      key={i}
                      style={{
                        width: '18px', height: '18px',
                        borderRadius: '50%',
                        backgroundColor: hex,
                        border: '1.5px solid rgba(255,255,255,0.1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>Type</span>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>Custom Sneaker</span>
            </div>
          </div>

          <Link
            to="/"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              padding: '12px',
              background: 'linear-gradient(135deg, #e94560, #8b2cf5)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            Create Your Own Design
          </Link>
        </div>
      </div>
    </div>
  )
}

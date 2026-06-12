import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { SavedConfig } from '../types'
import { ProductPreview } from '../components/ProductPreview'
import { COLOR_OPTIONS, MATERIAL_OPTIONS, PRODUCT_TYPES } from '../data/options'

export function SharedConfigPage() {
  const { shareId } = useParams<{ shareId: string }>()
  const [config, setConfig] = useState<SavedConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!shareId) return
    fetch(`/api/configurations/share/${shareId}`)
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading configuration…</p>
      </div>
    )
  }

  if (notFound || !config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-700 font-medium">Configuration not found.</p>
        <Link to="/" className="text-sm text-blue-600 hover:underline">Back to configurator</Link>
      </div>
    )
  }

  const color = COLOR_OPTIONS.find(c => c.id === config.colorId)
  const material = MATERIAL_OPTIONS.find(m => m.id === config.materialId)
  const productLabel = PRODUCT_TYPES.find(p => p.value === config.productType)?.label

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-black px-6 py-4">
          <h1 className="text-white font-bold text-lg">{config.name}</h1>
          <p className="text-gray-400 text-xs mt-0.5">Shared Design</p>
        </div>

        <div className="p-6">
          <div className="h-64 mb-6">
            <ProductPreview config={config} />
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Category</dt>
              <dd className="font-medium text-gray-900">{productLabel}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Color</dt>
              <dd className="flex items-center gap-2 font-medium text-gray-900">
                <span className="w-4 h-4 rounded-full inline-block border border-gray-200" style={{ backgroundColor: color?.hex }} />
                {color?.name}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Material</dt>
              <dd className="font-medium text-gray-900">{material?.name}</dd>
            </div>
          </dl>

          <Link
            to="/"
            className="mt-6 block w-full text-center py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-900 transition-colors"
          >
            Create Your Own
          </Link>
        </div>
      </div>
    </main>
  )
}

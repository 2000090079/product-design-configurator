import { useState, useCallback } from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

const DEFAULT_CONFIG: ProductConfig = {
  productType: 'shoe',
  colorId: COLOR_OPTIONS[0].id,
  materialId: MATERIAL_OPTIONS[0].id,
  name: 'My Design',
}

export function useConfigurator() {
  const [config, setConfig] = useState<ProductConfig>(DEFAULT_CONFIG)
  const [isSaving, setIsSaving] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateProductType = useCallback((productType: ProductType) => {
    setConfig(prev => ({ ...prev, productType }))
    setShareUrl(null)
  }, [])

  const updateColor = useCallback((colorId: string) => {
    setConfig(prev => ({ ...prev, colorId }))
    setShareUrl(null)
  }, [])

  const updateMaterial = useCallback((materialId: string) => {
    setConfig(prev => ({ ...prev, materialId }))
    setShareUrl(null)
  }, [])

  const updateName = useCallback((name: string) => {
    setConfig(prev => ({ ...prev, name }))
  }, [])

  const saveConfig = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/configurations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      const url = `${window.location.origin}/share/${data.shareId}`
      setShareUrl(url)
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [config])

  return { config, isSaving, shareUrl, error, updateProductType, updateColor, updateMaterial, updateName, saveConfig }
}

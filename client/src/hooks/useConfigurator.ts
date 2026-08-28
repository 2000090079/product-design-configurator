import { useState, useCallback, useEffect } from 'react'
import { ProductConfig, ProductType, ShoeColors, ShoeView, ShoePart } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'
import { api } from '../lib/api'

export const DEFAULT_SHOE_COLORS: ShoeColors = {
  sole:    '#1a1a1a',
  upper:   '#ffffff',
  toe_cap: '#cccccc',
  heel:    '#cccccc',
  laces:   '#ffffff',
  tongue:  '#ffffff',
  accent:  '#e94560',
}

const SHOE_PARTS: ShoePart[] = ['sole', 'upper', 'toe_cap', 'heel', 'laces', 'tongue', 'accent']

function readColorsFromUrl(): Partial<ShoeColors> {
  const params = new URLSearchParams(window.location.search)
  const out: Partial<ShoeColors> = {}
  SHOE_PARTS.forEach(part => {
    const val = params.get(part)
    if (val && /^[0-9a-fA-F]{6}$/.test(val)) {
      out[part] = `#${val}`
    }
  })
  return out
}

const DEFAULT_CONFIG: ProductConfig = {
  productType: 'shoe',
  colorId: COLOR_OPTIONS[0].id,
  materialId: MATERIAL_OPTIONS[0].id,
  name: 'My Design',
}

export function useConfigurator() {
  const [config, setConfig] = useState<ProductConfig>(DEFAULT_CONFIG)
  const [shoeColors, setShoeColors] = useState<ShoeColors>(() => ({
    ...DEFAULT_SHOE_COLORS,
    ...readColorsFromUrl(),
  }))
  const [shoeView, setShoeView] = useState<ShoeView>('left')
  const [isSaving, setIsSaving] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Sync URL params → state on mount (also handles direct-link sharing)
  useEffect(() => {
    const urlColors = readColorsFromUrl()
    if (Object.keys(urlColors).length > 0) {
      setShoeColors(prev => ({ ...prev, ...urlColors }))
    }
  }, [])

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

  const updatePartColor = useCallback((part: ShoePart, hex: string) => {
    setShoeColors(prev => ({ ...prev, [part]: hex }))
    setShareUrl(null)
  }, [])

  const resetColors = useCallback(() => {
    setShoeColors(DEFAULT_SHOE_COLORS)
    setShareUrl(null)
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  const generateShareUrl = useCallback((): string => {
    const params = new URLSearchParams()
    SHOE_PARTS.forEach(part => {
      params.set(part, shoeColors[part].replace('#', ''))
    })
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    setShareUrl(url)
    window.history.replaceState({}, '', `?${params.toString()}`)
    return url
  }, [shoeColors])

  const saveConfig = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      const payload = { ...config, shoeColors }
      const res = await api.post('/api/configurations', payload)
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      const url = `${window.location.origin}/share/${data.shareId}`
      setShareUrl(url)
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [config, shoeColors])

  return {
    config,
    shoeColors,
    shoeView,
    isSaving,
    shareUrl,
    error,
    updateProductType,
    updateColor,
    updateMaterial,
    updateName,
    updatePartColor,
    resetColors,
    generateShareUrl,
    setShoeView,
    saveConfig,
  }
}

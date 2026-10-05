import { useState, useCallback } from 'react'
import { PartColors, ProductConfig, ProductType, ViewId } from '../types'
import { PRODUCTS, defaultColors } from '../data/options'
import { api } from '../lib/api'

const HEX = /^[0-9a-fA-F]{6}$/

type ColorsByProduct = Record<ProductType, PartColors>
type MaterialByProduct = Record<ProductType, string>

const ALL_TYPES = Object.keys(PRODUCTS) as ProductType[]

function initialState() {
  const colors = {} as ColorsByProduct
  const materials = {} as MaterialByProduct
  ALL_TYPES.forEach(t => {
    colors[t] = defaultColors(t)
    materials[t] = PRODUCTS[t].materials[0].id
  })

  // Restore a shared design from the URL: ?product=cap&material=wool&brim=1f2a44…
  const params = new URLSearchParams(window.location.search)
  const p = params.get('product') as ProductType | null
  const productType: ProductType = p && PRODUCTS[p] ? p : 'shoe'
  PRODUCTS[productType].parts.forEach(part => {
    const val = params.get(part.id)
    if (val && HEX.test(val)) colors[productType][part.id] = `#${val.toLowerCase()}`
  })
  const m = params.get('material')
  if (m && PRODUCTS[productType].materials.some(x => x.id === m)) materials[productType] = m

  return { colors, materials, productType }
}

export function useConfigurator() {
  const [init] = useState(initialState)
  const [productType, setProductType] = useState<ProductType>(init.productType)
  const [colorsByProduct, setColorsByProduct] = useState<ColorsByProduct>(init.colors)
  const [materialByProduct, setMaterialByProduct] = useState<MaterialByProduct>(init.materials)
  const [viewByProduct, setViewByProduct] = useState<Record<ProductType, ViewId>>(() => {
    const v = {} as Record<ProductType, ViewId>
    ALL_TYPES.forEach(t => { v[t] = PRODUCTS[t].views[0].id })
    return v
  })
  const [name, setName] = useState('My Design')
  const [isSaving, setIsSaving] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const colors = colorsByProduct[productType]
  const materialId = materialByProduct[productType]
  const view = viewByProduct[productType]

  const config: ProductConfig = { productType, materialId, name, colors }

  const updateProductType = useCallback((t: ProductType) => {
    setProductType(t)
    setShareUrl(null)
  }, [])

  const updateMaterial = useCallback((id: string) => {
    setMaterialByProduct(prev => ({ ...prev, [productType]: id }))
    setShareUrl(null)
  }, [productType])

  const updatePartColor = useCallback((part: string, hex: string) => {
    setColorsByProduct(prev => ({ ...prev, [productType]: { ...prev[productType], [part]: hex } }))
    setShareUrl(null)
  }, [productType])

  const setView = useCallback((v: ViewId) => {
    setViewByProduct(prev => ({ ...prev, [productType]: v }))
  }, [productType])

  const resetColors = useCallback(() => {
    setColorsByProduct(prev => ({ ...prev, [productType]: defaultColors(productType) }))
    setMaterialByProduct(prev => ({ ...prev, [productType]: PRODUCTS[productType].materials[0].id }))
    setShareUrl(null)
    window.history.replaceState({}, '', window.location.pathname)
  }, [productType])

  const generateShareUrl = useCallback((): string => {
    const params = new URLSearchParams()
    params.set('product', productType)
    params.set('material', materialId)
    PRODUCTS[productType].parts.forEach(part => {
      params.set(part.id, colors[part.id].replace('#', ''))
    })
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    setShareUrl(url)
    window.history.replaceState({}, '', `?${params.toString()}`)
    return url
  }, [productType, materialId, colors])

  const saveConfig = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      const res = await api.post('/api/configurations', config)
      if (!res.ok) throw new Error('Failed to save')
      const data = await res.json()
      setShareUrl(`${window.location.origin}/share/${data.shareId}`)
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [config])

  return {
    config,
    productType,
    colors,
    materialId,
    view,
    isSaving,
    shareUrl,
    error,
    updateProductType,
    updateMaterial,
    updateName: setName,
    updatePartColor,
    resetColors,
    generateShareUrl,
    setView,
    saveConfig,
  }
}

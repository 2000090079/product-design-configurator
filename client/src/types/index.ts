export type ProductType = 'shoe' | 'shirt' | 'cap' | 'pants'

export type ViewId = 'left' | 'right' | 'top' | 'front' | 'back' | 'side'

/** Map of part id → hex color for the active product */
export type PartColors = Record<string, string>

export interface PartDef {
  id: string
  label: string
  default: string
}

export interface ViewDef {
  id: ViewId
  label: string
}

export interface MaterialOption {
  id: string
  name: string
  description: string
}

export interface ProductDef {
  type: ProductType
  label: string
  emoji: string
  noun: string
  parts: PartDef[]
  views: ViewDef[]
  materials: MaterialOption[]
}

export interface ProductConfig {
  productType: ProductType
  materialId: string
  name: string
  colors: PartColors
}

export interface SavedConfig extends ProductConfig {
  _id: string
  shareId: string
  createdAt: string
  /** legacy field from shoe-only saves */
  shoeColors?: PartColors
}

export type ProductType = 'shoe' | 'shirt' | 'pants'

export type ShoeView = 'left' | 'top' | 'right'

export type ShoePart = 'sole' | 'upper' | 'toe_cap' | 'heel' | 'laces' | 'tongue' | 'accent'

export interface ShoeColors {
  sole: string
  upper: string
  toe_cap: string
  heel: string
  laces: string
  tongue: string
  accent: string
}

export interface ColorOption {
  id: string
  name: string
  hex: string
}

export interface MaterialOption {
  id: string
  name: string
  description: string
}

export interface ProductConfig {
  productType: ProductType
  colorId: string
  materialId: string
  name: string
  shoeColors?: ShoeColors
}

export interface SavedConfig extends ProductConfig {
  _id: string
  shareId: string
  createdAt: string
}

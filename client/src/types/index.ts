export type ProductType = 'shoe' | 'shirt' | 'pants'

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
}

export interface SavedConfig extends ProductConfig {
  _id: string
  shareId: string
  createdAt: string
}

import React from 'react'
import { PartColors, ProductType, ViewId } from '../types'
import { PRODUCTS, defaultColors } from '../data/options'
import { Shoe } from './products/Shoe'
import { Shirt } from './products/Shirt'
import { Cap } from './products/Cap'
import { Pants } from './products/Pants'

interface Props {
  productType: ProductType
  colors?: Partial<PartColors>
  materialId?: string
  view?: ViewId
}

const RENDERERS = { shoe: Shoe, shirt: Shirt, cap: Cap, pants: Pants }

export function ProductPreview({ productType, colors, materialId, view }: Props) {
  const def = PRODUCTS[productType]
  const merged = { ...defaultColors(productType), ...colors } as PartColors
  const material = materialId ?? def.materials[0].id
  const v = view && def.views.some(x => x.id === view) ? view : def.views[0].id
  const Renderer = RENDERERS[productType]
  return <Renderer colors={merged} material={material} view={v} />
}

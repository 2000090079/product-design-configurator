import React from 'react'
import { ProductType } from '../types'
import { PRODUCT_TYPES } from '../data/options'
import { ProductIcon } from './ProductIcon'

interface Props {
  selected: ProductType
  onChange: (type: ProductType) => void
}

export function ProductTypeSelector({ selected, onChange }: Props) {
  return (
    <div role="group" aria-label="Product category" className="product-grid">
      {PRODUCT_TYPES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={selected === value}
          className="product-btn"
        >
          <ProductIcon type={value} />
          {label}
        </button>
      ))}
    </div>
  )
}

import React from 'react'
import { ProductType } from '../types'
import { PRODUCT_TYPES } from '../data/options'

interface Props {
  selected: ProductType
  onChange: (type: ProductType) => void
}

export function ProductTypeSelector({ selected, onChange }: Props) {
  return (
    <div role="group" aria-labelledby="product-type-label">
      <p id="product-type-label" className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        Product Category
      </p>
      <div className="flex gap-3">
        {PRODUCT_TYPES.map(({ value, label, emoji }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            aria-pressed={selected === value}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-150 text-sm font-medium
              ${selected === value
                ? 'border-black bg-black text-white shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
          >
            <span className="block text-xl mb-1">{emoji}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

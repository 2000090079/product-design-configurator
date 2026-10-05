import React from 'react'
import { ProductType } from '../types'
import { PRODUCTS } from '../data/options'

interface Props {
  productType?: ProductType
  selectedId: string
  onChange: (id: string) => void
}

export function MaterialSelector({ productType = 'shoe', selectedId, onChange }: Props) {
  return (
    <div className="material-list" role="listbox" aria-label="Select material">
      {PRODUCTS[productType].materials.map(mat => (
        <button
          key={mat.id}
          role="option"
          aria-selected={selectedId === mat.id}
          onClick={() => onChange(mat.id)}
          className="material-opt"
        >
          <span className="mark" aria-hidden="true" />
          <span>
            <span className="m-name block">{mat.name}</span>
            <span className="m-desc block">{mat.description}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

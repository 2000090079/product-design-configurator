import React from 'react'
import { MATERIAL_OPTIONS } from '../data/options'

interface Props {
  selectedId: string
  onChange: (id: string) => void
}

export function MaterialSelector({ selectedId, onChange }: Props) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Material</p>
      <div className="space-y-2" role="listbox" aria-label="Select material">
        {MATERIAL_OPTIONS.map((mat) => (
          <button
            key={mat.id}
            role="option"
            aria-selected={selectedId === mat.id}
            onClick={() => onChange(mat.id)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150
              ${selectedId === mat.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
          >
            <span className="block text-sm font-semibold text-gray-900">{mat.name}</span>
            <span className="block text-xs text-gray-500 mt-0.5">{mat.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

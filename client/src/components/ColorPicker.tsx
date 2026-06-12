import React from 'react'
import { COLOR_OPTIONS } from '../data/options'

interface Props {
  selectedId: string
  onChange: (id: string) => void
}

export function ColorPicker({ selectedId, onChange }: Props) {
  const selectedColor = COLOR_OPTIONS.find(c => c.id === selectedId)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Color</p>
        {selectedColor && <span className="text-sm text-gray-500">{selectedColor.name}</span>}
      </div>
      <div className="flex flex-wrap gap-3" role="listbox" aria-label="Select color">
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color.id}
            role="option"
            aria-selected={selectedId === color.id}
            aria-label={color.name}
            title={color.name}
            onClick={() => onChange(color.id)}
            className={`w-10 h-10 rounded-full transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black
              ${selectedId === color.id ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-105'}`}
            style={{
              backgroundColor: color.hex,
              border: color.hex === '#F5F5F5' ? '1px solid #e5e7eb' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  )
}

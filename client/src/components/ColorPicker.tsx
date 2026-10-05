import React from 'react'
import { PartColors, PartDef } from '../types'
import { PALETTE } from '../data/options'

interface Props {
  parts: PartDef[]
  colors: PartColors
  onChange: (part: string, color: string) => void
}

export function ColorPicker({ parts, colors, onChange }: Props) {
  return (
    <div>
      {parts.map(({ id: part, label }) => {
        const currentColor = colors[part]
        const isCustom = !PALETTE.includes(currentColor.toLowerCase())
        return (
          <div key={part} className="part-row">
            <div className="part-head">
              <span className="part-label">{label}</span>
              <label className="part-current" title="Pick a custom color">
                {isCustom && <span className="custom">Custom</span>}
                <span className="hex">{currentColor.toUpperCase()}</span>
                <span className="chip" style={{ backgroundColor: currentColor }}>
                  <input
                    type="color"
                    value={currentColor}
                    onChange={e => onChange(part, e.target.value)}
                    aria-label={`Custom ${label} color`}
                  />
                </span>
              </label>
            </div>
            <div className="swatches">
              {PALETTE.map(color => (
                <button
                  key={color}
                  onClick={() => onChange(part, color)}
                  title={color}
                  aria-label={`Set ${label} to ${color}`}
                  aria-pressed={currentColor.toLowerCase() === color}
                  className="swatch"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

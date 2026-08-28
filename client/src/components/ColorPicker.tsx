import React from 'react'
import { ShoePart, ShoeColors } from '../types'

const PALETTE = [
  '#ffffff',
  '#1a1a1a',
  '#e94560',
  '#3b82f6',
  '#f5a623',
  '#10b981',
  '#8b5cf6',
  '#64748b',
]

const PART_LABELS: Record<ShoePart, string> = {
  upper:   'Upper',
  sole:    'Sole',
  toe_cap: 'Toe Cap',
  heel:    'Heel',
  laces:   'Laces',
  tongue:  'Tongue',
  accent:  'Accent',
}

// Display order for the parts
const PART_ORDER: ShoePart[] = ['upper', 'sole', 'toe_cap', 'heel', 'laces', 'tongue', 'accent']

interface Props {
  shoeColors: ShoeColors
  onChange: (part: ShoePart, color: string) => void
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

export function ColorPicker({ shoeColors, onChange }: Props) {
  return (
    <div className="space-y-5">
      {PART_ORDER.map(part => {
        const currentColor = shoeColors[part]
        const label = PART_LABELS[part]
        return (
          <div key={part}>
            {/* Part label + active color swatch */}
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {label}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md border border-white/10 shadow-inner"
                  style={{ backgroundColor: currentColor }}
                />
                <span className="text-xs font-mono text-gray-500">
                  {currentColor.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Color swatches */}
            <div className="flex gap-2 flex-wrap">
              {PALETTE.map(color => {
                const active = currentColor === color
                const light = isLightColor(color)
                return (
                  <button
                    key={color}
                    onClick={() => onChange(part, color)}
                    title={color}
                    aria-label={`Set ${label} to ${color}`}
                    aria-pressed={active}
                    className={[
                      'w-8 h-8 rounded-full transition-all duration-150 flex-shrink-0',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
                      active
                        ? 'ring-2 ring-offset-2 ring-white ring-offset-gray-900 scale-115'
                        : 'hover:scale-110 hover:ring-1 hover:ring-white/40 hover:ring-offset-1 hover:ring-offset-gray-900',
                    ].join(' ')}
                    style={{
                      backgroundColor: color,
                      border: light ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.2)',
                      boxShadow: active
                        ? `0 0 0 1px ${color}40, inset 0 1px 2px rgba(255,255,255,0.2)`
                        : 'inset 0 1px 2px rgba(255,255,255,0.1)',
                    }}
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

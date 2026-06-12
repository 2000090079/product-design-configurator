import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

const SHOE_SVG = (
  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="155" cy="160" rx="130" ry="22" fill="currentColor" opacity="0.15" />
    <path
      d="M40,150 Q30,100 60,75 Q100,50 160,55 Q210,58 240,80 Q265,100 265,140 Q220,155 155,158 Q90,160 40,150Z"
      fill="currentColor"
    />
    <path
      d="M40,150 Q30,110 58,80 Q75,65 95,70 Q80,95 75,130 Q55,142 40,150Z"
      fill="currentColor" opacity="0.7"
    />
    <rect x="115" y="65" width="85" height="65" rx="8" fill="white" opacity="0.2" />
    <line x1="128" y1="78" x2="188" y2="78" stroke="white" strokeWidth="2.5" opacity="0.7" />
    <line x1="128" y1="90" x2="188" y2="90" stroke="white" strokeWidth="2.5" opacity="0.7" />
    <line x1="128" y1="102" x2="188" y2="102" stroke="white" strokeWidth="2.5" opacity="0.7" />
    <line x1="128" y1="114" x2="188" y2="114" stroke="white" strokeWidth="2.5" opacity="0.7" />
  </svg>
)

const SHIRT_SVG = (
  <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M100,30 L60,70 L30,55 L20,100 L65,110 L65,250 L235,250 L235,110 L280,100 L270,55 L240,70 L200,30 Q175,50 150,50 Q125,50 100,30Z"
      fill="currentColor"
    />
    <path d="M100,30 Q125,50 150,50 Q175,50 200,30 Q175,70 150,72 Q125,70 100,30Z" fill="currentColor" opacity="0.7" />
    <path d="M60,70 L30,55 L20,100 L65,110 L65,90Z" fill="currentColor" opacity="0.8" />
    <path d="M240,70 L270,55 L280,100 L235,110 L235,90Z" fill="currentColor" opacity="0.8" />
  </svg>
)

const PANTS_SVG = (
  <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="50" y="20" width="200" height="40" rx="6" fill="currentColor" opacity="0.85" />
    <path d="M50,55 L50,260 Q90,310 130,260 L145,120 L150,55Z" fill="currentColor" />
    <path d="M250,55 L250,260 Q210,310 170,260 L155,120 L150,55Z" fill="currentColor" />
    <line x1="150" y1="55" x2="150" y2="120" stroke="white" strokeWidth="2" opacity="0.3" />
  </svg>
)

const SHAPES: Record<ProductType, React.ReactNode> = {
  shoe: SHOE_SVG,
  shirt: SHIRT_SVG,
  pants: PANTS_SVG,
}

export function ProductPreview({ config }: Props) {
  const color = COLOR_OPTIONS.find(c => c.id === config.colorId)
  const material = MATERIAL_OPTIONS.find(m => m.id === config.materialId)

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
      aria-label={`Preview of ${config.name}`}
    >
      <div className="relative w-72 h-64 flex items-center justify-center" style={{ color: color?.hex ?? '#000' }}>
        {SHAPES[config.productType]}
      </div>

      <div className="mt-4 flex gap-2 flex-wrap justify-center px-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
          style={{
            backgroundColor: color?.hex ?? '#000',
            color: color?.hex === '#F5F5F5' ? '#333' : 'white',
            border: color?.hex === '#F5F5F5' ? '1px solid #ccc' : 'none',
          }}
        >
          {color?.name}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-white shadow-sm">
          {material?.name}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-400 font-medium">{config.name}</p>
    </div>
  )
}

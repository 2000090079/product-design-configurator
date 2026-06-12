import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

const SHOE_SVG = (
  <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* sole */}
    <path
      d="M30,158 Q30,172 50,175 L290,175 Q315,175 315,162 Q315,150 290,148 L30,148 Z"
      fill="currentColor" opacity="0.5"
    />
    {/* midsole highlight */}
    <path
      d="M30,148 L290,148 Q310,148 313,155 Q290,145 30,145 Z"
      fill="white" opacity="0.25"
    />
    {/* main upper */}
    <path
      d="M30,148 L32,110 Q35,75 70,60 Q100,48 135,46 Q175,44 205,52 Q235,60 255,80 Q275,98 285,120 L290,148 Z"
      fill="currentColor"
    />
    {/* toe box */}
    <path
      d="M30,148 L32,115 Q34,88 55,72 Q72,60 90,58 Q75,80 68,110 L60,148 Z"
      fill="currentColor" opacity="0.75"
    />
    {/* collar opening */}
    <path
      d="M255,80 Q270,65 285,60 Q295,80 290,110 L285,120 Q275,98 255,80 Z"
      fill="currentColor" opacity="0.7"
    />
    {/* tongue */}
    <path
      d="M175,46 Q195,44 210,50 L205,100 Q195,105 180,105 Q165,105 160,100 Z"
      fill="white" opacity="0.2"
    />
    {/* laces */}
    <line x1="168" y1="60" x2="200" y2="57" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
    <line x1="165" y1="72" x2="198" y2="69" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
    <line x1="163" y1="84" x2="197" y2="81" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
    <line x1="161" y1="96" x2="196" y2="93" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
    {/* swoosh-style stripe */}
    <path
      d="M90,120 Q150,95 240,105 Q220,118 150,122 Q110,124 90,120 Z"
      fill="white" opacity="0.2"
    />
    {/* drop shadow */}
    <ellipse cx="165" cy="178" rx="135" ry="10" fill="currentColor" opacity="0.1" />
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

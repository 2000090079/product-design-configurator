import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

const UPPER_CLIP_PATH = "M48,168 Q44,138 52,108 Q64,72 100,52 Q138,32 185,28 Q228,24 260,42 Q288,58 298,90 Q308,118 305,168Z"

function MaterialOverlay({ materialId }: { materialId: string }) {
  switch (materialId) {
    case 'flyknit':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.22">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`a${i}`} x1={-20 + i * 16} y1="20" x2={-20 + i * 16 + 150} y2="178" stroke="white" strokeWidth="1" />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`b${i}`} x1={-20 + i * 16 + 150} y1="20" x2={-20 + i * 16} y2="178" stroke="white" strokeWidth="1" />
          ))}
        </g>
      )
    case 'leather':
      return (
        <g clipPath="url(#shoe-clip)">
          <ellipse cx="155" cy="85" rx="75" ry="32" fill="white" opacity="0.2" transform="rotate(-10 155 85)" />
          <ellipse cx="115" cy="70" rx="32" ry="13" fill="white" opacity="0.16" transform="rotate(-6 115 70)" />
          <ellipse cx="215" cy="100" rx="22" ry="9" fill="white" opacity="0.12" />
        </g>
      )
    case 'mesh':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.24">
          {Array.from({ length: 16 }).map((_, row) =>
            Array.from({ length: 28 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={30 + col * 11} cy={28 + row * 11} r="2" fill="white" />
            ))
          )}
        </g>
      )
    case 'canvas':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.16">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={26 + i * 9} x2="320" y2={26 + i * 9} stroke="white" strokeWidth="2" />
          ))}
          {Array.from({ length: 32 }).map((_, i) => (
            <line key={`v${i}`} x1={20 + i * 9} y1="20" x2={20 + i * 9} y2="178" stroke="white" strokeWidth="0.8" />
          ))}
        </g>
      )
    case 'recycled':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.18">
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={`w${i}`}
              d={`M20,${28 + i * 11} Q100,${20 + i * 11} 180,${28 + i * 11} Q260,${36 + i * 11} 320,${28 + i * 11}`}
              fill="none" stroke="white" strokeWidth="2"
            />
          ))}
        </g>
      )
    default:
      return null
  }
}

const SHOE_SVG = (colorHex: string, materialId: string) => {
  const isLight = colorHex === '#F5F5F5'
  const stroke = isLight ? '#aaa' : 'none'
  const bg = isLight ? '#e2e8f0' : colorHex

  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="shoe-clip">
          <path d={UPPER_CLIP_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="182" cy="228" rx="145" ry="10" fill="currentColor" opacity="0.1" />

      {/* === SOLE STACK (chunky 3-layer) === */}
      {/* Outer rubber sole - bottom */}
      <path d="M44,210 Q40,224 62,230 L285,230 Q318,228 320,216 Q320,204 295,200 L55,200 Q40,202 44,210Z"
        fill="currentColor" opacity="0.95" stroke={stroke} strokeWidth="0.8" />
      {/* Midsole layer 2 */}
      <path d="M50,200 Q48,212 62,214 L290,214 Q315,212 316,204 L50,200Z"
        fill="white" opacity="0.22" />
      {/* Midsole layer 1 */}
      <path d="M52,190 L302,190 Q318,190 320,200 L50,200 Q49,192 52,190Z"
        fill="currentColor" opacity="0.65" stroke={stroke} strokeWidth="0.6" />
      {/* Midsole layer top */}
      <path d="M54,180 L300,180 Q316,180 318,190 L52,190 Q50,182 54,180Z"
        fill="currentColor" opacity="0.5" stroke={stroke} strokeWidth="0.6" />
      {/* Midsole highlight stripe */}
      <path d="M55,182 L300,182 Q314,182 316,186 Q295,183 55,183Z"
        fill="white" opacity="0.25" />

      {/* === MAIN UPPER === */}
      <path d={UPPER_CLIP_PATH}
        fill="currentColor" stroke={stroke} strokeWidth="1.2" />

      {/* Heel counter */}
      <path d="M260,42 Q292,32 306,62 Q316,88 310,130 Q305,155 305,168 L298,90 Q288,58 260,42Z"
        fill="currentColor" opacity="0.7" />

      {/* Toe cap */}
      <path d="M48,168 Q44,140 52,112 Q64,80 92,60 Q72,86 66,126 L56,168Z"
        fill="currentColor" opacity="0.75" />

      {/* Ankle collar padding */}
      <ellipse cx="294" cy="118" rx="22" ry="32" fill={isLight ? '#c8d0da' : '#c8d0da'} />
      <ellipse cx="294" cy="118" rx="15" ry="23" fill={isLight ? '#d8e0ea' : '#d8e0ea'} />

      {/* Aglet holes */}
      <circle cx="286" cy="100" r="4.5" fill="#c0c8d4" />
      <circle cx="300" cy="98" r="4.5" fill="#c0c8d4" />

      {/* Tongue */}
      <path d="M168,28 Q194,24 214,32 L208,112 Q196,118 178,118 Q160,118 154,112Z"
        fill="white" opacity="0.17" />

      {/* Material texture */}
      <MaterialOverlay materialId={materialId} />

      {/* === LACES (5 rows with eyelets) === */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <line x1={164 - i*3} y1={44 + i*14} x2={210 - i*2} y2={40 + i*14}
            stroke="white" strokeWidth="2.8" opacity="0.88" strokeLinecap="round" />
          <circle cx={160 - i*3} cy={44 + i*14} r="3.2" fill="white" opacity="0.55" />
          <circle cx={213 - i*2} cy={40 + i*14} r="3.2" fill="white" opacity="0.55" />
        </g>
      ))}

      {/* === SIDE PANEL DETAIL === */}
      {/* Lower panel overlay (like Air Force panel) */}
      <path d="M78,142 Q80,130 100,124 L260,126 Q285,128 295,138 Q265,148 215,150 Q145,152 78,142Z"
        fill="white" opacity="0.14" />
      {/* Panel border line */}
      <path d="M78,142 Q145,152 215,150 Q265,148 295,138"
        fill="none" stroke="white" strokeWidth="1" opacity="0.25" />

      {/* Swoosh-style stripe */}
      <path d="M95,158 Q175,132 288,148 Q265,162 188,164 Q135,166 95,158Z"
        fill="white" opacity="0.17" />

      {/* Toe stitching detail */}
      <path d="M56,150 Q60,100 90,72"
        fill="none" stroke="white" strokeWidth="1" opacity="0.2" strokeDasharray="3,3" />
    </svg>
  )
}

const SHIRT_SVG = (colorHex: string) => {
  const isLight = colorHex === '#F5F5F5'
  const strokeColor = isLight ? '#c0c0c0' : 'none'
  return (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M100,30 L60,70 L30,55 L20,100 L65,110 L65,250 L235,250 L235,110 L280,100 L270,55 L240,70 L200,30 Q175,50 150,50 Q125,50 100,30Z"
        fill="currentColor" stroke={strokeColor} strokeWidth="1.2"
      />
      <path d="M100,30 Q125,50 150,50 Q175,50 200,30 Q175,70 150,72 Q125,70 100,30Z" fill="currentColor" opacity="0.7" />
      <path d="M60,70 L30,55 L20,100 L65,110 L65,90Z" fill="currentColor" opacity="0.8" />
      <path d="M240,70 L270,55 L280,100 L235,110 L235,90Z" fill="currentColor" opacity="0.8" />
      {/* shirt crease detail */}
      <line x1="150" y1="80" x2="150" y2="240" stroke="white" strokeWidth="1" opacity="0.15" />
      <line x1="120" y1="120" x2="115" y2="240" stroke="white" strokeWidth="1" opacity="0.1" />
      <line x1="180" y1="120" x2="185" y2="240" stroke="white" strokeWidth="1" opacity="0.1" />
    </svg>
  )
}

const PANTS_SVG = (colorHex: string) => {
  const isLight = colorHex === '#F5F5F5'
  const strokeColor = isLight ? '#c0c0c0' : 'none'
  return (
    <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="50" y="20" width="200" height="40" rx="6" fill="currentColor" opacity="0.85" stroke={strokeColor} strokeWidth="1.2" />
      <path d="M50,55 L50,260 Q90,310 130,260 L145,120 L150,55Z" fill="currentColor" stroke={strokeColor} strokeWidth="1.2" />
      <path d="M250,55 L250,260 Q210,310 170,260 L155,120 L150,55Z" fill="currentColor" stroke={strokeColor} strokeWidth="1.2" />
      <line x1="150" y1="55" x2="150" y2="120" stroke="white" strokeWidth="2" opacity="0.3" />
      {/* pocket stitching */}
      <path d="M65,80 Q95,78 95,110 L65,110Z" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}

export function ProductPreview({ config }: Props) {
  const color = COLOR_OPTIONS.find(c => c.id === config.colorId)
  const material = MATERIAL_OPTIONS.find(m => m.id === config.materialId)
  const colorHex = color?.hex ?? '#1A1A2E'
  const isLight = colorHex === '#F5F5F5'

  const shapeMap: Record<ProductType, React.ReactNode> = {
    shoe: SHOE_SVG(colorHex, config.materialId),
    shirt: SHIRT_SVG(colorHex),
    pants: PANTS_SVG(colorHex),
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
      aria-label={`Preview of ${config.name}`}
    >
      {/* subtle grid bg so white shows up */}
      {isLight && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.4,
          }}
        />
      )}

      <div
        className="relative w-72 h-64 flex items-center justify-center"
        style={{ color: colorHex }}
      >
        {shapeMap[config.productType]}
      </div>

      <div className="relative mt-4 flex gap-2 flex-wrap justify-center px-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
          style={{
            backgroundColor: colorHex,
            color: isLight ? '#333' : 'white',
            border: isLight ? '1px solid #ccc' : 'none',
          }}
        >
          {color?.name}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-white shadow-sm">
          {material?.name}
        </span>
      </div>

      <p className="relative mt-2 text-sm text-gray-400 font-medium">{config.name}</p>
    </div>
  )
}

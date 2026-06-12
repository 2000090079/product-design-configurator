import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

const SHOE_UPPER_PATH = "M38,148 Q36,118 44,92 Q56,62 90,46 Q126,30 172,28 Q214,26 244,44 Q268,58 274,90 Q280,112 276,148Z"

function MaterialOverlay({ materialId }: { materialId: string }) {
  switch (materialId) {
    case 'flyknit':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.2">
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`a${i}`} x1={-10 + i * 18} y1="20" x2={-10 + i * 18 + 140} y2="165" stroke="white" strokeWidth="1" />
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`b${i}`} x1={-10 + i * 18 + 140} y1="20" x2={-10 + i * 18} y2="165" stroke="white" strokeWidth="1" />
          ))}
        </g>
      )
    case 'leather':
      return (
        <g clipPath="url(#shoe-clip)">
          <ellipse cx="145" cy="72" rx="68" ry="28" fill="white" opacity="0.18" transform="rotate(-12 145 72)" />
          <ellipse cx="108" cy="60" rx="28" ry="11" fill="white" opacity="0.14" transform="rotate(-8 108 60)" />
          <ellipse cx="200" cy="85" rx="18" ry="8" fill="white" opacity="0.1" transform="rotate(-5 200 85)" />
        </g>
      )
    case 'mesh':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.22">
          {Array.from({ length: 14 }).map((_, row) =>
            Array.from({ length: 26 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={28 + col * 11} cy={30 + row * 11} r="1.8" fill="white" />
            ))
          )}
        </g>
      )
    case 'canvas':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.15">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={28 + i * 9} x2="290" y2={28 + i * 9} stroke="white" strokeWidth="1.8" />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`v${i}`} x1={20 + i * 9} y1="20" x2={20 + i * 9} y2="160" stroke="white" strokeWidth="0.8" />
          ))}
        </g>
      )
    case 'recycled':
      return (
        <g clipPath="url(#shoe-clip)" opacity="0.18">
          {Array.from({ length: 13 }).map((_, i) => (
            <path
              key={`w${i}`}
              d={`M20,${30 + i * 11} Q90,${22 + i * 11} 160,${30 + i * 11} Q230,${38 + i * 11} 290,${30 + i * 11}`}
              fill="none" stroke="white" strokeWidth="1.8"
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
  const strokeColor = isLight ? '#c0c0c0' : 'none'

  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="shoe-clip">
          <path d={SHOE_UPPER_PATH} />
        </clipPath>
      </defs>

      {/* Drop shadow */}
      <ellipse cx="160" cy="188" rx="128" ry="9" fill="currentColor" opacity="0.12" />

      {/* Sole */}
      <path
        d="M34,155 Q30,172 52,176 L268,176 Q295,174 296,163 Q296,152 270,149 L38,149 Q32,151 34,155Z"
        fill="currentColor" opacity="0.55"
        stroke={strokeColor} strokeWidth="1"
      />
      {/* Midsole line */}
      <line x1="38" y1="151" x2="270" y2="151" stroke="white" strokeWidth="1.2" opacity="0.3" />

      {/* Main upper */}
      <path
        d={SHOE_UPPER_PATH}
        fill="currentColor"
        stroke={strokeColor} strokeWidth="1.2"
      />

      {/* Heel counter */}
      <path
        d="M244,44 Q270,36 280,60 Q288,82 280,112 Q276,130 274,90 Q268,58 244,44Z"
        fill="currentColor" opacity="0.72"
      />

      {/* Toe cap */}
      <path
        d="M38,148 Q36,118 44,95 Q56,72 80,58 Q63,82 58,118 L50,148Z"
        fill="currentColor" opacity="0.78"
      />

      {/* Ankle collar opening */}
      <ellipse cx="262" cy="108" rx="19" ry="26" fill="#dde3ea" />
      <ellipse cx="262" cy="108" rx="14" ry="20" fill="#e8edf3" />

      {/* Tongue */}
      <path
        d="M152,28 Q174,26 192,32 L186,95 Q175,100 162,100 Q149,100 144,95Z"
        fill="white" opacity="0.18"
      />

      {/* Material texture overlay */}
      <MaterialOverlay materialId={materialId} />

      {/* Laces */}
      <line x1="152" y1="43" x2="187" y2="40" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="149" y1="56" x2="185" y2="53" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="147" y1="69" x2="183" y2="66" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
      <line x1="145" y1="82" x2="181" y2="79" stroke="white" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />

      {/* Side stripe */}
      <path
        d="M85,118 Q160,93 255,104 Q235,116 158,120 Q112,122 85,118Z"
        fill="white" opacity="0.2"
      />
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

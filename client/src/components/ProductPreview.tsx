import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

// Upper outline — reused for clipPath and fill
const UPPER_D =
  'M42,170 Q36,142 44,114 Q56,80 90,58 Q126,36 175,28 Q220,22 258,36 Q292,50 312,80 Q330,108 326,148 L322,170Z'

function ShoeTexture({ materialId }: { materialId: string }) {
  switch (materialId) {
    case 'flyknit':
      // Fine diagonal crosshatch — knit feel
      return (
        <g clipPath="url(#upper-clip)" opacity="0.25">
          {Array.from({ length: 28 }).map((_, i) => (
            <line key={`f1-${i}`} x1={-30 + i * 14} y1="10" x2={-30 + i * 14 + 170} y2="195"
              stroke="white" strokeWidth="0.9" />
          ))}
          {Array.from({ length: 28 }).map((_, i) => (
            <line key={`f2-${i}`} x1={-30 + i * 14 + 170} y1="10" x2={-30 + i * 14} y2="195"
              stroke="white" strokeWidth="0.9" />
          ))}
        </g>
      )

    case 'leather':
      // Smooth with two glossy highlight reflections
      return (
        <g clipPath="url(#upper-clip)">
          <ellipse cx="148" cy="78" rx="72" ry="26" fill="white" opacity="0.22"
            transform="rotate(-14 148 78)" />
          <ellipse cx="108" cy="64" rx="30" ry="11" fill="white" opacity="0.17"
            transform="rotate(-10 108 64)" />
          <ellipse cx="220" cy="105" rx="28" ry="10" fill="white" opacity="0.12"
            transform="rotate(-8 220 105)" />
        </g>
      )

    case 'mesh':
      // Honeycomb hex grid
      return (
        <g clipPath="url(#upper-clip)" opacity="0.28">
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 18 }).map((_, col) => {
              const cx = 35 + col * 18 + (row % 2 === 0 ? 0 : 9)
              const cy = 35 + row * 16
              return (
                <polygon
                  key={`hex-${row}-${col}`}
                  points={`${cx},${cy - 7} ${cx + 6},${cy - 3.5} ${cx + 6},${cy + 3.5} ${cx},${cy + 7} ${cx - 6},${cy + 3.5} ${cx - 6},${cy - 3.5}`}
                  fill="none" stroke="white" strokeWidth="1"
                />
              )
            })
          )}
        </g>
      )

    case 'canvas':
      // Tight woven grid — canvas weave
      return (
        <g clipPath="url(#upper-clip)" opacity="0.2">
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`ch-${i}`} x1="20" y1={18 + i * 8} x2="340" y2={18 + i * 8}
              stroke="white" strokeWidth="2.2" />
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={`cv-${i}`} x1={20 + i * 8} y1="10" x2={20 + i * 8} y2="195"
              stroke="white" strokeWidth="0.9" />
          ))}
        </g>
      )

    case 'recycled':
      // Diagonal wave bands — technical fabric
      return (
        <g clipPath="url(#upper-clip)" opacity="0.22">
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`rw-${i}`}
              d={`M10,${20 + i * 11} Q100,${11 + i * 11} 190,${20 + i * 11} Q280,${29 + i * 11} 350,${20 + i * 11}`}
              fill="none" stroke="white" strokeWidth="2"
            />
          ))}
          {/* shimmer band */}
          <ellipse cx="175" cy="95" rx="120" ry="18" fill="white" opacity="0.1"
            transform="rotate(-8 175 95)" />
        </g>
      )

    default:
      return null
  }
}

function ShoeSVG({ colorHex, materialId }: { colorHex: string; materialId: string }) {
  const isLight = colorHex === '#F5F5F5'
  const outlineStroke = isLight ? '#b0b8c4' : 'none'
  const soleStroke = isLight ? '#9aa0aa' : 'none'

  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="upper-clip">
          <path d={UPPER_D} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="190" cy="222" rx="152" ry="8" fill="currentColor" opacity="0.1" />

      {/* ── OUTSOLE (rubber bottom) ── */}
      <path
        d="M38,196 Q32,210 58,218 L295,218 Q330,216 333,204 Q335,192 308,187 L50,187 Q34,189 38,196Z"
        fill="currentColor" opacity="0.92" stroke={soleStroke} strokeWidth="1"
      />
      {/* outsole tread lines */}
      {[0, 1, 2].map(i => (
        <line key={i} x1={70 + i * 65} y1="210" x2={110 + i * 65} y2="210"
          stroke="white" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
      ))}

      {/* ── MIDSOLE layer 2 ── */}
      <path
        d="M46,187 Q43,198 58,200 L300,200 Q326,198 328,190 L46,187Z"
        fill="white" opacity="0.18"
      />

      {/* ── MIDSOLE layer 1 ── */}
      <path
        d="M48,178 L308,178 Q328,178 330,187 L46,187 Q45,180 48,178Z"
        fill="currentColor" opacity="0.6" stroke={soleStroke} strokeWidth="0.8"
      />

      {/* ── MIDSOLE top edge ── */}
      <path
        d="M50,170 L310,170 Q328,170 330,178 L48,178 Q47,172 50,170Z"
        fill="currentColor" opacity="0.45" stroke={soleStroke} strokeWidth="0.7"
      />

      {/* midsole highlight line */}
      <line x1="50" y1="172" x2="308" y2="172" stroke="white" strokeWidth="1" opacity="0.3" />

      {/* ── MAIN UPPER ── */}
      <path d={UPPER_D} fill="currentColor" stroke={outlineStroke} strokeWidth="1.2" />

      {/* ── HEEL COUNTER (darker back section) ── */}
      <path
        d="M258,36 Q294,24 316,56 Q334,82 330,128 L326,148 L322,170 Q326,148 330,128 Q334,82 312,80 Q292,50 258,36Z"
        fill="currentColor" opacity="0.68"
      />

      {/* ── TOE CAP ── */}
      <path
        d="M42,170 Q36,144 44,118 Q56,86 88,64 Q68,90 62,128 L52,170Z"
        fill="currentColor" opacity="0.72"
      />

      {/* ── ANKLE COLLAR ── */}
      {/* outer padding ring */}
      <ellipse cx="314" cy="128" rx="26" ry="36" fill="#c8d2dc" />
      {/* inner opening */}
      <ellipse cx="314" cy="130" rx="17" ry="26" fill="#d8e2ec" />
      {/* collar highlight */}
      <ellipse cx="308" cy="116" rx="9" ry="6" fill="white" opacity="0.25" transform="rotate(-15 308 116)" />

      {/* ── TONGUE ── */}
      <path
        d="M163,28 Q188,22 206,30 L200,112 Q188,120 175,120 Q162,120 155,112Z"
        fill="white" opacity="0.16"
      />
      {/* tongue center ridge */}
      <line x1="183" y1="30" x2="180" y2="112" stroke="white" strokeWidth="1" opacity="0.15" />

      {/* ── MATERIAL TEXTURE (clipped to upper) ── */}
      <ShoeTexture materialId={materialId} />

      {/* ── LACES ── */}
      {[0, 1, 2, 3, 4].map(i => {
        const y = 44 + i * 14
        const x1 = 158 - i * 3
        const x2 = 204 - i * 2
        return (
          <g key={i}>
            {/* lace bar */}
            <line x1={x1} y1={y} x2={x2} y2={y - 2}
              stroke="white" strokeWidth="3" opacity="0.85" strokeLinecap="round" />
            {/* left eyelet */}
            <circle cx={x1 - 4} cy={y} r="3.5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
            {/* right eyelet */}
            <circle cx={x2 + 4} cy={y - 2} r="3.5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
          </g>
        )
      })}

      {/* ── VAMP PANEL (side overlay panel) ── */}
      <path
        d="M76,144 Q82,132 106,126 L268,130 Q296,132 310,144 Q278,158 228,160 Q158,162 76,144Z"
        fill="white" opacity="0.12"
      />
      <path
        d="M76,144 Q158,162 228,160 Q278,158 310,144"
        fill="none" stroke="white" strokeWidth="0.8" opacity="0.22"
      />

      {/* ── SWOOSH-STYLE DETAIL ── */}
      <path
        d="M92,160 Q185,136 308,155 Q284,168 205,170 Q148,172 92,160Z"
        fill="white" opacity="0.14"
      />

      {/* ── TOE STITCH LINE ── */}
      <path d="M52,155 Q56,108 88,76"
        fill="none" stroke="white" strokeWidth="1" opacity="0.18" strokeDasharray="4,3" />
    </svg>
  )
}

const SHIRT_SVG = (isLight: boolean) => {
  const stroke = isLight ? '#b0b8c4' : 'none'
  return (
    <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M100,30 L60,70 L30,55 L20,100 L65,110 L65,250 L235,250 L235,110 L280,100 L270,55 L240,70 L200,30 Q175,50 150,50 Q125,50 100,30Z"
        fill="currentColor" stroke={stroke} strokeWidth="1.2"
      />
      <path d="M100,30 Q125,50 150,50 Q175,50 200,30 Q175,70 150,72 Q125,70 100,30Z"
        fill="currentColor" opacity="0.65" />
      <path d="M60,70 L30,55 L20,100 L65,110 L65,90Z" fill="currentColor" opacity="0.75" />
      <path d="M240,70 L270,55 L280,100 L235,110 L235,90Z" fill="currentColor" opacity="0.75" />
      <line x1="150" y1="80" x2="150" y2="242" stroke="white" strokeWidth="1" opacity="0.12" />
    </svg>
  )
}

const PANTS_SVG = (isLight: boolean) => {
  const stroke = isLight ? '#b0b8c4' : 'none'
  return (
    <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="50" y="20" width="200" height="42" rx="6"
        fill="currentColor" opacity="0.85" stroke={stroke} strokeWidth="1.2" />
      <path d="M50,58 L50,262 Q90,312 130,262 L145,122 L150,58Z"
        fill="currentColor" stroke={stroke} strokeWidth="1.2" />
      <path d="M250,58 L250,262 Q210,312 170,262 L155,122 L150,58Z"
        fill="currentColor" stroke={stroke} strokeWidth="1.2" />
      <line x1="150" y1="58" x2="150" y2="122" stroke="white" strokeWidth="2" opacity="0.25" />
    </svg>
  )
}

export function ProductPreview({ config }: Props) {
  const color = COLOR_OPTIONS.find(c => c.id === config.colorId)
  const material = MATERIAL_OPTIONS.find(m => m.id === config.materialId)
  const colorHex = color?.hex ?? '#1A1A2E'
  const isLight = colorHex === '#F5F5F5'

  const shapeMap: Record<ProductType, React.ReactNode> = {
    shoe: <ShoeSVG colorHex={colorHex} materialId={config.materialId} />,
    shirt: SHIRT_SVG(isLight),
    pants: PANTS_SVG(isLight),
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)' }}
      aria-label={`Preview of ${config.name}`}
    >
      {/* dot grid when color is white so it doesn't vanish */}
      {isLight && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            opacity: 0.5,
          }}
        />
      )}

      <div
        className="relative w-full h-64 flex items-center justify-center px-4"
        style={{ color: colorHex }}
      >
        {shapeMap[config.productType]}
      </div>

      <div className="relative mt-3 flex gap-2 flex-wrap justify-center px-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
          style={{
            backgroundColor: colorHex,
            color: isLight ? '#333' : 'white',
            border: isLight ? '1.5px solid #b0b8c4' : 'none',
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

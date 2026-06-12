import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

/*
  SHOE SIDE PROFILE — facing LEFT, toe on left, heel on right
  ViewBox 0 0 380 230

  Key Y coordinates (from top):
    Sole ground:      y = 218
    Outsole top:      y = 200
    Midsole top:      y = 186
    Upper bottom:     y = 174
    Toe box top:      y = 76   (tallest point on left)
    Tongue peak:      y = 42   (absolute highest, center)
    Heel collar top:  y = 100  (right side, lower than tongue)

  This creates the classic sneaker silhouette:
  low on left (toe tip) → rises steeply → peak at tongue →
  slopes gently down right → heel collar → straight down heel back
*/

const UPPER_PATH =
  'M 50,174 ' +
  'Q 38,152 42,118 ' +   // toe front face (slightly forward-leaning)
  'Q 46,90 70,72 ' +     // toe box front
  'Q 100,52 158,40 ' +   // toe box top → vamp climbing
  'Q 196,32 234,38 ' +   // tongue peak (highest)
  'Q 268,44 294,64 ' +   // vamp → quarter, sloping down
  'Q 318,80 324,108 ' +  // heel counter curve
  'L 326,174 ' +         // heel back — straight vertical line
  'Z'                    // closes along sole top

function ShoeTexture({ materialId }: { materialId: string }) {
  switch (materialId) {
    case 'flyknit':
      return (
        <g clipPath="url(#shoe-upper-clip)" opacity="0.22">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`k1-${i}`}
              x1={20 + i * 13} y1="20" x2={20 + i * 13 + 160} y2="190"
              stroke="white" strokeWidth="0.9" />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`k2-${i}`}
              x1={20 + i * 13 + 160} y1="20" x2={20 + i * 13} y2="190"
              stroke="white" strokeWidth="0.9" />
          ))}
        </g>
      )
    case 'leather':
      return (
        <g clipPath="url(#shoe-upper-clip)">
          <ellipse cx="152" cy="82" rx="76" ry="27"
            fill="white" opacity="0.22" transform="rotate(-14 152 82)" />
          <ellipse cx="108" cy="66" rx="32" ry="12"
            fill="white" opacity="0.18" transform="rotate(-10 108 66)" />
          <ellipse cx="228" cy="108" rx="30" ry="11"
            fill="white" opacity="0.14" transform="rotate(-6 228 108)" />
        </g>
      )
    case 'mesh':
      return (
        <g clipPath="url(#shoe-upper-clip)" opacity="0.26">
          {Array.from({ length: 11 }).map((_, row) =>
            Array.from({ length: 20 }).map((_, col) => {
              const cx = 38 + col * 17 + (row % 2 ? 8 : 0)
              const cy = 40 + row * 14
              return (
                <polygon key={`h-${row}-${col}`}
                  points={`${cx},${cy - 6} ${cx + 5},${cy - 3} ${cx + 5},${cy + 3} ${cx},${cy + 6} ${cx - 5},${cy + 3} ${cx - 5},${cy - 3}`}
                  fill="none" stroke="white" strokeWidth="0.9" />
              )
            })
          )}
        </g>
      )
    case 'canvas':
      return (
        <g clipPath="url(#shoe-upper-clip)" opacity="0.18">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`ch-${i}`}
              x1="20" y1={20 + i * 8} x2="350" y2={20 + i * 8}
              stroke="white" strokeWidth="2.4" />
          ))}
          {Array.from({ length: 42 }).map((_, i) => (
            <line key={`cv-${i}`}
              x1={20 + i * 8} y1="20" x2={20 + i * 8} y2="190"
              stroke="white" strokeWidth="0.8" />
          ))}
        </g>
      )
    case 'recycled':
      return (
        <g clipPath="url(#shoe-upper-clip)" opacity="0.2">
          {Array.from({ length: 18 }).map((_, i) => (
            <path key={`rw-${i}`}
              d={`M 15,${22 + i * 10} Q 110,${13 + i * 10} 200,${22 + i * 10} Q 290,${31 + i * 10} 360,${22 + i * 10}`}
              fill="none" stroke="white" strokeWidth="2" />
          ))}
          <ellipse cx="182" cy="92" rx="125" ry="20"
            fill="white" opacity="0.1" transform="rotate(-8 182 92)" />
        </g>
      )
    default:
      return null
  }
}

function ShoeSVG({ colorHex, materialId }: { colorHex: string; materialId: string }) {
  const isLight = colorHex === '#F5F5F5'
  const outlineStroke = isLight ? '#a0a8b4' : 'none'

  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="shoe-upper-clip">
          <path d={UPPER_PATH} />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="192" cy="224" rx="156" ry="7" fill="currentColor" opacity="0.1" />

      {/* ── OUTSOLE (rubber, darkest bottom layer) ── */}
      <path
        d="M 46,200 Q 40,216 64,220 L 308,220 Q 336,218 338,207 Q 340,195 314,190 L 54,190 Q 40,192 46,200Z"
        fill="currentColor" opacity="0.95"
        stroke={outlineStroke} strokeWidth="0.8"
      />
      {/* tread grooves */}
      {[72, 138, 204, 265].map((x, i) => (
        <line key={i} x1={x} y1="208" x2={x + 44} y2="208"
          stroke="white" strokeWidth="1.4" opacity="0.18" strokeLinecap="round" />
      ))}

      {/* ── MIDSOLE layer B ── */}
      <path
        d="M 52,190 Q 48,202 64,204 L 310,204 Q 330,202 332,194 L 52,190Z"
        fill="white" opacity="0.2"
      />

      {/* ── MIDSOLE layer A ── */}
      <path
        d="M 54,180 L 314,180 Q 332,180 334,190 L 52,190 Q 51,182 54,180Z"
        fill="currentColor" opacity="0.6"
        stroke={outlineStroke} strokeWidth="0.7"
      />

      {/* midsole highlight */}
      <line x1="54" y1="182" x2="312" y2="182"
        stroke="white" strokeWidth="1.2" opacity="0.28" />

      {/* ── MAIN UPPER ── */}
      <path
        d={UPPER_PATH}
        fill="currentColor"
        stroke={outlineStroke} strokeWidth="1.2"
      />

      {/* ── HEEL COUNTER (darker rear section) ── */}
      <path
        d="M 294,64 Q 320,52 330,82 Q 340,108 336,142 L 326,174 L 324,108 Q 318,80 294,64Z"
        fill="currentColor" opacity="0.65"
      />

      {/* ── TOE CAP (slightly darker front) ── */}
      <path
        d="M 50,174 Q 38,154 42,122 Q 46,94 70,74 Q 52,96 48,132 L 46,174Z"
        fill="currentColor" opacity="0.72"
      />

      {/* ── ANKLE COLLAR ── */}
      {/* outer padded ring */}
      <ellipse cx="320" cy="118" rx="24" ry="34" fill="#bfc8d4" />
      {/* inner opening (dark interior) */}
      <ellipse cx="320" cy="120" rx="15" ry="24" fill="#a8b4c2" />
      {/* collar highlight */}
      <ellipse cx="313" cy="106" rx="8" ry="6"
        fill="white" opacity="0.25" transform="rotate(-20 313 106)" />

      {/* ── TONGUE ── */}
      <path
        d="M 164,40 Q 192,32 212,40 L 206,116 Q 194,124 180,124 Q 166,124 160,116Z"
        fill="white" opacity="0.16"
      />
      {/* tongue center seam */}
      <line x1="188" y1="40" x2="186" y2="116"
        stroke="white" strokeWidth="1" opacity="0.15" />

      {/* ── MATERIAL TEXTURE ── */}
      <ShoeTexture materialId={materialId} />

      {/* ── LACES (5 bars + eyelets) ── */}
      {[0, 1, 2, 3, 4].map(i => {
        const lx1 = 160 - i * 2
        const lx2 = 208 - i * 2
        const ly = 56 + i * 14
        return (
          <g key={i}>
            <line x1={lx1} y1={ly} x2={lx2} y2={ly - 2}
              stroke="white" strokeWidth="3" opacity="0.88" strokeLinecap="round" />
            <circle cx={lx1 - 5} cy={ly} r="3.5"
              fill="none" stroke="white" strokeWidth="1.5" opacity="0.65" />
            <circle cx={lx2 + 5} cy={ly - 2} r="3.5"
              fill="none" stroke="white" strokeWidth="1.5" opacity="0.65" />
          </g>
        )
      })}

      {/* ── VAMP SIDE PANEL ── */}
      <path
        d="M 84,148 Q 92,134 120,128 L 274,132 Q 300,134 314,148 Q 282,163 232,165 Q 162,167 84,148Z"
        fill="white" opacity="0.11"
      />
      <path
        d="M 84,148 Q 162,167 232,165 Q 282,163 314,148"
        fill="none" stroke="white" strokeWidth="0.9" opacity="0.22"
      />

      {/* ── SIDE STRIPE ── */}
      <path
        d="M 96,163 Q 192,140 312,158 Q 288,172 210,174 Q 150,176 96,163Z"
        fill="white" opacity="0.13"
      />

      {/* ── TOE STITCH DETAIL ── */}
      <path d="M 50,158 Q 56,108 90,78"
        fill="none" stroke="white" strokeWidth="0.9"
        opacity="0.2" strokeDasharray="4,3" />
    </svg>
  )
}

const SHIRT_SVG = (isLight: boolean) => (
  <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M100,30 L60,70 L30,55 L20,100 L65,110 L65,250 L235,250 L235,110 L280,100 L270,55 L240,70 L200,30 Q175,50 150,50 Q125,50 100,30Z"
      fill="currentColor" stroke={isLight ? '#aab4c0' : 'none'} strokeWidth="1.2"
    />
    <path d="M100,30 Q125,50 150,50 Q175,50 200,30 Q175,70 150,72 Q125,70 100,30Z"
      fill="currentColor" opacity="0.65" />
    <path d="M60,70 L30,55 L20,100 L65,110 L65,90Z" fill="currentColor" opacity="0.75" />
    <path d="M240,70 L270,55 L280,100 L235,110 L235,90Z" fill="currentColor" opacity="0.75" />
    <line x1="150" y1="80" x2="150" y2="242" stroke="white" strokeWidth="1" opacity="0.12" />
  </svg>
)

const PANTS_SVG = (isLight: boolean) => (
  <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="50" y="20" width="200" height="42" rx="6"
      fill="currentColor" opacity="0.85" stroke={isLight ? '#aab4c0' : 'none'} strokeWidth="1.2" />
    <path d="M50,58 L50,262 Q90,312 130,262 L145,122 L150,58Z"
      fill="currentColor" stroke={isLight ? '#aab4c0' : 'none'} strokeWidth="1.2" />
    <path d="M250,58 L250,262 Q210,312 170,262 L155,122 L150,58Z"
      fill="currentColor" stroke={isLight ? '#aab4c0' : 'none'} strokeWidth="1.2" />
    <line x1="150" y1="58" x2="150" y2="122" stroke="white" strokeWidth="2" opacity="0.25" />
  </svg>
)

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
      style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #dde4ed 100%)' }}
      aria-label={`Preview of ${config.name}`}
    >
      {isLight && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: 'radial-gradient(#c0cad8 1px, transparent 1px)',
            backgroundSize: '18px 18px',
            opacity: 0.55,
          }}
        />
      )}

      <div
        className="relative w-full h-64 flex items-center justify-center px-2"
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
            border: isLight ? '1.5px solid #a0aab8' : 'none',
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

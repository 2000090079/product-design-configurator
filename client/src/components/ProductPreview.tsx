import React from 'react'
import { ProductConfig, ProductType } from '../types'
import { COLOR_OPTIONS, MATERIAL_OPTIONS } from '../data/options'

interface Props {
  config: ProductConfig
}

/*
  Shoe profile (side view, toe LEFT, heel RIGHT) in viewBox 0 0 380 230
  Upper height at toe:   186-90  = 96px  (toe box is tall)
  Upper height at heel:  186-110 = 76px  (heel is shorter than toe)
  Tongue peak:           y = 62          (absolute highest point, center)
  Heel back:             vertical line at x=336
  Sole thickness:        186 to 218 = 32px (chunky)

  The toe leans slightly forward (control point x=26, left of start x=38)
  giving the characteristic forward-leaning toe of a sneaker.
*/

// Upper silhouette — this is the single most important path
const UPPER = 'M 38,186 Q 26,164 30,132 Q 34,104 60,90 Q 92,72 162,62 Q 225,68 268,88 Q 295,96 316,110 Q 330,115 334,140 L 336,186 Z'

function ShoeTexture({ materialId }: { materialId: string }) {
  switch (materialId) {
    case 'flyknit':
      return (
        <g clipPath="url(#uc)" opacity="0.22">
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`a${i}`} x1={10 + i * 13} y1="55" x2={10 + i * 13 + 155} y2="192" stroke="white" strokeWidth="0.9" />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`b${i}`} x1={10 + i * 13 + 155} y1="55" x2={10 + i * 13} y2="192" stroke="white" strokeWidth="0.9" />
          ))}
        </g>
      )
    case 'leather':
      return (
        <g clipPath="url(#uc)">
          <ellipse cx="148" cy="105" rx="78" ry="26" fill="white" opacity="0.22" transform="rotate(-10 148 105)" />
          <ellipse cx="102" cy="128" rx="30" ry="11" fill="white" opacity="0.16" transform="rotate(-6 102 128)" />
          <ellipse cx="240" cy="120" rx="32" ry="11" fill="white" opacity="0.13" transform="rotate(-4 240 120)" />
        </g>
      )
    case 'mesh':
      return (
        <g clipPath="url(#uc)" opacity="0.25">
          {Array.from({ length: 11 }).map((_, row) =>
            Array.from({ length: 20 }).map((_, col) => {
              const cx = 40 + col * 16 + (row % 2 ? 8 : 0)
              const cy = 68 + row * 13
              return (
                <polygon key={`${row}-${col}`}
                  points={`${cx},${cy - 5} ${cx + 4.5},${cy - 2.5} ${cx + 4.5},${cy + 2.5} ${cx},${cy + 5} ${cx - 4.5},${cy + 2.5} ${cx - 4.5},${cy - 2.5}`}
                  fill="none" stroke="white" strokeWidth="0.9" />
              )
            })
          )}
        </g>
      )
    case 'canvas':
      return (
        <g clipPath="url(#uc)" opacity="0.18">
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={60 + i * 8} x2="345" y2={60 + i * 8} stroke="white" strokeWidth="2.2" />
          ))}
          {Array.from({ length: 42 }).map((_, i) => (
            <line key={`v${i}`} x1={20 + i * 8} y1="55" x2={20 + i * 8} y2="192" stroke="white" strokeWidth="0.8" />
          ))}
        </g>
      )
    case 'recycled':
      return (
        <g clipPath="url(#uc)" opacity="0.2">
          {Array.from({ length: 16 }).map((_, i) => (
            <path key={`w${i}`}
              d={`M 20,${68 + i * 9} Q 115,${60 + i * 9} 205,${68 + i * 9} Q 295,${76 + i * 9} 355,${68 + i * 9}`}
              fill="none" stroke="white" strokeWidth="2" />
          ))}
          <ellipse cx="185" cy="118" rx="130" ry="18" fill="white" opacity="0.09" transform="rotate(-6 185 118)" />
        </g>
      )
    default:
      return null
  }
}

function ShoeSVG({ colorHex, materialId }: { colorHex: string; materialId: string }) {
  const isLight = colorHex === '#F5F5F5'
  const sk = isLight ? '#9aa4b0' : 'none'

  return (
    <svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="uc"><path d={UPPER} /></clipPath>
      </defs>

      {/* shadow */}
      <ellipse cx="190" cy="224" rx="155" ry="6" fill="currentColor" opacity="0.1" />

      {/* ── OUTSOLE ── */}
      <path
        d="M 28,200 Q 22,216 52,220 L 320,220 Q 348,218 350,207 Q 352,196 326,192 L 40,192 Q 24,194 28,200Z"
        fill="currentColor" opacity="0.92" stroke={sk} strokeWidth="0.8"
      />
      {/* tread grooves */}
      {[58, 120, 188, 254].map((x, i) => (
        <line key={i} x1={x} y1="210" x2={x + 40} y2="210"
          stroke="white" strokeWidth="1.3" opacity="0.2" strokeLinecap="round" />
      ))}

      {/* ── MIDSOLE B (thin highlight) ── */}
      <path
        d="M 36,192 Q 30,204 52,207 L 318,207 Q 342,205 344,197 L 36,192Z"
        fill="white" opacity="0.2"
      />

      {/* ── MIDSOLE A ── */}
      <path
        d="M 38,186 L 324,186 Q 344,186 346,192 L 36,192 Q 35,188 38,186Z"
        fill="currentColor" opacity="0.58" stroke={sk} strokeWidth="0.7"
      />
      <line x1="40" y1="188" x2="322" y2="188" stroke="white" strokeWidth="1.1" opacity="0.28" />

      {/* ── MAIN UPPER ── */}
      <path d={UPPER} fill="currentColor" stroke={sk} strokeWidth="1.2" />

      {/* ── HEEL COUNTER (rear darker section) ── */}
      <path
        d="M 290,98 Q 318,88 328,116 Q 338,142 328,164 L 320,175 L 334,140 Q 330,115 316,110 Q 295,96 290,98Z"
        fill="currentColor" opacity="0.62"
      />

      {/* ── TOE CAP (front darker section) ── */}
      <path
        d="M 38,186 Q 26,166 30,136 Q 34,108 58,92 Q 40,114 38,150 L 36,186Z"
        fill="currentColor" opacity="0.7"
      />

      {/* ── HEEL COLLAR (teardrop opening) ── */}
      <path
        d="M 302,98 Q 326,90 334,116 Q 338,142 326,160 Q 316,167 308,160 Q 298,142 298,116 Q 298,104 302,98Z"
        fill="#becad6" opacity="0.58"
      />
      <path
        d="M 308,110 Q 320,108 324,124 Q 324,140 316,150 Q 308,146 307,132 Q 305,118 308,110Z"
        fill="#a8b6c6" opacity="0.9"
      />
      <ellipse cx="312" cy="110" rx="5" ry="3.5" fill="white" opacity="0.3" />

      {/* ── TONGUE ── */}
      <path
        d="M 148,70 Q 174,60 194,70 L 188,138 Q 175,146 166,146 Q 157,146 151,138Z"
        fill="white" opacity="0.15"
      />
      <line x1="171" y1="70" x2="169" y2="138" stroke="white" strokeWidth="0.8" opacity="0.13" />

      {/* ── MATERIAL TEXTURE ── */}
      <ShoeTexture materialId={materialId} />

      {/* ── LACES (5 rows + eyelets) ── */}
      {[0, 1, 2, 3, 4].map(i => {
        const y = 84 + i * 12
        const x1 = 148 - i
        const x2 = 192 - i
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y - 1}
              stroke="white" strokeWidth="2.8" opacity="0.88" strokeLinecap="round" />
            <circle cx={x1 - 5} cy={y} r="3.2"
              fill="none" stroke="white" strokeWidth="1.4" opacity="0.65" />
            <circle cx={x2 + 5} cy={y - 1} r="3.2"
              fill="none" stroke="white" strokeWidth="1.4" opacity="0.65" />
          </g>
        )
      })}

      {/* ── SIDE PANEL ── */}
      <path
        d="M 74,160 Q 84,147 116,140 L 268,144 Q 296,146 312,158 Q 278,172 228,174 Q 158,176 74,160Z"
        fill="white" opacity="0.1"
      />
      <path d="M 74,160 Q 158,176 228,174 Q 278,172 312,158"
        fill="none" stroke="white" strokeWidth="0.9" opacity="0.2" />

      {/* ── SWOOSH-STYLE STRIPE ── */}
      <path
        d="M 88,172 Q 192,150 316,168 Q 290,182 214,184 Q 150,186 88,172Z"
        fill="white" opacity="0.11"
      />

      {/* ── TOE STITCH ── */}
      <path d="M 40,172 Q 46,120 78,98"
        fill="none" stroke="white" strokeWidth="0.9"
        opacity="0.18" strokeDasharray="3.5,3" />
    </svg>
  )
}

// Shared fabric texture patterns rendered inside a clipPath
function FabricTexture({ materialId, clipId }: { materialId: string; clipId: string }) {
  switch (materialId) {
    case 'flyknit':
      return (
        <g clipPath={`url(#${clipId})`} opacity="0.22">
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`a${i}`} x1={-20 + i * 14} y1="0" x2={-20 + i * 14 + 160} y2="320" stroke="white" strokeWidth="1" />
          ))}
          {Array.from({ length: 24 }).map((_, i) => (
            <line key={`b${i}`} x1={-20 + i * 14 + 160} y1="0" x2={-20 + i * 14} y2="320" stroke="white" strokeWidth="1" />
          ))}
        </g>
      )
    case 'leather':
      return (
        <g clipPath={`url(#${clipId})`}>
          <ellipse cx="150" cy="120" rx="100" ry="36" fill="white" opacity="0.2" transform="rotate(-5 150 120)" />
          <ellipse cx="90" cy="170" rx="42" ry="16" fill="white" opacity="0.13" transform="rotate(-3 90 170)" />
          <ellipse cx="210" cy="165" rx="40" ry="15" fill="white" opacity="0.13" transform="rotate(3 210 165)" />
          <ellipse cx="150" cy="210" rx="60" ry="18" fill="white" opacity="0.1" />
        </g>
      )
    case 'mesh':
      return (
        <g clipPath={`url(#${clipId})`} opacity="0.28">
          {Array.from({ length: 18 }).map((_, row) =>
            Array.from({ length: 18 }).map((_, col) => {
              const cx = 15 + col * 16 + (row % 2 ? 8 : 0)
              const cy = 20 + row * 16
              return (
                <polygon key={`${row}-${col}`}
                  points={`${cx},${cy - 6} ${cx + 5},${cy - 3} ${cx + 5},${cy + 3} ${cx},${cy + 6} ${cx - 5},${cy + 3} ${cx - 5},${cy - 3}`}
                  fill="none" stroke="white" strokeWidth="0.9" />
              )
            })
          )}
        </g>
      )
    case 'canvas':
      return (
        <g clipPath={`url(#${clipId})`} opacity="0.2">
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={10 + i * 14} x2="300" y2={10 + i * 14} stroke="white" strokeWidth="1.2" />
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`v${i}`} x1={10 + i * 14} y1="0" x2={10 + i * 14} y2="320" stroke="white" strokeWidth="1.2" />
          ))}
        </g>
      )
    case 'recycled':
      return (
        <g clipPath={`url(#${clipId})`} opacity="0.19">
          {Array.from({ length: 16 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => {
              const x = 15 + col * 28
              const y = 15 + row * 20
              return (
                <path key={`${row}-${col}`}
                  d={`M${x},${y} Q${x + 7},${y - 5} ${x + 14},${y} Q${x + 7},${y + 5} ${x},${y}Z`}
                  fill="white" />
              )
            })
          )}
        </g>
      )
    default:
      return null
  }
}

const SHIRT_BODY = 'M100,30 L60,70 L30,55 L20,100 L65,110 L65,250 L235,250 L235,110 L280,100 L270,55 L240,70 L200,30 Q175,50 150,50 Q125,50 100,30Z'

const SHIRT_SVG = (isLight: boolean, materialId: string) => (
  <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <clipPath id="sc">
        <path d={SHIRT_BODY} />
      </clipPath>
    </defs>
    <path
      d={SHIRT_BODY}
      fill="currentColor" stroke={isLight ? '#a0aab6' : 'none'} strokeWidth="1.2" />
    <path d="M100,30 Q125,50 150,50 Q175,50 200,30 Q175,70 150,72 Q125,70 100,30Z"
      fill="currentColor" opacity="0.65" />
    <path d="M60,70 L30,55 L20,100 L65,110 L65,90Z" fill="currentColor" opacity="0.75" />
    <path d="M240,70 L270,55 L280,100 L235,110 L235,90Z" fill="currentColor" opacity="0.75" />
    <FabricTexture materialId={materialId} clipId="sc" />
  </svg>
)

const PANTS_LEFT = 'M50,58 L50,262 Q90,312 130,262 L145,122 L150,58Z'
const PANTS_RIGHT = 'M250,58 L250,262 Q210,312 170,262 L155,122 L150,58Z'
const PANTS_WAIST = 'M50,20 L250,20 Q256,20 256,26 L256,62 L44,62 L44,26 Q44,20 50,20Z'

const PANTS_SVG = (isLight: boolean, materialId: string) => (
  <svg viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <clipPath id="pc">
        <path d={PANTS_LEFT} />
        <path d={PANTS_RIGHT} />
        <path d={PANTS_WAIST} />
      </clipPath>
    </defs>
    <rect x="50" y="20" width="200" height="42" rx="6"
      fill="currentColor" opacity="0.85" stroke={isLight ? '#a0aab6' : 'none'} strokeWidth="1.2" />
    <path d={PANTS_LEFT}
      fill="currentColor" stroke={isLight ? '#a0aab6' : 'none'} strokeWidth="1.2" />
    <path d={PANTS_RIGHT}
      fill="currentColor" stroke={isLight ? '#a0aab6' : 'none'} strokeWidth="1.2" />
    <line x1="150" y1="58" x2="150" y2="122" stroke="white" strokeWidth="2" opacity="0.25" />
    <FabricTexture materialId={materialId} clipId="pc" />
  </svg>
)

export function ProductPreview({ config }: Props) {
  const color = COLOR_OPTIONS.find(c => c.id === config.colorId)
  const material = MATERIAL_OPTIONS.find(m => m.id === config.materialId)
  const colorHex = color?.hex ?? '#1A1A2E'
  const isLight = colorHex === '#F5F5F5'

  const shapeMap: Record<ProductType, React.ReactNode> = {
    shoe: <ShoeSVG colorHex={colorHex} materialId={config.materialId} />,
    shirt: SHIRT_SVG(isLight, config.materialId),
    pants: PANTS_SVG(isLight, config.materialId),
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center h-full rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f0f4f8 0%, #dde4ed 100%)' }}
      aria-label={`Preview of ${config.name}`}
    >
      {isLight && (
        <div className="absolute inset-0 rounded-2xl" style={{
          backgroundImage: 'radial-gradient(#b8c4d0 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          opacity: 0.5,
        }} />
      )}

      <div className="relative w-full h-64 flex items-center justify-center px-2"
        style={{ color: colorHex }}>
        {shapeMap[config.productType]}
      </div>

      <div className="relative mt-3 flex gap-2 flex-wrap justify-center px-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
          style={{
            backgroundColor: colorHex,
            color: isLight ? '#333' : 'white',
            border: isLight ? '1.5px solid #9aa4b0' : 'none',
          }}>
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

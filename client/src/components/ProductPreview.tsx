import React from 'react'
import { ShoeColors, ShoeView, ProductConfig } from '../types'
import { DEFAULT_SHOE_COLORS } from '../hooks/useConfigurator'

/*
  SIDE VIEW — Nike Air Force 1-style low-top sneaker
  viewBox 0 0 500 280  (2.99 : 1 width-to-height — matches real shoe ratio)

  Ground:          y = 275
  Sole bottom:     y = 272
  Midsole top:     y = 240   (where upper fabric attaches to rubber)
  Throat peak:     x = 210, y = 88   (highest point of the shoe)
  Toe tip front:   x = 32
  Heel back:       x = 488

  The front face of the toe box (x 32→42, y 242→172) rises 70 px over
  10 px — an 87° near-vertical wall — the single feature that makes
  a shoe look like a shoe rather than a wedge.
*/

function ShoeSideView({ colors }: { colors: ShoeColors }) {
  const laceRows = [
    { y: 106, x1: 178, x2: 244 },
    { y: 120, x1: 178, x2: 243 },
    { y: 134, x1: 179, x2: 242 },
    { y: 148, x1: 180, x2: 241 },
    { y: 162, x1: 181, x2: 240 },
  ]

  return (
    <svg
      viewBox="0 0 500 280"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-label="Shoe left-side view"
    >
      <defs>
        <filter id="shoe-drop" x="-15%" y="-20%" width="145%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="16"
            floodColor="#000" floodOpacity="0.5" />
        </filter>
        <clipPath id="cap-clip">
          {/* clip for toe-cap so it never bleeds outside the upper */}
          <path d="M 32,242 C 30,222 32,196 42,172 C 50,148 66,132 88,122 L 88,242 Z" />
        </clipPath>
      </defs>

      {/* ── ground shadow ── */}
      <ellipse cx="258" cy="276" rx="212" ry="7" fill="#000" opacity="0.22" />

      {/* ═══════════════════════════════════════
          SOLE  —  thick rubber outsole
          Top edge: flat line y=242 (toe) → y=240 (heel)
          Bottom: rounded toe corner, flat run, rounded heel corner
          ═══════════════════════════════════════ */}
      <path
        id="region-sole"
        d="
          M 32,242
          Q 14,244 10,260 Q 8,274 50,276
          L 444,276
          Q 480,276 490,266 Q 500,252 490,240
          L 32,242 Z
        "
        fill={colors.sole}
      />
      {/* tread grooves */}
      {[58,118,182,246,310,374].map((x, i) => (
        <line key={i} x1={x} y1={260} x2={x+34} y2={260}
          stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* midsole pinstripe */}
      <line x1="32" y1="242" x2="490" y2="240"
        stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

      {/* ═══════════════════════════════════════
          UPPER  —  main shoe body

          Key segments:
            Line A  M 32,242 → C ... 42,172
                    The near-vertical front face.  dx=10  dy=70  → 87°
            Line B  C ... 88,120
                    Curves into the toe box top
            Line C  C ... 210,88
                    Long sweeping vamp to throat (peak)
            Lines D–G  descent from throat to heel
          ═══════════════════════════════════════ */}
      <path
        id="region-upper"
        d="
          M 32,242
          C 30,220 32,194 42,172
          C 52,148 68,130 90,120
          C 120,108 168,94 210,88
          Q 252,94 308,108
          Q 372,124 428,144
          Q 464,158 478,184
          Q 494,212 488,242
          L 32,242 Z
        "
        fill={colors.upper}
        filter="url(#shoe-drop)"
      />
      {/* specular sheen — top-left area */}
      <path
        d="M 90,120 C 120,108 168,94 210,88 Q 168,108 112,128 Z"
        fill="rgba(255,255,255,0.08)"
      />
      {/* inner-shadow strip at midsole join */}
      <path
        d="M 34,242 L 488,240 Q 470,236 430,234 L 54,236 Z"
        fill="rgba(0,0,0,0.07)"
      />

      {/* ═══════════════════════════════════════
          ANKLE COLLAR INTERIOR
          Dark fill showing inside the shoe at ankle opening
          ═══════════════════════════════════════ */}
      <path
        d="
          M 248,92
          Q 340,112 428,144
          Q 464,160 480,188
          Q 494,218 482,232
          Q 468,238 452,226
          Q 416,206 370,186
          Q 308,160 262,140
          Q 248,132 238,120
          L 237,196
          Q 223,208 210,208
          L 210,96 Z
        "
        fill="rgba(0,0,0,0.30)"
      />

      {/* ═══════════════════════════════════════
          TOE CAP
          Follows upper's steep front face, cuts at x≈100
          ═══════════════════════════════════════ */}
      <path
        id="region-toe_cap"
        d="
          M 32,242
          C 30,220 32,194 42,172
          C 52,148 68,130 88,121
          Q 95,117 102,114
          L 102,242 Z
        "
        fill={colors.toe_cap}
        opacity="0.95"
      />
      {/* stitch line on toe cap */}
      <path d="M 36,228 C 34,206 36,180 44,162"
        fill="none" stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.3" strokeDasharray="4,3.5" />

      {/* ═══════════════════════════════════════
          HEEL COUNTER
          ═══════════════════════════════════════ */}
      <path
        id="region-heel"
        d="
          M 428,144
          Q 464,158 478,184
          Q 494,212 488,242
          L 446,242
          Q 462,228 464,200
          Q 462,170 428,144 Z
        "
        fill={colors.heel}
      />
      {/* ankle cutout depth */}
      <path
        d="
          M 430,150
          Q 462,164 474,190
          Q 486,216 480,236
          Q 472,242 464,234
          Q 456,218 456,196
          Q 454,168 430,150 Z
        "
        fill="rgba(0,0,0,0.24)"
      />
      {/* heel pull tab */}
      <rect x="479" y="210" width="9" height="26" rx="3"
        fill={colors.accent} opacity="0.92" />

      {/* ═══════════════════════════════════════
          ACCENT  (swoosh-style side stripe)
          ═══════════════════════════════════════ */}
      <path
        id="region-accent"
        d="
          M 96,228
          Q 222,206 400,220
          Q 370,244 272,250
          Q 172,254 96,228 Z
        "
        fill={colors.accent}
      />

      {/* ═══════════════════════════════════════
          TONGUE
          Peaks slightly above the upper (y=80 vs upper y=88)
          to be clearly visible at the shoe opening
          ═══════════════════════════════════════ */}
      <path
        id="region-tongue"
        d="
          M 175,96
          Q 210,80 248,92
          L 242,198
          Q 228,212 210,212
          Q 192,212 178,198 Z
        "
        fill={colors.tongue}
      />
      {/* tongue center seam */}
      <line x1="210" y1="82" x2="210" y2="204"
        stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeDasharray="4,4" />
      {/* brand tag */}
      <rect x="197" y="176" width="26" height="14" rx="3"
        fill="rgba(0,0,0,0.09)" />

      {/* ═══════════════════════════════════════
          LACES  (5 rows + eyelets)
          ═══════════════════════════════════════ */}
      {laceRows.map(({ y, x1, x2 }, i) => (
        <g key={i}>
          <line x1={x1} y1={y} x2={x2} y2={y}
            stroke={colors.laces} strokeWidth="2.8" strokeLinecap="round" />
          <circle cx={x1 - 8} cy={y} r="3.5"
            fill="none" stroke={colors.laces} strokeWidth="1.7" opacity="0.65" />
          <circle cx={x2 + 8} cy={y} r="3.5"
            fill="none" stroke={colors.laces} strokeWidth="1.7" opacity="0.65" />
        </g>
      ))}

      {/* panel seam detail */}
      <path d="M 102,220 Q 228,206 374,218 Q 426,224 466,236"
        fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.2" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   TOP-DOWN VIEW   viewBox 0 0 400 230
   ───────────────────────────────────────────────────────────── */
function ShoeTopView({ colors }: { colors: ShoeColors }) {
  const laceRows = [66, 80, 94, 108, 122]
  return (
    <svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-label="Shoe top view">
      <ellipse cx="200" cy="224" rx="160" ry="7" fill="#000" opacity="0.2" />
      <path d="M 56,115 Q 52,32 106,12 Q 152,0 200,0 Q 248,0 294,12 Q 348,32 344,115 Q 348,198 294,210 Q 248,220 200,220 Q 152,220 106,210 Q 52,198 56,115 Z"
        fill={colors.sole} />
      <path d="M 88,115 Q 86,50 132,36 Q 164,24 200,24 Q 236,24 268,36 Q 294,50 292,115 Q 294,180 268,194 Q 236,204 200,204 Q 164,204 132,194 Q 86,180 88,115 Z"
        fill={colors.upper} />
      <path d="M 268,38 Q 294,52 292,115 Q 294,178 268,192 Q 280,160 280,115 Q 280,70 268,38 Z" fill={colors.heel} opacity="0.88" />
      <path d="M 88,115 Q 86,52 130,38 Q 114,68 108,115 Q 108,162 114,192 Q 86,178 88,115 Z" fill={colors.toe_cap} opacity="0.88" />
      <path d="M 160,38 Q 200,28 240,38 L 234,128 Q 220,138 200,138 Q 180,138 166,128 Z" fill={colors.tongue} />
      <line x1="200" y1="30" x2="200" y2="130" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="4,3.5" />
      {laceRows.map((y, i) => (
        <g key={i}>
          <line x1={162} y1={y} x2={238} y2={y} stroke={colors.laces} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={155} cy={y} r="3" fill="none" stroke={colors.laces} strokeWidth="1.4" opacity="0.65" />
          <circle cx={245} cy={y} r="3" fill="none" stroke={colors.laces} strokeWidth="1.4" opacity="0.65" />
        </g>
      ))}
      <path d="M 108,174 Q 192,165 280,174 Q 260,190 200,194 Q 142,194 108,174 Z" fill={colors.accent} opacity="0.88" />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   PUBLIC EXPORT
   ───────────────────────────────────────────────────────────── */
interface Props {
  config?: ProductConfig
  shoeColors?: ShoeColors
  shoeView?: ShoeView
}

export function ProductPreview({ config, shoeColors, shoeView = 'left' }: Props) {
  const colors: ShoeColors = shoeColors ?? config?.shoeColors ?? DEFAULT_SHOE_COLORS
  if (shoeView === 'top') return <ShoeTopView colors={colors} />
  if (shoeView === 'right') {
    return (
      <div style={{ transform: 'scaleX(-1)', width: '100%' }}>
        <ShoeSideView colors={colors} />
      </div>
    )
  }
  return <ShoeSideView colors={colors} />
}

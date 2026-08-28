import React from 'react'
import { ShoeColors, ShoeView, ProductConfig } from '../types'
import { DEFAULT_SHOE_COLORS } from '../hooks/useConfigurator'

/* ─────────────────────────────────────────────────────────────────
   LEFT-SIDE VIEW  (toe → left, heel → right)
   viewBox: 0 0 560 270
   Named SVG regions: sole | upper | toe_cap | heel | tongue | accent | laces
   ───────────────────────────────────────────────────────────────── */
function ShoeSideView({ colors }: { colors: ShoeColors }) {
  // 5 lace rows with slight inward taper toward bottom
  const laceRows = [
    { y: 68, x1: 172, x2: 226 },
    { y: 82, x1: 172, x2: 225 },
    { y: 96, x1: 173, x2: 224 },
    { y: 110, x1: 174, x2: 223 },
    { y: 124, x1: 175, x2: 222 },
  ]

  return (
    <svg
      viewBox="0 0 560 270"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-label="Shoe side view"
    >
      <defs>
        <filter id="sh-drop" x="-15%" y="-15%" width="145%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="14" floodColor="#000" floodOpacity="0.45" />
        </filter>
        <filter id="sh-inner" x="0%" y="0%" width="100%" height="100%">
          <feOffset dx="0" dy="2" />
          <feComposite in2="SourceGraphic" operator="atop" />
        </filter>
        {/* Clip path for upper region texture */}
        <clipPath id="upper-clip">
          <path d="M 40,206 Q 20,184 22,150 Q 28,110 60,88 Q 94,68 172,52 Q 200,42 228,52 Q 288,66 354,84 Q 418,102 454,122 Q 484,142 500,172 Q 508,190 504,206 L 40,206 Z" />
        </clipPath>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="272" cy="264" rx="228" ry="9" fill="#000" opacity="0.28" />

      {/* ══════════════ SOLE ══════════════ */}
      {/* Sole region — dark rubber outsole + midsole stack */}
      <path
        d="M 40,206
           Q 18,218 18,240
           Q 20,256 58,258
           L 448,258
           Q 490,258 508,246
           Q 524,230 514,212
           Q 508,204 500,202
           L 52,202
           Q 43,203 40,206 Z"
        fill={colors.sole}
        id="region-sole"
      />
      {/* Midsole highlight stripe */}
      <path
        d="M 40,206 L 500,202 L 506,206 L 46,210 Z"
        fill="rgba(255,255,255,0.07)"
      />
      {/* Sole tread grooves */}
      {[62, 122, 186, 252, 320, 388].map((x, i) => (
        <line
          key={i}
          x1={x} y1={238} x2={x + 38} y2={238}
          stroke="rgba(0,0,0,0.22)" strokeWidth="1.8" strokeLinecap="round"
        />
      ))}

      {/* ══════════════ UPPER ══════════════ */}
      {/* Main shoe body — sits on top of sole */}
      <path
        d="M 40,206
           Q 20,184 22,150
           Q 28,110 60,88
           Q 94,68 172,52
           Q 200,42 228,52
           Q 288,66 354,84
           Q 418,102 454,122
           Q 484,142 500,172
           Q 508,190 504,206
           L 40,206 Z"
        fill={colors.upper}
        id="region-upper"
        filter="url(#sh-drop)"
      />
      {/* Upper inner base shadow along midsole edge */}
      <path
        d="M 40,206 L 504,206 Q 492,200 454,196 L 60,198 Z"
        fill="rgba(0,0,0,0.1)"
      />
      {/* Upper top-edge highlight (specular sheen) */}
      <path
        d="M 72,84 Q 140,64 200,52 Q 160,72 110,96 Z"
        fill="rgba(255,255,255,0.09)"
      />

      {/* ══════════════ ANKLE COLLAR / shoe opening depth ══════════════ */}
      {/* The dark interior visible at the ankle opening */}
      <path
        d="M 228,52
           Q 294,68 360,86
           Q 420,104 458,130
           Q 464,140 460,150
           Q 454,158 448,156
           Q 432,148 408,132
           Q 356,106 282,82
           Q 246,70 222,58 Z"
        fill="rgba(0,0,0,0.22)"
      />

      {/* ══════════════ TOE_CAP ══════════════ */}
      {/* Reinforced front tip of the shoe */}
      <path
        d="M 40,206
           Q 20,186 22,154
           Q 26,118 52,94
           Q 66,84 88,80
           L 88,205
           Z"
        fill={colors.toe_cap}
        opacity="0.95"
        id="region-toe_cap"
      />
      {/* Toe cap stitch detail */}
      <path
        d="M 42,192 Q 36,142 54,98"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
        strokeDasharray="3.5,3"
      />

      {/* ══════════════ HEEL ══════════════ */}
      {/* Heel counter — rigid back section */}
      <path
        d="M 454,122
           Q 484,142 500,172
           Q 508,190 504,206
           L 454,206
           Q 468,190 468,168
           Q 464,142 454,122 Z"
        fill={colors.heel}
        id="region-heel"
      />
      {/* Heel counter inner shadow — depth of ankle hole */}
      <path
        d="M 456,128
           Q 482,146 494,174
           Q 500,188 494,202
           Q 484,204 476,198
           Q 468,184 466,164
           Q 462,142 456,128 Z"
        fill="rgba(0,0,0,0.26)"
      />
      {/* Heel tab (logo tab at back) */}
      <rect
        x="492" y="186" width="10" height="22" rx="2"
        fill={colors.accent} opacity="0.9"
      />

      {/* ══════════════ ACCENT ══════════════ */}
      {/* Swoosh-style stripe across shoe side */}
      <path
        d="M 94,186
           Q 214,158 380,174
           Q 348,196 258,200
           Q 166,202 94,186 Z"
        fill={colors.accent}
        id="region-accent"
      />

      {/* ══════════════ TONGUE ══════════════ */}
      {/* Tongue flap visible at shoe opening */}
      <path
        d="M 172,52
           Q 200,42 228,52
           L 224,150
           Q 212,162 200,162
           Q 188,162 176,150 Z"
        fill={colors.tongue}
        id="region-tongue"
      />
      {/* Tongue center stitch line */}
      <line
        x1="200" y1="54" x2="200" y2="156"
        stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="4,4"
      />
      {/* Tongue brand label */}
      <rect x="188" y="130" width="24" height="12" rx="2" fill="rgba(0,0,0,0.08)" />

      {/* ══════════════ LACES ══════════════ */}
      {laceRows.map(({ y, x1, x2 }, i) => (
        <g key={i}>
          {/* Lace horizontal line */}
          <line
            x1={x1} y1={y} x2={x2} y2={y}
            stroke={colors.laces} strokeWidth="2.6" strokeLinecap="round"
          />
          {/* Left eyelet */}
          <circle
            cx={x1 - 6} cy={y} r="3.2"
            fill="none"
            stroke={colors.laces}
            strokeWidth="1.6"
            opacity="0.72"
          />
          {/* Right eyelet */}
          <circle
            cx={x2 + 6} cy={y} r="3.2"
            fill="none"
            stroke={colors.laces}
            strokeWidth="1.6"
            opacity="0.72"
          />
        </g>
      ))}

      {/* ══════════════ DETAIL OVERLAYS ══════════════ */}
      {/* Side panel seam line */}
      <path
        d="M 88,162 Q 200,148 358,158 Q 416,162 460,172"
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="1"
      />
      {/* Midsole pinstripe (white line between sole and upper) */}
      <line
        x1="44" y1="203" x2="500" y2="200"
        stroke="rgba(255,255,255,0.14)" strokeWidth="1.5"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────
   TOP-DOWN VIEW
   viewBox: 0 0 360 170
   Simplified bird's-eye view showing tongue, laces, sole border
   ───────────────────────────────────────────────────────────────── */
function ShoeTopView({ colors }: { colors: ShoeColors }) {
  const laceRows = [66, 78, 90, 102, 114]

  return (
    <svg
      viewBox="0 0 360 170"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-label="Shoe top view"
    >
      {/* Ground shadow */}
      <ellipse cx="180" cy="165" rx="148" ry="7" fill="#000" opacity="0.22" />

      {/* Outer sole border */}
      <path
        d="M 52,85
           Q 48,28 100,12
           Q 148,2 196,2
           Q 244,2 294,16
           Q 322,30 324,85
           Q 322,140 294,154
           Q 244,168 196,168
           Q 148,168 100,158
           Q 48,142 52,85 Z"
        fill={colors.sole}
      />

      {/* Main upper visible from above */}
      <path
        d="M 86,85
           Q 84,50 126,38
           Q 158,30 196,30
           Q 234,30 266,38
           Q 286,50 288,85
           Q 286,120 266,132
           Q 234,140 196,140
           Q 158,140 126,132
           Q 84,120 86,85 Z"
        fill={colors.upper}
      />

      {/* Heel area visible from top */}
      <path
        d="M 266,40 Q 288,52 288,85 Q 288,118 266,130 Q 276,110 276,85 Q 276,60 266,40 Z"
        fill={colors.heel}
        opacity="0.85"
      />

      {/* Toe cap visible from top */}
      <path
        d="M 86,85 Q 84,52 122,40 Q 106,56 98,85 Q 98,114 106,130 Q 84,118 86,85 Z"
        fill={colors.toe_cap}
        opacity="0.85"
      />

      {/* Tongue visible from top (center) */}
      <path
        d="M 156,44
           Q 196,36 236,44
           L 230,110
           Q 218,118 196,118
           Q 174,118 162,110 Z"
        fill={colors.tongue}
      />
      {/* Tongue stitch */}
      <line
        x1="196" y1="44" x2="196" y2="112"
        stroke="rgba(0,0,0,0.1)" strokeWidth="1.4" strokeDasharray="3.5,3"
      />

      {/* Laces (horizontal, top view) */}
      {laceRows.map((y, i) => (
        <g key={i}>
          <line
            x1={158} y1={y} x2={234} y2={y}
            stroke={colors.laces} strokeWidth="2.4" strokeLinecap="round"
          />
          <circle cx={152} cy={y} r="2.8" fill="none" stroke={colors.laces} strokeWidth="1.4" opacity="0.7" />
          <circle cx={240} cy={y} r="2.8" fill="none" stroke={colors.laces} strokeWidth="1.4" opacity="0.7" />
        </g>
      ))}

      {/* Accent stripe visible from top */}
      <path
        d="M 100,114 Q 180,108 272,116 Q 250,132 196,134 Q 148,134 100,114 Z"
        fill={colors.accent}
        opacity="0.9"
      />

      {/* Inner-sole highlight */}
      <path
        d="M 86,85 Q 84,50 126,38 Q 158,30 196,30"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PUBLIC COMPONENT
   ───────────────────────────────────────────────────────────────── */
interface Props {
  config?: ProductConfig
  shoeColors?: ShoeColors
  shoeView?: ShoeView
}

export function ProductPreview({ config, shoeColors, shoeView = 'left' }: Props) {
  // Resolve shoe colors: explicit prop wins, then config.shoeColors, then defaults
  const colors: ShoeColors = shoeColors ?? config?.shoeColors ?? DEFAULT_SHOE_COLORS

  let shoeNode: React.ReactNode
  if (shoeView === 'top') {
    shoeNode = <ShoeTopView colors={colors} />
  } else if (shoeView === 'right') {
    shoeNode = (
      <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }}>
        <ShoeSideView colors={colors} />
      </div>
    )
  } else {
    shoeNode = <ShoeSideView colors={colors} />
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div style={{ width: '100%', maxWidth: '560px' }}>
        {shoeNode}
      </div>
    </div>
  )
}

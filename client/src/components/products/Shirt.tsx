import React from 'react'
import { PartColors } from '../../types'
import { Texture, edge, shade, stitch, useSvgId } from './svgUtils'

/*
  LONG-SLEEVE BUTTON-UP SHIRT — flat-lay product shot.
  viewBox 0 0 480 520, symmetric about x = 240.
  Left-half shapes are drawn once and mirrored for the right half.
*/

const BODY =
  'M 205,70 C 185,80 158,86 130,94 C 128,140 140,180 146,210 L 150,452 ' +
  'C 190,470 215,490 240,492 C 265,490 290,470 330,452 L 334,210 ' +
  'C 340,180 352,140 350,94 C 322,86 295,80 275,70 C 262,78 218,78 205,70 Z'

const SLEEVE = 'M 132,94 C 108,100 96,120 90,150 L 60,396 L 108,401 L 146,212 C 142,162 138,120 132,94 Z'
const CUFF = 'M 58,394 L 110,399 L 106,440 C 106,444 103,446 99,446 L 56,442 C 52,442 50,439 50,435 Z'
const MIRROR = 'translate(480 0) scale(-1 1)'

function Sleeves({ c, id, back }: { c: PartColors; id: string; back?: boolean }) {
  const one = (
    <g>
      <path d={SLEEVE} fill={c.sleeves} stroke={edge(c.sleeves)} strokeWidth="1.3" strokeLinejoin="round" />
      {/* folds */}
      <path d="M 100,200 C 110,230 112,260 108,300" fill="none" stroke={shade(c.sleeves, -0.15)} strokeWidth="2" opacity="0.6" />
      <path d="M 86,330 C 96,340 106,346 116,346" fill="none" stroke={shade(c.sleeves, -0.15)} strokeWidth="2" opacity="0.5" />
      <path d="M 120,140 C 116,170 112,190 112,214" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="3" />
      {/* sleeve placket */}
      {back && <path d="M 84,394 L 92,350" stroke={edge(c.sleeves)} strokeWidth="1.2" />}
      <path d={CUFF} fill={c.cuffs} stroke={edge(c.cuffs)} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M 58,401 L 108,406 M 55,435 L 104,439" stroke={stitch(c.cuffs)} strokeWidth="0.9" strokeDasharray="2.5 2" />
      <circle cx="68" cy="420" r="4.5" fill={c.buttons} stroke={edge(c.buttons, 0.4)} strokeWidth="1" />
      <circle cx="66.6" cy="420" r="0.9" fill={edge(c.buttons, 0.6)} />
      <circle cx="69.4" cy="420" r="0.9" fill={edge(c.buttons, 0.6)} />
    </g>
  )
  return (
    <g id="region-sleeves">
      {one}
      <g transform={MIRROR}>{one}</g>
    </g>
  )
}

function Button({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y + 0.8} r="5.6" fill="#000" opacity="0.15" />
      <circle cx={x} cy={y} r="5.4" fill={color} stroke={edge(color, 0.4)} strokeWidth="1" />
      <circle cx={x} cy={y} r="3.6" fill="none" stroke={edge(color, 0.25)} strokeWidth="0.6" />
      <circle cx={x - 1.3} cy={y - 1.3} r="0.8" fill={edge(color, 0.6)} />
      <circle cx={x + 1.3} cy={y - 1.3} r="0.8" fill={edge(color, 0.6)} />
      <circle cx={x - 1.3} cy={y + 1.3} r="0.8" fill={edge(color, 0.6)} />
      <circle cx={x + 1.3} cy={y + 1.3} r="0.8" fill={edge(color, 0.6)} />
    </g>
  )
}

function Shading({ id }: { id: string }) {
  return (
    <>
      <rect x="40" y="50" width="400" height="450" fill={`url(#${id}-vol)`} />
      {/* soft drape folds */}
      <path d="M 170,250 C 180,320 176,390 168,460" fill="none" stroke="#000" strokeOpacity="0.035" strokeWidth="14" />
      <path d="M 310,260 C 300,330 304,400 312,456" fill="none" stroke="#000" strokeOpacity="0.035" strokeWidth="14" />
      <path d="M 190,300 C 196,350 194,400 188,450" fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="10" />
    </>
  )
}

export function Shirt({ colors: c, material, view }: { colors: PartColors; material: string; view: string }) {
  const id = useSvgId('shirt')
  const clip = `${id}-body`
  const back = view === 'back'
  return (
    <svg viewBox="0 0 480 520" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      role="img" aria-label={`Shirt ${view} view`}>
      <defs>
        <clipPath id={clip}><path d={BODY} /></clipPath>
        <clipPath id={`${id}-all`}>
          <path d={BODY} />
          <path d={SLEEVE} /><path d={SLEEVE} transform={MIRROR} />
          <path d={CUFF} /><path d={CUFF} transform={MIRROR} />
        </clipPath>
        <linearGradient id={`${id}-vol`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* drop shadow */}
      <g transform="translate(4 10)" opacity="0.28" filter={`url(#${id}-sh)`}>
        <path d={BODY} /><path d={SLEEVE} /><path d={SLEEVE} transform={MIRROR} />
      </g>

      <Sleeves c={c} id={id} back={back} />

      {/* body */}
      <path id="region-body" d={BODY} fill={c.body} stroke={edge(c.body)} strokeWidth="1.3" strokeLinejoin="round" />
      <g clipPath={`url(#${clip})`}>
        {/* armhole seams */}
        <path d="M 130,94 C 128,140 140,180 146,210" fill="none" stroke={stitch(c.body)} strokeWidth="1" strokeDasharray="2.5 2" transform="translate(4 0)" />
        <path d="M 130,94 C 128,140 140,180 146,210" fill="none" stroke={stitch(c.body)} strokeWidth="1" strokeDasharray="2.5 2" transform={`${MIRROR} translate(4 0)`} />
        {/* hem stitch */}
        <path d="M 150,444 C 190,462 215,482 240,484 C 265,482 290,462 330,444" fill="none" stroke={stitch(c.body)} strokeWidth="1" strokeDasharray="2.5 2" />

        {back ? (
          <>
            {/* yoke + box pleat */}
            <path d="M 120,128 C 180,138 300,138 360,128 L 360,40 L 120,40 Z" fill={shade(c.body, -0.04)} stroke={edge(c.body)} strokeWidth="1.2" />
            <path d="M 124,134 C 182,144 298,144 356,134" fill="none" stroke={stitch(c.body)} strokeWidth="1" strokeDasharray="2.5 2" />
            <path d="M 232,136 L 228,300 M 248,136 L 252,300" stroke={edge(c.body, 0.25)} strokeWidth="1.2" />
            <path d="M 240,137 L 240,300" stroke="#000" strokeOpacity="0.1" strokeWidth="5" />
            <rect x="234" y="140" width="12" height="7" rx="2" fill={c.buttons} opacity="0.8" />
          </>
        ) : (
          <>
            {/* placket */}
            <rect x="229" y="80" width="22" height="420" fill={c.body} stroke={edge(c.body)} strokeWidth="1.2" />
            <path d="M 232,96 L 232,496 M 248,96 L 248,496" stroke={stitch(c.body)} strokeWidth="0.9" strokeDasharray="2.5 2" />
            {/* chest pocket */}
            <g id="region-pocket">
              <path d="M 276,170 L 334,170 L 334,228 L 305,240 L 276,228 Z" fill={c.pocket} stroke={edge(c.pocket)} strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M 276,182 L 334,182" stroke={edge(c.pocket, 0.25)} strokeWidth="1" />
              <path d="M 279,185 L 279,226 L 305,236 L 331,226 L 331,185" fill="none" stroke={stitch(c.pocket)} strokeWidth="0.9" strokeDasharray="2.5 2" />
            </g>
          </>
        )}
      </g>
      {/* material + shading across body, sleeves and cuffs */}
      <Texture id={id} material={material} clip={`${id}-all`} x={40} y={40} w={400} h={470} />
      <g clipPath={`url(#${id}-all)`}><Shading id={id} /></g>

      {/* collar */}
      <g id="region-collar">
        {back ? (
          <>
            <path d="M 200,58 C 222,48 258,48 280,58 L 284,84 C 260,92 220,92 196,84 Z" fill={c.collar} stroke={edge(c.collar)} strokeWidth="1.3" />
            <path d="M 198,80 C 222,88 258,88 282,80" fill="none" stroke={stitch(c.collar)} strokeWidth="0.9" strokeDasharray="2.5 2" />
          </>
        ) : (
          <>
            {/* inside back of the collar band */}
            <path d="M 205,70 C 222,58 258,58 275,70 C 262,80 218,80 205,70 Z" fill={shade(c.collar, -0.3)} />
            <path d="M 206,62 C 222,52 258,52 274,62 L 274,70 C 258,62 222,62 206,70 Z" fill={c.collar} stroke={edge(c.collar)} strokeWidth="1" />
            {[false, true].map(m => (
              <g key={String(m)} transform={m ? MIRROR : undefined}>
                <path d="M 240,100 C 228,86 214,74 206,62 C 196,66 186,74 182,80 C 186,104 196,126 206,144 C 220,128 232,114 240,100 Z"
                  fill={c.collar} stroke={edge(c.collar)} strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M 234,101 C 224,90 214,80 206,70 C 199,74 192,79 189,83 C 192,103 200,121 207,135"
                  fill="none" stroke={stitch(c.collar)} strokeWidth="0.9" strokeDasharray="2.5 2" />
                <path d="M 186,84 C 190,104 198,122 206,138" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="3" />
              </g>
            ))}
          </>
        )}
      </g>

      {/* buttons */}
      {!back && (
        <g id="region-buttons">
          {[104, 160, 214, 268, 322, 376, 430].map(y => <Button key={y} x={240} y={y} color={c.buttons} />)}
          <Button x={305} y={176} color={c.buttons} />
        </g>
      )}
    </svg>
  )
}

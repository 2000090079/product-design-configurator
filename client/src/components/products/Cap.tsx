import React from 'react'
import { PartColors } from '../../types'
import { Texture, edge, shade, stitch, useSvgId } from './svgUtils'

/*
  SIX-PANEL BASEBALL CAP — viewBox 0 0 520 360.
  Side view: brim points left, adjustable strap opening at the back.
  Front view: structured front panels with centre seam, curved brim below.
*/

const SIDE_CROWN =
  'M 172,252 C 160,196 168,132 216,96 C 262,62 352,58 402,98 ' +
  'C 436,126 450,176 448,244 C 360,262 250,262 172,252 Z'
const SIDE_BRIM_TOP =
  'M 270,250 C 230,240 130,232 60,250 C 38,256 26,266 30,272 C 34,280 44,282 56,282 ' +
  'C 116,284 196,276 270,262 Z'
const SIDE_BRIM_UNDER =
  'M 30,272 C 28,282 38,290 58,290 C 118,292 198,282 272,268 L 270,262 ' +
  'C 196,276 116,284 56,282 C 44,282 34,280 30,272 Z'

const FRONT_CROWN = 'M 112,248 C 100,148 168,70 260,66 C 352,70 420,148 408,248 C 330,262 190,262 112,248 Z'
const FRONT_BRIM =
  'M 104,242 C 170,262 350,262 416,242 C 452,252 466,282 442,300 C 390,328 130,328 78,300 C 54,282 68,252 104,242 Z'

function Eyelet({ x, y, c, rx = 4, ry = 4 }: { x: number; y: number; c: string; rx?: number; ry?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx + 1.5} ry={ry + 1.5} fill={c} stroke={edge(c, 0.4)} strokeWidth="0.8" />
      <ellipse cx={x} cy={y} rx={rx - 1} ry={ry - 1} fill="#111" opacity="0.7" />
    </g>
  )
}

function Logo({ x, y, s, sx = 1, color }: { x: number; y: number; s: number; sx?: number; color: string }) {
  // embroidered star emblem inside a ring
  const pts = Array.from({ length: 10 }).map((_, i) => {
    const r = i % 2 ? 0.42 : 1
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    return `${(Math.cos(a) * r).toFixed(3)},${(Math.sin(a) * r).toFixed(3)}`
  }).join(' ')
  return (
    <g id="region-logo" transform={`translate(${x} ${y}) scale(${s * sx} ${s})`}>
      <circle r="1.32" fill="none" stroke={color} strokeWidth="0.2" />
      <circle r="1.32" fill="none" stroke={edge(color, 0.4)} strokeWidth="0.04" />
      <polygon points={pts} fill={color} stroke={edge(color, 0.45)} strokeWidth="0.05" strokeLinejoin="round" />
      <polygon points={pts} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.04"
        transform="translate(-0.03 -0.04)" />
    </g>
  )
}

function CapSide({ c, material, id }: { c: PartColors; material: string; id: string }) {
  const clip = `${id}-crown`
  return (
    <>
      <defs>
        <clipPath id={clip}><path d={SIDE_CROWN} /></clipPath>
        <clipPath id={`${id}-brim`}><path d={SIDE_BRIM_TOP} /></clipPath>
        <radialGradient id={`${id}-dome`} cx="0.38" cy="0.25" r="0.85">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </radialGradient>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>

      <ellipse cx="250" cy="300" rx="220" ry="12" fill="#000" opacity="0.3" filter={`url(#${id}-sh)`} />

      {/* brim — drawn first so the crown sits on top of it */}
      <path id="region-under" d={SIDE_BRIM_UNDER} fill={c.under} stroke={edge(c.under)} strokeWidth="1" />
      <path id="region-brim" d={SIDE_BRIM_TOP} fill={c.brim} stroke={edge(c.brim, 0.45)} strokeWidth="1.3" />
      <g clipPath={`url(#${id}-brim)`}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <path key={i} d="M 30,272 C 34,280 44,282 56,282 C 116,284 196,276 270,262"
            transform={`translate(${5 + i * 4} ${-4 - i * 3.6})`}
            fill="none" stroke={stitch(c.brim)} strokeWidth="0.9" strokeDasharray="2.5 2" />
        ))}
      </g>
      <Texture id={`${id}b`} material={material} clip={`${id}-brim`} x={20} y={220} w={260} h={80} />
      <g clipPath={`url(#${id}-brim)`}>
        <rect x="20" y="220" width="260" height="80" fill={`url(#${id}-bg)`} />
      </g>

      {/* crown */}
      <path id="region-crown" d={SIDE_CROWN} fill={c.crown} />
      <g clipPath={`url(#${clip})`}>
        <path id="region-front" d="M 100,300 L 100,40 L 318,60 C 272,92 238,170 234,270 Z"
          fill={c.front} stroke={edge(c.front)} strokeWidth="1.2" />
        {/* panel seams with twin-needle stitching */}
        <path d="M 318,62 C 384,96 404,170 406,262" fill="none" stroke={edge(c.crown)} strokeWidth="1.3" />
        {[-5, 5].map(o => (
          <g key={o}>
            <path d="M 318,62 C 272,94 238,170 234,270" transform={`translate(${o} 0)`} fill="none" stroke={stitch(o < 0 ? c.front : c.crown)} strokeWidth="0.9" strokeDasharray="2.5 2" />
            <path d="M 318,62 C 384,96 404,170 406,262" transform={`translate(${o} 0)`} fill="none" stroke={stitch(c.crown)} strokeWidth="0.9" strokeDasharray="2.5 2" />
          </g>
        ))}
        {/* adjustable strap opening */}
        <path d="M 402,262 C 404,232 422,214 452,212 L 460,262 Z" fill={shade(c.crown, -0.55)} />
        <path d="M 404,252 L 456,244 L 458,256 L 404,262 Z" fill={shade(c.crown, -0.15)} stroke={edge(c.crown)} strokeWidth="1" />
        {[414, 426, 438].map(x => <circle key={x} cx={x} cy={253} r="2" fill={shade(c.crown, -0.5)} />)}
        <path d="M 404,262 C 404,232 422,214 452,212" fill="none" stroke={stitch(c.crown)} strokeWidth="0.9" strokeDasharray="2.5 2" />
        {/* sweatband edge */}
        <path d="M 172,252 C 250,262 360,262 448,244" fill="none" stroke={shade(c.crown, -0.3)} strokeWidth="5" />
      </g>
      <Texture id={id} material={material} clip={clip} x={150} y={50} w={310} h={220} />
      <g clipPath={`url(#${clip})`}>
        <rect x="150" y="50" width="310" height="220" fill={`url(#${id}-dome)`} />
      </g>
      <path d={SIDE_CROWN} fill="none" stroke={edge(c.crown, 0.5)} strokeWidth="1.5" />

      <Logo x={206} y={176} s={22} sx={0.62} color={c.logo} />

      <g id="region-eyelets">
        <Eyelet x={300} y={130} c={c.eyelets} rx={3} ry={4} />
        <Eyelet x={388} y={140} c={c.eyelets} rx={3} ry={4} />
      </g>

      {/* top button */}
      <g id="region-button">
        <ellipse cx="318" cy="62" rx="12" ry="5" fill={c.button} stroke={edge(c.button, 0.45)} strokeWidth="1" />
        <ellipse cx="318" cy="59" rx="10" ry="4" fill={shade(c.button, 0.15)} />
      </g>
    </>
  )
}

function CapFront({ c, material, id }: { c: PartColors; material: string; id: string }) {
  const clip = `${id}-fcrown`
  return (
    <>
      <defs>
        <clipPath id={clip}><path d={FRONT_CROWN} /></clipPath>
        <clipPath id={`${id}-fbrim`}><path d={FRONT_BRIM} /></clipPath>
        <radialGradient id={`${id}-fdome`} cx="0.42" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </radialGradient>
        <linearGradient id={`${id}-fbg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
        </linearGradient>
        <filter id={`${id}-fsh`} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>

      <ellipse cx="260" cy="318" rx="200" ry="12" fill="#000" opacity="0.3" filter={`url(#${id}-fsh)`} />

      <path id="region-crown" d={FRONT_CROWN} fill={c.crown} />
      <g clipPath={`url(#${clip})`}>
        <path id="region-front" d="M 260,66 C 200,90 168,170 166,270 L 354,270 C 352,170 320,90 260,66 Z"
          fill={c.front} stroke={edge(c.front)} strokeWidth="1.2" />
        <path d="M 260,66 L 260,262" stroke={edge(c.front)} strokeWidth="1.3" />
        {[-5, 5].map(o => (
          <g key={o} transform={`translate(${o} 0)`}>
            <path d="M 260,70 L 260,262" stroke={stitch(c.front)} strokeWidth="0.9" strokeDasharray="2.5 2" />
          </g>
        ))}
        {[[-1, 'M 260,66 C 200,90 168,170 166,270'], [1, 'M 260,66 C 320,90 352,170 354,270']].map(([s, d]) => (
          <g key={String(s)}>
            {[-5, 5].map(o => (
              <path key={o} d={d as string} transform={`translate(${o} 0)`} fill="none"
                stroke={stitch(c.front)} strokeWidth="0.9" strokeDasharray="2.5 2" />
            ))}
          </g>
        ))}
        <path d="M 112,248 C 190,262 330,262 408,248" fill="none" stroke={shade(c.front, -0.3)} strokeWidth="5" />
      </g>
      <Texture id={id} material={material} clip={clip} x={100} y={60} w={320} h={210} />
      <g clipPath={`url(#${clip})`}>
        <rect x="100" y="60" width="320" height="210" fill={`url(#${id}-fdome)`} />
      </g>
      <path d={FRONT_CROWN} fill="none" stroke={edge(c.crown, 0.5)} strokeWidth="1.5" />

      <Logo x={260} y={170} s={34} color={c.logo} />

      <g id="region-eyelets">
        <Eyelet x={160} y={136} c={c.eyelets} rx={2.4} ry={4} />
        <Eyelet x={360} y={136} c={c.eyelets} rx={2.4} ry={4} />
      </g>

      {/* brim: top surface with under-brim showing at the curl */}
      <path d="M 78,300 C 130,336 390,336 442,300 C 446,310 436,318 420,322 C 360,340 160,340 100,322 C 84,318 74,310 78,300 Z"
        id="region-under" fill={c.under} stroke={edge(c.under)} strokeWidth="1" />
      <path id="region-brim" d={FRONT_BRIM} fill={c.brim} stroke={edge(c.brim, 0.45)} strokeWidth="1.3" />
      <g clipPath={`url(#${id}-fbrim)`}>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <path key={i} d="M 78,300 C 130,328 390,328 442,300"
            transform={`translate(260 300) scale(${1 - i * 0.045} ${1 - i * 0.06}) translate(-260 -300) translate(0 ${-4 - i * 2})`}
            fill="none" stroke={stitch(c.brim)} strokeWidth="0.9" strokeDasharray="2.5 2" />
        ))}
      </g>
      <Texture id={`${id}b`} material={material} clip={`${id}-fbrim`} x={50} y={230} w={420} h={110} />
      <g clipPath={`url(#${id}-fbrim)`}>
        <rect x="50" y="230" width="420" height="110" fill={`url(#${id}-fbg)`} />
      </g>

      <g id="region-button">
        <ellipse cx="260" cy="66" rx="13" ry="5.5" fill={c.button} stroke={edge(c.button, 0.45)} strokeWidth="1" />
        <ellipse cx="260" cy="63" rx="11" ry="4.2" fill={shade(c.button, 0.15)} />
      </g>
    </>
  )
}

export function Cap({ colors, material, view }: { colors: PartColors; material: string; view: string }) {
  const id = useSvgId('cap')
  return (
    <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      role="img" aria-label={`Cap ${view} view`}>
      {view === 'front'
        ? <CapFront c={colors} material={material} id={id} />
        : <g transform="rotate(-4 260 200)"><CapSide c={colors} material={material} id={id} /></g>}
    </svg>
  )
}

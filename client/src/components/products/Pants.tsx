import React from 'react'
import { PartColors } from '../../types'
import { Texture, edge, shade, useSvgId } from './svgUtils'

/*
  FIVE-POCKET CHINOS — flat-lay, viewBox 0 0 420 600, symmetric about x = 210.
*/

const LEGS =
  'M 98,70 L 322,70 C 332,140 332,200 328,240 L 306,572 L 222,572 L 213,268 ' +
  'C 212,258 208,258 207,268 L 198,572 L 114,572 L 92,240 C 88,200 88,140 98,70 Z'
const WAIST = 'M 96,38 C 160,44 260,44 324,38 L 324,72 C 260,78 160,78 96,72 Z'
const MIRROR = 'translate(420 0) scale(-1 1)'

export function Pants({ colors: c, material, view }: { colors: PartColors; material: string; view: string }) {
  const id = useSvgId('pants')
  const clip = `${id}-legs`
  const back = view === 'back'
  const st = c.stitching
  const dash = { stroke: st, strokeWidth: 1.1, strokeDasharray: '3 2.2', fill: 'none' }
  return (
    <svg viewBox="0 0 420 600" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      role="img" aria-label={`Pants ${view} view`}>
      <g transform="translate(210 0) scale(0.84 1) translate(-210 0)">
      <defs>
        <clipPath id={clip}><path d={LEGS} /><path d={WAIST} /></clipPath>
        <linearGradient id={`${id}-cyl`} x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse"
          gradientTransform="translate(88 0) scale(244 1)">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.22" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.47" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.53" stopColor="#000" stopOpacity="0.16" />
          <stop offset="0.78" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>

      <g transform="translate(5 10)" opacity="0.28" filter={`url(#${id}-sh)`}><path d={LEGS} /><path d={WAIST} /></g>

      <path id="region-legs" d={LEGS} fill={c.legs} stroke={edge(c.legs)} strokeWidth="1.3" strokeLinejoin="round" />

      <g clipPath={`url(#${clip})`}>
        {/* side + inseam stitching */}
        {[false, true].map(m => (
          <g key={String(m)} transform={m ? MIRROR : undefined}>
            <path d="M 95,80 C 92,140 92,200 96,240 L 118,566" {...dash} />
            <path d="M 205,276 L 196,566" {...dash} />
            {/* hem */}
            <path d="M 114,552 L 198,552" stroke={edge(c.legs, 0.2)} strokeWidth="1.2" />
            <path d="M 115,558 L 198,558" {...dash} />
            {/* knee wrinkles + crease */}
            <path d="M 152,120 L 158,560" stroke="#fff" strokeOpacity="0.14" strokeWidth="2" />
            <path d="M 156,120 L 162,560" stroke="#000" strokeOpacity="0.08" strokeWidth="1.5" />
            <path d="M 118,380 C 140,386 170,384 196,376" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="4" />
            <path d="M 112,300 C 140,308 170,306 200,296" fill="none" stroke="#000" strokeOpacity="0.04" strokeWidth="3" />
            <path d="M 124,520 C 150,528 176,526 198,518" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="4" />

            {back ? (
              /* back patch pocket + yoke */
              <g className="region-pockets">
                <path d="M 98,110 C 140,118 180,128 210,138" fill="none" stroke={edge(c.legs)} strokeWidth="1.2" />
                <path d="M 98,116 C 140,124 180,134 210,144" {...dash} />
                <path d="M 120,148 L 188,154 L 186,224 L 154,240 L 120,226 Z" fill={c.pockets} stroke={edge(c.pockets)} strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M 124,156 L 184,161 L 182,220 L 154,234 L 124,222 Z" {...dash} />
                <path d="M 124,162 L 184,167" {...dash} />
              </g>
            ) : (
              /* slanted front pocket with facing */
              <g className="region-pockets">
                <path d="M 136,72 C 138,110 122,140 92,156 L 90,72 Z" fill={c.pockets} stroke={edge(c.pockets)} strokeWidth="1.3" />
                <path d="M 130,74 C 132,108 118,134 92,148" {...dash} />
                <path d="M 136,72 C 138,110 122,140 92,156" fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth="3" />
              </g>
            )}
          </g>
        ))}

        {!back && (
          <>
            {/* fly J-stitch + crotch shadow */}
            <path d="M 226,74 L 226,206 C 226,222 220,232 211,238" {...dash} />
            <path d="M 210,74 L 210,250" stroke={edge(c.legs, 0.3)} strokeWidth="1.3" />
            <path d="M 216,206 C 216,214 214,224 211,230" stroke={st} strokeWidth="2" fill="none" />
          </>
        )}
        {back && <path d="M 210,74 L 210,262" stroke={edge(c.legs, 0.3)} strokeWidth="1.3" />}

      </g>
      <Texture id={id} material={material} clip={clip} x={80} y={30} w={260} h={550} />
      <g clipPath={`url(#${clip})`}>
        <rect x="80" y="30" width="260" height="550" fill={`url(#${id}-cyl)`} />
      </g>

      {/* waistband */}
      <g id="region-waistband">
        <path d={WAIST} fill={c.waistband} stroke={edge(c.waistband)} strokeWidth="1.3" />
        <path d="M 98,43 C 160,49 260,49 322,43 M 98,67 C 160,73 260,73 322,67" {...dash} />
        {back && <rect x="190" y="44" width="40" height="22" rx="2" fill={shade(c.waistband, -0.25)} stroke={edge(c.waistband)} strokeWidth="1" />}
      </g>
      {/* belt loops */}
      {(back ? [112, 168, 210, 252, 308] : [112, 160, 260, 308]).map(x => (
        <g key={x}>
          <rect x={x - 5} y={34} width={10} height={44} rx={2} fill={c.waistband} stroke={edge(c.waistband, 0.45)} strokeWidth="1" />
          <path d={`M ${x - 5},40 L ${x + 5},40 M ${x - 5},72 L ${x + 5},72`} stroke={st} strokeWidth="1.2" />
        </g>
      ))}
      {!back && (
        <g id="region-button">
          <circle cx="210" cy="56" r="8.5" fill={c.button} stroke={edge(c.button, 0.45)} strokeWidth="1.2" />
          <circle cx="210" cy="56" r="5" fill="none" stroke={shade(c.button, 0.3)} strokeWidth="1" />
          <circle cx="208" cy="54" r="2" fill="#fff" opacity="0.35" />
        </g>
      )}
      </g>
    </svg>
  )
}

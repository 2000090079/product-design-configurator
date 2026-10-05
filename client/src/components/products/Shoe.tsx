import React from 'react'
import { PartColors } from '../../types'
import { Texture, edge, shade, stitch, useSvgId } from './svgUtils'

/*
  LOW-TOP COURT SNEAKER — lateral side view, toe pointing left.
  viewBox 0 0 640 320, ground at y≈288.

  Anatomy (back to front in paint order):
    lining        inside of the far collar, seen through the ankle opening
    tongue        padded, rises above the lace line
    upper         base vamp + quarter panel (full silhouette, used as clip)
    mudguard      wraps the toe and runs low along the side (toe_cap)
    eyestay       reinforced band carrying the eyelets
    heel counter  rigid cup around the back
    side stripe   accent swoosh-style sweep
    midsole       cupsole with stitch line and flex groove
    outsole       rubber with toe spring
    laces + bow   on top of everything
*/

const UPPER =
  'M 46,250 L 46,244 C 32,220 40,194 64,182 C 96,168 140,158 180,152 ' +
  'C 196,150 206,147 214,142 L 318,78 C 326,73 336,72 344,76 ' +
  'C 380,98 418,116 456,116 C 494,116 528,98 554,88 ' +
  'C 574,82 588,92 593,112 C 600,146 608,200 600,250 Z'

const MIDSOLE =
  'M 44,226 C 70,234 100,238 140,239 C 280,242 470,240 596,228 ' +
  'C 604,236 606,252 600,264 C 594,274 580,276 560,276 L 160,276 ' +
  'C 112,276 70,272 50,262 C 36,254 34,236 44,226 Z'

const OUTSOLE =
  'M 50,262 C 70,272 112,276 160,276 L 560,276 C 580,276 594,274 600,264 ' +
  'C 600,278 588,288 564,288 L 160,288 C 108,288 64,282 46,270 C 43,267 45,263 50,262 Z'

// lace line runs from the throat A to the top eyelet B
const A = { x: 214, y: 142 }
const B = { x: 318, y: 78 }
const LEN = Math.hypot(B.x - A.x, B.y - A.y)
const D = { x: (B.x - A.x) / LEN, y: (B.y - A.y) / LEN } // along the lace line
const N = { x: -D.y, y: D.x }                            // normal, pointing down/forward
const EYELET_T = [0.1, 0.27, 0.44, 0.61, 0.78, 0.95]
const eyelets = EYELET_T.map(t => ({
  x: A.x + (B.x - A.x) * t + N.x * 12,
  y: A.y + (B.y - A.y) * t + N.y * 12,
}))

function ShoeSide({ c, material, id }: { c: PartColors; material: string; id: string }) {
  const clip = `${id}-upper`
  return (
    <>
      <defs>
        <clipPath id={clip}><path d={UPPER} /></clipPath>
        <clipPath id={`${id}-mid`}><path d={MIDSOLE} /></clipPath>
        <linearGradient id={`${id}-vol`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id={`${id}-toehl`} cx="0.2" cy="0.35" r="0.35">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-heelsh`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.75" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}-lin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.lining} />
          <stop offset="1" stopColor={shade(c.lining, -0.55)} />
        </linearGradient>
        <linearGradient id={`${id}-midg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="330" cy="290" rx="290" ry="9" fill="#000" opacity="0.32" filter={`url(#${id}-blur)`} />
      <ellipse cx="350" cy="289" rx="230" ry="3.5" fill="#000" opacity="0.35" filter={`url(#${id}-blur)`} />

      {/* ── lining: far-side collar seen through the ankle opening ── */}
      <path d="M 348,74 C 396,92 470,100 556,90 L 560,140 L 348,140 Z" fill={`url(#${id}-lin)`} />
      <path d="M 348,74 C 396,92 470,100 556,90" fill="none" stroke={edge(c.lining, 0.3)} strokeWidth="1.2" />

      {/* ── tongue ── */}
      <g id="region-tongue">
        <path
          d="M 206,150 L 306,62 C 314,52 334,44 350,48 C 362,52 366,64 360,80 L 350,104 L 220,166 Z"
          fill={c.tongue} stroke={edge(c.tongue)} strokeWidth="1.3" strokeLinejoin="round"
        />
        <path d="M 306,62 C 314,52 334,44 350,48 C 362,52 366,64 360,80"
          fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
        {/* tongue label */}
        <g transform="rotate(-38 330 66)">
          <rect x="318" y="58" width="24" height="15" rx="2" fill={c.heel} stroke={edge(c.heel)} strokeWidth="0.8" />
          <rect x="322" y="63" width="16" height="2.2" rx="1" fill={c.tongue} opacity="0.8" />
          <rect x="324" y="67" width="12" height="1.6" rx="0.8" fill={c.tongue} opacity="0.6" />
        </g>
      </g>

      {/* ── upper base (vamp + quarter) ── */}
      <path id="region-upper" d={UPPER} fill={c.upper} />

      <g clipPath={`url(#${clip})`}>
        {/* toe-box perforations */}
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, k) => {
            const cx = 72 + k * 13 + (r % 2 ? 6.5 : 0)
            const cy = 190 + r * 9 - k * 1.6
            return <circle key={`${r}-${k}`} cx={cx} cy={cy} r="1.6" fill={shade(c.upper, -0.45)} opacity="0.7" />
          })
        )}

        {/* quarter panel seam (vamp → quarter) */}
        <path d="M 236,150 C 250,180 262,206 270,240" fill="none" stroke={edge(c.upper)} strokeWidth="1.2" />
        <path d="M 242,148 C 256,178 268,206 276,240" fill="none" stroke={stitch(c.upper)} strokeWidth="1" strokeDasharray="3 2.5" />

        {/* ── mudguard / toe cap ── */}
        <path
          id="region-toe_cap"
          d="M 30,260 L 30,170 L 64,186 C 84,177 104,172 126,167 C 138,182 150,198 172,208 C 230,222 330,222 492,214 L 492,260 Z"
          fill={c.toe_cap} stroke={edge(c.toe_cap)} strokeWidth="1.3" strokeLinejoin="round"
        />
        <path d="M 120,172 C 132,188 146,203 170,214 C 230,228 330,228 492,220"
          fill="none" stroke={stitch(c.toe_cap)} strokeWidth="1" strokeDasharray="3 2.5" />
        <path d="M 52,232 C 46,214 50,200 66,192 C 86,183 104,178 118,175"
          fill="none" stroke={stitch(c.toe_cap)} strokeWidth="1" strokeDasharray="3 2.5" />

        {/* ── eyestay ── */}
        <path
          id="region-eyestay"
          d={`M 200,152 L ${A.x},${A.y} L ${B.x},${B.y} C 326,73 336,72 344,76 C 350,84 348,96 336,104 L 236,170 C 222,176 206,168 200,152 Z`}
          fill={c.eyestay} stroke={edge(c.eyestay)} strokeWidth="1.3" strokeLinejoin="round"
        />
        <path d="M 226,164 L 330,98" fill="none" stroke={stitch(c.eyestay)} strokeWidth="1" strokeDasharray="3 2.5" />

        {/* ── heel counter ── */}
        <path
          id="region-heel"
          d="M 512,100 C 500,150 478,200 444,252 L 620,252 L 620,60 Z"
          fill={c.heel} stroke={edge(c.heel)} strokeWidth="1.3"
        />
        <path d="M 520,102 C 508,152 486,202 452,252" fill="none" stroke={stitch(c.heel)} strokeWidth="1" strokeDasharray="3 2.5" />

        {/* ── side stripe ── */}
        <path
          id="region-accent"
          d="M 176,222 C 290,214 400,184 484,138 C 494,133 502,140 494,150 C 452,184 400,210 330,222 C 270,232 214,232 176,222 Z"
          fill={c.accent} stroke={edge(c.accent)} strokeWidth="1.2" strokeLinejoin="round"
        />
        <path d="M 200,224 C 300,216 404,188 482,146"
          fill="none" stroke={stitch(c.accent)} strokeWidth="0.9" strokeDasharray="3 2.5" />

      </g>

      {/* material texture must sit at the root so its blend sees the panels below */}
      <Texture id={id} material={material} clip={clip} x={20} y={40} w={600} h={220} />

      <g clipPath={`url(#${clip})`}>
        {/* volume shading over all upper panels */}
        <rect x="20" y="40" width="600" height="220" fill={`url(#${id}-vol)`} />
        <rect x="20" y="40" width="600" height="220" fill={`url(#${id}-toehl)`} />
        <rect x="20" y="40" width="600" height="220" fill={`url(#${id}-heelsh)`} />

        {/* padded collar roll */}
        <path d="M 346,80 C 382,102 420,120 456,120 C 494,120 530,102 556,92"
          fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="6" />
        <path d="M 344,77 C 380,99 418,117 456,117 C 494,117 528,99 554,89"
          fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
      </g>

      {/* silhouette outline */}
      <path d={UPPER} fill="none" stroke={edge(c.upper, 0.5)} strokeWidth="1.6" strokeLinejoin="round" />

      {/* heel pull tab */}
      <path d="M 584,98 C 594,102 600,112 601,130 L 590,132 C 590,120 586,110 578,104 Z"
        fill={c.accent} stroke={edge(c.accent)} strokeWidth="1" />

      {/* eyelets */}
      {eyelets.map((e, i) => (
        <g key={i}>
          <circle cx={e.x} cy={e.y} r="4.6" fill={shade(c.eyestay, -0.25)} stroke={edge(c.eyestay, 0.5)} strokeWidth="1" />
          <circle cx={e.x} cy={e.y} r="2.2" fill="#111" opacity="0.75" />
        </g>
      ))}

      {/* ── midsole + outsole ── */}
      <g id="region-sole">
        <path d={MIDSOLE} fill={c.sole} stroke={edge(c.sole, 0.3)} strokeWidth="1.3" />
        <g clipPath={`url(#${id}-mid)`}>
          <rect x="30" y="220" width="590" height="60" fill={`url(#${id}-midg)`} />
          {/* cupsole stitch */}
          <path d="M 58,240 C 90,247 120,249 150,250 C 290,252 470,250 590,240"
            fill="none" stroke={stitch(c.sole)} strokeWidth="1.2" strokeDasharray="4 3" />
          {/* flex groove */}
          <path d="M 70,262 C 100,266 130,266 170,266 L 590,266"
            fill="none" stroke={shade(c.sole, -0.22)} strokeWidth="2" />
          <path d="M 70,264 C 100,268 130,268 170,268 L 590,268"
            fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="1" />
          {/* toe & heel bumper shading */}
          <ellipse cx="44" cy="248" rx="22" ry="30" fill="#000" opacity="0.06" />
          <ellipse cx="604" cy="250" rx="18" ry="30" fill="#000" opacity="0.08" />
        </g>
      </g>
      <g id="region-outsole">
        <path d={OUTSOLE} fill={c.outsole} stroke={edge(c.outsole, 0.35)} strokeWidth="1.2" />
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={150 + i * 14.5} y1="279" x2={146 + i * 14.5} y2="287"
            stroke={shade(c.outsole, -0.3)} strokeWidth="1.6" strokeLinecap="round" />
        ))}
        <path d="M 160,277 L 560,277" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
      </g>

      {/* ── laces ── */}
      <g id="region-laces">
        {eyelets.map((e, i) => {
          const tilt = i % 2 ? -7 : 5
          const x2 = e.x - N.x * 26 + D.x * tilt
          const y2 = e.y - N.y * 26 + D.y * tilt
          return (
            <g key={i}>
              <line x1={e.x} y1={e.y} x2={x2} y2={y2} stroke={edge(c.laces, 0.45)} strokeWidth="7" strokeLinecap="round" />
              <line x1={e.x} y1={e.y} x2={x2} y2={y2} stroke={c.laces} strokeWidth="5" strokeLinecap="round" />
              <line x1={e.x - 1} y1={e.y - 1} x2={x2 - 1} y2={y2 - 1} stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          )
        })}
        {/* bow */}
        {[
          'M 316,62 C 292,40 270,50 284,64 C 294,74 308,70 316,62',
          'M 316,62 C 334,32 360,36 350,54 C 344,64 330,66 316,62',
          'M 316,62 C 318,92 326,126 314,160',
          'M 316,62 C 308,90 296,116 300,140',
        ].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke={edge(c.laces, 0.45)} strokeWidth="6.5" strokeLinecap="round" />
            <path d={d} fill="none" stroke={c.laces} strokeWidth="4.5" strokeLinecap="round" />
          </g>
        ))}
        {/* aglets */}
        <line x1="314" y1="160" x2="313" y2="171" stroke={shade(c.laces, -0.5)} strokeWidth="5" strokeLinecap="round" />
        <line x1="300" y1="140" x2="301" y2="151" stroke={shade(c.laces, -0.5)} strokeWidth="5" strokeLinecap="round" />
        <circle cx="316" cy="62" r="5.5" fill={c.laces} stroke={edge(c.laces, 0.45)} strokeWidth="1" />
      </g>
    </>
  )
}

/* ─────────────────────────────────────────────────────────────
   TOP VIEW — looking straight down, toe pointing left.
   Asymmetric last: medial side (top) straighter, lateral (bottom) rounder.
   ───────────────────────────────────────────────────────────── */
const SOLE_TOP =
  'M 40,168 C 40,120 90,74 170,66 C 250,60 320,82 380,92 C 450,102 520,94 570,104 ' +
  'C 610,114 616,150 616,168 C 616,190 606,222 568,234 C 520,248 450,232 380,238 ' +
  'C 300,244 230,276 160,270 C 84,264 40,214 40,168 Z'

const UPPER_TOP =
  'M 52,168 C 52,126 96,84 170,78 C 248,72 318,94 380,104 C 448,114 518,106 564,114 ' +
  'C 598,122 604,152 604,168 C 604,188 596,214 562,224 C 518,236 448,222 380,228 ' +
  'C 302,234 230,262 162,258 C 92,252 52,208 52,168 Z'

function ShoeTop({ c, material, id }: { c: PartColors; material: string; id: string }) {
  const clip = `${id}-utop`
  const laceY = [0, 1, 2, 3, 4, 5].map(i => 236 + i * 30)
  return (
    <>
      <defs>
        <clipPath id={clip}><path d={UPPER_TOP} /></clipPath>
        <radialGradient id={`${id}-dome`} cx="0.45" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </radialGradient>
        <radialGradient id={`${id}-hole`} cx="0.4" cy="0.5" r="0.6">
          <stop offset="0" stopColor={shade(c.lining, -0.55)} />
          <stop offset="1" stopColor={c.lining} />
        </radialGradient>
        <filter id={`${id}-tblur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <path d={SOLE_TOP} transform="translate(6 10)" fill="#000" opacity="0.3" filter={`url(#${id}-tblur)`} />

      {/* outsole rim then midsole rim */}
      <path d={SOLE_TOP} fill={c.outsole} stroke={edge(c.outsole)} strokeWidth="1.2" />
      <path d={SOLE_TOP} transform="translate(328 168) scale(0.985) translate(-328 -168)"
        fill={c.sole} stroke={edge(c.sole, 0.3)} strokeWidth="1.2" />

      <path d={UPPER_TOP} fill={c.upper} />
      <g clipPath={`url(#${clip})`}>
        {/* mudguard around toe */}
        <path d="M 30,40 L 140,40 C 112,90 104,130 106,168 C 104,206 112,246 140,300 L 30,300 Z"
          fill={c.toe_cap} stroke={edge(c.toe_cap)} strokeWidth="1.3" />
        {/* side mudguard strips along the bite line */}
        <path d={UPPER_TOP} fill="none" stroke={c.toe_cap} strokeWidth="18" />
        {/* toe perforations */}
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, k) => (
            <circle key={`${r}-${k}`} cx={128 + k * 14 + (r % 2 ? 7 : 0)} cy={128 + r * 15} r="1.8"
              fill={shade(c.upper, -0.45)} opacity="0.7" />
          ))
        )}
        {/* heel counter */}
        <path d="M 520,60 C 508,120 508,216 520,280 L 640,280 L 640,60 Z"
          fill={c.heel} stroke={edge(c.heel)} strokeWidth="1.3" />
        {/* side stripes peeking over both edges */}
        <path d="M 250,92 C 330,98 420,108 520,108 L 520,118 C 420,120 330,112 250,104 Z" fill={c.accent} />
        <path d="M 250,246 C 330,236 420,226 520,226 L 520,214 C 420,216 330,224 250,232 Z" fill={c.accent} />
        {/* eyestays */}
        <path d="M 210,124 C 280,118 360,120 430,124 L 430,140 C 360,136 280,136 214,142 Z"
          fill={c.eyestay} stroke={edge(c.eyestay)} strokeWidth="1.2" />
        <path d="M 210,212 C 280,218 360,216 430,212 L 430,196 C 360,200 280,200 214,194 Z"
          fill={c.eyestay} stroke={edge(c.eyestay)} strokeWidth="1.2" />
      </g>
      <Texture id={id} material={material} clip={clip} x={40} y={60} w={580} h={220} />
      <g clipPath={`url(#${clip})`}>
        <path d={UPPER_TOP} fill={`url(#${id}-dome)`} />
      </g>
      <path d={UPPER_TOP} fill="none" stroke={edge(c.upper, 0.5)} strokeWidth="1.5" />

      {/* ankle opening showing insole */}
      <path d="M 452,168 C 452,138 480,124 530,124 C 574,124 590,146 590,168 C 590,190 574,212 530,212 C 480,212 452,198 452,168 Z"
        fill={c.lining} stroke={edge(c.upper, 0.45)} strokeWidth="1.4" />
      <path d="M 462,168 C 462,144 486,134 530,134 C 568,134 580,152 580,168 C 580,186 568,202 530,202 C 486,202 462,192 462,168 Z"
        fill={`url(#${id}-hole)`} />
      {/* padded collar highlight */}
      <path d="M 456,160 C 462,136 486,126 530,126 C 570,126 586,144 588,160"
        fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="3" />

      {/* tongue */}
      <path d="M 214,150 C 260,144 340,140 420,142 C 450,142 468,152 470,168 C 468,184 450,194 420,194 C 340,196 260,192 214,186 Z"
        fill={c.tongue} stroke={edge(c.tongue)} strokeWidth="1.3" />
      <rect x="436" y="158" width="22" height="20" rx="3" fill={c.heel} />

      {/* eyelets + criss-cross laces */}
      <g id="region-laces">
        {laceY.map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={132} r="4.2" fill={shade(c.eyestay, -0.3)} />
            <circle cx={x} cy={204} r="4.2" fill={shade(c.eyestay, -0.3)} />
          </g>
        ))}
        {laceY.slice(0, -1).map((x, i) => {
          const nx = laceY[i + 1]
          return (
            <g key={i}>
              {[[x, 132, nx, 204], [x, 204, nx, 132]].map(([x1, y1, x2, y2], k) => (
                <g key={k}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={edge(c.laces, 0.45)} strokeWidth="8" strokeLinecap="round" />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.laces} strokeWidth="6" strokeLinecap="round" />
                </g>
              ))}
            </g>
          )
        })}
        {[236].map(x => (
          <g key={x}>
            <line x1={x} y1={132} x2={x} y2={204} stroke={edge(c.laces, 0.45)} strokeWidth="8" strokeLinecap="round" />
            <line x1={x} y1={132} x2={x} y2={204} stroke={c.laces} strokeWidth="6" strokeLinecap="round" />
          </g>
        ))}
        {/* bow at the top eyelets */}
        {['M 386,168 C 360,130 340,140 350,156 C 358,168 374,170 386,168',
          'M 386,168 C 360,206 340,196 350,180 C 358,168 374,166 386,168',
          'M 386,168 C 410,190 420,214 412,240',
          'M 386,168 C 414,160 434,150 446,124'].map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke={edge(c.laces, 0.45)} strokeWidth="7" strokeLinecap="round" />
            <path d={d} fill="none" stroke={c.laces} strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
        <circle cx="386" cy="168" r="6" fill={c.laces} stroke={edge(c.laces, 0.45)} strokeWidth="1" />
      </g>
    </>
  )
}

export function Shoe({ colors, material, view }: { colors: PartColors; material: string; view: string }) {
  const id = useSvgId('shoe')
  return (
    <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      role="img" aria-label={`Sneaker ${view} view`}>
      {view === 'top'
        ? <ShoeTop c={colors} material={material} id={id} />
        : (
          <g transform={view === 'right' ? 'translate(640 0) scale(-1 1)' : undefined}>
            <ShoeSide c={colors} material={material} id={id} />
          </g>
        )}
    </svg>
  )
}

import React, { useId } from 'react'

/** Mix a hex color toward black (amt < 0) or white (amt > 0). amt in [-1, 1]. */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  let r = (n >> 16) & 255
  let g = (n >> 8) & 255
  let b = n & 255
  const t = amt < 0 ? 0 : 255
  const p = Math.abs(amt)
  r = Math.round((t - r) * p + r)
  g = Math.round((t - g) * p + g)
  b = Math.round((t - b) * p + b)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

export function luminance(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16)
  return (((n >> 16) & 255) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 255000
}

/** Seam / outline color that stays visible on both light and dark fills. */
export function edge(hex: string, strength = 0.35): string {
  return luminance(hex) < 0.18 ? shade(hex, strength * 0.9) : shade(hex, -strength)
}

/** Stitch color: light thread on dark fabric, dark thread on light fabric. */
export function stitch(hex: string): string {
  return luminance(hex) < 0.45 ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.28)'
}

/** SVG-safe unique id prefix (React's useId contains colons). */
export function useSvgId(prefix: string): string {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, '')}`
}

interface TextureProps {
  id: string
  material: string
  clip: string
  x?: number
  y?: number
  w: number
  h: number
  /** rotate the weave, e.g. to follow a pant leg */
  angle?: number
  strength?: number
}

/**
 * Neutral-gray texture overlay blended onto the colored panels below it.
 * Uses the `overlay` blend so it works on white, black and everything between.
 */
export function Texture({ id, material, clip, x = 0, y = 0, w, h, angle = 0, strength = 1 }: TextureProps) {
  const pid = `${id}-${material}`
  const blend: React.CSSProperties = { mixBlendMode: 'overlay' }
  const rect = (fill: string, opacity: number, filter?: string) => (
    <g clipPath={`url(#${clip})`} style={blend} pointerEvents="none">
      <rect x={x} y={y} width={w} height={h} fill={fill} opacity={opacity * strength} filter={filter} />
    </g>
  )
  const noise = (freq: string, octaves: number, contrast = 1.6) => (
    <filter id={`${pid}-n`} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={octaves} seed="7" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="linear" slope={contrast} intercept={(1 - contrast) / 2} />
        <feFuncG type="linear" slope={contrast} intercept={(1 - contrast) / 2} />
        <feFuncB type="linear" slope={contrast} intercept={(1 - contrast) / 2} />
      </feComponentTransfer>
    </filter>
  )
  const pt = (size: number, children: React.ReactNode, sizeY = size) => (
    <pattern id={`${pid}-p`} width={size} height={sizeY} patternUnits="userSpaceOnUse"
      patternTransform={angle ? `rotate(${angle})` : undefined}>
      {children}
    </pattern>
  )

  switch (material) {
    case 'leather':
      return (<>
        <defs>{noise('0.55', 3, 1.2)}</defs>
        {rect('#808080', 0.35, `url(#${pid}-n)`)}
      </>)
    case 'suede':
      return (<>
        <defs>{noise('1.4', 2, 2.2)}</defs>
        {rect('#808080', 0.55, `url(#${pid}-n)`)}
      </>)
    case 'wool':
    case 'flannel':
      return (<>
        <defs>{noise('0.9 0.6', 3, 2)}</defs>
        {rect('#808080', 0.5, `url(#${pid}-n)`)}
      </>)
    case 'linen':
      return (<>
        <defs>{noise('0.015 0.9', 2, 2.4)}</defs>
        {rect('#808080', 0.55, `url(#${pid}-n)`)}
      </>)
    case 'flyknit':
      return (<>
        <defs>{pt(6, <>
          <rect width="6" height="5" fill="#808080" />
          <path d="M0,1 L1.5,3.5 L3,1 L4.5,3.5 L6,1" fill="none" stroke="#fff" strokeWidth="1.1" />
          <path d="M0,4 L1.5,1.5 L3,4" fill="none" stroke="#000" strokeWidth="0.6" opacity="0.6" />
        </>, 5)}</defs>
        {rect(`url(#${pid}-p)`, 0.55)}
      </>)
    case 'mesh':
      return (<>
        <defs>{pt(7, <>
          <rect width="7" height="7" fill="#9a9a9a" />
          <circle cx="3.5" cy="3.5" r="2" fill="#000" />
          <circle cx="0" cy="0" r="1" fill="#000" /><circle cx="7" cy="0" r="1" fill="#000" />
          <circle cx="0" cy="7" r="1" fill="#000" /><circle cx="7" cy="7" r="1" fill="#000" />
        </>)}</defs>
        {rect(`url(#${pid}-p)`, 0.6)}
      </>)
    case 'canvas':
    case 'oxford':
      return (<>
        <defs>{pt(4, <>
          <rect width="4" height="4" fill="#808080" />
          <rect width="2" height="2" fill="#a8a8a8" /><rect x="2" y="2" width="2" height="2" fill="#a8a8a8" />
          <rect x="2" width="2" height="2" fill="#5c5c5c" /><rect y="2" width="2" height="2" fill="#5c5c5c" />
        </>)}</defs>
        {rect(`url(#${pid}-p)`, material === 'canvas' ? 0.6 : 0.4)}
      </>)
    case 'poplin':
      return (<>
        <defs>{pt(3, <>
          <rect width="3" height="3" fill="#808080" />
          <line x1="0" y1="1.5" x2="3" y2="1.5" stroke="#a0a0a0" strokeWidth="0.8" />
        </>)}</defs>
        {rect(`url(#${pid}-p)`, 0.35)}
      </>)
    case 'denim':
    case 'twill':
      return (<>
        <defs>
          {pt(5, <>
            <rect width="5" height="5" fill="#808080" />
            <path d="M-1,6 L6,-1 M-1,1 L1,-1 M4,6 L6,4" stroke={material === 'denim' ? '#d8d8d8' : '#a8a8a8'} strokeWidth="1.4" />
          </>)}
          {noise('0.02 0.4', 2, 1.8)}
        </defs>
        {rect(`url(#${pid}-p)`, material === 'denim' ? 0.75 : 0.5)}
        {material === 'denim' && rect('#808080', 0.35, `url(#${pid}-n)`)}
      </>)
    case 'corduroy':
      return (<>
        <defs>{pt(6, <>
          <rect width="6" height="6" fill="#606060" />
          <rect x="0.8" width="4.4" height="6" rx="2" fill="#b0b0b0" />
        </>)}</defs>
        {rect(`url(#${pid}-p)`, 0.7)}
      </>)
    default:
      return null
  }
}

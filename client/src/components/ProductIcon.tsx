import React from 'react'
import { ProductType } from '../types'

/** Minimal monoline icons — replace emoji for a refined look. */
const PATHS: Record<ProductType, React.ReactNode> = {
  shoe: (
    <>
      <path d="M3 23.5c0-3 .8-5.5 3-6.5 3-1.3 6-1.6 8.5-3.5l4-4.5c1.2 1.6 3 2.6 5 2.6 1.4 0 2.6-.4 3.6-1.2.9 2.8 1.5 6.8 1.5 10.6v2.5H3z" />
      <path d="M3 25.5h26.6v2.2c0 .8-.6 1.3-1.3 1.3H5.4C4 29 3 28 3 26.6v-1.1z" />
      <path d="M14 15l1.6 1.4M16.4 12.6l1.6 1.4M18.8 10.4l1.4 1.4" />
    </>
  ),
  shirt: (
    <>
      <path d="M12 4.5L5 8l-2.5 8 4 1.3L8 13v15.5h16V13l1.5 4.3 4-1.3L27 8l-7-3.5c-.8 1.8-2.2 2.8-4 2.8s-3.2-1-4-2.8z" />
      <path d="M12 4.5l4 5 4-5M16 9.5v19" />
      <circle cx="16" cy="13" r=".5" /><circle cx="16" cy="17" r=".5" /><circle cx="16" cy="21" r=".5" />
    </>
  ),
  cap: (
    <>
      <path d="M5 20c0-7.2 4.6-12.5 11-12.5S27 12.8 27 20" />
      <path d="M5 20c3.5 1.2 7.2 1.8 11 1.8s7.5-.6 11-1.8" />
      <path d="M11.5 21.4c-3.8.3-7.4 1.4-9.5 3.3 3.6 1.4 9.4 1.6 14.5.4" />
      <path d="M16 7.5v13M11 8.6c-1.2 3.3-1.6 7.6-1 12.4M21 8.6c1.2 3.3 1.6 7.6 1 12.4" />
      <path d="M14.6 6.4h2.8" />
    </>
  ),
  pants: (
    <>
      <path d="M8 3.5h16l.2 3H7.8z" />
      <path d="M7.8 6.5L6 29h6.8L16 13l3.2 16H26L24.2 6.5" />
      <path d="M16 6.5V13M9.5 6.5c0 2.6-.9 4.4-2.6 5.4M22.5 6.5c0 2.6.9 4.4 2.6 5.4" />
    </>
  ),
}

export function ProductIcon({ type }: { type: ProductType }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[type]}
    </svg>
  )
}

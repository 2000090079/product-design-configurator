import { PartColors, ProductDef, ProductType } from '../types'

export const PRODUCTS: Record<ProductType, ProductDef> = {
  shoe: {
    type: 'shoe',
    label: 'Footwear',
    emoji: '👟',
    noun: 'Custom Sneaker',
    parts: [
      { id: 'upper',   label: 'Upper',      default: '#f4f4f2' },
      { id: 'toe_cap', label: 'Mudguard',   default: '#f4f4f2' },
      { id: 'eyestay', label: 'Eyestay',    default: '#f4f4f2' },
      { id: 'heel',    label: 'Heel',       default: '#1c1c1e' },
      { id: 'accent',  label: 'Side Stripe', default: '#c9a961' },
      { id: 'tongue',  label: 'Tongue',     default: '#f4f4f2' },
      { id: 'laces',   label: 'Laces',      default: '#ffffff' },
      { id: 'lining',  label: 'Lining',     default: '#ede4d3' },
      { id: 'sole',    label: 'Midsole',    default: '#ffffff' },
      { id: 'outsole', label: 'Outsole',    default: '#c68a4e' },
    ],
    views: [
      { id: 'left',  label: 'Left Side' },
      { id: 'top',   label: 'Top' },
      { id: 'right', label: 'Right Side' },
    ],
    materials: [
      { id: 'leather', name: 'Full-Grain Leather', description: 'Premium durability, structured feel' },
      { id: 'flyknit', name: 'Flyknit', description: 'Lightweight woven upper, precision fit' },
      { id: 'mesh',    name: 'Engineered Mesh', description: 'Maximum breathability, minimal weight' },
      { id: 'canvas',  name: 'Canvas', description: 'Classic look, everyday comfort' },
      { id: 'suede',   name: 'Suede', description: 'Soft napped finish, rich color depth' },
    ],
  },
  shirt: {
    type: 'shirt',
    label: 'Top',
    emoji: '👕',
    noun: 'Custom Shirt',
    parts: [
      { id: 'body',    label: 'Body',    default: '#dbe6f3' },
      { id: 'sleeves', label: 'Sleeves', default: '#dbe6f3' },
      { id: 'collar',  label: 'Collar',  default: '#ffffff' },
      { id: 'cuffs',   label: 'Cuffs',   default: '#ffffff' },
      { id: 'pocket',  label: 'Pocket',  default: '#dbe6f3' },
      { id: 'buttons', label: 'Buttons', default: '#ede4d3' },
    ],
    views: [
      { id: 'front', label: 'Front' },
      { id: 'back',  label: 'Back' },
    ],
    materials: [
      { id: 'oxford', name: 'Oxford Cotton', description: 'Basket weave, crisp and breathable' },
      { id: 'linen',  name: 'Linen', description: 'Slubbed texture, cool in the heat' },
      { id: 'denim',  name: 'Chambray Denim', description: 'Light twill with a lived-in look' },
      { id: 'poplin', name: 'Poplin', description: 'Smooth, fine and lightly lustrous' },
      { id: 'flannel', name: 'Flannel', description: 'Brushed, soft and warm' },
    ],
  },
  cap: {
    type: 'cap',
    label: 'Cap',
    emoji: '🧢',
    noun: 'Custom Cap',
    parts: [
      { id: 'front',   label: 'Front Panels', default: '#1f2a44' },
      { id: 'crown',   label: 'Side & Back',  default: '#1f2a44' },
      { id: 'brim',    label: 'Brim',         default: '#1f2a44' },
      { id: 'under',   label: 'Under Brim',   default: '#2e4a3a' },
      { id: 'button',  label: 'Top Button',   default: '#1f2a44' },
      { id: 'eyelets', label: 'Eyelets',      default: '#ede4d3' },
      { id: 'logo',    label: 'Logo',         default: '#c9a961' },
    ],
    views: [
      { id: 'side',  label: 'Side' },
      { id: 'front', label: 'Front' },
    ],
    materials: [
      { id: 'twill',     name: 'Cotton Twill', description: 'Structured, classic six-panel feel' },
      { id: 'wool',      name: 'Wool Blend', description: 'Heathered, warm, premium drape' },
      { id: 'mesh',      name: 'Trucker Mesh', description: 'Open-mesh panels for airflow' },
      { id: 'corduroy',  name: 'Corduroy', description: 'Raised wales, vintage texture' },
    ],
  },
  pants: {
    type: 'pants',
    label: 'Bottoms',
    emoji: '👖',
    noun: 'Custom Pants',
    parts: [
      { id: 'legs',      label: 'Legs',      default: '#c8b48e' },
      { id: 'waistband', label: 'Waistband', default: '#c8b48e' },
      { id: 'pockets',   label: 'Pockets',   default: '#d8c3a0' },
      { id: 'stitching', label: 'Stitching', default: '#7b4a2a' },
      { id: 'button',    label: 'Button',    default: '#4a3022' },
    ],
    views: [
      { id: 'front', label: 'Front' },
      { id: 'back',  label: 'Back' },
    ],
    materials: [
      { id: 'twill',    name: 'Chino Twill', description: 'Smart-casual cotton twill' },
      { id: 'denim',    name: 'Raw Denim', description: 'Rigid indigo twill that fades with wear' },
      { id: 'corduroy', name: 'Corduroy', description: 'Soft wales with depth' },
      { id: 'linen',    name: 'Linen', description: 'Light and breathable' },
    ],
  },
}

export const PRODUCT_TYPES = (Object.keys(PRODUCTS) as ProductType[]).map(t => ({
  value: t,
  label: PRODUCTS[t].label,
  emoji: PRODUCTS[t].emoji,
}))

export function defaultColors(type: ProductType): PartColors {
  const out: PartColors = {}
  PRODUCTS[type].parts.forEach(p => { out[p.id] = p.default })
  return out
}

/** Curated luxury palette shown for every part. Any other shade is available via the picker. */
export const PALETTE = [
  '#ffffff', '#f4f4f2', '#ede4d3', '#d8c3a0', '#c8b48e', '#b98a55', '#c68a4e',
  '#7b4a2a', '#4a3022', '#1c1c1e', '#3d3d40', '#8d8f94', '#dbe6f3', '#1f2a44',
  '#2e4a3a', '#6b7255', '#6e1f2b', '#a8323a', '#e7c9c1', '#c9a961', '#e6d3a3',
]

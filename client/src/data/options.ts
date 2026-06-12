import { ColorOption, MaterialOption, ProductType } from '../types'

export const PRODUCT_TYPES: { value: ProductType; label: string; emoji: string }[] = [
  { value: 'shoe', label: 'Footwear', emoji: '👟' },
  { value: 'shirt', label: 'Top', emoji: '👕' },
  { value: 'pants', label: 'Bottoms', emoji: '👖' },
]

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'chalk-white', name: 'Chalk White', hex: '#F5F5F5' },
  { id: 'midnight', name: 'Midnight', hex: '#1A1A2E' },
  { id: 'velocity-red', name: 'Velocity Red', hex: '#D62828' },
  { id: 'court-blue', name: 'Court Blue', hex: '#1E6FBF' },
  { id: 'turf-green', name: 'Turf Green', hex: '#2D6A4F' },
  { id: 'solar-yellow', name: 'Solar Yellow', hex: '#F9C74F' },
  { id: 'carbon-gray', name: 'Carbon Gray', hex: '#6B7280' },
  { id: 'dusty-rose', name: 'Dusty Rose', hex: '#C9A0A0' },
]

export const MATERIAL_OPTIONS: MaterialOption[] = [
  { id: 'flyknit', name: 'Flyknit', description: 'Lightweight woven upper, precision fit' },
  { id: 'leather', name: 'Full-Grain Leather', description: 'Premium durability, structured feel' },
  { id: 'mesh', name: 'Engineered Mesh', description: 'Maximum breathability, minimal weight' },
  { id: 'canvas', name: 'Canvas', description: 'Classic look, everyday comfort' },
  { id: 'recycled', name: 'Recycled Poly', description: 'Sustainable, soft hand-feel' },
]

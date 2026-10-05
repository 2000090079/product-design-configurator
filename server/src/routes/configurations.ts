import { Router, Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { Configuration, PRODUCT_TYPES } from '../models/Configuration'

const HEX = /^#[0-9a-fA-F]{6}$/
const PART_ID = /^[a-z_]{1,20}$/

/** Keep only well-formed { partId: '#rrggbb' } entries (max 20). */
function sanitizeColors(input: unknown): Record<string, string> {
  if (!input || typeof input !== 'object') return {}
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(input as Record<string, unknown>).slice(0, 20)) {
    if (PART_ID.test(k) && typeof v === 'string' && HEX.test(v)) out[k] = v.toLowerCase()
  }
  return out
}

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { productType, materialId, name, colors } = req.body
    if (!productType || !materialId || !name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    if (!PRODUCT_TYPES.includes(productType)) {
      return res.status(400).json({ error: 'Unknown product type' })
    }
    const shareId = nanoid(10)
    const config = await Configuration.create({
      productType,
      materialId: String(materialId),
      name: String(name).slice(0, 60),
      colors: sanitizeColors(colors),
      shareId,
    })
    return res.status(201).json({ shareId: config.shareId, _id: config._id })
  } catch (err) {
    console.error('POST /configurations:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/share/:shareId', async (req: Request, res: Response) => {
  try {
    const config = await Configuration.findOne({ shareId: req.params.shareId }).lean()
    if (!config) return res.status(404).json({ error: 'Not found' })
    return res.json(config)
  } catch (err) {
    console.error('GET /configurations/share:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const config = await Configuration.findById(req.params.id).lean()
    if (!config) return res.status(404).json({ error: 'Not found' })
    return res.json(config)
  } catch {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

export default router

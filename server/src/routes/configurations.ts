import { Router, Request, Response } from 'express'
import { nanoid } from 'nanoid'
import { Configuration } from '../models/Configuration'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { productType, colorId, materialId, name } = req.body
    if (!productType || !colorId || !materialId || !name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const shareId = nanoid(10)
    const config = await Configuration.create({ productType, colorId, materialId, name, shareId })
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

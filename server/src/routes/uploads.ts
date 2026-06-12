import { Router, Request, Response } from 'express'
import multer from 'multer'
import AWS from 'aws-sdk'
import path from 'path'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp']
    const ext = path.extname(file.originalname).toLowerCase()
    allowed.includes(ext) ? cb(null, true) : cb(new Error('Only image files are allowed'))
  },
})

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file provided' })

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  })

  const key = `configs/${Date.now()}-${req.file.originalname.replace(/\s/g, '_')}`

  try {
    const result = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    }).promise()

    return res.json({ url: result.Location })
  } catch (err) {
    console.error('S3 upload error:', err)
    return res.status(500).json({ error: 'Upload failed' })
  }
})

export default router

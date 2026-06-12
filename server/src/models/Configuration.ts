import mongoose, { Document, Schema } from 'mongoose'

export interface IConfiguration extends Document {
  productType: 'shoe' | 'shirt' | 'pants'
  colorId: string
  materialId: string
  name: string
  shareId: string
  imageUrl?: string
  createdAt: Date
}

const ConfigurationSchema = new Schema<IConfiguration>(
  {
    productType: { type: String, enum: ['shoe', 'shirt', 'pants'], required: true },
    colorId: { type: String, required: true },
    materialId: { type: String, required: true },
    name: { type: String, required: true, maxlength: 60 },
    shareId: { type: String, required: true, unique: true, index: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
)

export const Configuration = mongoose.model<IConfiguration>('Configuration', ConfigurationSchema)

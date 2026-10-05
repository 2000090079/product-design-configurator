import mongoose, { Document, Schema } from 'mongoose'

export const PRODUCT_TYPES = ['shoe', 'shirt', 'cap', 'pants'] as const
export type ProductType = (typeof PRODUCT_TYPES)[number]

export interface IConfiguration extends Document {
  productType: ProductType
  materialId: string
  name: string
  colors: Record<string, string>
  shareId: string
  imageUrl?: string
  createdAt: Date
}

const ConfigurationSchema = new Schema<IConfiguration>(
  {
    productType: { type: String, enum: PRODUCT_TYPES, required: true },
    materialId: { type: String, required: true },
    name: { type: String, required: true, maxlength: 60 },
    colors: { type: Schema.Types.Mixed, default: {} },
    shareId: { type: String, required: true, unique: true, index: true },
    imageUrl: { type: String },
  },
  { timestamps: true, minimize: false }
)

export const Configuration = mongoose.model<IConfiguration>('Configuration', ConfigurationSchema)

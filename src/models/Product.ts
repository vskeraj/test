import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  coverColor: { type: String },
  stock: { type: Number, default: 0 },
  rating: { type: Number },
  pages: { type: Number },
  year: { type: Number },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(_doc, ret: Record<string, any>) {
      ret.id = ret._id?.toString();
      ret.cover_color = ret.coverColor ?? null;
      delete ret._id;
      delete ret.__v;
      delete ret.coverColor;
      return ret;
    },
  },
});

export default (mongoose.models.Product as mongoose.Model<any>) || mongoose.model("Product", ProductSchema);

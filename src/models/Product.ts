import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export default (mongoose.models.Product as mongoose.Model<any>) || mongoose.model("Product", ProductSchema);

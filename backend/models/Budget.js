import mongoose from "mongoose"

const budgetSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  subtotal: Number,
  shipping: Number,
  total: Number,
  clientEmail: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Budget", budgetSchema)

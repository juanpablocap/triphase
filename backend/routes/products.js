import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

// Listar todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Crear producto
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    const saved = await newProduct.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

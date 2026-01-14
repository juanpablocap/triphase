import express from "express"
import Product from "../models/Product.js"
import { verifyToken } from "./auth.js"

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
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, category, subcategory, price } = req.body
    if (!name || !category || !subcategory || typeof price !== "number") {
      return res.status(400).json({ error: "Invalid product payload" })
    }

    const newProduct = new Product({ name, category, subcategory, price })
    const saved = await newProduct.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

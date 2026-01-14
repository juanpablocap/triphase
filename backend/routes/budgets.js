import express from "express"
import Budget from "../models/Budget.js"

const router = express.Router()

// Listar todos los presupuestos
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find()
    res.json(budgets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Crear presupuesto con numeración automática
router.post("/", async (req, res) => {
  try {
    const { products, subtotal, shipping, total } = req.body
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products array required" })
    }
    if (typeof subtotal !== "number" || typeof total !== "number") {
      return res.status(400).json({ error: "Subtotal and total must be numbers" })
    }

    const lastBudget = await Budget.findOne()
      .sort({ number: -1 })
      .limit(1)
    const number = lastBudget ? lastBudget.number + 1 : 1

    const newBudget = new Budget({ ...req.body, number })
    const saved = await newBudget.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

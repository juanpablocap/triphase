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
    const lastBudget = await Budget.findOne()
      .sort({ number: -1 })
      .limit(1)
    const number = lastBudget ? lastBudget.number + 1 : 1

    const newBudget = new Budget({ ...req.body, number })
    const saved = await newBudget.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

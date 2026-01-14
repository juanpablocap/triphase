import express from "express"
import Client from "../models/Client.js"
import { verifyToken } from "./auth.js"

const router = express.Router()

// Listar todos los clientes
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find()
    res.json(clients)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Crear cliente
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email required" })
    }

    const newClient = new Client({ name, email, phone, address })
    const saved = await newClient.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
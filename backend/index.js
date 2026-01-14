import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import productsRouter from "./routes/products.js"
import budgetsRouter from "./routes/budgets.js"
import clientsRouter from "./routes/clients.js"
import authRouter from "./routes/auth.js"
import { verifyToken } from "./routes/auth.js"

dotenv.config()
const app = express()

// ⚡ Suprimir warning de strictQuery
mongoose.set("strictQuery", true)

app.use(cors())
app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/budgets", budgetsRouter)
app.use("/api/clients", clientsRouter)
app.use("/api/auth", authRouter)

// Stats (solo admin)
app.get("/api/stats", verifyToken, async (req, res) => {
  try {
    const totalProducts = await mongoose.model("Product").countDocuments()
    const totalBudgets = await mongoose.model("Budget").countDocuments()
    const totalClients = await mongoose.model("Client").countDocuments()
    const totalRevenue = await mongoose.model("Budget").aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ])
    res.json({
      totalProducts,
      totalBudgets,
      totalClients,
      totalRevenue: totalRevenue[0]?.total || 0,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado")
    app.listen(process.env.PORT, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
    )
  })
  .catch(err => console.error(err))

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import productsRouter from "./routes/products.js"
import budgetsRouter from "./routes/budgets.js"

dotenv.config()
const app = express()

// ⚡ Suprimir warning de strictQuery
mongoose.set("strictQuery", true)

app.use(cors())
app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/budgets", budgetsRouter)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado")
    app.listen(process.env.PORT, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
    )
  })
  .catch(err => console.error(err))

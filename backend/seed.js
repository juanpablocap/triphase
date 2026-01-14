import mongoose from "mongoose"
import dotenv from "dotenv"
import Product from "./models/Product.js"

dotenv.config()

const products = [
  { name: "Panel Solar 550W", category: "Solar", subcategory: "Paneles", price: 180000 },
  { name: "Inversor Deye 10kW Trifásico", category: "Solar", subcategory: "Inversores", price: 3200000 },
  { name: "Batería Litio 5kWh", category: "Solar", subcategory: "Baterías", price: 2100000 },
  { name: "Controlador MPPT 60A", category: "Electrónica", subcategory: "Controladores", price: 450000 },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo conectado para seed")

    await Product.deleteMany({})
    const created = await Product.insertMany(products)
    console.log("Productos creados:", created.length)
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()

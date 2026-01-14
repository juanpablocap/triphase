import express from "express"
import jwt from "jsonwebtoken"

const router = express.Router()

// Hardcoded admin credentials (en producción, usar DB y bcrypt)
const ADMIN_EMAIL = "admin@triphase.com"
const ADMIN_PASSWORD = "admin123"

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, "secret_key", { expiresIn: "1h" })
    res.json({ token })
  } else {
    res.status(401).json({ error: "Invalid credentials" })
  }
})

// Middleware para verificar token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "No token" })

  try {
    const decoded = jwt.verify(token, "secret_key")
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid token" })
  }
}

export default router
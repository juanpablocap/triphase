import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [budgetNumber, setBudgetNumber] = useState(1) // contador de presupuestos
  const [clientEmail, setClientEmail] = useState("")

  const addToCart = product => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)

      if (found) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, qty: p.qty + 1 }
            : p
        )
      }

      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = id => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const increaseQty = id => {
    setCart(prev =>
      prev.map(p =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    )
  }

  const decreaseQty = id => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter(p => p.qty > 0)
    )
  }

  const createBudget = async () => {
    // Preparar payload denormalizado para backend
    const payload = {
      products: cart.map(p => ({ name: p.name, qty: p.qty, price: p.price })),
      subtotal: cart.reduce((acc, p) => acc + p.price * p.qty, 0),
      shipping: cart.length ? 50000 : 0,
      total:
        cart.reduce((acc, p) => acc + p.price * p.qty, 0) + (cart.length ? 50000 : 0),
      clientEmail,
    }

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Error creating budget")

      const saved = await res.json()
      // backend asigna `number`
      if (saved && saved.number) {
        setBudgetNumber(saved.number)
      } else {
        setBudgetNumber(prev => prev + 1)
      }

      setCart([]) // vaciar carrito después de crear presupuesto
      return saved
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        budgetNumber,
        createBudget,
        clientEmail,
        setClientEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

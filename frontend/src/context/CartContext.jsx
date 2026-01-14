import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [budgetNumber, setBudgetNumber] = useState(1) // contador de presupuestos

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

  const createBudget = () => {
    setBudgetNumber(prev => prev + 1)
    setCart([]) // vaciar carrito después de crear presupuesto
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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

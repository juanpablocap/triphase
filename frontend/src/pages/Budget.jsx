import { useCart } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Budget() {
  const { cart, addToCart, removeOne, removeItem } = useCart()
  const navigate = useNavigate()

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * p.qty,
    0
  )

  const shipping = 50000
  const total = subtotal + shipping

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h1>Presupuesto</h1>

      {cart.length === 0 && <p>No hay productos agregados</p>}

      {cart.map(p => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{p.name}</h3>
          <p>Precio unitario: ${p.price}</p>

          <div>
            <button onClick={() => removeOne(p.id)}>-</button>
            <span style={{ margin: "0 10px" }}>{p.qty}</span>
            <button onClick={() => addToCart(p)}>+</button>

            <button
              onClick={() => removeItem(p.id)}
              style={{ marginLeft: 10 }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div
          style={{
            borderTop: "2px solid #000",
            marginTop: 20,
            paddingTop: 10,
          }}
        >
          <p>Subtotal: ${subtotal}</p>
          <p>Envío: ${shipping}</p>
          <h2>Total: ${total}</h2>

          <button
            style={{ marginTop: 10 }}
            onClick={() => navigate("/crear-presupuesto")}
          >
            Crear presupuesto
          </button>
        </div>
      )}
    </div>
  )
}

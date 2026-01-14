import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const { cart } = useCart()

  const cartCount = cart.reduce((acc, p) => acc + p.qty, 0)

  return (
    <nav
      style={{
        display: "flex",
        gap: 20,
        padding: 15,
        borderBottom: "1px solid #ccc",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ fontWeight: "bold" }}>
        TRIPHASE
      </Link>

      <Link to="/products">Productos</Link>

      <Link to="/create">
        Presupuesto {cartCount > 0 && `(${cartCount})`}
      </Link>

      <Link to="/contact">Contacto</Link>

      <div style={{ marginLeft: "auto" }}>
        {isLoggedIn ? (
          <>
            <Link to="/admin" style={{ marginRight: 10 }}>Admin</Link>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

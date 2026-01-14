import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Admin() {
  const { isLoggedIn, logout, token } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [newProduct, setNewProduct] = useState({ name: "", category: "", subcategory: "", price: "" })
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", address: "" })

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
      return
    }
    fetchStats()
    fetchProducts()
    fetchClients()
  }, [isLoggedIn])

  const fetchStats = async () => {
    const res = await fetch("/api/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) {
      const data = await res.json()
      setStats(data)
    }
  }

  const fetchProducts = async () => {
    const res = await fetch("/api/products")
    if (res.ok) {
      const data = await res.json()
      setProducts(data)
    }
  }

  const fetchClients = async () => {
    const res = await fetch("/api/clients")
    if (res.ok) {
      const data = await res.json()
      setClients(data)
    }
  }

  const addProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newProduct, price: Number(newProduct.price) }),
    })
    if (res.ok) {
      setNewProduct({ name: "", category: "", subcategory: "", price: "" })
      fetchProducts()
    } else {
      alert("Error al agregar producto")
    }
  }

  const addClient = async () => {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newClient),
    })
    if (res.ok) {
      setNewClient({ name: "", email: "", phone: "", address: "" })
      fetchClients()
    } else {
      alert("Error al agregar cliente")
    }
  }

  if (!isLoggedIn) return null

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel de Admin</h1>
      <button onClick={logout}>Logout</button>

      <h2>Estadísticas</h2>
      <p>Total Productos: {stats.totalProducts}</p>
      <p>Total Presupuestos: {stats.totalBudgets}</p>
      <p>Total Clientes: {stats.totalClients}</p>
      <p>Ingresos Totales: ${stats.totalRevenue}</p>

      <h2>Agregar Producto</h2>
      <input placeholder="Nombre" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input placeholder="Categoría" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
      <input placeholder="Subcategoría" value={newProduct.subcategory} onChange={e => setNewProduct({ ...newProduct, subcategory: e.target.value })} />
      <input placeholder="Precio" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
      <button onClick={addProduct}>Agregar Producto</button>

      <h2>Productos ({products.length})</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} - ${p.price}</li>
        ))}
      </ul>

      <h2>Agregar Cliente</h2>
      <input placeholder="Nombre" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} />
      <input placeholder="Email" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} />
      <input placeholder="Teléfono" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} />
      <input placeholder="Dirección" value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })} />
      <button onClick={addClient}>Agregar Cliente</button>

      <h2>Clientes ({clients.length})</h2>
      <ul>
        {clients.map(c => (
          <li key={c._id}>{c.name} - {c.email}</li>
        ))}
      </ul>
    </div>
  )
}
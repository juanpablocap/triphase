import { products as localProducts } from "../data/products"
import { useCart } from "../context/CartContext"
import { useState, useEffect } from "react"

export default function Products() {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const [products, setProducts] = useState(localProducts)

  useEffect(() => {
    let mounted = true
    fetch("/api/products")
      .then(r => r.json())
      .then(data => {
        if (mounted && Array.isArray(data) && data.length) {
          // map backend _id to id for compatibility
          setProducts(
            data.map(p => ({
              id: p._id || p.id,
              name: p.name,
              category: p.category,
              subcategory: p.subcategory,
              price: p.price,
            }))
          )
        }
      })
      .catch(() => {
        // fallback a datos locales ya cargados
      })

    return () => (mounted = false)
  }, [])

  // obtener categorías únicas
  const categories = ["Todos", ...new Set(products.map(p => p.category))]

  // filtrar productos por categoría
  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter(p => p.category === selectedCategory)

  // agrupar por subcategoría
  const groupBySubcategory = filteredProducts.reduce((acc, p) => {
    if (!acc[p.subcategory]) acc[p.subcategory] = []
    acc[p.subcategory].push(p)
    return acc
  }, {})

  return (
    <div style={{ padding: 20 }}>
      <h1>Productos</h1>

      {/* Filtrar por categoría */}
      <div style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              marginRight: 10,
              fontWeight:
                selectedCategory === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mostrar productos agrupados por subcategoría */}
      {Object.entries(groupBySubcategory).map(
        ([subcat, items]) => (
          <div key={subcat} style={{ marginBottom: 20 }}>
            <h2>{subcat}</h2>
            {items.map(p => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ccc",
                  padding: 10,
                  marginBottom: 10,
                }}
              >
                <h3>{p.name}</h3>
                <p>${p.price}</p>
                <button onClick={() => addToCart(p)}>
                  Agregar al presupuesto
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

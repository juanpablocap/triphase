import { useCart } from "../context/CartContext"
import html2pdf from "html2pdf.js"

export default function CreateBudget() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    budgetNumber,
    createBudget,
  } = useCart()

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * p.qty,
    0
  )
  const shipping = cart.length ? 50000 : 0
  const total = subtotal + shipping

  const generatePDF = () => {
    const element = document.getElementById("budget-pdf")
    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `Presupuesto-${budgetNumber}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4" },
      })
      .save()
  }

  const sendWhatsApp = () => {
    const msg = `Hola! Te envío el presupuesto N° ${budgetNumber} de Triphase Ingeniería.`
    window.open(
      `https://wa.me/?text=${encodeURIComponent(msg)}`,
      "_blank"
    )
  }

  const sendEmail = () => {
    const subject = `Presupuesto N° ${budgetNumber} - Triphase Ingeniería`
    const body = `Hola,\n\nAdjunto presupuesto N° ${budgetNumber}.\n\nSaludos,\nTriphase Ingeniería`
    window.open(
      `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    )
  }

  const handleCreateBudget = () => {
    generatePDF()
    createBudget()
  }

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1>Presupuesto N° {budgetNumber}</h1>

      {cart.length === 0 && <p>No hay productos cargados</p>}

      {cart.map(p => (
        <div
          key={p.id}
          style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: 10,
            marginBottom: 10,
          }}
        >
          <strong>{p.name}</strong>
          <p>
            ${p.price} × {p.qty} = ${p.price * p.qty}
          </p>

          <button onClick={() => decreaseQty(p.id)}>−</button>
          <button onClick={() => increaseQty(p.id)}>+</button>
          <button onClick={() => removeFromCart(p.id)}>Eliminar</button>
        </div>
      ))}

      <hr />
      <p>Subtotal: ${subtotal}</p>
      <p>Envío: ${shipping}</p>
      <h2>Total: ${total}</h2>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleCreateBudget}>💾 Crear presupuesto</button>
        <button onClick={generatePDF} style={{ marginLeft: 10 }}>
          📄 Generar PDF
        </button>
        <button onClick={sendWhatsApp} style={{ marginLeft: 10 }}>
          📲 WhatsApp
        </button>
        <button onClick={sendEmail} style={{ marginLeft: 10 }}>
          ✉️ Email
        </button>
      </div>

      {/* Contenido oculto para PDF */}
      <div
        id="budget-pdf"
        style={{ padding: 20, marginTop: 40, display: "none" }}
      >
        <h1>PRESUPUESTO N° {budgetNumber}</h1>
        <h2>Triphase Ingeniería y Servicios SRL</h2>
        <p>Energía solar · Ingeniería eléctrica</p>
        <hr />
        {cart.map(p => (
          <p key={p.id}>
            {p.name} — {p.qty} × ${p.price} = ${p.price * p.qty}
          </p>
        ))}
        <hr />
        <p>Subtotal: ${subtotal}</p>
        <p>Envío: ${shipping}</p>
        <h2>Total: ${total}</h2>
      </div>
    </div>
  )
}

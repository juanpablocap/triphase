import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await login(email, password)
      navigate("/admin")
    } catch (err) {
      alert("Credenciales incorrectas")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login Admin</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  )
}


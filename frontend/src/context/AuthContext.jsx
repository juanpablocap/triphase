import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    }
  }, [token])

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      const data = await res.json()
      setToken(data.token)
      localStorage.setItem("token", data.token)
      setIsLoggedIn(true)
      return true
    } else {
      throw new Error("Login failed")
    }
  }

  const logout = () => {
    setToken("")
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import CreateBudget from "./pages/CreateBudget"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Admin from "./pages/Admin"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/create" element={<CreateBudget />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

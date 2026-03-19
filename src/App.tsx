import { Routes, Route } from "react-router";
import {AuthPage} from "@/pages/Auth";
import {ProductsPage} from "@/pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  )
}

export default App

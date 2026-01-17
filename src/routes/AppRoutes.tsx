import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/features/auth/LoginPage"
import { ProductsPage } from "@/features/products/ProductsPage"
import { ProtectedRoute } from "@/components/layout/ProtectedRoute"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected (nested) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ProductsPage />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}


import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/features/auth/AuthProvider"
import type { Product } from "./api"
import { ProductsTable } from "./components/ProductsTable"
import { ProductDetailsDialog } from "./components/ProductDetailsDialog"
import { ProductsHeader } from "./components/ProductsHeader"
import { SummaryCards } from "./components/SummaryCards"
import { useProducts } from "./hooks/useProducts"

export function ProductsPage() {
  const navigate = useNavigate()
  const { logout, token } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const { products, isLoading, error, refresh } = useProducts(token)

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  const handleRefresh = () => {
    refresh()
  }

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const filteredProducts = useMemo(() => {
    const trimmedSearch = searchQuery.trim()
    if (!trimmedSearch) return products

    const term = trimmedSearch.toLowerCase()
    return products.filter((product) => {
      const title = (product.title ?? "").toString().toLowerCase()
      const brand = (product.brand ?? "").toString().toLowerCase()
      const category = (product.category ?? "").toString().toLowerCase()
      const price = String(product.price)
      const rating = String(product.rating)
      const stock = String(product.stock)
      return (
        title.includes(term) ||
        brand.includes(term) ||
        category.includes(term) ||
        price.includes(term) ||
        rating.includes(term) ||
        stock.includes(term)
      )
    })
  }, [products, searchQuery])

  const summaryStats = useMemo(() => {
    const categories = new Set(products.map((p) => p.category))
    const avgRating =
      products.length > 0
        ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
        : 0
    return {
      total: products.length,
      categories: categories.size,
      avgRating: avgRating.toFixed(1),
    }
  }, [products])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <ProductsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRefresh={handleRefresh}
          onLogout={handleLogout}
        />

        {/* Summary Cards */}
        <SummaryCards
          isLoading={isLoading}
          total={summaryStats.total}
          categories={summaryStats.categories}
          avgRating={summaryStats.avgRating}
        />

        {/* Products Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">All products</CardTitle>
            <CardDescription>
              Browse and manage your product inventory
            </CardDescription>
          </CardHeader>
          <ProductsTable
            products={filteredProducts}
            isLoading={isLoading}
            error={error}
            onRowClick={handleRowClick}
            searchTerm=""
          />
        </Card>

        {/* Product Details Dialog */}
        <ProductDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          product={selectedProduct}
        />
      </div>
    </div>
  )
}
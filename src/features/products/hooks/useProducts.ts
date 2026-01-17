import { useState, useEffect, useCallback } from "react"
import { fetchProducts, type Product } from "../api"

interface UseProductsReturn {
  products: Product[]
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useProducts(token: string | null): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    if (!token) {
      setError("Authentication required")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchProducts(token)
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    products,
    isLoading,
    error,
    refresh: loadProducts,
  }
}

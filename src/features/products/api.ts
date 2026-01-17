import { apiFetch } from "@/lib/apiClient"

export type Product = {
  id: number
  title: string
  brand: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
}

type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function fetchProducts(token: string): Promise<Product[]> {
  const data = await apiFetch<ProductsResponse>(
    "https://dummyjson.com/products?limit=100",
    token
  )
  return data.products
}

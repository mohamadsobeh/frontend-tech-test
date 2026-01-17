import type { ColumnDef } from "@tanstack/react-table"
import type { Product } from "../../api"

export const getColumnId = (col: ColumnDef<Product>) => {
  if ("id" in col && col.id) return String(col.id)
  if ("accessorKey" in col && col.accessorKey) return String(col.accessorKey)
  return ""
}

export const placeholders: Record<string, string> = {
  title: "Filter title...",
  brand: "Filter brand...",
  category: "Filter category...",
  price: "Filter price...",
  rating: "Filter rating...",
  stock: "Filter stock...",
}

export const isCenteredColumns = ["brand", "category", "price", "rating", "stock"]

export const getIsCentered = (columnId: string): boolean => {
  return isCenteredColumns.includes(columnId)
}

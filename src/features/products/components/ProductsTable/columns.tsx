import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import type { Product } from "../../api"

export function getProductsColumns(): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate font-medium">
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "brand",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 w-full justify-center"
        >
          Brand
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("brand")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 w-full justify-center"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 w-full justify-center"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        return <div className="text-center tabular-nums">${price.toFixed(2)}</div>
      },
      filterFn: (row, columnId, filterValue) =>
        String(row.getValue(columnId)).includes(String(filterValue).trim()),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 w-full justify-center"
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const rating = parseFloat(row.getValue("rating"))
        return <div className="text-center tabular-nums">{rating.toFixed(1)}</div>
      },
      filterFn: (row, columnId, filterValue) =>
        String(row.getValue(columnId)).includes(String(filterValue).trim()),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 w-full justify-center"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center tabular-nums">{row.getValue("stock")}</div>
      ),
      filterFn: (row, columnId, filterValue) =>
        String(row.getValue(columnId)).includes(String(filterValue).trim()),
    },
  ]
}

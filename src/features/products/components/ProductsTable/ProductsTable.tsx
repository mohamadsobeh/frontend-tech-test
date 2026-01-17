import { useMemo, useState, useRef } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import type { Product } from "../../api"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { getProductsColumns } from "./columns"
import { getColumnId, placeholders, getIsCentered } from "./utils"
import { getDragHandlers, getDraggableHeaderProps } from "./dnd"

type ProductsTableProps = {
  products: Product[]
  isLoading: boolean
  error: string | null
  onRowClick: (product: Product) => void
  searchTerm: string
}

export function ProductsTable({
  products,
  isLoading,
  error,
  onRowClick,
  searchTerm,
}: ProductsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const dragOverColumnId = useRef<string | null>(null)

  const columns = useMemo(() => getProductsColumns(), [])

  // Initialize columnOrder from column IDs
  const [columnOrder, setColumnOrder] = useState<string[]>(
    () => columns.map(getColumnId).filter(Boolean)
  )

  const filteredData = useMemo(() => {
    if (!searchTerm) return products
    const term = searchTerm.toLowerCase()
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    )
  }, [products, searchTerm])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnFilters,
      columnOrder,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  if (isLoading) {
    return (
      <CardContent className="p-12">
        <div className="text-center text-muted-foreground">
          <p>Loading products...</p>
        </div>
      </CardContent>
    )
  }

  if (error) {
    return (
      <CardContent className="p-12">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try again
          </Button>
        </div>
      </CardContent>
    )
  }

  if (filteredData.length === 0) {
    return (
      <CardContent className="p-12">
        <div className="text-center text-muted-foreground">
          <p>No products found</p>
        </div>
      </CardContent>
    )
  }

  const dragHandlers = getDragHandlers({
    draggingId,
    setDraggingId,
    columnOrder,
    setColumnOrder,
    dragOverColumnIdRef: dragOverColumnId,
  })

  return (
    <CardContent>
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      {...getDraggableHeaderProps(header.column.id, draggingId, dragHandlers)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
              {/* Filter row */}
              <TableRow className="bg-muted/50">
                {table.getHeaderGroups()[0]?.headers.map((header) => {
                  const isCentered = getIsCentered(header.column.id)
                  return (
                    <TableHead key={`filter-${header.id}`} className="p-1">
                      {!header.isPlaceholder && (
                        <Input
                          placeholder={placeholders[header.column.id] || "Filter..."}
                          value={(header.column.getFilterValue() as string) ?? ""}
                          onChange={(e) => header.column.setFilterValue(e.target.value)}
                          className={`h-8 text-xs ${isCentered ? "text-center" : ""}`}
                        />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => onRowClick(row.original)}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-2 py-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center text-center sm:text-left">
          <div className="text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filteredData.length
            )}{" "}
            of {filteredData.length} products
          </div>
          {columnFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColumnFilters([])}
              className="h-8 px-2 text-xs w-full sm:w-auto"
            >
              <X className="h-3 w-3 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-10 w-10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-muted-foreground text-center min-w-[120px]">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-10 w-10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  )
}

import { Search, RotateCw, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ProductsHeaderProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
  onLogout: () => void
}

export function ProductsHeader({
  searchQuery,
  onSearchChange,
  onRefresh,
  onLogout,
}: ProductsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Manage and browse products
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 w-full sm:w-[240px]"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onRefresh} variant="outline" size="default" className="w-full sm:w-auto">
            <RotateCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={onLogout} variant="outline" size="default" className="w-full sm:w-auto">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

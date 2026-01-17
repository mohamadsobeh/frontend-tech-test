import { Package, Tags, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type SummaryCardsProps = {
  isLoading: boolean
  total: number
  categories: number
  avgRating: string
}

export function SummaryCards({
  isLoading,
  total,
  categories,
  avgRating,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-4 mb-8">
      {/* Total Products */}
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 flex-shrink-0">
              <Package className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 sm:space-y-1 text-left">
              <p className="text-[10px] sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Total products
              </p>
              <p className="text-lg sm:text-2xl font-semibold">
                {isLoading ? "--" : total}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 flex-shrink-0">
              <Tags className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 sm:space-y-1 text-left">
              <p className="text-[10px] sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Categories
              </p>
              <p className="text-lg sm:text-2xl font-semibold">
                {isLoading ? "--" : categories}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avg Rating */}
      <Card>
        <CardContent className="p-3 sm:p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
            <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 flex-shrink-0">
              <Star className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
            <div className="space-y-1 sm:space-y-1 text-left">
              <p className="text-[10px] sm:text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Avg rating
              </p>
              <p className="text-lg sm:text-2xl font-semibold">
                {isLoading ? "--" : avgRating}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

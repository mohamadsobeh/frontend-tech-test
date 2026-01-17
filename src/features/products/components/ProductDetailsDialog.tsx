import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Product } from "../api"

type ProductDetailsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

function InfoItem({
  label,
  value,
  centerValue = false,
  emphasize = false,
}: {
  label: string
  value: React.ReactNode
  centerValue?: boolean
  emphasize?: boolean
}) {
  return (
    <div className="rounded-lg border bg-muted/20 p-3 sm:p-4">
      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div
        className={[
          "mt-1 text-sm sm:text-base",
          centerValue ? "text-center tabular-nums" : "",
          emphasize ? "font-semibold" : "font-medium",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  )
}

export function ProductDetailsDialog({
  open,
  onOpenChange,
  product,
}: ProductDetailsDialogProps) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            {product.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Product details
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="mt-2 grid gap-6 sm:grid-cols-[260px_1fr]">
          {/* Image */}
          <div className="rounded-2xl border bg-muted/20 p-4 sm:p-5 flex items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-60 w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <InfoItem label="Brand" value={product.brand} centerValue />
              <InfoItem label="Category" value={product.category} centerValue />

              <InfoItem
                label="Price"
                value={`$${product.price.toFixed(2)}`}
                centerValue
                emphasize
              />
              <InfoItem
                label="Rating"
                value={product.rating.toFixed(1)}
                centerValue
              />

              <InfoItem
                label="Stock"
                value={product.stock}
                centerValue
              />
              <InfoItem
                label="ID"
                value={product.id}
                centerValue
              />
            </div>

            {/* Optional small note (keeps it clean) */}
            <p className="text-xs text-muted-foreground">
              Click outside the dialog or press ESC to close.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

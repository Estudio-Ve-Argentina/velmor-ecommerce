"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Package } from "lucide-react"
import type { TiendaNubeProduct } from "@/lib/tiendanube"

interface ProductsGridClientProps {
  products: TiendaNubeProduct[]
  limit?: number
  showFilters?: boolean
}

export function ProductsGridClient({ products, limit, showFilters = true }: ProductsGridClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")
  const [showAll, setShowAll] = useState(false)

  // Build unique category list from live products
  const categories = Array.from(
    new Set(
      products.flatMap(p => p.categories?.map(c => c.name?.es).filter(Boolean) ?? [])
    )
  ) as string[]

  const filteredProducts = selectedCategory === "todos"
    ? products
    : products.filter(p =>
        p.categories?.some(c => c.name?.es?.toLowerCase() === selectedCategory.toLowerCase())
      )

  const displayProducts = limit && !showAll
    ? filteredProducts.slice(0, limit)
    : filteredProducts

  return (
    <div>
      {/* Filters */}
      {showFilters && categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          <Button
            variant={selectedCategory === "todos" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("todos")}
            className="text-[10px] sm:text-xs tracking-wider uppercase h-8 sm:h-9 px-3 sm:px-4"
          >
            Todos
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory.toLowerCase() === cat.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="text-[10px] sm:text-xs tracking-wider uppercase h-8 sm:h-9 px-3 sm:px-4"
            >
              {cat}
            </Button>
          ))}
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Show More Button */}
      {limit && filteredProducts.length > limit && !showAll && (
        <div className="text-center mt-8 sm:mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(true)}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-wider uppercase text-xs sm:text-sm px-8 sm:px-12 h-10 sm:h-11"
          >
            Ver Toda la Coleccion
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* Empty State */}
      {displayProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No hay productos en esta categoría.</p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { products, getCategories } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface ProductsGridProps {
  limit?: number
  showFilters?: boolean
  category?: string
}

export function ProductsGrid({ limit, showFilters = true, category }: ProductsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "todos")
  const [showAll, setShowAll] = useState(false)
  const categories = getCategories()

  const filteredProducts = selectedCategory === "todos" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())

  const displayProducts = limit && !showAll 
    ? filteredProducts.slice(0, limit) 
    : filteredProducts

  return (
    <div>
      {/* Filters */}
      {showFilters && (
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
        <div className="text-center py-12 sm:py-16">
          <p className="text-muted-foreground">No hay productos en esta categoria.</p>
        </div>
      )}
    </div>
  )
}

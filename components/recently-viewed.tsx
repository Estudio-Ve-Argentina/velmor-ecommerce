"use client"

import * as React from "react"
import { getRecentlyViewedIds } from "@/hooks/use-recently-viewed"
import { type TiendaNubeProduct } from "@/lib/tiendanube"
import { ProductCard } from "@/components/product-card"

interface RecentlyViewedProps {
  currentProductId: number
  allProducts: TiendaNubeProduct[]
}

export function RecentlyViewed({ currentProductId, allProducts }: RecentlyViewedProps) {
  const [products, setProducts] = React.useState<TiendaNubeProduct[]>([])

  React.useEffect(() => {
    const ids = getRecentlyViewedIds(currentProductId)
    const recentProducts = ids
      .map(id => allProducts.find(p => p.id === id))
      .filter(Boolean) as TiendaNubeProduct[]
    setProducts(recentProducts.slice(0, 4))
  }, [currentProductId, allProducts])

  if (products.length === 0) return null

  return (
    <section className="mt-16 border-t border-border/40 pt-12">
      <h2 className="font-serif text-2xl text-foreground mb-8">Vistos recientemente</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

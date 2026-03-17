"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/products-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const defaultVariant = product.variants[0]

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: `${product.id}-${defaultVariant.id}`,
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      variant: defaultVariant.name,
      price: defaultVariant.price,
      image: product.images[0],
      quantity: 1,
    })
  }

  return (
    <article className="group relative bg-card border border-border/50 hover:border-accent/50 transition-all duration-500">
      {/* Product Image */}
      <Link href={`/productos/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <span className="bg-primary text-primary-foreground text-[10px] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1">
                {product.badge}
              </span>
            )}
            {defaultVariant.stock <= 3 && defaultVariant.stock > 0 && (
              <span className="bg-accent text-accent-foreground text-[10px] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1">
                Ultimas unidades
              </span>
            )}
            {defaultVariant.stock === 0 && (
              <span className="bg-muted text-muted-foreground text-[10px] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1">
                Agotado
              </span>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button 
                onClick={handleAddToCart}
                disabled={defaultVariant.stock === 0}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] sm:text-xs tracking-wider uppercase h-9 sm:h-10"
              >
                <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Agregar</span>
                <span className="sm:hidden">+</span>
              </Button>
              <Button 
                variant="outline"
                className="bg-background/90 border-primary/20 hover:bg-background h-9 sm:h-10 w-9 sm:w-10 p-0"
                asChild
              >
                <Link href={`/productos/${product.slug}`}>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-5">
        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-serif text-base sm:text-lg text-foreground mb-1 sm:mb-2 group-hover:text-primary/80 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
          {product.shortDescription}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-medium text-foreground">
            ${defaultVariant.price.toLocaleString('es-AR')}
          </span>
          {defaultVariant.compareAtPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              ${defaultVariant.compareAtPrice.toLocaleString('es-AR')}
            </span>
          )}
        </div>

        {/* Variants Preview */}
        {product.variants.length > 1 && (
          <div className="mt-2 sm:mt-3 flex items-center gap-1">
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              {product.variants.length} variantes
            </span>
            <div className="flex gap-1 ml-2">
              {product.variants.slice(0, 4).map((v) => (
                <div
                  key={v.id}
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-border"
                  style={{ backgroundColor: v.color || '#08083b' }}
                  title={v.name}
                />
              ))}
              {product.variants.length > 4 && (
                <span className="text-[10px] sm:text-xs text-muted-foreground">+{product.variants.length - 4}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

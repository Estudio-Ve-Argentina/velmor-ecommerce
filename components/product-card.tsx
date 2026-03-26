"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { getProductMainImage, getProductStock, isInStock, formatPrice, type TiendaNubeProduct } from "@/lib/tiendanube"

interface ProductCardProps {
  product: TiendaNubeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const defaultVariant = product.variants[0]
  const mainImage = getProductMainImage(product)
  const stock = getProductStock(product)
  const inStock = isInStock(product)
  const price = defaultVariant ? parseFloat(defaultVariant.price) : 0
  const slug = product.handle?.es || String(product.id)
  const categoryName = product.categories?.[0]?.name?.es || ""
  const variantLabel = defaultVariant?.values?.map(v => v.es).join(" / ") || ""

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!defaultVariant) return
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name.es,
      variantName: variantLabel,
      price,
      image: mainImage,
      maxStock: defaultVariant.stock,
      quantity: 1,
    })
  }

  return (
    <article className="group relative bg-card border border-border/50 hover:border-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 rounded-sm overflow-hidden">
      {/* Product Image */}
      <Link href={`/productos/${slug}`} className="block">
        <div 
          className="relative aspect-[3/4] overflow-hidden bg-secondary/30"
          style={{
            backgroundImage: "url('/products-background-blue.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name.es}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Package className="w-12 h-12" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {stock !== null && stock <= 3 && stock > 0 && (
              <span className="bg-accent text-accent-foreground text-[10px] sm:text-xs tracking-wider uppercase px-2 sm:px-3 py-1">
                Últimas unidades
              </span>
            )}
            {stock === 0 && (
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
                disabled={!inStock}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] sm:text-xs tracking-wider uppercase h-9 sm:h-10"
              >
                <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Agregar</span>
                <span className="sm:hidden">+</span>
              </Button>
              <Button
                variant="outline"
                className="bg-background/90 border-primary/20 hover:bg-background h-9 sm:h-10 w-9 sm:w-10 p-0"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.location.href = `/productos/${slug}`
                }}
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-5">
        {categoryName && (
          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {categoryName}
          </p>
        )}
        <Link href={`/productos/${slug}`}>
          <h3 className="font-serif text-base sm:text-lg text-foreground mb-1 sm:mb-2 group-hover:text-primary/80 transition-colors line-clamp-1">
            {product.name.es}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-medium text-foreground">
            {formatPrice(price)}
          </span>
        </div>

        {/* Variants count */}
        {product.variants.length > 1 && (
          <div className="mt-2 sm:mt-3 flex items-center gap-1">
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              {product.variants.length} variantes
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

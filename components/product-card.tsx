"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Eye, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { getProductMainImage, getProductStock, isInStock, formatPrice, type TiendaNubeProduct } from "@/lib/tiendanube"

interface ProductCardProps {
  product: TiendaNubeProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const defaultVariant = product.variants[0]
  const [imageIndex, setImageIndex] = useState(0)
  
  const images = product.images?.sort((a, b) => a.position - b.position).map(img => img.src).slice(0, 3) || []
  const hasMultipleImages = images.length > 1
  const currentImage = images[imageIndex] || getProductMainImage(product)
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
      image: currentImage,
      maxStock: defaultVariant.stock,
      quantity: 1,
    })
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (images.length) {
      setImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (images.length) {
      setImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <article className="group relative bg-card border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12),0_2px_8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 rounded-sm overflow-hidden">
      {/* Product Image */}
      <Link href={`/productos/${slug}`} className="block">
        <div 
          className="relative aspect-3/4 overflow-hidden bg-secondary/30"
          style={{
            backgroundImage: "url('/products-background-blue.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {currentImage ? (
            <Image
              src={currentImage}
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

          {/* Image Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-accent hover:bg-background hover:text-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-5 h-5 -ml-0.5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-accent hover:bg-background hover:text-accent hover:border-accent transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-5 h-5 ml-0.5" />
              </button>
            </>
          )}
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

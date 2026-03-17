"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ChevronLeft, Minus, Plus, Check, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/products-data"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variant: selectedVariant.name,
      price: selectedVariant.price,
      image: product.images[0],
      quantity,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 sm:mb-8">
        <Link 
          href="/#productos" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Volver a productos
        </Link>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-secondary/30 overflow-hidden">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs tracking-wider uppercase px-3 py-1">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 border-2 transition-colors ${
                    selectedImage === idx ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - Vista ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">
            {product.category}
          </p>
          
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 sm:mb-4">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl font-medium text-foreground">
              ${selectedVariant.price.toLocaleString('es-AR')}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="text-base sm:text-lg text-muted-foreground line-through">
                ${selectedVariant.compareAtPrice.toLocaleString('es-AR')}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Amor y Valor Tagline */}
          <p className="font-serif italic text-primary/70 text-sm mb-6 sm:mb-8">
            Amor y Valor en cada detalle.
          </p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-6 sm:mb-8">
              <p className="text-sm font-medium mb-3">Variante: {selectedVariant.name}</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={variant.stock === 0}
                    className={`px-3 sm:px-4 py-2 border text-xs sm:text-sm tracking-wider uppercase transition-colors ${
                      selectedVariant.id === variant.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : variant.stock === 0
                        ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6 sm:mb-8">
            <p className="text-sm font-medium mb-3">Cantidad</p>
            <div className="flex items-center border border-border w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 sm:p-3 hover:bg-secondary transition-colors"
                aria-label="Reducir cantidad"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                className="p-2 sm:p-3 hover:bg-secondary transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
              <p className="text-xs sm:text-sm text-accent mt-2">
                Solo quedan {selectedVariant.stock} unidades
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={selectedVariant.stock === 0}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs sm:text-sm h-12 sm:h-14 mb-4"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {selectedVariant.stock === 0 ? "Agotado" : "Agregar al carrito"}
          </Button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-6 border-t border-b border-border">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 sm:mb-2" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">Envio a todo el pais</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 sm:mb-2" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">Compra segura</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1 sm:mb-2" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">Cambios y devoluciones</span>
            </div>
          </div>

          {/* Details */}
          {product.details && product.details.length > 0 && (
            <div className="mt-6 sm:mt-8">
              <h3 className="font-medium mb-3 sm:mb-4">Caracteristicas</h3>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

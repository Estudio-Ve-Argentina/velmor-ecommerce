"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus, Check, Truck, Shield, RotateCcw, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice, getProductMainImage, type TiendaNubeProduct } from "@/lib/tiendanube"
import { useRecentlyViewed } from "@/hooks/use-recently-viewed"
import { ProductAccordion } from "@/components/product-accordion"

interface ProductDetailProps {
  product: TiendaNubeProduct
  trackView?: boolean
}

export function ProductDetail({ product, trackView }: ProductDetailProps) {
  useRecentlyViewed(trackView ? product.id : -1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedImage(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    setSelectedImage(api.selectedScrollSnap())

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  const price = selectedVariant ? parseFloat(selectedVariant.price) : 0
  const stock = selectedVariant?.stock ?? null
  const isOutOfStock = stock !== null && stock === 0
  const isLowStock = stock !== null && stock > 0 && stock <= 5
  const categoryName = product.categories?.[0]?.name?.es || ""
  const variantLabel = selectedVariant?.values?.map(v => v.es).join(" / ") || ""
  const mainImage = getProductMainImage(product)

  // Parse HTML for Cuidados section
  const rawDescription = product.description?.es || ""
  const cuidadosMatch = rawDescription.match(/(?:<h[1-6]>|<p[^>]*>|<strong>|<br\s*\/?>\s*)?(?:Cuidados:?)(?:<\/h[1-6]>|<\/p>|<\/strong>|<br\s*\/?>)?/i)
  
  let mainDescription = rawDescription
  let cuidadosHtml = ""
  
  if (cuidadosMatch && cuidadosMatch.index !== undefined) {
    mainDescription = rawDescription.substring(0, cuidadosMatch.index)
    // Extract everything after the exact matched tag/text
    const matchedEndIndex = cuidadosMatch.index + cuidadosMatch[0].length
    cuidadosHtml = rawDescription.substring(matchedEndIndex).trim()
    // Clean up if there are any trailing unclosed tags or starting `<p>` leftovers if needed
  }

  // Build sorted image list: main first
  const images = [...(product.images || [])].sort((a, b) => a.position - b.position).map(img => img.src)

  const handleAddToCart = () => {
    if (!selectedVariant) return
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name.es,
      variantName: variantLabel,
      price,
      image: mainImage,
      maxStock: selectedVariant.stock,
      quantity,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 sm:mb-8">
        <Link
          href="/productos"
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
          <div className="relative group/main">
            {images.length > 0 ? (
              <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
                <CarouselContent>
                  {images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <div 
                        className="relative aspect-4/5 w-full overflow-hidden bg-secondary/30 transition-all duration-500 ease-out border border-white/10"
                        style={{
                          backgroundImage: "url('/products-background-blue.png')",
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      >
                        <Image
                          src={img}
                          alt={`${product.name.es} - Imagen ${idx + 1}`}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => api?.scrollPrev()}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-accent hover:bg-background hover:border-accent transition-all opacity-0 group-hover/main:opacity-100 focus:opacity-100 z-10"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => api?.scrollNext()}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-accent/20 flex items-center justify-center text-accent hover:bg-background hover:border-accent transition-all opacity-0 group-hover/main:opacity-100 focus:opacity-100 z-10"
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    {/* Mini-map / Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-[2px] z-10">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => api?.scrollTo(idx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            selectedImage === idx ? "bg-accent w-3" : "bg-white/50 hover:bg-white"
                          }`}
                          aria-label={`Ir a imagen ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </Carousel>
            ) : (
              <div 
                className="relative aspect-square bg-secondary/30 overflow-hidden flex items-center justify-center text-muted-foreground"
                style={{
                  backgroundImage: "url('/products-background-blue.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <Package className="w-16 h-16" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border-2 transition-all duration-300 ${
                    selectedImage === idx 
                      ? "border-primary opacity-100" 
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                  style={{
                    backgroundImage: "url('/products-background-blue.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <Image
                    src={img}
                    alt={`${product.name.es} - Vista ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Desktop Accordion (Left Column) */}
          <div className="hidden lg:block pt-4">
            <ProductAccordion cuidadosHtml={cuidadosHtml} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {categoryName && (
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {categoryName}
            </p>
          )}

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground mb-3 sm:mb-4">
            {product.name.es}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl font-medium text-foreground">
              {formatPrice(price)}
            </span>
          </div>

          {/* Description */}
          {mainDescription && (
            <div
              className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: mainDescription }}
            />
          )}

          {/* Tagline */}
          <p className="font-serif italic text-primary/70 text-sm mb-6 sm:mb-8">
            Amor y Valor en cada detalle.
          </p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-6 sm:mb-8">
              <p className="text-sm font-medium mb-3">
                Variante: <span className="text-muted-foreground">{variantLabel}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const vLabel = variant.values?.map(v => v.es).join(" / ") || String(variant.id)
                  const vStock = variant.stock ?? null
                  const isUnavailable = vStock !== null && vStock === 0
                  return (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariant(variant)
                        setQuantity(1)
                      }}
                      disabled={isUnavailable}
                      className={`px-3 sm:px-4 py-2 border text-xs sm:text-sm tracking-wider uppercase transition-colors ${
                        selectedVariant?.id === variant.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : isUnavailable
                          ? "border-border text-muted-foreground cursor-not-allowed opacity-50"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {vLabel}
                    </button>
                  )
                })}
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
              <span className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium min-w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(stock ?? Infinity, quantity + 1))}
                className="p-2 sm:p-3 hover:bg-secondary transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {isLowStock && (
              <p className="text-xs sm:text-sm text-accent mt-2">
                Solo quedan {stock} unidades
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs sm:text-sm h-12 sm:h-14 mb-4"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {isOutOfStock ? "Agotado" : "Agregar al carrito"}
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

          {/* Mobile Accordion (Right Column alternative) */}
          <div className="lg:hidden">
            <ProductAccordion cuidadosHtml={cuidadosHtml} />
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from "next"
import { ProductsGrid } from "@/components/products-grid"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { PaperTexture } from "@/components/paper-texture"

export const metadata: Metadata = {
  title: "Productos | VELMOR",
  description: "Explora nuestra colección de accesorios de cuero premium.",
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen relative pt-24 pb-16 sm:pb-24">
        {/* Paper texture background */}
        <PaperTexture className="opacity-40 -z-10" />
        <div className="absolute inset-0 bg-secondary/20 -z-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
              Todos los Productos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
              Cada pieza VELMOR es una declaracion de estilo y calidad, forjada en cuero genuino.
            </p>
          </div>

          <ProductsGrid />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

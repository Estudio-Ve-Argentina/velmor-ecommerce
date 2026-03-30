import { PaperTexture } from "@/components/paper-texture";
import { ProductsGrid } from "@/components/products-grid";

export function ProductsSection() {
  return (
    <section id="productos" className="relative py-16 sm:py-16">
      {/* Paper texture background */}
      <PaperTexture className="opacity-40" />
      <div className="absolute inset-0 bg-secondary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            Coleccion
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
            Nuestros Productos
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Cada pieza VELMOR es una declaracion de estilo y calidad.
          </p>
        </div>

        {/* Products Grid - Hardcoded */}
        <ProductsGrid limit={8} />
      </div>
    </section>
  );
}

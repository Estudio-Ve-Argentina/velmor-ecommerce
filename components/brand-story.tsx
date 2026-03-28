"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function BrandStory() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  const images = [
    { src: "/bolsa-velmor-tatuaje.jpg", alt: "Bolsa Velmor" },
    { src: "/charla-cafe.jpg", alt: "Charla de café Velmor" },
    { src: "/historia-velmor.jpg", alt: "Historia Velmor" },
  ]

  return (
    <section id="historia" className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
      {/* Background Texture Fragment */}
      <div 
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/products-background-blue.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-accent font-medium tracking-[0.3em] uppercase text-sm mb-4">
              Nuestra Historia
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight">
              Amor y Valor
            </h2>
            <div className="space-y-6 text-primary-foreground/80 leading-relaxed">
              <p>
                VELMOR nace de la fusión de dos conceptos fundamentales: <em className="text-accent">Amor</em> por la artesanía tradicional y <em className="text-accent">Valor</em> por los materiales de la más alta calidad.
              </p>
              <p>
                Cada pieza que creamos es una declaración de intenciones. No seguimos tendencias efímeras; creamos clásicos atemporales que se convierten en compañeros de vida.
              </p>
              <p>
                Nuestro cuero es seleccionado a mano, tratado con técnicas ancestrales y transformado por artesanos que heredaron su oficio de generaciones anteriores.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
              <div>
                <p className="font-serif text-3xl text-accent">100%</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Cuero Genuino</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-accent">50</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Clientes Satisfechos</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-accent">2025</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Fundación</p>
              </div>
            </div>
          </div>

          {/* Image / Carousel */}
          <div className="relative">
            <div className="relative aspect-3/4 max-w-md mx-auto lg:ml-auto group">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-accent/30 z-0" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-accent/30 z-0" />
              
              <Carousel 
                className="w-full h-full relative z-10"
                plugins={[plugin.current]}
                onMouseEnter={() => plugin.current.stop()}
                onMouseLeave={() => plugin.current.reset()}
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent className="h-full">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="pl-4 h-full">
                      <div className="relative aspect-3/4 w-full h-full overflow-hidden bg-muted">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CarouselPrevious className="left-4 bg-background/50 border-none text-foreground hover:bg-background/80" />
                  <CarouselNext className="right-4 bg-background/50 border-none text-foreground hover:bg-background/80" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

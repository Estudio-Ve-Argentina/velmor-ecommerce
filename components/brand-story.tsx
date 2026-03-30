"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

const images = [
  { src: "/bolsa-velmor-tatuaje.jpg", alt: "Bolsa de compras premium Velmor con accesorios de cuero" },
  { src: "/charla-cafe.jpg", alt: "Fundadores de Velmor - Amor por la artesanía en cuero" },
  { src: "/historia-velmor.jpg", alt: "Taller artesanal de cuero Velmor" },
]

export function BrandStory() {
  const [active, setActive] = React.useState(0)
  const [animating, setAnimating] = React.useState(false)

  const advance = React.useCallback(() => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive((prev) => (prev + 1) % images.length)
      setAnimating(false)
    }, 250) // faster transition
  }, [animating])

  React.useEffect(() => {
    const t = setInterval(advance, 3500) // shorter interval too
    return () => clearInterval(t)
  }, [advance])

  const order = images.map((_, i) => {
    const rel = (i - active + images.length) % images.length
    return rel
  })

  return (
    <section id="historia" className="relative py-28 md:py-36 bg-primary text-primary-foreground overflow-hidden">
      {/* Paper texture from hero — ultra faint */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "url('/products-background-blue.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}
      />
      {/* Subtle radial vignette for depth */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 60% 50%, transparent 0%, rgba(4,4,28,0.35) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/Black%20infinity%20symbol%20with%20sharp%20points.png"
                alt="Sello de garantía VELMOR - Cuero legítimo"
                width={20} height={20}
                className="brightness-0 invert opacity-60 w-5 h-5"
              />
              <p className="text-accent font-medium tracking-[0.3em] uppercase text-sm">
                Nuestra Historia
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-2 leading-tight">
              Amor y Valor
            </h2>
            <div className="space-y-6 text-primary-foreground/80 leading-relaxed mt-6">
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

            <div className="mt-8">
              <Link
                href="/historia"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-accent text-accent hover:bg-accent hover:text-accent-foreground h-11 px-8 tracking-wider uppercase transition-colors"
              >
                Conoce nuestra historia
              </Link>
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

          {/* Stacked Photo Frame */}
          <div className="relative flex flex-col items-center select-none">
            <div
              className="relative w-[360px] md:w-[420px] lg:w-[440px]"
              style={{ height: "580px" }}
            >
              {images.map((image, i) => {
                const pos = order[i]

                // More exaggerated and irregular offsets for back cards
                const seed = (active * 7 + i * 3) % 5
                const backVariants = [
                  { dx: 28, dy: 10, r: 5.5 },
                  { dx: 22, dy: 6,  r: 3.5 },
                  { dx: 32, dy: 14, r: 6.5 },
                  { dx: 18, dy: 8,  r: 2.5 },
                  { dx: 35, dy: 4,  r: 7   },
                ]
                const seed2 = (active * 5 + i * 11 + 2) % 5
                const farVariants = [
                  { dx: -20, dy: 22, r: -5   },
                  { dx: -14, dy: 28, r: -3   },
                  { dx: -24, dy: 18, r: -6.5 },
                  { dx: -16, dy: 30, r: -3.5 },
                  { dx: -28, dy: 16, r: -7   },
                ]
                const bv = backVariants[seed]
                const fv = farVariants[seed2]

                const offsets: Record<number, React.CSSProperties> = {
                  0: {
                    transform: "translate(0px, 0px) rotate(0deg) scale(1)",
                    zIndex: 30,
                    filter: "none",
                    opacity: 1,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  },
                  1: {
                    transform: `translate(${bv.dx}px, ${bv.dy}px) rotate(${bv.r}deg) scale(0.93)`,
                    zIndex: 20,
                    filter: "blur(0.5px) brightness(0.72)",
                    opacity: 0.9,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  },
                  2: {
                    transform: `translate(${fv.dx}px, ${fv.dy}px) rotate(${fv.r}deg) scale(0.87)`,
                    zIndex: 10,
                    filter: "blur(1.5px) brightness(0.52)",
                    opacity: 0.75,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  },
                }

                return (
                  <div
                    key={image.src}
                    className="absolute inset-0 overflow-hidden rounded-sm border border-primary-foreground/20"
                    style={{
                      ...offsets[pos],
                      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={(e) => {
                      if (pos === 0) {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 25px 50px rgba(0,0,0,0.5), 0 0 28px 4px rgba(212,175,55,0.2), 0 0 60px 12px rgba(212,175,55,0.08)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pos === 0) {
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 25px 50px rgba(0,0,0,0.5)"
                      }
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 90vw, 45vw"
                      priority={pos === 0}
                    />
                  </div>
                )
              })}
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-center gap-4 mt-6 w-full">
              <button
                onClick={() => {
                  if (animating) return
                  setActive((prev) => (prev - 1 + images.length) % images.length)
                }}
                className="w-9 h-9 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:border-accent hover:text-accent hover:shadow-[0_0_12px_3px_rgba(212,175,55,0.2)] transition-all duration-300"
                aria-label="Foto anterior"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex gap-1.5 items-center">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (animating || i === active) return
                      setActive(i)
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "bg-accent w-5 h-1.5 shadow-[0_0_6px_2px_rgba(212,175,55,0.3)]"
                        : "bg-primary-foreground/30 w-1.5 h-1.5"
                    }`}
                    aria-label={`Ver foto ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={advance}
                className="w-9 h-9 rounded-full border border-primary-foreground/30 flex items-center justify-center text-primary-foreground/70 hover:border-accent hover:text-accent hover:shadow-[0_0_12px_3px_rgba(212,175,55,0.2)] transition-all duration-300"
                aria-label="Foto siguiente"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

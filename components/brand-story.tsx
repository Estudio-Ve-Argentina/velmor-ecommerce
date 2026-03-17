import Image from "next/image"

export function BrandStory() {
  return (
    <section id="historia" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6">
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
                <p className="font-serif text-3xl text-accent">+500</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Clientes Satisfechos</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-accent">2024</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Fundación</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-accent/30" />
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-accent/30" />
              
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-0vUMNcxzW2JYNNEDpgmXTX0LjmRrKD.jpg"
                alt="Amor y Valor - VELMOR"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

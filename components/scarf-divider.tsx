import Image from "next/image"

export function ScarfDivider() {
  return (
    <section className="relative py-0 overflow-visible">
      {/* Hanging bar */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/10" />
        
        {/* Scarf image container - hanging effect */}
        <div className="relative flex justify-center -mt-4">
          <div className="relative w-80 md:w-96 lg:w-[420px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mar%2012%2C%202026%2C%2012_03_11%20PM-edQcT8cKG9nrKU8cir6qrAYsLyqjLh.png"
              alt="Pañuelo de seda VELMOR"
              width={420}
              height={500}
              className="object-contain drop-shadow-2xl"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="relative text-center py-16 px-6">
        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-foreground max-w-4xl mx-auto leading-relaxed">
          El lujo verdadero habla en silencio.
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-accent" />
          <span className="text-accent tracking-[0.3em] uppercase text-sm font-medium">VELMOR</span>
          <div className="w-12 h-px bg-accent" />
        </div>
      </div>
    </section>
  )
}

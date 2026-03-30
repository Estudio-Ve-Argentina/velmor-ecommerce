import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PaperTexture } from "@/components/paper-texture"

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden min-h-[85vh]">
      {/* Paper texture background */}
      <PaperTexture />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#08083b05_1px,transparent_1px),linear-gradient(to_bottom,#08083b05_1px,transparent_1px)] bg-size-[3rem_3rem] sm:bg-size-[4rem_4rem]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        {/* Content */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          <p className="font-serif italic text-accent text-sm sm:text-base mb-3 sm:mb-4">
            Amor y Valor
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-4 sm:mb-6">
            <span className="block">El lujo</span>
            <span className="block">verdadero habla</span>
            <span className="block italic text-primary/80">en silencio.</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
            Accesorios de cuero premium para quienes valoran la calidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 h-11 sm:h-12"
              asChild
            >
              <Link href="/productos">
                Explorar Coleccion
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 h-11 sm:h-12"
              asChild
            >
              <Link href="/historia">
                Nuestra Historia
              </Link>
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-square max-w-sm sm:max-w-lg mx-auto">
            {/* Decorative frame */}
            <div className="absolute inset-2 sm:inset-4 border border-accent/30" />
            <div className="absolute inset-4 sm:inset-8 border border-primary/20" />
            
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-JIgQG2nO5K2rlPCobE1ausSr0jALhe.jpg"
              alt="Billeteras y accesorios de cuero premium VELMOR para hombre"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:left-0 bg-primary text-primary-foreground p-4 sm:p-6 max-w-[160px] sm:max-w-[200px] flex items-center gap-3">
            <div>
              <p className="font-serif text-xl sm:text-2xl italic mb-1">100%</p>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase">Cuero Genuino</p>
            </div>
            <Image 
              src="/Black%20infinity%20symbol%20with%20sharp%20points.png" 
              alt="Logo isotipo VELMOR cuero genuino" 
              width={32} height={32} 
              className="brightness-0 invert opacity-50 shrink-0 object-contain"
              style={{ width: "28px", height: "28px" }}
            />
          </div>
        </div>
      </div>


    </section>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { BrandStory } from "@/components/brand-story"
import Image from "next/image"

export const metadata = {
  title: "Nuestra Historia | VELMOR",
  description: "Conoce más sobre la historia de Velmor, Amor y Valor, y quiénes somos.",
}

export default function HistoriaPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Brand Story Section */}
        <BrandStory />

        {/* Quienes Somos Section */}
        <section className="py-24 bg-background text-foreground">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mr-auto">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 z-0" />
                  <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 z-0" />
                  
                  <Image
                    src="/fundadores.jpg"
                    alt="Fundadores de Velmor"
                    fill
                    className="object-cover relative z-10"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="text-primary/60 font-medium tracking-[0.3em] uppercase text-sm mb-4">
                  Quiénes Somos
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-tight text-primary">
                  Nuestra Visión y Compromiso
                </h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Detrás de cada detalle, cada costura y cada elección de cuero en VELMOR,
                    hay una pasión que compartimos desde el primer día. Somos dos amigos que 
                    decidieron transformar su admiración por la artesanía clásica en una 
                    marca que representara excelencia y durabilidad.
                  </p>
                  <p>
                    Comenzamos este viaje con la simple idea de crear accesorios que nosotros mismos 
                    quisiéramos usar para toda la vida. Hoy, nuestro mayor orgullo es ver 
                    cómo esas piezas acompañan a personas que valoran la misma autenticidad.
                  </p>
                  <p>
                    No se trata solo de vender accesorios; se trata de entregar un pedacito de nuestra
                    dedicación, confiando en materiales nobles y en el valor del trabajo bien hecho.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

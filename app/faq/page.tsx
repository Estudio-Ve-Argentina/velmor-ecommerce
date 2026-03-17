import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { FAQAccordion } from "@/components/faq-accordion"
import { defaultFaqs, getCategories } from "@/lib/faqs-data"
import Link from "next/link"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | VELMOR",
  description: "Encuentra respuestas a las preguntas mas frecuentes sobre productos, envios, pagos y devoluciones en VELMOR.",
}

export default function FAQPage() {
  const categories = getCategories()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
            <p className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              FAQ
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
              Preguntas Frecuentes
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Respuestas a las consultas mas comunes sobre VELMOR.
            </p>
          </div>

          {/* FAQ Content */}
          <div className="max-w-3xl mx-auto">
            {categories.map((category) => {
              const categoryFaqs = defaultFaqs.filter(f => f.category === category)
              return (
                <div key={category} className="mb-8 sm:mb-12">
                  <h2 className="font-serif text-lg sm:text-xl text-foreground mb-4 sm:mb-6 pb-2 border-b border-border">
                    {category}
                  </h2>
                  <FAQAccordion faqs={categoryFaqs} />
                </div>
              )
            })}
          </div>

          {/* Contact CTA */}
          <div className="max-w-3xl mx-auto mt-12 sm:mt-16 p-6 sm:p-8 bg-secondary/30 border border-border text-center">
            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6">
              Estamos aca para ayudarte. Contactanos y te responderemos a la brevedad.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contactanos
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

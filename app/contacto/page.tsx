"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Instagram, Send, Check } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
            <p className="text-accent font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              Contacto
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
              Hablemos
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Estamos aca para ayudarte. Escribinos y te responderemos a la brevedad.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6 sm:mb-8">
                Informacion de Contacto
              </h2>
              
              <div className="space-y-6">
                <a 
                  href="mailto:contacto@velmor.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Email</p>
                    <p className="text-muted-foreground text-sm">contacto@velmor.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+5491112345678"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Telefono</p>
                    <p className="text-muted-foreground text-sm">+54 9 11 1234-5678</p>
                  </div>
                </a>

                <a 
                  href="https://instagram.com/velmor.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Instagram</p>
                    <p className="text-muted-foreground text-sm">@velmor.in</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Ubicacion</p>
                    <p className="text-muted-foreground text-sm">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>

              {/* Amor y Valor Quote */}
              <div className="mt-10 sm:mt-12 p-6 sm:p-8 bg-secondary/30 border border-border">
                <p className="font-serif italic text-lg sm:text-xl text-primary/80 mb-2">
                  "Amor y Valor"
                </p>
                <p className="text-sm text-muted-foreground">
                  Cada consulta es atendida con la misma dedicacion que ponemos en nuestros productos.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-foreground mb-6 sm:mb-8">
                Envianos un Mensaje
              </h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                    <Check className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2">Mensaje Enviado</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Gracias por contactarnos. Te responderemos a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta">Consulta general</option>
                      <option value="pedido">Consulta sobre pedido</option>
                      <option value="cambio">Cambio o devolucion</option>
                      <option value="mayorista">Consulta mayorista</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 sm:py-3 border border-border bg-background text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-wider uppercase text-xs sm:text-sm h-11 sm:h-12"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

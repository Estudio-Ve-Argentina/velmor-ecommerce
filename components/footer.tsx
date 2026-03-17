"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, Phone, MapPin, CreditCard, Truck, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
            <div className="text-center lg:text-left">
              <h3 className="font-serif text-xl sm:text-2xl mb-2">Unite a la familia VELMOR</h3>
              <p className="text-primary-foreground/70 text-sm sm:text-base">
                Recibe novedades, ofertas exclusivas y consejos de estilo.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-accent">
                <Shield className="w-5 h-5" />
                <span>Gracias por suscribirte</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  className="flex-1 bg-transparent border border-primary-foreground/30 px-4 py-2.5 sm:py-3 text-sm focus:outline-none focus:border-accent placeholder:text-primary-foreground/50"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-4 sm:px-6 h-auto"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4 sm:mb-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sin%20ti%CC%81tulo-1-20TqiUaslWeUc0vmsd95Pj8F6JJ0DV.png"
                alt="VELMOR"
                width={140}
                height={40}
                className="brightness-0 invert"
                style={{ width: '100%', maxWidth: '120px', height: 'auto' }}
              />
            </Link>
            <p className="font-serif italic text-accent/90 text-sm mb-4">
              "Amor y Valor"
            </p>
            <p className="text-primary-foreground/70 text-xs sm:text-sm leading-relaxed mb-6">
              Elegancia que perdura. Accesorios de cuero premium.
            </p>
            
            {/* Social */}
            <div className="flex gap-3">
              <Link 
                href="https://www.instagram.com/velmor.in/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-primary-foreground/30 hover:border-accent hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link 
                href="mailto:contacto@velmor.com"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-primary-foreground/30 hover:border-accent hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-medium tracking-wider uppercase text-xs sm:text-sm mb-4 sm:mb-6">Tienda</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/#productos" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Billeteras
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Cinturones
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Accesorios
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h4 className="font-medium tracking-wider uppercase text-xs sm:text-sm mb-4 sm:mb-6">Informacion</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/#historia" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Nuestra historia
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Envios
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Cambios y devoluciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-medium tracking-wider uppercase text-xs sm:text-sm mb-4 sm:mb-6">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/terminos" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Terminos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Politica de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                  Cookies
                </Link>
              </li>
            </ul>

            {/* Contact */}
            <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
              <a href="mailto:contacto@velmor.com" className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                contacto@velmor.com
              </a>
              <a href="tel:+5491112345678" className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-xs sm:text-sm">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                +54 9 11 1234-5678
              </a>
              <p className="flex items-center gap-2 text-primary-foreground/70 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mb-8">
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Envio a todo el pais</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Compra 100% segura</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Todos los medios de pago</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {["Visa", "Mastercard", "AMEX", "Mercado Pago", "Transferencia"].map((method) => (
              <span 
                key={method}
                className="px-2 sm:px-3 py-1 border border-primary-foreground/20 text-[10px] sm:text-xs text-primary-foreground/60"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-primary-foreground/50 text-[10px] sm:text-xs">
              © {new Date().getFullYear()} VELMOR. Todos los derechos reservados.
            </p>
            <p className="font-serif italic text-accent/80 text-xs sm:text-sm">
              Amor y Valor
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

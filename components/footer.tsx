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
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
        
        {/* Newsletter Card */}
        <div className="bg-accent/5 rounded-2xl p-6 sm:p-10 border border-accent/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-serif text-xl sm:text-2xl mb-1 text-primary-foreground flex items-center gap-2 justify-center lg:justify-start">
                Unite a la familia
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </h3>
              <p className="text-primary-foreground/70 text-sm">
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
                  className="flex-1 bg-transparent border border-primary-foreground/30 px-4 py-2 sm:py-2.5 text-sm focus:outline-none focus:border-accent placeholder:text-primary-foreground/50 rounded-l-md"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none rounded-r-md px-4 sm:px-6 h-auto"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sin%20ti%CC%81tulo-1-20TqiUaslWeUc0vmsd95Pj8F6JJ0DV.png"
                alt="VELMOR"
                width={120}
                height={34}
                className="brightness-0 invert"
                style={{ width: '100%', maxWidth: '110px', height: 'auto' }}
              />
            </Link>
            <p className="font-serif italic text-accent/90 text-sm mb-3">
              "Amor y Valor"
            </p>
            <p className="text-primary-foreground/70 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Elegancia que perdura. Accesorios de cuero premium diseñados para acompañarte toda la vida.
            </p>
            
            {/* Social */}
            <div className="flex gap-3">
              <Link 
                href="https://www.instagram.com/velmor.in/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/5 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link 
                href="mailto:contacto@velmor.com"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/5 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Shop Column */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="font-medium tracking-wider uppercase text-xs mb-4 text-primary-foreground/90">Tienda</h4>
            <ul className="space-y-2">
              <li><Link href="/#productos" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Todos los productos</Link></li>
              <li><Link href="/#productos" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Billeteras</Link></li>
              <li><Link href="/#productos" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Cinturones</Link></li>
              <li><Link href="/#productos" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Accesorios</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Blog</Link></li>
            </ul>
          </div>

          {/* Info & Contact Column */}
      <div className="md:col-span-4 lg:col-span-3" id="contacto">
            <h4 className="font-medium tracking-wider uppercase text-xs mb-4 text-primary-foreground/90">Ayuda y Contacto</h4>
            <ul className="space-y-2 mb-6">
              <li><Link href="/#historia" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Nuestra historia</Link></li>
              <li><Link href="/envios" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Envíos y devoluciones</Link></li>
              <li><Link href="/faq" className="text-primary-foreground/60 hover:text-accent transition-colors text-xs">Preguntas frecuentes</Link></li>
            </ul>
            <div className="space-y-2">
              <a href="mailto:contacto@velmor.com" className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors text-xs">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                contacto@velmor.com
              </a>
              <a href="tel:+5491112345678" className="flex items-center gap-2 text-primary-foreground/60 hover:text-accent transition-colors text-xs">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +54 9 11 1234-5678
              </a>
              <p className="flex items-center gap-2 text-primary-foreground/60 text-xs">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>

        {/* Trust & Payment Badges (Compact) */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 text-primary-foreground/60">
              <Truck className="w-3.5 h-3.5" />
              <span className="text-xs">Envío a todo el país</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary-foreground/60">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-xs">Compra segura</span>
            </div>
          </div>

          {/* Compact Payment Methods */}
          <div className="flex items-center gap-3 text-primary-foreground/40">
            <CreditCard className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider">Todos los medios de pago aceptados</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Legal Links */}
      <div className="border-t border-primary-foreground/5 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-[10px] sm:text-xs">
              © {new Date().getFullYear()} VELMOR. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/terminos" className="text-primary-foreground/50 hover:text-accent transition-colors text-[10px] sm:text-xs">Términos</Link>
              <Link href="/privacidad" className="text-primary-foreground/50 hover:text-accent transition-colors text-[10px] sm:text-xs">Privacidad</Link>
              <Link href="/cookies" className="text-primary-foreground/50 hover:text-accent transition-colors text-[10px] sm:text-xs">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

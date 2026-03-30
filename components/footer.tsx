"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand Column */}
          <div className="md:col-span-5 lg:col-span-4">
            {/* Logo + "Amor y Valor" inline */}
            <Link href="/" className="inline-flex items-center gap-4 mb-4">
              <Image
                src="/Black%20infinity%20symbol%20with%20sharp%20points.png"
                alt="VELMOR Isotipo oscuro - Accesorios de Argentina"
                width={80}
                height={40}
                quality={100}
                className="brightness-0 invert object-contain shrink-0"
                style={{ width: "auto", height: "32px" }}
              />
              <span className="font-serif italic text-accent/90 text-base">
                "Amor y Valor"
              </span>
            </Link>

            <p className="text-primary-foreground/55 text-sm leading-relaxed max-w-xs mb-5">
              Elegancia que perdura. Accesorios de cuero premium diseñados para
              acompañarte toda la vida.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              <Link
                href="https://www.instagram.com/velmor.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/8 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:contacto@velmor.com"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/8 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>

            {/* Contact info */}
            <div className="space-y-2">
              <a
                href="mailto:contacto@velmor.com"
                className="flex items-center gap-2 text-primary-foreground/50 hover:text-accent transition-colors text-xs"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                contacto@velmor.com
              </a>
              <a
                href="tel:+5491112345678"
                className="flex items-center gap-2 text-primary-foreground/50 hover:text-accent transition-colors text-xs"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                +54 9 11 1234-5678
              </a>
              <p className="flex items-center gap-2 text-primary-foreground/50 text-xs">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                Buenos Aires, Argentina
              </p>
            </div>
          </div>

          {/* Shop */}
          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="font-medium tracking-widest uppercase text-[11px] mb-5 text-primary-foreground/50">
              Tienda
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/productos"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Billeteras
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Cinturones
                </Link>
              </li>
              <li>
                <Link
                  href="/productos"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Accesorios
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="md:col-span-4 lg:col-span-3" id="contacto">
            <h4 className="font-medium tracking-widest uppercase text-[11px] mb-5 text-primary-foreground/50">
              Ayuda
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/historia"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Nuestra historia
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Envíos y devoluciones
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-primary-foreground/65 hover:text-accent transition-colors text-sm"
                >
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left border-t border-primary-foreground/10">
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5 text-primary-foreground/50">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] tracking-wide">Envío a todo el país</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] tracking-wide">Todos los medios de pago</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] tracking-wide">Compra segura</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mt-2 sm:mt-0">
          <p className="text-primary-foreground/40 text-[11px] tracking-wide">
            © {new Date().getFullYear()} VELMOR. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terminos"
              className="text-primary-foreground/50 hover:text-accent transition-colors text-[11px] tracking-wide"
            >
              Términos
            </Link>
            <Link
              href="/privacidad"
              className="text-primary-foreground/50 hover:text-accent transition-colors text-[11px] tracking-wide"
            >
              Privacidad
            </Link>
            <Link
              href="/cookies"
              className="text-primary-foreground/50 hover:text-accent transition-colors text-[11px] tracking-wide"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

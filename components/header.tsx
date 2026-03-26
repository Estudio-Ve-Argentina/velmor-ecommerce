"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Instagram } from "lucide-react"
import { CartButton } from "@/components/cart-button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#08083b]">
              VELMOR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link 
              href="/#productos" 
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors"
            >
              Productos
            </Link>
            <Link 
              href="/#historia" 
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors"
            >
              Historia
            </Link>
            <Link 
              href="/blog" 
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/faq" 
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link 
              href="/#footer" 
              className="text-xs sm:text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
            <Link 
              href="https://www.instagram.com/velmor.in/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <CartButton />
          </nav>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-3 md:hidden">
            <CartButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-foreground -mr-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 flex flex-col gap-3 border-t border-border mt-3">
            <Link 
              href="/#productos" 
              className="text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link 
              href="/#historia" 
              className="text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Nuestra Historia
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/faq" 
              className="text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Preguntas Frecuentes
            </Link>
            <Link 
              href="/#contacto" 
              className="text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link 
              href="https://www.instagram.com/velmor.in/" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium tracking-wider uppercase text-foreground/80 hover:text-foreground transition-colors py-1"
            >
              <Instagram className="w-4 h-4" />
              @velmor.in
            </Link>

          </nav>
        )}
      </div>
    </header>
  )
}

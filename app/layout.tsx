import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: {
    default: 'VELMOR | Accesorios de Cuero Premium - Amor y Valor',
    template: '%s | VELMOR'
  },
  description: 'Billeteras, cinturones y accesorios de cuero genuino. Elegancia que perdura. Envios a todo Argentina.',
  keywords: ['cuero', 'billeteras', 'cinturones', 'accesorios', 'premium', 'argentina', 'lujo', 'velmor', 'hombre'],
  authors: [{ name: 'VELMOR' }],
  creator: 'VELMOR',
  metadataBase: new URL('https://velmor.com'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://velmor.com',
    siteName: 'VELMOR',
    title: 'VELMOR | Accesorios de Cuero Premium',
    description: 'Billeteras, cinturones y accesorios de cuero genuino. Elegancia que perdura.',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg',
        width: 1200,
        height: 630,
        alt: 'VELMOR - Elegancia que Perdura',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELMOR | Accesorios de Cuero Premium',
    description: 'Billeteras, cinturones y accesorios de cuero genuino. Elegancia que perdura.',
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

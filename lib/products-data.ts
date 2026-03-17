export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  size?: string;
  stock: number;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  badge?: "nuevo" | "bestseller" | "agotado" | "oferta";
  variants: ProductVariant[];
  features: string[];
  care: string[];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "billetera-clasica-navy",
    name: "Billetera Clásica",
    description: "Nuestra billetera insignia, confeccionada en cuero vacuno de primera calidad con un acabado suave al tacto. El diseño minimalista esconde una funcionalidad excepcional: 8 ranuras para tarjetas, 2 compartimentos para billetes, y un bolsillo con cierre para monedas. El grabado del monograma VELMOR en la esquina inferior es un sutil recordatorio de la excelencia artesanal.",
    shortDescription: "Cuero premium con diseño atemporal",
    price: 45000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-JIgQG2nO5K2rlPCobE1ausSr0jALhe.jpg",
    ],
    category: "Billeteras",
    badge: "bestseller",
    variants: [
      { id: "1-navy", color: "Navy", colorHex: "#08083b", stock: 12, price: 45000 },
      { id: "1-cognac", color: "Cognac", colorHex: "#8B4513", stock: 8, price: 45000 },
      { id: "1-negro", color: "Negro", colorHex: "#1a1a1a", stock: 5, price: 45000 },
    ],
    features: [
      "Cuero vacuno de primera calidad",
      "8 ranuras para tarjetas",
      "2 compartimentos para billetes",
      "Bolsillo con cierre para monedas",
      "Monograma VELMOR grabado",
      "Dimensiones: 11cm x 9cm",
    ],
    care: [
      "Limpiar con paño suave y seco",
      "Evitar exposición prolongada al sol",
      "Aplicar crema de cuero cada 3 meses",
      "Guardar en lugar fresco y seco",
    ],
  },
  {
    id: "2",
    slug: "cinturon-ejecutivo",
    name: "Cinturón Ejecutivo",
    description: "El compañero perfecto para el profesional moderno. Este cinturón de 3.5cm de ancho combina la resistencia del cuero vacuno con la elegancia de una hebilla de zamak con acabado níquel satinado. Cada cinturón es cortado a mano y sus bordes pulidos manualmente para un acabado impecable.",
    shortDescription: "Elegancia para el profesional moderno",
    price: 35000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-JIgQG2nO5K2rlPCobE1ausSr0jALhe.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg",
    ],
    category: "Cinturones",
    badge: "nuevo",
    variants: [
      { id: "2-negro-85", color: "Negro", colorHex: "#1a1a1a", size: "85cm", stock: 6, price: 35000 },
      { id: "2-negro-90", color: "Negro", colorHex: "#1a1a1a", size: "90cm", stock: 4, price: 35000 },
      { id: "2-negro-95", color: "Negro", colorHex: "#1a1a1a", size: "95cm", stock: 3, price: 35000 },
      { id: "2-marron-85", color: "Marrón", colorHex: "#5D4037", size: "85cm", stock: 5, price: 35000 },
      { id: "2-marron-90", color: "Marrón", colorHex: "#5D4037", size: "90cm", stock: 7, price: 35000 },
      { id: "2-marron-95", color: "Marrón", colorHex: "#5D4037", size: "95cm", stock: 2, price: 35000 },
    ],
    features: [
      "Cuero vacuno curtido vegetal",
      "Ancho: 3.5cm",
      "Hebilla de zamak níquel satinado",
      "Corte y pulido a mano",
      "Incluye perforaciones extra",
    ],
    care: [
      "Colgar extendido para evitar marcas",
      "Limpiar con paño húmedo",
      "No exponer a calor directo",
    ],
  },
  {
    id: "3",
    slug: "panuelo-seda-monograma",
    name: "Pañuelo de Seda Monograma",
    description: "Una pieza de colección que celebra el arte de la seda. Nuestro pañuelo presenta el icónico patrón de monogramas VELMOR sobre un fondo navy profundo, con bordes enrollados a mano. Puede usarse como accesorio de cuello, tocado, o incluso como adorno para bolsos.",
    shortDescription: "El lujo verdadero habla en silencio",
    price: 28000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mar%2012%2C%202026%2C%2012_03_11%20PM-edQcT8cKG9nrKU8cir6qrAYsLyqjLh.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-Rt1vH4Pw7a37haTifUwP0T7BkZHQe4.jpg",
    ],
    category: "Accesorios",
    variants: [
      { id: "3-navy", color: "Navy", colorHex: "#08083b", stock: 15, price: 28000 },
    ],
    features: [
      "100% seda de morera",
      "Dimensiones: 70cm x 70cm",
      "Patrón monograma exclusivo",
      "Bordes enrollados a mano",
      "Incluye caja de presentación",
    ],
    care: [
      "Lavado en seco únicamente",
      "Planchar a baja temperatura",
      "Guardar enrollado, no doblado",
    ],
  },
  {
    id: "4",
    slug: "tarjetero-minimalista",
    name: "Tarjetero Minimalista",
    description: "Para quienes prefieren llevar solo lo esencial. Este tarjetero ultra delgado tiene capacidad para 6 tarjetas y algunos billetes doblados. Su perfil de apenas 5mm lo hace perfecto para el bolsillo delantero.",
    shortDescription: "Lo esencial, nada más",
    price: 22000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg",
    ],
    category: "Billeteras",
    badge: "nuevo",
    variants: [
      { id: "4-navy", color: "Navy", colorHex: "#08083b", stock: 20, price: 22000 },
      { id: "4-cognac", color: "Cognac", colorHex: "#8B4513", stock: 15, price: 22000 },
    ],
    features: [
      "Cuero de cabra extra fino",
      "6 ranuras para tarjetas",
      "Bolsillo central para billetes",
      "Grosor: apenas 5mm",
      "Dimensiones: 10cm x 7cm",
    ],
    care: [
      "Limpiar con paño suave",
      "Evitar sobrecargar",
    ],
  },
  {
    id: "5",
    slug: "cinturon-trenzado",
    name: "Cinturón Trenzado",
    description: "Un clásico reinventado. Nuestro cinturón trenzado combina tiras de cuero vacuno en un patrón que se adapta a cualquier perforación, eliminando la necesidad de hacer agujeros. La hebilla de latón envejecido añade un toque vintage.",
    shortDescription: "Flexibilidad y estilo sin compromisos",
    price: 38000,
    compareAtPrice: 42000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-JIgQG2nO5K2rlPCobE1ausSr0jALhe.jpg",
    ],
    category: "Cinturones",
    badge: "oferta",
    variants: [
      { id: "5-cognac-uni", color: "Cognac", colorHex: "#8B4513", size: "Unitalla", stock: 10, price: 38000 },
      { id: "5-negro-uni", color: "Negro", colorHex: "#1a1a1a", size: "Unitalla", stock: 8, price: 38000 },
    ],
    features: [
      "Cuero vacuno trenzado a mano",
      "Sin perforaciones - ajuste libre",
      "Hebilla de latón envejecido",
      "Ancho: 3cm",
      "Largo: ajustable hasta 110cm",
    ],
    care: [
      "Limpiar con cepillo suave",
      "Aplicar aceite de cuero ocasionalmente",
    ],
  },
  {
    id: "6",
    slug: "porta-pasaporte",
    name: "Porta Pasaporte",
    description: "Viaja con estilo y organización. Este porta pasaporte tiene espacio para tu documento, tarjetas de embarque, y hasta 4 tarjetas adicionales. El cierre magnético oculto mantiene todo seguro.",
    shortDescription: "Tu compañero de viaje elegante",
    price: 32000,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg",
    ],
    category: "Accesorios",
    variants: [
      { id: "6-navy", color: "Navy", colorHex: "#08083b", stock: 7, price: 32000 },
      { id: "6-cognac", color: "Cognac", colorHex: "#8B4513", stock: 5, price: 32000 },
    ],
    features: [
      "Cuero vacuno texturizado",
      "Espacio para pasaporte y boarding pass",
      "4 ranuras para tarjetas",
      "Cierre magnético oculto",
      "Personalización disponible",
    ],
    care: [
      "Guardar en lugar seco",
      "Limpiar manchas inmediatamente",
    ],
  },
];

export function getCategories(): string[] {
  return [...new Set(products.map(p => p.category))];
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return products.slice(0, limit);
  
  return products
    .filter(p => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

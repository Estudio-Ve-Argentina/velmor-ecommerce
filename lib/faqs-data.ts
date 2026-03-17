export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

export const defaultFaqs: FAQ[] = [
  {
    id: "1",
    question: "¿Cuanto tiempo tarda el envio?",
    answer: "Los envios a Capital Federal y GBA demoran entre 2 a 4 dias habiles. Para el interior del pais, el tiempo estimado es de 5 a 10 dias habiles. Una vez despachado, recibiras un codigo de seguimiento por email.",
    category: "Envios",
    order: 1
  },
  {
    id: "2",
    question: "¿Cual es el costo de envio?",
    answer: "El envio es gratis en compras superiores a $50.000. Para montos menores, el costo varia segun la ubicacion: Capital Federal desde $2.500, GBA desde $3.000, e interior desde $4.500.",
    category: "Envios",
    order: 2
  },
  {
    id: "3",
    question: "¿Puedo cambiar o devolver un producto?",
    answer: "Si, aceptamos cambios y devoluciones dentro de los 10 dias habiles de recibido el producto. El mismo debe estar sin uso, con etiquetas y empaque original. Consulta nuestra politica de devoluciones para mas detalles.",
    category: "Cambios y Devoluciones",
    order: 3
  },
  {
    id: "4",
    question: "¿Como cuido mi billetera de cuero?",
    answer: "Te recomendamos limpiarla periodicamente con un pano suave y seco. Evita la exposicion prolongada al sol y la humedad. Para hidratarla, usa cremas especificas para cuero cada 2-3 meses. Guardala en un lugar fresco y seco.",
    category: "Cuidados",
    order: 4
  },
  {
    id: "5",
    question: "¿Los productos tienen garantia?",
    answer: "Todos nuestros productos cuentan con garantia de 6 meses por defectos de fabricacion. Esta garantia no cubre el desgaste normal por uso ni danos causados por mal manejo o accidentes.",
    category: "Productos",
    order: 5
  },
  {
    id: "6",
    question: "¿Que metodos de pago aceptan?",
    answer: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express), Mercado Pago, y transferencia bancaria. Todas las transacciones son 100% seguras.",
    category: "Pagos",
    order: 6
  },
  {
    id: "7",
    question: "¿Hacen envios internacionales?",
    answer: "Actualmente solo realizamos envios dentro de Argentina. Si estas en otro pais y te interesa un producto, escribinos a contacto@velmor.com para evaluar opciones.",
    category: "Envios",
    order: 7
  },
  {
    id: "8",
    question: "¿Trabajan con mayoristas?",
    answer: "Si, tenemos condiciones especiales para mayoristas y revendedores. Contactanos a contacto@velmor.com con el asunto 'Consulta Mayorista' para mas informacion.",
    category: "Ventas",
    order: 8
  },
  {
    id: "9",
    question: "¿Puedo personalizar un producto?",
    answer: "Ofrecemos grabado personalizado en algunos productos. Contactanos antes de realizar tu compra para consultar disponibilidad y costos adicionales.",
    category: "Productos",
    order: 9
  },
  {
    id: "10",
    question: "¿Donde puedo ver los productos en persona?",
    answer: "Actualmente operamos 100% online. Podes ver fotos detalladas de cada producto en nuestra tienda. Si tenes dudas sobre medidas o colores, no dudes en contactarnos.",
    category: "General",
    order: 10
  }
]

export function getCategories(): string[] {
  const cats = new Set(defaultFaqs.map(f => f.category))
  return Array.from(cats)
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "arte-del-cuero-argentino",
    title: "El Arte del Cuero Argentino",
    excerpt: "Descubre la rica tradición del trabajo en cuero que define a VELMOR y cómo seleccionamos cada pieza.",
    content: `
## Una Tradición de Siglos

Argentina tiene una relación especial con el cuero que se remonta a la época colonial. Los gauchos, esos legendarios jinetes de las pampas, fueron los primeros en elevar el trabajo del cuero a una forma de arte.

En VELMOR, honramos esta tradición mientras la llevamos al siglo XXI. Cada pieza que creamos es el resultado de generaciones de conocimiento artesanal combinado con diseño contemporáneo.

## Selección de Materiales

Trabajamos exclusivamente con cuero vacuno de primera calidad, seleccionado personalmente en curtiembres familiares que mantienen procesos tradicionales. Buscamos:

- **Flor intacta**: La capa superior del cuero debe estar perfecta
- **Curtido vegetal**: Utilizamos taninos naturales, no químicos
- **Grosor consistente**: Para garantizar durabilidad uniforme
- **Color profundo**: Que mejora con el tiempo

## El Proceso Artesanal

Cada billetera VELMOR pasa por más de 20 manos antes de llegar a las tuyas. Desde el corte inicial hasta el pulido final de los bordes, cada paso es ejecutado por artesanos con décadas de experiencia.

No usamos pegamentos industriales ni costuras mecánicas. Todo es cosido a mano con hilo encerado que resistirá años de uso diario.

## Pátina: La Belleza del Tiempo

Una de las características más hermosas del cuero genuino es su capacidad de desarrollar una pátina única con el uso. Tu billetera VELMOR se volverá más bella con los años, contando silenciosamente la historia de tu vida.
    `,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-Rt1vH4Pw7a37haTifUwP0T7BkZHQe4.jpg",
    category: "Artesanía",
    author: "Equipo VELMOR",
    date: "2026-03-10",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "guia-cuidado-cuero",
    title: "Guía Completa: Cuidado del Cuero",
    excerpt: "Consejos profesionales para mantener tus accesorios VELMOR en perfectas condiciones por años.",
    content: `
## Por Qué el Cuidado Importa

El cuero es un material vivo que responde a su entorno. Con el cuidado adecuado, tus accesorios VELMOR pueden durar décadas y mejorar con el tiempo.

## Limpieza Regular

**Frecuencia**: Una vez por semana para uso diario.

1. Usa un paño de microfibra seco para remover polvo
2. Para manchas ligeras, humedece ligeramente el paño
3. Nunca uses productos químicos o alcohol
4. Deja secar naturalmente, lejos del sol directo

## Hidratación

**Frecuencia**: Cada 3-4 meses, o cuando notes el cuero seco.

El cuero necesita hidratación para mantener su flexibilidad. Recomendamos:

- Crema de cuero incolora de calidad
- Aplicar en pequeñas cantidades
- Distribuir uniformemente con movimientos circulares
- Dejar absorber por 15 minutos
- Pulir con paño suave

## Almacenamiento

- Guarda en lugar fresco y seco
- Evita la luz solar directa prolongada
- Usa bolsas de algodón, nunca plástico
- Para cinturones: colgar extendidos
- Para billeteras: no sobrellenar

## Emergencias

**Agua**: Seca inmediatamente con paño absorbente. Deja secar naturalmente.

**Manchas de grasa**: Aplica talco, deja actuar 24 horas, cepilla suavemente.

**Arañazos**: Frota suavemente con el dedo; los aceites naturales de tu piel pueden ayudar a disimularlos.
    `,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-WuWzKg4j5QYKPJJYqfEq0u92OvZjkT.jpg",
    category: "Cuidados",
    author: "Equipo VELMOR",
    date: "2026-03-05",
    readTime: "4 min",
  },
  {
    id: "3",
    slug: "historia-velmor",
    title: "La Historia Detrás de VELMOR",
    excerpt: "Cómo nació nuestra marca y qué significa \"Elegancia que Perdura\" para nosotros.",
    content: `
## Los Comienzos

VELMOR nació de una frustración: encontrar accesorios de cuero de calidad real a un precio justo parecía imposible. O eran productos importados a precios exorbitantes, o imitaciones que no duraban.

Decidimos crear algo diferente.

## El Nombre

**VEL** viene de "velocidad" - no en el sentido de prisa, sino de la elegancia del movimiento eficiente.

**MOR** viene del latín "mores" - costumbres, valores, tradición.

Juntos representan nuestra filosofía: tradición que se mueve con los tiempos.

## Amor y Valor

Nuestro lema interno es "Amor y Valor". Amor por el oficio artesanal, por los materiales nobles, por el trabajo bien hecho. Valor para mantener estándares altos cuando sería más fácil no hacerlo.

## Elegancia que Perdura

Este tagline resume todo lo que hacemos:

- **Elegancia**: Diseño atemporal, no modas pasajeras
- **Que Perdura**: Calidad que sobrevive años de uso diario

No hacemos productos desechables. Hacemos herencias.

## El Futuro

Seguimos siendo una marca pequeña por elección. Preferimos hacer menos piezas de mayor calidad que crecer sacrificando nuestros estándares.

Cada producto VELMOR lleva una promesa: si lo cuidas, te acompañará por décadas.
    `,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-0vUMNcxzW2JYNNEDpgmXTX0LjmRrKD.jpg",
    category: "Marca",
    author: "Equipo VELMOR",
    date: "2026-02-28",
    readTime: "3 min",
  },
];

export function getCategories(): string[] {
  return [...new Set(blogPosts.map(p => p.category))];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

// Alias for compatibility
export const getPostBySlug = getBlogPostBySlug;

export function getRecentPosts(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

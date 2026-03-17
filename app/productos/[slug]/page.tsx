import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getProductBySlug, products } from "@/lib/products-data"
import { ProductDetail } from "@/components/product-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  
  if (!product) {
    return {
      title: "Producto no encontrado | VELMOR",
    }
  }

  return {
    title: `${product.name} | VELMOR`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | VELMOR`,
      description: product.shortDescription,
      images: [product.images[0]],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        <ProductDetail product={product} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

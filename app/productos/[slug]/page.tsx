import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getProductByHandle, getProductMainImage } from "@/lib/tiendanube"
import { ProductDetail } from "@/components/product-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export const revalidate = 60

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductByHandle(slug)

  if (!product) {
    return { title: "Producto no encontrado | VELMOR" }
  }

  const mainImage = getProductMainImage(product)

  return {
    title: `${product.name.es} | VELMOR`,
    description: product.description?.es?.replace(/<[^>]*>/g, "").slice(0, 160) || "",
    openGraph: {
      title: `${product.name.es} | VELMOR`,
      description: product.description?.es?.replace(/<[^>]*>/g, "").slice(0, 160) || "",
      images: mainImage ? [mainImage] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductByHandle(slug)

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

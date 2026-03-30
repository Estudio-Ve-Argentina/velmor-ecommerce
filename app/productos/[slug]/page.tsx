import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getProductByHandle,
  getProductMainImage,
  getProducts,
} from "@/lib/tiendanube";
import { ProductDetail } from "@/components/product-detail";
import { RelatedProducts } from "@/components/related-products";
import { RecentlyViewed } from "@/components/recently-viewed";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);

  if (!product) {
    return { title: "Producto no encontrado | VELMOR" };
  }

  const mainImage = getProductMainImage(product);

  return {
    title: `${product.name.es} | VELMOR`,
    description:
      product.description?.es?.replace(/<[^>]*>/g, "").slice(0, 160) || "",
    openGraph: {
      title: `${product.name.es} | VELMOR`,
      description:
        product.description?.es?.replace(/<[^>]*>/g, "").slice(0, 160) || "",
      images: mainImage ? [mainImage] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductByHandle(slug),
    getProducts({ per_page: 200, published: true }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-2 py-8">
          <ProductDetail product={product} trackView />
          <RelatedProducts current={product} allProducts={allProducts} />
          <RecentlyViewed
            currentProductId={product.id}
            allProducts={allProducts}
          />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

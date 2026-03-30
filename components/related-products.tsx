import Link from "next/link";
import { type TiendaNubeProduct } from "@/lib/tiendanube";
import { ProductCard } from "@/components/product-card";

interface RelatedProductsProps {
  current: TiendaNubeProduct;
  allProducts: TiendaNubeProduct[];
}

export function RelatedProducts({
  current,
  allProducts,
}: RelatedProductsProps) {
  const currentCategoryIds = current.categories.map((c) => c.id);

  // Same category, different product, published only
  const related = allProducts
    .filter(
      (p) =>
        p.id !== current.id &&
        p.published &&
        p.categories.some((c) => currentCategoryIds.includes(c.id)),
    )
    .slice(0, 4);

  // If not enough same-category, fill with other products
  const fillers = allProducts
    .filter(
      (p) =>
        p.id !== current.id &&
        p.published &&
        !related.find((r) => r.id === p.id),
    )
    .slice(0, 4 - related.length);

  const products = [...related, ...fillers].slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="mt-12 pt-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-foreground">
          También te puede interesar
        </h2>
        <Link
          href="/productos"
          className="text-xs tracking-wider uppercase text-muted-foreground hover:text-accent transition-colors"
        >
          Ver todo →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

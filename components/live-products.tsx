"use client";

import useSWR from "swr";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, getProductMainImage, getProductStock, isInStock, type TiendaNubeProduct } from "@/lib/tiendanube";
import { ShoppingBag, AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface LiveProductsProps {
  limit?: number;
}

export function LiveProducts({ limit = 8 }: LiveProductsProps) {
  const { data, error, isLoading } = useSWR<{ success: boolean; products: TiendaNubeProduct[] }>(
    `/api/tiendanube/products?per_page=${limit}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">Error al cargar productos</p>
        <p className="text-sm text-muted-foreground mt-1">
          Intenta recargar la página
        </p>
      </div>
    );
  }

  const products = data.products;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">No hay productos disponibles</p>
      </div>
    );
  }

  const handleAddToCart = (product: TiendaNubeProduct) => {
    const variant = product.variants[0];
    if (!variant) return;

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: product.name.es,
      variantName: variant.values.map((v) => v.es).join(" / "),
      price: parseFloat(variant.price),
      image: getProductMainImage(product),
      maxStock: variant.stock,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const mainImage = getProductMainImage(product);
        const stock = getProductStock(product);
        const inStock = isInStock(product);
        const price = product.variants[0]?.price || "0";

        return (
          <div
            key={product.id}
            className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="relative aspect-square bg-secondary overflow-hidden">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={product.name.es}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package className="w-12 h-12" />
                </div>
              )}

              {/* Stock Badge */}
              {stock !== null && (
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${
                    stock === 0
                      ? "bg-destructive/90 text-white"
                      : stock <= 3
                      ? "bg-amber-500/90 text-white"
                      : "bg-green-600/90 text-white"
                  }`}
                >
                  {stock === 0 ? "Agotado" : `${stock} en stock`}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-serif text-lg font-medium line-clamp-1 mb-1">
                {product.name.es}
              </h3>
              
              {product.brand && (
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
              )}

              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-semibold">
                  {formatPrice(price)}
                </span>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!inStock}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  {inStock ? "Agregar" : "Agotado"}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

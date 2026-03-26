import { getProducts, type TiendaNubeProduct } from "@/lib/tiendanube"
import { ProductsGridClient } from "@/components/products-grid-client"

export const revalidate = 60

interface ProductsGridProps {
  limit?: number
  showFilters?: boolean
}

export async function ProductsGrid({ limit, showFilters = true }: ProductsGridProps) {
  let products: TiendaNubeProduct[] = []

  try {
    products = await getProducts({ per_page: 50, published: true })
  } catch (error) {
    console.error("Error fetching products from Tienda Nube:", error)
  }

  return (
    <ProductsGridClient
      products={products}
      limit={limit}
      showFilters={showFilters}
    />
  )
}

import { NextRequest, NextResponse } from "next/server";
import { updateStock, getProducts } from "@/lib/tiendanube";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  return adminSession?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const products = await getProducts({ per_page: 200, published: true });
    
    const stockData = products.map(product => ({
      id: product.id,
      name: product.name.es,
      image: product.images[0]?.src || null,
      variants: product.variants.map(v => ({
        id: v.id,
        sku: v.sku,
        values: v.values.map(val => val.es).join(" / "),
        stock: v.stock,
        stock_management: v.stock_management,
        price: v.price,
      })),
    }));

    return NextResponse.json({
      success: true,
      products: stockData,
    });
  } catch (error) {
    console.error("Error fetching stock:", error);
    return NextResponse.json(
      { success: false, error: "Error al cargar inventario" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const { productId, variantId, stock } = await request.json();

    if (!productId || !variantId || stock === undefined) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos" },
        { status: 400 }
      );
    }

    const updatedVariant = await updateStock(productId, variantId, stock);

    return NextResponse.json({
      success: true,
      variant: updatedVariant,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { success: false, error: "Error al actualizar stock" },
      { status: 500 }
    );
  }
}

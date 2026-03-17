import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/tiendanube";

export const revalidate = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: "ID de producto inválido" },
        { status: 400 }
      );
    }

    const product = await getProduct(productId);

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Producto no encontrado" },
      { status: 404 }
    );
  }
}

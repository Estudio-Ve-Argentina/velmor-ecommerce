import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/tiendanube";

export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "20");
    const category_id = searchParams.get("category_id");

    const products = await getProducts({
      page,
      per_page,
      published: true,
      category_id: category_id ? parseInt(category_id) : undefined,
    });

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        per_page,
        total: products.length,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Error al cargar productos" },
      { status: 500 }
    );
  }
}

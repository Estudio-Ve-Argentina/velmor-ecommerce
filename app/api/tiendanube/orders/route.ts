import { NextRequest, NextResponse } from "next/server";
import { getOrders } from "@/lib/tiendanube";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  return adminSession?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const per_page = parseInt(searchParams.get("per_page") || "20");
    const status = searchParams.get("status") as "open" | "closed" | "cancelled" | null;

    const orders = await getOrders({
      page,
      per_page,
      status: status || undefined,
    });

    return NextResponse.json({
      success: true,
      orders,
      pagination: {
        page,
        per_page,
        total: orders.length,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Error al cargar pedidos" },
      { status: 500 }
    );
  }
}

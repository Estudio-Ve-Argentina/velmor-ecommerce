import { NextResponse } from "next/server";
import { getOrders } from "@/lib/tiendanube";

// Abandoned carts = orders open + payment pending for > 1 hour
export async function GET() {
  try {
    const orders = await getOrders({
      per_page: 50,
      status: "open",
      payment_status: "pending",
    });

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const abandoned = orders
      .filter(o => o.created_at < oneHourAgo)
      .map(o => ({
        id: o.id,
        number: o.number,
        customer: o.customer,
        total: o.total,
        currency: o.currency,
        products: o.products,
        created_at: o.created_at,
        updated_at: o.updated_at,
        // Rough time since abandonment
        minutesAgo: Math.floor((Date.now() - new Date(o.created_at).getTime()) / 60000),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ count: abandoned.length, orders: abandoned });
  } catch (e: unknown) {
    console.error("Abandoned cart fetch error:", e);
    return NextResponse.json({ count: 0, orders: [] });
  }
}

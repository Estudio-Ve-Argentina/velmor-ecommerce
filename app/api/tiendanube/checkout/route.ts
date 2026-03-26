import { NextRequest, NextResponse } from "next/server";

const STORE_URL = process.env.NEXT_PUBLIC_TIENDANUBE_STORE_URL || "https://velmor.mitiendanube.com";

/**
 * Creates a checkout session in Tienda Nube and returns the redirect URL.
 * POST /api/tiendanube/checkout
 * Body: { items: [{ variantId: number, quantity: number }] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: { variantId: number; quantity: number }[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    // Tienda Nube checkout add URL format for a single item:
    // {storeUrl}/checkout/add/{variantId}/{quantity}
    // 
    // For multiple items, Tienda Nube supports a cart param format:
    // {storeUrl}/checkout/add?cart={variantId}:{qty},{variantId}:{qty}
    // However this format varies by TN version. The most reliable approach
    // is to build a URL for the first item only, or use TN's cart API.
    //
    // We'll use the API to create a draft order / checkout if possible,
    // or fall back to the add-to-cart URL for multiple items using the
    // proper comma-separated format TN supports.

    let checkoutUrl: string;

    if (items.length === 1) {
      const { variantId, quantity } = items[0];
      checkoutUrl = `${STORE_URL}/checkout/v3/start/${variantId}/${quantity}`;
    } else {
      // Multi-item format: /checkout/v3/start/cart/variantId:qty,variantId:qty
      const cartParam = items
        .map((item) => `${item.variantId}:${item.quantity}`)
        .join(",");
      checkoutUrl = `${STORE_URL}/checkout/v3/start/cart/${cartParam}`;
    }

    return NextResponse.json({ success: true, checkoutUrl });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Error al crear el checkout" },
      { status: 500 }
    );
  }
}

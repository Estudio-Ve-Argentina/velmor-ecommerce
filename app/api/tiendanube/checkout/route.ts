import { NextRequest, NextResponse } from "next/server";

const STORE_ID = process.env.TIENDANUBE_STORE_ID;
const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN;

/**
 * Creates a draft order in Tienda Nube and returns the redirect checkout URL.
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

    if (!STORE_ID || !ACCESS_TOKEN) {
      console.error("Missing Tiendanube API credentials in environment.");
      return NextResponse.json({ error: "Configuración de API faltante" }, { status: 500 });
    }

    // Build the payload for the Draft Orders API
    const products = items.map((item) => ({
      variant_id: item.variantId,
      quantity: item.quantity,
    }));

    const draftOrderPayload = {
      contact_email: "comprador@velmor.com",
      contact_name: "Cliente",
      contact_lastname: "Invitado",
      products,
    };

    // Request against Tiendanube API
    const response = await fetch(`https://api.tiendanube.com/v1/${STORE_ID}/draft_orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "Velmor (velmor@velmor.com)",
      },
      body: JSON.stringify(draftOrderPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Tiendanube API Error:", response.status, errorText);
      return NextResponse.json(
        { error: "Error de Tiendanube al crear la orden", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // From Draft Orders response we extract the `checkout_url`
    if (data.checkout_url) {
      return NextResponse.json({ success: true, checkoutUrl: data.checkout_url });
    } else {
      console.error("No checkout_url in Tiendanube response", data);
      return NextResponse.json({ error: "Respuesta inesperada de Tiendanube" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Error al crear el checkout" },
      { status: 500 }
    );
  }
}

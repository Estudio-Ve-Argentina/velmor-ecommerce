import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// In-memory store for demo (in production, use a database)
// Data persists per server instance
const store: {
  productCosts: Record<string, number>;
  externalSales: ExternalSale[];
  campaigns: Campaign[];
  adsEntries: AdsEntry[];
  wikiNotes: WikiNote[];
} = {
  productCosts: {},
  externalSales: [],
  campaigns: [],
  adsEntries: [],
  wikiNotes: [],
};

export interface ExternalSale {
  id: string;
  date: string;
  channel: "instagram" | "whatsapp" | "showroom" | "other";
  customerName: string;
  products: { name: string; variantId?: number; quantity: number; price: number }[];
  total: number;
  notes: string;
}

export interface Campaign {
  id: string;
  title: string;
  type: "launch" | "drop" | "sale" | "campaign";
  date: string;
  status: "planned" | "active" | "done";
  description: string;
}

export interface AdsEntry {
  id: string;
  platform: "meta" | "google" | "tiktok" | "other";
  month: string; // YYYY-MM
  spend: number;
  notes: string;
}

export interface WikiNote {
  id: string;
  category: "supplier" | "workshop" | "guide" | "contact" | "other";
  title: string;
  content: string;
  updatedAt: string;
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(store);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { type, data } = body;

  switch (type) {
    case "productCost":
      store.productCosts[data.productId] = data.cost;
      break;

    case "externalSale":
      store.externalSales.unshift({
        ...data,
        id: Date.now().toString(),
        date: data.date || new Date().toISOString(),
      });
      break;

    case "campaign":
      store.campaigns.unshift({
        ...data,
        id: Date.now().toString(),
      });
      break;

    case "adsEntry":
      const existingAds = store.adsEntries.findIndex(
        (a) => a.platform === data.platform && a.month === data.month
      );
      if (existingAds >= 0) {
        store.adsEntries[existingAds] = { ...store.adsEntries[existingAds], ...data };
      } else {
        store.adsEntries.push({ ...data, id: Date.now().toString() });
      }
      break;

    case "wikiNote":
      if (data.id) {
        const idx = store.wikiNotes.findIndex((n) => n.id === data.id);
        if (idx >= 0) {
          store.wikiNotes[idx] = { ...data, updatedAt: new Date().toISOString() };
          break;
        }
      }
      store.wikiNotes.push({
        ...data,
        id: Date.now().toString(),
        updatedAt: new Date().toISOString(),
      });
      break;
  }

  return NextResponse.json({ success: true, store });
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, id } = await request.json();

  switch (type) {
    case "externalSale":
      store.externalSales = store.externalSales.filter((s) => s.id !== id);
      break;
    case "campaign":
      store.campaigns = store.campaigns.filter((c) => c.id !== id);
      break;
    case "adsEntry":
      store.adsEntries = store.adsEntries.filter((a) => a.id !== id);
      break;
    case "wikiNote":
      store.wikiNotes = store.wikiNotes.filter((n) => n.id !== id);
      break;
  }

  return NextResponse.json({ success: true });
}

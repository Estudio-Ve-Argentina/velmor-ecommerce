import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const docRef = doc(db, "settings", "finance");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return NextResponse.json({ success: true, settings: snapshot.data() });
    } else {
      // Default settings
      const defaultSettings = { pasarelaFee: 8.5, packagingCost: 0, shippingCost: 0 };
      await setDoc(docRef, defaultSettings);
      return NextResponse.json({ success: true, settings: defaultSettings });
    }
  } catch (error) {
    console.error("Error fetching finance settings:", error);
    return NextResponse.json({ success: false, settings: { pasarelaFee: 8.5, packagingCost: 0, shippingCost: 0 } });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const docRef = doc(db, "settings", "finance");
    await setDoc(docRef, data, { merge: true });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving finance settings:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

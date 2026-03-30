import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const q = query(collection(db, "banner_messages"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    const messages = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { text, active = true, order = 0 } = await req.json();
    const ref = await addDoc(collection(db, "banner_messages"), { text, active, order, createdAt: new Date().toISOString() });
    return NextResponse.json({ id: ref.id, text, active, order });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id, ...data } = await req.json();
    await updateDoc(doc(db, "banner_messages", id), data);
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await req.json();
    await deleteDoc(doc(db, "banner_messages", id));
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, query, orderBy } from "firebase/firestore";
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
    const suppliesRef = collection(db, "supplies");
    const q = query(suppliesRef, orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    const supplies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, supplies });
  } catch (error) {
    console.error("Error fetching supplies:", error);
    return NextResponse.json({ success: false, supplies: [] });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const suppliesRef = collection(db, "supplies");

    if (data.id) {
      // Update
      const docRef = doc(db, "supplies", data.id);
      const updateData = { ...data };
      delete updateData.id;
      await setDoc(docRef, updateData, { merge: true });
      return NextResponse.json({ success: true, id: data.id });
    } else {
      // Create
      const docRef = await addDoc(suppliesRef, data);
      return NextResponse.json({ success: true, id: docRef.id });
    }
  } catch (error: any) {
    console.error("Error saving supply:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    const docRef = doc(db, "supplies", id);
    await deleteDoc(docRef);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting supply:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

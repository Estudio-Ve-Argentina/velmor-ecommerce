import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc, query, orderBy } from "firebase/firestore";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const faqsRef = collection(db, "faqs");
    const q = query(faqsRef, orderBy("order", "asc"));
    const snapshot = await getDocs(q);
    const faqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json({ success: false, faqs: [] });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const faqsRef = collection(db, "faqs");

    if (data.id) {
      // Update
      const docRef = doc(db, "faqs", data.id);
      const updateData = { ...data };
      delete updateData.id;
      await setDoc(docRef, updateData, { merge: true });
      return NextResponse.json({ success: true, id: data.id });
    } else {
      // Create
      const docRef = await addDoc(faqsRef, data);
      return NextResponse.json({ success: true, id: docRef.id });
    }
  } catch (error: any) {
    console.error("Error saving FAQ:", error);
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

    const docRef = doc(db, "faqs", id);
    await deleteDoc(docRef);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

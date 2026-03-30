import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

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

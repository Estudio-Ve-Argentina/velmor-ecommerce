import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  const isAuthenticated = adminSession?.value === process.env.ADMIN_PASSWORD;

  return NextResponse.json({ authenticated: isAuthenticated });
}

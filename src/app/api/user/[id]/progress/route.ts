import { NextResponse } from "next/server";
import { getUserById } from "@/lib/user-storage";

export const runtime = "nodejs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await params;
    const id = idParam?.toLowerCase();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const user = await getUserById(id);
    if (!user) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (e) {
    console.error("/api/user/[id]/progress error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
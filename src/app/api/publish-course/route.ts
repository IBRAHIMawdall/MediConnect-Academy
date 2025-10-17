import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase-config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id: string = (body?.id ?? "").toString().trim();
    if (!id) {
      return NextResponse.json({ error: "Draft id is required" }, { status: 400 });
    }

    // Fallback: if Firestore not configured, simulate publish for demo purposes.
    if (!isFirebaseConfigured()) {
      return NextResponse.json({ published: true, id, note: "Firestore not configured; simulated publish for demo." }, { status: 200 });
    }

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);

    const draftRef = doc(db, "course_drafts", id);
    const draftSnap = await getDoc(draftRef);
    if (!draftSnap.exists()) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 });
    }
    const draftData = draftSnap.data();

    const courseRef = doc(db, "courses", id);
    const courseData = { ...draftData, status: "published", publishedAt: Date.now() };
    try {
      await setDoc(courseRef, JSON.parse(JSON.stringify(courseData)), { merge: true });
    } catch (e: any) {
      const msg = e?.message || String(e);
      if (msg.includes("PERMISSION_DENIED") || msg.includes("Missing or insufficient permissions")) {
        return NextResponse.json(
          {
            error: "Permission denied by Firestore rules. Allow writes to 'courses' or use admin.",
            tip: "Update firestore.rules or configure server-side admin for publishing.",
          },
          { status: 403 }
        );
      }
      throw e;
    }

    // Remove from drafts after successful publish
    await deleteDoc(draftRef);

    return NextResponse.json({ published: true, id }, { status: 200 });
  } catch (e: any) {
    console.error("/api/publish-course error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
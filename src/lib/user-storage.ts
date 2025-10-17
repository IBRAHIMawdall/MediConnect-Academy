// Removed server directive to allow flexible exports and avoid Next.js constraints
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config";
import type { UserProfile, AssessmentResult, LearningPath } from "./career-assessment";

function getDb() {
  if (!isFirebaseConfigured()) {
    return null;
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  return getFirestore(app);
}

function normalizeId(email?: string) {
  const base = (email ?? "user").toLowerCase().trim();
  return base.replace(/[^a-z0-9._-]/g, "-");
}

export async function saveAssessmentResult(email: string | undefined, user: UserProfile, assessment: AssessmentResult) {
  const db = getDb();
  if (!db) {
    console.warn("Firestore not configured; skipping assessment save.");
    return { saved: false };
  }
  const id = normalizeId(email);
  const ref = doc(db, "users", id);
  const data = JSON.parse(
    JSON.stringify({ profile: user, assessmentResults: assessment, updatedAt: Date.now() })
  );
  try {
    await setDoc(ref, data, { merge: true });
    return { saved: true, id };
  } catch (e) {
    console.warn("saveAssessmentResult failed:", e);
    return { saved: false };
  }
}

export async function saveLearningPath(email: string | undefined, learningPath: LearningPath) {
  const db = getDb();
  if (!db) {
    console.warn("Firestore not configured; skipping learning path save.");
    return { saved: false };
  }
  const id = normalizeId(email);
  const ref = doc(db, "users", id);
  const data = JSON.parse(
    JSON.stringify({ learningPath, updatedAt: Date.now() })
  );
  try {
    await setDoc(ref, data, { merge: true });
    return { saved: true, id };
  } catch (e) {
    console.warn("saveLearningPath failed:", e);
    return { saved: false };
  }
}

export async function getUserById(id: string) {
  const db = getDb();
  if (!db) return null;
  const ref = doc(db, "users", id);
  try {
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as any) : null;
  } catch (e) {
    console.warn("getUserById failed:", e);
    return null;
  }
}
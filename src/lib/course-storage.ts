"use server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config";
import type { Course } from "./data";

function getDb() {
  if (!isFirebaseConfigured()) {
    return null;
  }
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  return getFirestore(app);
}

export async function saveCourseDraft(course: Course & { references?: any; mcqs?: any; quality?: any }) {
  const db = getDb();
  if (!db) {
    console.warn("Firestore not configured; skipping draft save.");
    return { saved: false };
  }
  const id = course.id;
  const ref = doc(db, "course_drafts", id);
  const data = JSON.parse(JSON.stringify(course));
  await setDoc(ref, { ...data, status: "draft", updatedAt: Date.now() }, { merge: true });
  return { saved: true };
}

export async function getCourseDraft(id: string) {
  const db = getDb();
  if (!db) return null;
  const ref = doc(db, "course_drafts", id);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}
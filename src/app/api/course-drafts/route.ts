import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase-config";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Fallback sample draft to ensure the UI has something to review when Firestore isn't configured
    const sampleDraft = {
      id: "practical-point-of-care-ultrasound",
      title: "Practical Point-of-Care Ultrasound",
      description: "Hands-on POCUS essentials for clinicians.",
      longDescription:
        "Develop safe, effective bedside ultrasound skills for core clinical scenarios. Includes image acquisition, interpretation, and procedural guidance.",
      imageId: "ultrasound",
      category: "Clinical Medicine",
      subCategory: "Radiology",
      instructorId: "dr-emily-carter",
      schedule: "Self-paced",
      prerequisites: ["Basic anatomy", "Foundations of clinical reasoning"],
      modules: [
        {
          title: "Ultrasound Fundamentals",
          lessons: [
            { title: "Physics Basics", text: "Sound waves, frequency, probe types, and safety." },
            { title: "Image Acquisition", text: "Proper probe handling, gel use, and optimizing gain/depth." },
            { title: "Artifacts", text: "Common artifacts and when they are useful diagnostically." },
          ],
        },
        {
          title: "Core Applications",
          lessons: [
            { title: "Lung POCUS", text: "Detect pneumothorax, consolidation, B-lines, and pleural effusion." },
            { title: "Cardiac Views", text: "Parasternal long/short, apical four-chamber, IVC assessment." },
            { title: "FAST Exam", text: "Focused assessment for trauma with key windows and pitfalls." },
          ],
        },
        {
          title: "Procedural Guidance",
          lessons: [
            { title: "Vascular Access", text: "Real-time guidance for peripheral and central lines." },
            { title: "Thoracentesis", text: "Pre-procedure planning and needle guidance to avoid complications." },
            { title: "Paracentesis", text: "Effusion localization and safe needle trajectory." },
          ],
        },
        {
          title: "Quality & Pitfalls",
          lessons: [
            { title: "Safety Checks", text: "Confirm findings and integrate with clinical context to avoid errors." },
            { title: "Documentation", text: "Standardized reporting, labeling, and image storage." },
            { title: "Continuous Improvement", text: "QA cycles and peer review to enhance reliability." },
          ],
        },
      ],
      references: [
        {
          pmid: "PMID: Example-1",
          title: "Point-of-care ultrasound in emergency medicine",
          journal: "Emerg Med J",
          year: 2020,
          url: "https://pubmed.ncbi.nlm.nih.gov/0000000/",
        },
      ],
      mcqs: [
        {
          lessonTitle: "FAST Exam",
          question: "Which window is essential for detecting free fluid in FAST?",
          options: ["Subxiphoid", "RUQ (Morrison's pouch)", "Apical four-chamber", "Parasternal long"],
          correctIndex: 1,
          explanation: "RUQ view (Morrison's pouch) is a key location to visualize hepatorenal recess." },
      ],
      quality: { safe: true, summary: "Clinically reasonable starter draft.", issues: [] },
      status: "draft",
      updatedAt: Date.now(),
    };

    if (!isFirebaseConfigured()) {
      return NextResponse.json({ drafts: [sampleDraft], warning: "Firestore not configured" }, { status: 200 });
    }
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);
    const col = collection(db, "course_drafts");
    const snap = await getDocs(col);
    const drafts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    // If collection empty, also return the sample draft for demo visibility
    if (!drafts.length) {
      drafts.push(sampleDraft);
    }
    return NextResponse.json({ drafts }, { status: 200 });
  } catch (e) {
    console.error("/api/course-drafts error", e);
    return NextResponse.json({ error: "Failed to list drafts" }, { status: 500 });
  }
}
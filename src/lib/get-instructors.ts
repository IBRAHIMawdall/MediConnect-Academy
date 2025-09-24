'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Instructor, instructors as localInstructors } from './data';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function getInstructors(): Promise<Instructor[]> {
  // Fallback to local data if Firebase is not configured
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    console.warn(`
[MediConnect] Firebase is not fully configured for instructors. Falling back to local mock data.
Please ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your environment.
    `);
    return localInstructors;
  }
  
  try {
    const instructorsCollection = collection(db, 'instructors');
    const instructorSnapshot = await getDocs(instructorsCollection);

    if (instructorSnapshot.empty) {
        console.warn(`
[MediConnect] Firestore 'instructors' collection is empty. Falling back to local mock data.
Have you run the seed script? You can do so by running: npm run seed:firestore
        `);
        return localInstructors;
    }

    const instructorsList = instructorSnapshot.docs.map(doc => doc.data() as Instructor);
    return instructorsList;
  } catch (error) {
    console.error("Error fetching instructors from Firestore:", error);
    console.warn("[MediConnect] Falling back to local mock data due to Firestore fetch error for instructors.");
    return localInstructors;
  }
}

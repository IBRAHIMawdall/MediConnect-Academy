
'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Instructor, instructors as localInstructors } from './data';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config';

export async function getInstructors(): Promise<Instructor[]> {
  // Fallback to local data if Firebase is not configured
  if (!isFirebaseConfigured()) {
    console.warn(`
[MediConnect] Firebase is not fully configured for instructors. Falling back to local mock data.
Please ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your environment.
    `);
    return localInstructors;
  }
  
  try {
    // Lazy initialize Firebase only when configuration exists
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);
    const instructorsCollection = collection(db, 'instructors');
    const instructorSnapshot = await getDocs(instructorsCollection);

    if (instructorSnapshot.empty) {
        console.warn(`
[MediConnect] Firestore 'instructors' collection is empty. Falling back to local mock data.
Have you run the seed script? You can do so by running: npm run seed:firestore
        `);
        return localInstructors;
    }
    
    console.log("[MediConnect] Successfully fetched instructors from Firestore.");
    const instructorsList = instructorSnapshot.docs.map(doc => doc.data() as Instructor);
    return instructorsList;
  } catch (error) {
    console.error("Error fetching instructors from Firestore:", error);
    console.warn("[MediConnect] Falling back to local mock data for instructors due to Firestore fetch error.");
    return localInstructors;
  }
}

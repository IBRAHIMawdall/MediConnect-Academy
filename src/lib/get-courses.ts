
'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Course, courses as localCourses } from './data';
import { unstable_cache } from 'next/cache';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config';

const fetchCourses = async (): Promise<Course[]> => {
  // Check if Firebase is configured. If not, fall back to local data.
  if (!isFirebaseConfigured()) {
    console.warn(`
[MediConnect] Firebase is not fully configured. 
Project ID or API Key is missing. Falling back to local mock data for courses.
To use Firestore, please ensure all NEXT_PUBLIC_FIREBASE_* variables are set in your environment.
    `);
    return localCourses;
  }
  
  try {
    // Lazy initialize Firebase only when configuration exists
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore(app);
    const coursesCollection = collection(db, 'courses');
    const courseSnapshot = await getDocs(coursesCollection);

    // If Firestore is empty, it could be because the seed script hasn't run.
    if (courseSnapshot.empty) {
        console.warn(`
[MediConnect] Firestore 'courses' collection is empty. Falling back to local mock data.
Have you run the seed script? You can do so by running: npm run seed:firestore
        `);
        return localCourses;
    }

    console.log("[MediConnect] Successfully fetched courses from Firestore.");
    const coursesList = courseSnapshot.docs.map(doc => doc.data() as Course);
    return coursesList;
  } catch (error) {
    console.error("Error fetching courses from Firestore:", error);
    console.warn("[MediConnect] Falling back to local mock data for courses due to Firestore fetch error.");
    return localCourses;
  }
};

export const getCourses = unstable_cache(fetchCourses, ['courses:list'], { revalidate: 60 });

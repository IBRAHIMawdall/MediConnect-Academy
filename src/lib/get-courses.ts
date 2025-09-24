'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Course } from './data';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function getCourses(): Promise<Course[]> {
  if (!firebaseConfig.projectId) {
    console.error("Firebase project ID is not configured. Cannot fetch courses.");
    return [];
  }
  
  try {
    const coursesCollection = collection(db, 'courses');
    const courseSnapshot = await getDocs(coursesCollection);
    const coursesList = courseSnapshot.docs.map(doc => doc.data() as Course);
    return coursesList;
  } catch (error) {
    console.error("Error fetching courses from Firestore:", error);
    return [];
  }
}

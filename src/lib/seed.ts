'use server';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch } from 'firebase/firestore';
import { courses } from './data';

// This is a server-side script to seed data into Firestore.
// It should be run from the command line, e.g., via an npm script.

async function seedDatabase() {
  // IMPORTANT: Replace this with your actual Firebase project configuration.
  // You can find this in your Firebase project settings.
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Do not run this in a production environment where you already have data.
  if (process.env.GENKIT_ENV === 'production') {
    console.log('Seed script is disabled in production environment.');
    return;
  }
  
  if (!firebaseConfig.projectId) {
    console.error("Firebase project ID is not configured. Please add your Firebase config to seed the database.");
    return;
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const coursesCollection = collection(db, 'courses');
  const batch = writeBatch(db);

  console.log(`Preparing to seed ${courses.length} courses...`);

  courses.forEach((course) => {
    // We use the existing course.id as the document ID in Firestore
    const docRef = collection(db, 'courses', course.id);
    // Firestore can't store 'undefined' values, so we filter them out
    const courseData = JSON.parse(JSON.stringify(course));
    batch.set(docRef, courseData);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();

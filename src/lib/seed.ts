'use server';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { courses, instructors } from './data';
import { firebaseConfig } from './firebase-config';


// This is a server-side script to seed data into Firestore.
// It should be run from the command line, e.g., via an npm script.
async function seedDatabase() {
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

  const batch = writeBatch(db);

  // Seed instructors
  const instructorsCollection = collection(db, 'instructors');
  console.log(`Preparing to seed ${instructors.length} instructors...`);
  instructors.forEach((instructor) => {
    const instructorDocRef = doc(db, 'instructors', instructor.id);
    batch.set(instructorDocRef, instructor);
  });

  // Seed courses
  const coursesCollection = collection(db, 'courses');
  console.log(`Preparing to seed ${courses.length} courses...`);
  courses.forEach((course) => {
    // We use the existing course.id as the document ID in Firestore
    const courseDocRef = doc(db, 'courses', course.id);
    // Firestore can't store 'undefined' values, so we filter them out
    const courseData = JSON.parse(JSON.stringify(course));
    batch.set(courseDocRef, courseData);
  });

  try {
    await batch.commit();
    console.log('Database seeded successfully with courses and instructors!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase().then(() => {
    process.exit(0);
});

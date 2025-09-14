
'use client';

import { useState, useEffect, useCallback } from 'react';

// Custom hook to manage and persist lesson completion progress using localStorage.
export const useProgress = (courseId: string) => {
  const getStorageKey = useCallback(() => `progress-${courseId}`, [courseId]);
  
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // On initial mount, load the completed lessons from localStorage.
  useEffect(() => {
    const storageKey = getStorageKey();
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        // Parse the stored array and create a Set for efficient lookups.
        setCompletedLessons(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error("Failed to parse completed lessons from localStorage", e);
      setCompletedLessons(new Set());
    }
  }, [courseId, getStorageKey]);

  // Function to toggle a lesson's completion status.
  const toggleLesson = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId); // Mark as incomplete
      } else {
        newSet.add(lessonId); // Mark as complete
      }
      
      // Persist the updated set to localStorage.
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(Array.from(newSet)));
      
      return newSet;
    });
  }, [getStorageKey]);

  return { completedLessons, toggleLesson };
};

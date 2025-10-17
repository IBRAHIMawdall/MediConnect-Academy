import { describe, it, expect, beforeEach } from 'vitest';
import { getCourses } from './get-courses';

describe('getCourses', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  });

  it('returns local mock data when env is missing', async () => {
    const courses = await getCourses();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  it('works with env set (still returns array)', async () => {
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'demo';
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'demo-key';
    const courses = await getCourses();
    expect(Array.isArray(courses)).toBe(true);
  });
});
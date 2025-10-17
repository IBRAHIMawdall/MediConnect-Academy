import { describe, it, expect, beforeEach } from 'vitest';
import { getInstructors } from './get-instructors';

describe('getInstructors', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  });

  it('returns local mock data when env is missing', async () => {
    const instructors = await getInstructors();
    expect(Array.isArray(instructors)).toBe(true);
    expect(instructors.length).toBeGreaterThan(0);
  });

  it('works with env set (still returns array)', async () => {
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'demo';
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'demo-key';
    const instructors = await getInstructors();
    expect(Array.isArray(instructors)).toBe(true);
  });
});
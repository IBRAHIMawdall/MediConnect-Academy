
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Treat placeholder-like values as "not configured" to avoid unintended Firestore calls.
function looksPlaceholder(v?: string | null) {
  if (!v) return true;
  const s = String(v).toLowerCase();
  return (
    s.includes("your_") ||
    s.includes("replace_me") ||
    s.includes("placeholder") ||
    s.trim().length === 0
  );
}

export function isFirebaseConfigured(): boolean {
  // Only require key essentials; other fields may be optional depending on usage.
  const { apiKey, projectId } = firebaseConfig as { apiKey?: string; projectId?: string };
  return !looksPlaceholder(apiKey) && !looksPlaceholder(projectId);
}

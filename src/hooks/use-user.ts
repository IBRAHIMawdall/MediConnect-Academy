'use client';

import { useState } from 'react';

type User = {
  name: string;
  email: string;
  avatar: string;
};

// This is a mock user hook. In a real app, you'd fetch this from your auth provider.
export function useUser() {
  const [user] = useState<User>({
    name: 'Dr. User',
    email: 'user@mediconnect.com',
    avatar: 'https://picsum.photos/seed/user/40/40',
  });

  return { user };
}
